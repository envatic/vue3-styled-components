module.exports = {
  presets: [
    "@babel/preset-env",
  ],
  comments: false,
  plugins: [
    //"@babel/plugin-transform-runtime" ,
    "add-module-exports",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-class-properties",
     
  ]
}
