import fs from 'fs'

const INSTRUCTIONS_FILE = 'instrukce.txt'

const readSourceText = (source, target, writeTargetText) => {
    fs.readFile(source, (err, data) => {
        if (err) {
            console.error(err.message);
        } else {
            writeTargetText(data, target);
        }
    });
}

const writeTargetText = (data, target) => {
    fs.writeFile(target, data.toString(), (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log(`Text \"${data}\" byl zkopírován do souboru ${target}.`);
        }
    });
};

function readInstructions (instructionsFile, readSourceText, writeTargetText) {
    fs.readFile(instructionsFile, (err,data) => {
        if (err) {
            console.error(err.message);
        } else {
            const [source, target] = data.toString().split(' ');
            readSourceText(source, target, writeTargetText);
        }
    });
}

readInstructions(INSTRUCTIONS_FILE, readSourceText, writeTargetText);