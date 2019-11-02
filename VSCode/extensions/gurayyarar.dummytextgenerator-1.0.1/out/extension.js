"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const VocabularyHelpers_1 = require("./helpers/VocabularyHelpers");
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.startExtension', () => {
        vscode.window.showInputBox({ placeHolder: "... words", value: "20", prompt: "Type how many words you want to insert" }).then((words) => {
            if (words !== undefined && words !== "") {
                const wordCount = parseInt(words);
                if (isNaN(wordCount)) {
                    vscode.window.showErrorMessage("Please type a number value!");
                }
                else {
                    vscode.window.showQuickPick(new VocabularyHelpers_1.VocabularyHelpers().getAllVocabularies()).then((val) => {
                        const generatedText = new VocabularyHelpers_1.VocabularyHelpers().getDummyText(wordCount, val.pack);
                        const editor = vscode.window.activeTextEditor;
                        if (editor) {
                            editor.edit(p => p.insert(editor.selection.active, generatedText));
                        }
                    });
                }
            }
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map