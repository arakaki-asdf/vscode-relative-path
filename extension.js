const vscode = require('vscode');
const Papa = require('papaparse');
const fs = require('fs');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "relative-path" is now active!');

  const disposable = vscode.commands.registerCommand('relative-path.arakaki', async function () {

    const message = (text) =>  vscode.window.showInformationMessage(text);
    const errorMessage = (text) =>  vscode.window.showErrorMessage(text);
    // const openMessageAsync = async (text) => await vscode.window.showInformationMessage(text, 'open');

    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
      errorMessage("アクティブなファイルがありません");
      return;
    }

    // const document = activeEditor.document;
    // if (document.languageId !== 'csv') {
    //   errorMessage("拡張子がcsvではありません。(もしくはコマンドパレットからchange languageでcsv)");
    //   return;
    // }

    const relativePath = vscode.workspace.asRelativePath(vscode.window.activeTextEditor.document.uri.fsPath, false);
    const unixStylePath = relativePath.replace(/\\/g, '/');
    await vscode.env.clipboard.writeText(unixStylePath)
    message(`clip: ${unixStylePath}`)
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
}
