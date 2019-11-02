'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const liveServer = require("live-server");
const path = require("path");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let disposablePreview = vscode.commands.registerTextEditorCommand('extension.liveServerPreview.open', livePreview(context));
    context.subscriptions.push(disposablePreview);
}
exports.activate = activate;
function livePreview(context) {
    return (textEditor) => {
        if (!isEditingHTML(textEditor.document)) {
            vscode.window.showErrorMessage('Live Server Preview can preview only HTML file');
            return;
        }
        const workspacePath = vscode.workspace.rootPath;
        const documentPath = textEditor.document.uri.fsPath;
        const rootPath = 
        // workspace is available and it has the document
        (workspacePath && documentPath.startsWith(workspacePath))
            ? workspacePath
            : path.dirname(documentPath);
        const server = liveServer.start({
            port: 0,
            host: '127.0.0.1',
            root: rootPath,
            open: false
        });
        // some/file.html
        const relativePath = documentPath.substr(rootPath.length + 1);
        const panel = vscode.window.createWebviewPanel('extension.liveServerPreview', relativePath, vscode.ViewColumn.Two, {
            enableScripts: true
        });
        server.addListener('listening', () => {
            panel.webview.html = provideContent(server, relativePath);
        });
        panel.onDidDispose(() => {
            console.log("shutdowning live-server...");
            server.shutdown();
        }, null, context.subscriptions);
    };
}
function isEditingHTML(document) {
    return document.languageId.toLowerCase() == 'html' || document.fileName.match(/\.html$/);
}
// this method is called when your extension is deactivated
function deactivate() {
    console.log("deactivated");
}
exports.deactivate = deactivate;
function provideContent(server, relativePath) {
    const port = server.address().port;
    return `
        <html>
            <header>
                <style>
                    body, html, div {
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        background-color: #fff;
                    }
                </style>
            </header>
            <body>
                <div>
                    <iframe src="http://127.0.0.1:${port}/${relativePath}" width="100%" height="100%" seamless frameborder=0>
                    </iframe>
                </div>
            </body>
        </html>
    `;
}
//# sourceMappingURL=extension.js.map