// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'eol-last': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    // // array must have return
    // 'array-callback-return': true,
    // // variables must be used only in scope
    // 'block-scoped-var': true,
    // // must use curly
    // 'curly': 'all',
    // // switch must have default case
    // 'default-case': true,
    // // single-line block must have space
    // 'block-spacing': 'always'
  }
}
