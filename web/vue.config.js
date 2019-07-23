module.exports = {
    css: {
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
            },

            postcss: {
                // 这里的选项会传递给 postcss-loader
            },
            less:{
                javascriptEnabled: true
            }
        }
    },

    // 所有 webpack-dev-server 的选项都支持
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        open: true,

        //host: '0.0.0.0',

        port: 1234,

        https: false,

        hotOnly: false,
        disableHostCheck:true,
        // 将任何未知请求 (没有匹配到静态文件的请求) 代理到该字段指向的地方
        proxy: {
            "/api/v1":{
                target: 'http://192.168.31.226:7777',
                changeOrigin: true,
            }
        },

        before: app => {
        }
    },
    pwa         : {
        iconPaths: {
            favicon32     : 'icon.ico',
            favicon16     : 'icon.ico',
            appleTouchIcon: 'icon.ico',
            maskIcon      : 'icon.ico',
            msTileImage   : 'icon.ico'
        }
    }
};
