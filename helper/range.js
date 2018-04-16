/*
 * @Author: magic_su 
 * @Date: 2018-04-16 15:10:47 
 * @Last Modified by: magic_su
 * @Last Modified time: 2018-04-16 15:31:26
 * @Description 请求范围
 */

module.exports = (totalSize, req, res) => {
    const range = req.headers['range']
    if (!range) {
        return { code: 200 }
    }

    const sizes = range.match(/bytes=(\d*)-(\d*)/)
    const end = sizes[2] || totalSize - 1
    const start = sizes[1]

    if (start > end || start < 0 || end > totalSize) {
        return { code: 200 }
    }
    res.setHeader('Accept-Ranges','bytes')
    res.setHeader('Content-Range', `bytes ${start}-${end}/${totalSize}`)
    res.setHeader('Content-Length', end - start)
    return {
        code: 206,
        start: parseInt(start),
        end: parseInt(end)
    }
}