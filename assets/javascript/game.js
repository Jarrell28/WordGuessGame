//HTML Selectors
var wordElement = document.getElementById("word");
var winsElement = document.getElementById("wins");
var guessesElement = document.getElementById("guesses");
var guessedElement = document.getElementById("guessed");


//Game Object
var gameObj = {
    wins: 0,
    numOfGuesses: 12,
    guessedCorrect: [],
    guessedIncorrect: [],
    words: ['baseball', 'basketball', 'football', 'soccer', 'tennis', 'skiing', 'track', 'bowling', 'biking', 'boxing', 'cycling', 'swimming', 'hockey', 'gaming', 'lacrosse'],
    currentWord: "",
    displayWord: "",
    init: function () {
        //calls reset at beginning of game
        this.reset();
        //Selects a random letter and assigns it to currentWord and displayWord
        var random = Math.floor(Math.random() * this.words.length);
        this.currentWord = this.words[random];
        this.displayWord = this.currentWord;

        //Loops through currentWord variable and creates span elements for each letter, then displays it in HTML
        for (var i = 0; i < this.currentWord.length; i++) {
            var span = document.createElement("span");
            span.classList.add("letter");
            span.setAttribute("data-letter", this.currentWord[i]);
            span.innerHTML = "_ ";
            wordElement.appendChild(span);
        }
    },

    //Resets the game variables back to default
    reset: function () {
        this.numOfGuesses = 12;
        this.guessedIncorrect = [];
        this.guessedCorrect = [];
        guessesElement.innerHTML = this.numOfGuesses;
        guessedElement.innerHTML = "";
        wordElement.innerHTML = "";
    },

    //Checks if letter is correct
    checkLetter: function (letter) {
        //Checks if the letter was already typed. Skips code below to prevent duplicate selections
        if (!this.guessedIncorrect.includes(letter) && !this.guessedCorrect.includes(letter)) {
            //If the letter typed is correct executes the code below
            if (this.currentWord.includes(letter)) {
                //If the correct letter has not been typed yet, it pushes the letter to the guessedCorrect array
                //Prevents num of guesses from minusing when pressing same correct letter
                if (!this.guessedCorrect.includes(letter)) {
                    this.guessedCorrect.push(letter);
                }

                //Converts currentWord into an array and loops over the array, then removes the correct letter typed
                //Continuously removes correct letter from currentWord variable to later check for a win when it reaches 0
                var splitCurrentWord = this.currentWord.split("");
                for (var i = splitCurrentWord.length; i >= 0; i--) {
                    if (splitCurrentWord[i] === letter) {
                        splitCurrentWord.splice(i, 1);
                    }
                }

                //Converts currentWord back into a string
                this.currentWord = splitCurrentWord.join("");
                return true;
            } else {
                //If letter guessed was incorrect, pushes letter to guessedIncorrect array and subtracts num of guesses left by 1
                this.guessedIncorrect.push(letter);
                //Updates the HTML Element of incorrect letters pressed by displaying the guessedIncorrect array values
                guessedElement.innerHTML = this.guessedIncorrect.join(",");
                this.numOfGuesses--;
                //Updates the number of guesses HTML Element
                guessesElement.innerHTML = this.numOfGuesses;
                return false;
            }
        }

        return false;

    },

    checkWin: function () {
        //If the currentWord variable reaches 0, the player has guessed all the letters and won
        //Adds win by 1, alerts win message and resets game
        if (this.currentWord.length == 0) {
            this.wins++;
            winsElement.innerHTML = this.wins;
            alert("You guessed right! The word was " + this.displayWord);
            gameObj.init();
        }
    },

    checkLoss: function () {
        //If number of guesses reaches 0, the player has loss
        //Alerts player loss and resets game
        if (this.numOfGuesses == 0) {
            alert("You Lost! Ran out of guesses!");
            gameObj.init();
        }
    }
}

//Events

//Initiates game on window load
window.onload = function () {
    gameObj.init();
}

//When user presses button checks win/loss
document.onkeyup = function (event) {
    //if letter was correct selects all html elements with data-letter attribute value that matches the letter typed
    //then adds the letter typed to the html selected
    if (gameObj.checkLetter(event.key)) {
        var key = document.querySelectorAll('[data-letter="' + event.key + '"]');
        for (var i = 0; i < key.length; i++) {
            key[i].innerHTML = event.key + " ";
        }

    }
    gameObj.checkWin();
    gameObj.checkLoss();
}