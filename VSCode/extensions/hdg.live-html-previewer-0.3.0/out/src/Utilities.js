"use strict";
var vscode = require('vscode');
var PreviewManager_1 = require('./PreviewManager');
var Constants = require('./Constants');
var Utilities = (function () {
    //returns true if an html document is open
    function Utilities() {
    }
    ;
    Utilities.prototype.checkDocumentIsHTML = function (showWarning) {
        var result = vscode.window.activeTextEditor.document.languageId.toLowerCase() === "html";
        if (!result && showWarning) {
            vscode.window.showInformationMessage(Constants.ErrorMessages.NO_HTML);
        }
        return result;
    };
    Utilities.prototype.init = function (viewColumn, context, previewUri) {
        var proceed = this.checkDocumentIsHTML(true);
        if (proceed) {
            var previewManager = new PreviewManager_1.default();
            var registration = vscode.workspace.registerTextDocumentContentProvider('HTMLPreview', previewManager.htmlDocumentContentProvider);
            return vscode.commands.executeCommand('vscode.previewHtml', previewUri, viewColumn).then(function (success) {
            });
        }
    };
    return Utilities;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Utilities;
//# sourceMappingURL=Utilities.js.map