module.exports = {
    devServer : {
        open: process.platform === 'darwin',
        host: 'xyj66.vip',
        port: 9099,
        https: false,
        hotOnly: false,
        proxy : {
            '/api2' : {
                target : 'http://localhost:3000',
                changeOrigin : true
            },
            '/api' : {
                target : 'http://39.97.33.178',
                changeOrigin : true
            }
        }
    }
}