/*
 * @Author: magic_su 
 * @Date: 2018-04-16 11:55:17 
 * @Last Modified by: magic_su
 * @Last Modified time: 2018-04-17 13:55:20
 */


const http = require('http')
const path = require('path')
const chalk = require('chalk')
const conf = require('./config/defaultConfig')
const route = require('./helper/route')

class Server {
    constructor(config) {
        this.conf = Object.assign({}, conf, config) 
    }

    start() {
        const server = http.createServer((req, res) => {
            const filePath = path.join(this.conf.root, req.url)
            route(req, res, filePath, this.conf)
        })
        
        server.listen(this.conf.port, this.conf.hostname, () => {
            const addr = `http://${this.conf.hostname}:${this.conf.port}`
            console.info(`Server started at ${chalk.green(addr)}`)
        })
    }
}

module.exports = Server
