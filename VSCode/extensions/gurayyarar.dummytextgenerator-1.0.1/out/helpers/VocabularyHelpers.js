"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Options_1 = require("../util/Options");
const StringHelpers_1 = require("./StringHelpers");
const VocabularyWords_1 = require("./VocabularyWords");
class VocabularyHelpers {
    getAllVocabularies() {
        let vocabularies = [];
        vocabularies.push({ label: "Lorem Ipsum", description: "(Lipsum) (of course)", pack: "lorem_ipsum" });
        vocabularies.push({ label: "Childe Harold's Pilgrimage", description: "(Lord Byron)", pack: "child_harold" });
        vocabularies.push({ label: "Decameron - Novella Prima", description: "(Giovanni Boccaccio)", pack: "decameron" });
        vocabularies.push({ label: "Faust", description: "(Goethe), German", pack: "faust" });
        vocabularies.push({ label: "In der Fremde", description: "(Heinrich Heine), German", pack: "in_der_fremde" });
        vocabularies.push({ label: "Le Bateau Ivre", description: "(Arthur Rimbaud), French", pack: "le_bateau_ivre" });
        vocabularies.push({ label: "Le Masque", description: "(Charles Baudelaire), French", pack: "le_masque" });
        vocabularies.push({ label: "Nagyon fáj", description: "(József Attila), Hungarian", pack: "nagyon_faj" });
        vocabularies.push({ label: "Ómagyar-Mária siralom", description: "(Ismeretlen), Hungarian", pack: "omagyar" });
        vocabularies.push({ label: "Robinsono Kruso", description: "(Daniel Defoe), Esperanto", pack: "robinsono_kruso" });
        vocabularies.push({ label: "The Raven", description: "(Edward Allen Poe), English", pack: "the_raven" });
        vocabularies.push({ label: "Tierra y Luna", description: "(Federico García Lorca), Spanish", pack: "tierra_y_luna" });
        return vocabularies;
    }
    getDummyText(wordCount, pack) {
        const options = new Options_1.Options().getOptions();
        const wordPackArray = VocabularyWords_1.VocabularyWords[pack].split(' ');
        let randomIndex = [];
        let randomDelimiters = [];
        let resultStr = "";
        let randomNumber = new StringHelpers_1.StringHelpers().getRandomNumber();
        let lastDelimiter = "";
        randomIndex.push(randomNumber);
        randomDelimiters.push(new StringHelpers_1.StringHelpers().getRandomDelimiter());
        for (let i = 0; i < Math.ceil(wordCount / options.signMin); i++) {
            randomNumber += new StringHelpers_1.StringHelpers().getRandomNumber();
            const delimiter = new StringHelpers_1.StringHelpers().getRandomDelimiter();
            randomIndex.push(randomNumber);
            randomDelimiters.push(delimiter);
        }
        for (let i = 0; i < wordCount; i++) {
            let word = new StringHelpers_1.StringHelpers().getRandomText(wordPackArray);
            if (i === 0) {
                word = new StringHelpers_1.StringHelpers().capitalizeFirstLetter(word);
            }
            if (lastDelimiter === ".") {
                resultStr += ` ${new StringHelpers_1.StringHelpers().capitalizeFirstLetter(word)}`;
                lastDelimiter = "";
            }
            else {
                resultStr += ` ${word}`;
            }
            const indexOf = randomIndex.indexOf(i);
            if (indexOf > -1) {
                resultStr += randomDelimiters[indexOf];
                lastDelimiter = randomDelimiters[indexOf];
            }
        }
        resultStr += ".";
        return resultStr.substr(1);
    }
}
exports.VocabularyHelpers = VocabularyHelpers;
//# sourceMappingURL=VocabularyHelpers.js.map