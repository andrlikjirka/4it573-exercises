function guessNumber(randomNumber, maxAttempts) {
    for (let i = 0; i < maxAttempts; i++) {
        let guess = parseInt(prompt('Jaké číslo si myslím?'));

        if (isNaN(guess)) {
            console.log('Zadej platné číslo!');
            continue;
        }
        if (guess === randomNumber) {
            alert(guess + ' je to číslo.');
            console.log('Gratulace! Uhádl jsi číslo ' + guess + ".");
            return;
        } else {
            alert(guess + ' není to číslo.\n' + 'Zkus hádat znovu!');
        }
    }
    console.log('Číslo jsi bohužel neuhádl.');
}

function main() {
    const MAX_ATTEMPTS = 5;

    let randomNumber = Math.floor((Math.random() * 10) + 1);
    console.log('Myslím si číslo.');
    
    guessNumber(randomNumber, MAX_ATTEMPTS);
}

main();