
var packageJsonPath = __dirname + '/package.json'

let fs = require('fs')
var res = fs.readFileSync(packageJsonPath);

var newContent = res.toString().replace(/\"version\"\:\s*\"\d+\.\d+\.\d+\"/,(match)=>{
    var oldVersion = match.split(':')[1].replace('"','').replace('"','')
    oldVersion = oldVersion.trim()

    var versions = oldVersion.split('.')
    var [bigVersion, middleVersion, smallVersion] = versions

    //小版本号加1
    smallVersion = (Number(smallVersion) + 1).toString()

    var newVersion = [bigVersion, middleVersion, smallVersion].join('.')

    return '"version":"'+ newVersion +'"'
})



fs.writeFileSync(packageJsonPath, newContent)
var newPackageJson = JSON.parse(newContent)
console.log('新版本号替换成功： ' + newPackageJson.version)

