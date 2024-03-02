import fs from 'fs/promises'

let count;

try {
    const instructions = await fs.readFile('instrukce.txt');
    count = parseInt(instructions.toString());
    console.log(`Počet vytvářených souborů: ${instructions.toString()}`);
} catch (err) {
    console.error(err.message);
}

for (let i = 0; i < count; i++) {
    let path = `${i}.txt`;
    let data = `Soubor ${i}`;
    await fs.writeFile(path, data);
}

console.log('Všechny soubory byly vytvořeny.')