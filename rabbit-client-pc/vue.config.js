// 这些文件都是webpack执行的，相当于node代码，所以使用的都是commonjs模块规范
const path = require('path')
module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.join(__dirname, "src", "assets", "styles", "variables.less"),
                path.join(__dirname, "src", "assets", "styles", "mixin.less")
            ]
        }
    }
}
