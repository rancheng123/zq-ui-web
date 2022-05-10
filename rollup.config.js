// 打包vue2  单文件组件（Single-File Components ）
import vue from "rollup-plugin-vue2";

import less from 'rollup-plugin-less';
import babel from "rollup-plugin-babel";
import json from "rollup-plugin-json";
import image from 'rollup-plugin-image';

import svg from "rollup-plugin-svg";

import sourcemaps from "rollup-plugin-sourcemaps";

var target = "index.js";
var out = "lib/index.js";

// 测试 start
//var target = 'checkbox2/index.vue'
//var out = 'lib/input2/index.js';
// 测试 end

import path from "path";
import { DEFAULT_EXTENSIONS } from "@babel/core";

module.exports = {
  input: "./src/packages/" + target,
  output: {
    file: out,
    format: "umd",
    name: "aaa",
    sourceMap: true,



    //标记外部依赖, 指定浏览器全局变量名称(与外部模块相对应的)
    globals: {
      "vue": "Vue",
      "axios": "axios",
      "qiniu-js": "qiniu"
    }
  },
  plugins: [
    svg(/* options */),




    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true,
      plugins: [
        //"babel-plugin-transform-vue-jsx",
        "@babel/plugin-syntax-jsx",
      ],
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
    }),
    less({
      output: './lib/index.css'
    }),
    vue(),

    json({
      // All JSON files will be parsed by default,
      // but you can also specifically include/exclude files
      //include: 'node_modules/**',
      // exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],

      // for tree-shaking, properties will be declared as
      // variables, using either `var` or `const`
      preferConst: true, // Default: false

      // specify indentation for the generated default export —
      // defaults to '\t'
      indent: "  ",

      // ignores indent and generates the smallest code
      compact: true, // Default: false

      // generate a named export for every property of the JSON object
      namedExports: true, // Default: true
    }),
    image(),
    sourcemaps(),
  ],
};
