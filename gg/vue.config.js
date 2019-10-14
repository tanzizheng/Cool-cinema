module.exports={
    //开发环境配置
    devServer:{
    //     proxy:{
    //         '/api':{
    //             //反响代理目标
    //             target:'http://39.97.33.178',
    //             changeOrigin:true
    //             //是否改变代理地址
    //         }
    //     },
        
    // }
    open: process.platform === 'darwin',
        host: '127.0.0.1',
        port: 9099,
        https: false,
        hotOnly: false,
        proxy: {
                    '/api':{
                        //反响代理目标
                        target:'http://39.97.33.178',
                        changeOrigin:true
                        //是否改变代理地址
                    }
                },// 设置代理
        before: app => {}
    }

}