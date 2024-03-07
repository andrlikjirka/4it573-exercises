# Domácí úkol č. 4

## Zadání:

Vytvořte server, který budou reagovat na tři různé požadavky z prohlížeče. /increase, /decrease a /read (celý URL v
prohlížeči bude tedy například http://localhost:3000/increase). Při zavolání přes cestu /increase a /decrease bude
server zvyšovat/snižovat o jedničku číslo, které bude mít uložené v souboru counter.txt (pokud soubor neexistuje, tak ho
server založí s úvodním číslem 0). U těchto dvou cest může server vrátit libovolnou odpověď (například text OK). Při
zavolání serveru přes cestu /read vratí server prohlížeči číslo uložené v souboru counter.txt.

Možnost získání bonusového bodu:

Implementujte server tak, aby se vám neopakoval společný kód pro /increase /decrease (kontrola zda soubor existuje,
načtení čísla ze souboru, vrácení odpovědi prohlížeči, ...). Můžete jednotlivé kroky například rozdělit do funkcí, které
následně budete přepoužívat, nebo můžete vytvořit jednu generickou/higher order funkci, která bude přijímat vstupní
parametr rozhodující, zda se má číslo o jedničku zvětšit/zmenšit.