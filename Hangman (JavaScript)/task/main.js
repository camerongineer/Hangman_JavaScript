const input = require('sync-input');
const programLanguages = ['python', 'java', 'swift', 'javascript'];

function menu(wordList) {
    let wins = 0;
    let loses = 0;
    while (true) {
        const menuOption = input('Type "play" to play the game, ' +
            '"results" to show the scoreboard, and "exit" to quit: ')
        if (menuOption === 'play') {
            const gameWon = play(wordList);
            if (gameWon) {
                wins++;
            } else {
                loses++;
            }
        } else if (menuOption === 'results') {
            printResults(wins, loses);
        } else if (menuOption === 'exit') {
            return;
        } else {
            console.log('Invalid Option');
        }
    }
}

function printResults(wins, loses) {
    console.log(`You won: ${wins} times.\nYou lost: ${loses} times.`)
}

function play(wordList) {
    const correctWord = getRandomWord(wordList);
    const guesses = new Set();
    let attempts = 8;
    let gameWon;

    while (attempts > 0) {
        gameWon = checkGameWon(correctWord, guesses);
        if (gameWon) {
            break;
        }
        console.log(`\n${displayWord(correctWord, guesses, gameWon)}`)
        const guess = input(`Input a letter: `);
        if (isValidGuess(guess)) {
            if (Array.from(guesses).some((value) => value === guess)) {
                console.log("You've already guessed this letter.");
                continue;
            } else if (!(Array.from(correctWord).some((value) => value === guess))) {
                console.log("That letter doesn't appear in the word.");
                attempts--;
            }
            guesses.add(guess);
        } else {
            if (guess.length !== 1) {
                console.log('Please, input a single letter.')
            } else {
                console.log("Please, enter a lowercase letter from the English alphabet.")
            }
        }
    }

    if (gameWon) {
        console.log(`You guessed the word ${displayWord(correctWord, guesses, gameWon)}!\nYou survived!`)
    } else {
        console.log('\nYou lost!');
    }
    return gameWon;
}

function getRandomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

function isValidGuess(guess) {
    return /^[a-z]$/.test(guess);
}

function displayWord(word, guesses, isGameOver) {
    if (!isGameOver) {
        const displayedWord = Array.from(word);
        for (let i in displayedWord) {
            if (!(Array.from(guesses).some((value) => value === displayedWord[i]))) {
                displayedWord[i] = '-'
            }
        }
        return displayedWord.join('');
    }
    return word;
}

function checkGameWon(word, guesses) {
    return Array.from(word).every((value) => Array.from(guesses).includes(value));
}

console.log(`H A N G M A N`);
menu(programLanguages);