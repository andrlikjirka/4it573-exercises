import fs from 'fs'
fs.readFile('instrukce.txt', (err, data) => {
    if (err) {
        console.error(err.message);
    } else {
        // instrukce načteny, získat source a target soubory
        const [source, target] = data.toString().split(' ');

        fs.readFile(source, (err, data) => {
           if (err) {
               console.error(err.message);
           } else {
               // načtena vstupní data
               fs.writeFile(target, data.toString(), (err) => {
                   if (err) {
                       console.error(err.message);
                   } else {
                       console.log('Text ' + '\"' + data.toString() + '\"' + ' byl zkopírován z ' + source + " do " + target + ".");
                   }
               });
           }
        });
    }
})



