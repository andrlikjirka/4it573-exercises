import fs from 'fs'

const readSourceText = (source, target, writeTargetText) => {
    fs.readFile(source, (err, data) => {
        if (err) {
            console.error(err.message);
        } else {
            // načtena vstupní data
            writeTargetText(data, target);
        }
    });
}
const writeTargetText = (data, target) => {
    fs.writeFile(target, data.toString(), (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Text ' + '\"' + data.toString() + '\"' + ' byl zkopírován do souboru ' + target + '.');
        }
    });
};
function readInstructions (readSourceText, writeTargetText) {
    fs.readFile('instrukce.txt', (err,data) => {
        if (err) {
            console.error(err.message);
        } else {
            const [source, target] = data.toString().split(' ');
            readSourceText(source, target, writeTargetText);
        }
    });
}

readInstructions(readSourceText, writeTargetText);