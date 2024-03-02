import fs from 'fs/promises'

let count;

try {
    const instructions = await fs.readFile('instrukce.txt');
    count = parseInt(instructions.toString());
    console.log(`Počet vytvářených souborů: ${count}`);
} catch (err) {
    console.error(err.message);
}

let promises = [];

for (let i = 0; i < count; i++) {
    promises.push(fs.writeFile(`${i}.txt`, `Soubor ${i}`));
}

try {
    await Promise.all(promises);
    console.log('Všechny soubory byly vytvořeny.');
} catch (err) {
    console.error(err.message);
}

/*
Promise.all(promises)
    .then(() => console.log('Všechny soubory byly vytvořeny.'))
    .catch((err) => console.error(err.message));
 */