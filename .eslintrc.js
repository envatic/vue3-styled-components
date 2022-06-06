module.exports = {
    root: true,
    parser: '@babel/eslint-parser',

    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020
    },

    extends: 'vue',

    // required to lint *.vue files
    plugins: [
        'html'
    ],

    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        //"plugin:prettier/recommended",
    ],



    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        "vue/multi-word-component-names": "off"
    },


    env: {
        node: true
    },

}
