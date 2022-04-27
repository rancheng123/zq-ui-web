var fs = require('fs')
var root = process.cwd()
var targetPath = root + '/lib/index.js'
var content = fs.readFileSync(targetPath).toString()
var newContent = '/*eslint-disable*/\n' + content
fs.writeFileSync(targetPath, newContent)
