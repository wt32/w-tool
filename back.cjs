// 创建用于备份的文件夹，并备份文件当前目录下的所有文件，符合条件的文件及文件夹和里面所有的内容会被忽略
const fs = require('fs');

const path = require('path');
// 备份文件夹路径
// 日期
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const backupName = `${year}-${month}-${day}`;
const backupDir = path.resolve(__dirname, '../tool-app-back_' + backupName);
// 删除备份文件夹内所有文件
fs.rmSync(backupDir, { recursive: true, force: true });

// 不需要备份的文件列表
const ignoreFiles = ['node_modules','server/node_modules', '.git', 'src-tauri/target', "tool-app"];

const ignoreFilesFullPath = ignoreFiles.map((file) => path.join(__dirname, file));


function getAllFilesPath(filePath) {
    const files = fs.readdirSync(filePath);
    const filesPath = [];
    files.forEach((file) => {
        const curPath = path.join(filePath, file);
        if (!ignoreFilesFullPath.includes(curPath)) {
            const stats = fs.statSync(curPath);
            if (stats.isFile()) {
                filesPath.push(curPath);
            } else if (stats.isDirectory()) {
                filesPath.push(...getAllFilesPath(curPath));
            }
        }
    });
    return filesPath;
}
// 进度条显示当前备份文件的百分比
function showProgress(current, total) {
    // 获取终端宽度
    const width = process.stdout.columns - 20;
    const percent = (current / total);
    const progress = "[" + '-'.repeat(Math.floor(width * percent)) + '*'.repeat(Math.floor(width * (1 - percent))) + "]";
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`进度：${progress} ${(percent * 100).toFixed(2)}%`);
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
// 备份文件
async function backupFile() {
    const filesPath = getAllFilesPath(__dirname);
    for (let index = 0; index < filesPath.length; index++) {
        const filePath = filesPath[index];
        const relativePath = path.relative(__dirname, filePath);
        const backupFilePath = path.join(backupDir, relativePath);
        const backupFileDir = path.dirname(backupFilePath);
        if (!fs.existsSync(backupFileDir)) {
            fs.mkdirSync(backupFileDir, { recursive: true });
        }
        fs.copyFileSync(filePath, backupFilePath);
        showProgress(index + 1, filesPath.length);
        // await sleep(10);
    }
    console.log('备份完成');
    console.log('备份路径：',backupDir)
}
backupFile();