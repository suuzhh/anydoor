/*
 * @Author: magic_su 
 * @Date: 2018-04-16 11:55:05 
 * @Last Modified by: magic_su
 * @Last Modified time: 2018-04-17 09:57:46
 */


const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify
const Handlebars = require('handlebars')
const mime = require('./mime')
const compress = require('./compress')
const range = require('./range')
const isFresh = require('./cache')

//  美化异步回调
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath)
const template = Handlebars.compile(source.toString())

module.exports = async function (req, res, filePath, conf) {
    try {
        const stats = await stat(filePath)
        if (stats.isFile()) {
            const contentType = mime(filePath)
            res.setHeader('Content-Type', contentType)

            if (isFresh(stats, req, res)) {
                res.statusCode = 304
                res.end()
                return
            }

            let rs
            const { code, start, end } = range(stat.size, req, res)
            if (code === 200) {
                res.statusCode = 200
                rs = fs.createReadStream(filePath)
            } else {
                res.statusCode = 206
                rs = fs.createReadStream(filePath, {start, end})
            }
            
            if (filePath.match(conf.compress)) {
                rs = compress(rs, req, res)
            }
            rs.pipe(res)
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath)
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            const dir = path.relative(conf.root, filePath)
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                files: files.map(file => {
                    return {
                        file,
                        icon: mime(file)
                    }
                })
            }
            res.end(template(data))
        }
    } catch (err) {
        console.error(err)
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end(`${filePath} is not a directory or file\n ${err.toString()}`)
    }
}