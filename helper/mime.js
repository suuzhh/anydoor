/*
 * @Author: magic_su 
 * @Date: 2018-04-16 14:21:16 
 * @Last Modified by: magic_su
 * @Last Modified time: 2018-04-16 14:38:28
 * @Description MIME转换
 */
const path = require('path')

const mimeTypes = {
    'css': 'text/css',
    'gif': 'image/gif',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'js': 'application/javascript',
    'json': 'application/json',
    'pdf': 'application/pdf',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'swf': 'application/x-shockwave-flash',
    'tiff': 'image/tiff',
    'txt': 'text/plain',
    'wav': 'audio/x-wav',
    'wma': 'audio/x-ms-wma',
    'wmv': 'audio/x-ms-wmv',
    'xml': 'application/xml'
}

module.exports = (fliePath) => {
    let ext = path.extname(fliePath)
    .split('.')
    .pop()
    .toLocaleLowerCase()

    if (!ext) {
        ext = fliePath
    }

    return mimeTypes[ext] || mimeTypes['txt']
}
