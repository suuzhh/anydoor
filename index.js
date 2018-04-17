/*
 * @Author: magic_su 
 * @Date: 2018-04-17 13:42:29 
 * @Last Modified by: magic_su
 * @Last Modified time: 2018-04-17 13:56:22
 * @Description 命令行工具
 */

const yargs = require('yargs')
const Server = require('./app')

const argv = yargs.usage('anydoor [options]')
    .option('p', {
        alias: 'port',
        describe: '端口号',
        default: 9527
    })
    .option('h', {
        alias: 'host',
        describe: '主机名',
        default: '127.0.0.1'
    })
    .option('d', {
        alias: 'root',
        describe: 'root path',
        default: process.cwd()
    })
    .version()
    .alias('v', 'version')
    .help()
    .argv

const server = new Server(argv)
server.start()