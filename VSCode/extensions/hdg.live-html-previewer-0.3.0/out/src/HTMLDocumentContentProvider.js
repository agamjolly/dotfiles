"use strict";
var vscode = require('vscode');
var path = require("path");
var Constants = require('./Constants');
/**ss
 * HTMLDocumentContentProvider
 */
var HTMLDocumentContentProvider = (function () {
    function HTMLDocumentContentProvider() {
        this._onDidChange = new vscode.EventEmitter();
        this._textEditor = vscode.window.activeTextEditor;
    }
    HTMLDocumentContentProvider.prototype.provideTextDocumentContent = function (uri) {
        return this.generateHTML();
    };
    ;
    HTMLDocumentContentProvider.prototype.generateHTML = function () {
        var plainText = this._textEditor.document.getText();
        var html = this.fixLinks(plainText);
        var htmlWithStyle = this.addStyles(html);
        return htmlWithStyle;
    };
    // Thanks to Thomas Haakon Townsend for coming up with this regex
    HTMLDocumentContentProvider.prototype.fixLinks = function (html) {
        var documentFileName = this._textEditor.document.fileName;
        return html.replace(new RegExp("((?:src|href)=[\'\"])((?!http|\\/).*?)([\'\"])", "gmi"), function (subString, p1, p2, p3) {
            return [
                p1,
                vscode.Uri.file(path.join(path.dirname(documentFileName), p2)),
                p3
            ].join("");
        });
    };
    HTMLDocumentContentProvider.prototype.update = function (uri) {
        this._onDidChange.fire(uri);
    };
    // Add styles to the current HTML so that it is displayed corectly in VS Code
    HTMLDocumentContentProvider.prototype.addStyles = function (html) {
        var extensionPath = vscode.extensions.getExtension(Constants.ExtensionConstants.EXTENSION_ID).extensionPath;
        var style_path = vscode.Uri.file(extensionPath + "/" + Constants.ExtensionConstants.CUSTOM_CSS_PATH);
        var styles = "<link href=\"" + style_path + "\" rel=\"stylesheet\" />";
        return html + styles;
    };
    Object.defineProperty(HTMLDocumentContentProvider.prototype, "onDidChange", {
        get: function () {
            return this._onDidChange.event;
        },
        enumerable: true,
        configurable: true
    });
    return HTMLDocumentContentProvider;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HTMLDocumentContentProvider;
//# sourceMappingURL=HTMLDocumentContentProvider.js.map