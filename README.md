# Domácí úkol č.3.

## Zadání:

Pomoci modulu "fs/promises" a async await napište následující program: Program nejprve přečte obsah souboru "
instrukce.txt", ve kterém bude číslo (například 10). Následně program vytvoří n souborů (kde n se rovná číslu ze souboru
instrukce.txt) s názvy 0.txt, 1.txt, 2.txt až n.txt a obsahem "Soubor 0", "Soubor 1", "Soubor 2" až "Soubor n". Poté co
budou všechny soubory úspěšně vytvořeny, vypíše program informativní hlášku do konzole a skončí. Základní program za 2
body bude může být sériový. Pokročilejší program za 3 body musí využít paralelizaci pomocí Promise.all.