module.exports = {
  chainWebpack: config => {

    var eslintRule = config.module.rule('eslint');

    // 组件库 不做 esLint 校验
    eslintRule.exclude.store.add( process.cwd() + '/lib');

    var eslintLoader = eslintRule.use('eslint-loader');


    eslintLoader.tap(options => {
        // 修改它的选项...
        return options
    })

  }
}
