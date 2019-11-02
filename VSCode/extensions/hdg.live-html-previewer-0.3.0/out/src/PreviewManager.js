'use strict';
var vscode = require('vscode');
var HTMLDocumentContentProvider_1 = require('./HTMLDocumentContentProvider');
var Utilities_1 = require('./Utilities');
var Constants = require('./Constants');
// This class initializes the previewmanager based on extension type and manages all the subscriptions
var PreviewManager = (function () {
    function PreviewManager(utilities, htmlDocumentContentProvider) {
        this.utilities = utilities && utilities || new Utilities_1.default();
        this.htmlDocumentContentProvider = htmlDocumentContentProvider && htmlDocumentContentProvider || new HTMLDocumentContentProvider_1.default();
        this.htmlDocumentContentProvider.generateHTML();
        // subscribe to selection change event
        var subscriptions = [];
        vscode.window.onDidChangeTextEditorSelection(this.onEvent, this, subscriptions);
        this.disposable = (_a = vscode.Disposable).from.apply(_a, subscriptions);
        var _a;
    }
    PreviewManager.prototype.dispose = function () {
        this.disposable.dispose();
    };
    PreviewManager.prototype.onEvent = function () {
        this.htmlDocumentContentProvider.update(vscode.Uri.parse(Constants.ExtensionConstants.PREVIEW_URI));
        // this.updatePreviewStatus();
        // console.log(Constants.SessionVariables.IS_PREVIEW_BEING_SHOWN);
    };
    return PreviewManager;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PreviewManager;
//# sourceMappingURL=PreviewManager.js.map