const { exec } = require('child_process');
const fs = require('fs');

// next build を実行
exec('yarn build', (err) => {
  if (err) {
    console.error(`ビルドエラー: ${err}`);
    return;
  }

  // out ディレクトリが存在する場合、docs にリネーム
  if (fs.existsSync('./out')) {
    fs.renameSync('./out', './docs');
    console.log('ビルド完了し、out ディレクトリを docs にリネームしました。');
  } else {
    console.error('out ディレクトリが見つかりません。');
  }
});