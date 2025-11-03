const vscode = require('vscode');
const { getRelativePath } = require('./commands/getRelativePath.js');

function activate(context) {

  const disposable1 = vscode.commands.registerCommand('arakaki-asdf.relative-path', async function () {
    await getRelativePath();
  });

  context.subscriptions.push(disposable1);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
}
