'use strict';
var vscode = require('vscode');
var Constants = require('./Constants');
var Utilities_1 = require('./Utilities');
var StatusBarItem_1 = require('./StatusBarItem');
var opn = require('opn');
function activate(context) {
    var statusBarItem = new StatusBarItem_1.default();
    statusBarItem.updateStatusbar();
    var utilities = new Utilities_1.default();
    // Subscribe so that the statusBarItem gets updated
    var disposableStatusBar = vscode.window.onDidChangeActiveTextEditor(statusBarItem.updateStatusbar, statusBarItem, context.subscriptions);
    var previewUri = vscode.Uri.parse(Constants.ExtensionConstants.PREVIEW_URI);
    // Register the commands that are provided to the user
    var disposableSidePreview = vscode.commands.registerCommand('extension.sidePreview', function () {
        utilities.init(vscode.ViewColumn.Two, context, previewUri);
    });
    var disposableStandalonePreview = vscode.commands.registerCommand('extension.fullPreview', function () {
        utilities.init(vscode.ViewColumn.One, context, previewUri);
    });
    var disposableInBrowser = vscode.commands.registerCommand("extension.inBrowser", function () {
        if (utilities.checkDocumentIsHTML(true)) {
            opn(vscode.window.activeTextEditor.document.fileName);
        }
    });
    // push to subscriptions list so that they are disposed automatically
    context.subscriptions.push(disposableSidePreview);
    context.subscriptions.push(disposableStandalonePreview);
    context.subscriptions.push(disposableInBrowser);
}
exports.activate = activate;
// This method is called when extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map