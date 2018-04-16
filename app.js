/*
 * @Author: magic_su 
 * @Date: 2018-04-16 11:55:17 
 * @Last Modified by:   magic_su 
 * @Last Modified time: 2018-04-16 11:55:17 
 */


const http = require('http')
const path = require('path')
const chalk = require('chalk')
const conf = require('./config/defaultConfig')
const route = require('./helper/route')

const server = http.createServer((req, res) => {
    const filePath = path.join(conf.root, req.url)
    route(req, res, filePath)
})

server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`
    console.info(`Server started at ${chalk.green(addr)}`)
})
