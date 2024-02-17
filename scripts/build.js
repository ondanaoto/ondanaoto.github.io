const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const deleteFolderRecursive = function(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) { // ディレクトリの場合は再帰的に削除
        deleteFolderRecursive(curPath);
      } else { // ファイルの場合は削除
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directoryPath);
  }
};

// yarn build を実行
exec('yarn build', (err) => {
  if (err) {
    console.error(`ビルドエラー: ${err}`);
    return;
  }

  // docs ディレクトリが既に存在し、空でない場合は削除
  if (fs.existsSync('./docs')) {
    deleteFolderRecursive('./docs');
  }

  // out ディレクトリを docs にリネーム
  fs.renameSync('./out', './docs');
  console.log('ビルド完了し、out ディレクトリを docs にリネームしました。');
});
