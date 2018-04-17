/*
 * @Author: magic_su 
 * @Date: 2018-04-16 11:55:27 
 * @Last Modified by: magic_su
 * @Last Modified time: 2018-04-17 08:56:23
 */


module.exports = {
    root: process.cwd(),    //TODO: 进程当前工作的目录
    hostname: '127.0.0.1',
    port: 9527,
    compress: /\.(html|js|css|md)/,
    cache: {
        maxAge: 60 * 10, // TODO: 缓存时间
        expires: true,   // 有效期
        cacheControl: true,
        lastModified: true,
        etag: true
    }
}