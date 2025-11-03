const vscode = require('vscode');

async function ballonMessage(title, timeMs = 500) {
  await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: "",
      cancellable: true,
    },
    async (progress, token) => {
      token.onCancellationRequested(() => console.log("cancel."));
      progress.report({ message: title });
      // 最後のメッセージを表示するために少し待機
      await new Promise(resolve => setTimeout(resolve, timeMs));
    }
  );
}

async function getRelativePath() {
  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor) {
    ballonMessage("アクティブなファイルがありません");
    return "";
  }
  const relativePath = vscode.workspace.asRelativePath(vscode.window.activeTextEditor.document.uri.fsPath, false);
  onClipboard(relativePath);

  return relativePath;
};

async function onClipboard(newPath) {
  let unixStylePath = newPath.replace(/\\/g, '/');
  // 先頭にスラッシュがないならつける
  if (!unixStylePath.startsWith('/')) unixStylePath = '/' + unixStylePath;
  // clipboard copy
  await vscode.env.clipboard.writeText(unixStylePath);

  ballonMessage(`clip: ${unixStylePath}`);
}

module.exports = {
  getRelativePath,
};