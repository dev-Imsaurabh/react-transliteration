module.exports = {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [
      "@babel/plugin-proposal-optional-chaining",
      ["transform-imports", {
        "react-transliteration": {
          "transform": "react-transliteration/dist/index.js",
          "preventFullImport": true
        }
      }]
    ]
  };
  