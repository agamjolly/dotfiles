"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Options_1 = require("../util/Options");
class StringHelpers {
    capitalizeFirstLetter(text) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
    getRandomNumber() {
        const options = new Options_1.Options().getOptions();
        return Math.floor(Math.random() * (options.signMax - options.signMin + 1)) + options.signMin;
    }
    getRandomDelimiter() {
        const options = new Options_1.Options().getOptions();
        return options.delimiters[Math.floor(Math.random() * options.delimiters.length)];
    }
    getRandomText(packArray) {
        return packArray[Math.floor(Math.random() * packArray.length)].trim();
    }
}
exports.StringHelpers = StringHelpers;
//# sourceMappingURL=StringHelpers.js.map