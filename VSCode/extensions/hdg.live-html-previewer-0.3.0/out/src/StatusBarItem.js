"use strict";
var vscode = require('vscode');
var Utilities_1 = require("./Utilities");
var Constants = require('./Constants');
var StatusBarItem = (function () {
    function StatusBarItem(utilities) {
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        this.statusBarItem.command = "extension.sidePreview";
        this.statusBarItem.tooltip = Constants.ExtensionConstants.STATUS_BAR_TOOLTIP;
        this.utilities = utilities && utilities || new Utilities_1.default();
    }
    StatusBarItem.prototype.updateStatusbar = function () {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            this.statusBarItem.hide();
            return;
        }
        // Only update status if an HTML file
        if (this.utilities.checkDocumentIsHTML(false)) {
            this.statusBarItem.text = Constants.ExtensionConstants.STATUS_BAR_TEXT;
            this.statusBarItem.show();
        }
        else {
            this.statusBarItem.hide();
        }
    };
    return StatusBarItem;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StatusBarItem;
//# sourceMappingURL=StatusBarItem.js.map