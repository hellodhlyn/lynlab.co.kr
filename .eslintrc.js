module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'airbnb-base',
  ],
  // add your custom rules here
  rules: {
    'max-len': 'off',
    'import/no-extraneous-dependencies': 0,
    'vue/singleline-html-element-content-newline': 'off',
  },
}
