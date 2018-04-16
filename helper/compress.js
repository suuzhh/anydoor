/*
 * @Author: magic_su 
 * @Date: 2018-04-16 15:10:47 
 * @Last Modified by: magic_su
 * @Last Modified time: 2018-04-16 15:31:26
 * @Description 服务器gzip
 */
const { createGzip, createDeflate } = require('zlib')

 module.exports = (rs, req, res) => {
     const acceptEncoding = req.headers['accept-encoding']
     if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
        return rs
     } else if (acceptEncoding.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding', 'gzip')
        return rs.pipe(createGzip())
     } else if (acceptEncoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate')
        return rs.pipe(createDeflate())
     }
 }