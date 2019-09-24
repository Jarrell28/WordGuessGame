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
    words: ['mia', 'jarrell', 'asami'],
    currentWord: "",
    init: function () {
        this.reset();
        var random = Math.floor(Math.random() * this.words.length);
        this.currentWord = this.words[random];

        for (var i = 0; i < this.currentWord.length; i++) {
            var span = document.createElement("span");
            span.classList.add("letter");
            span.setAttribute("data-letter", this.currentWord[i]);
            span.innerHTML = "_ ";
            wordElement.appendChild(span);
        }
    },

    reset: function () {
        this.numOfGuesses = 12;
        this.guessed = [];
        this.guessedIncorrect = [];
        this.guessedCorrect = [];
        guessesElement.innerHTML = this.numOfGuesses;
        guessedElement.innerHTML = "";
        wordElement.innerHTML = "";
    },

    checkLetter: function (letter) {
        if (!this.guessedIncorrect.includes(letter) && !this.guessedCorrect.includes(letter)) {
            if (this.currentWord.includes(letter)) {
                if (!this.guessedCorrect.includes(letter)) {
                    this.guessedCorrect.push(letter);
                }
                var splitCurrentWord = this.currentWord.split("");
                for (var i = splitCurrentWord.length; i >= 0; i--) {
                    if (splitCurrentWord[i] === letter) {
                        splitCurrentWord.splice(i, 1);
                    }
                }

                this.currentWord = splitCurrentWord.join("");
                return true;
            } else {
                this.guessedIncorrect.push(letter);
                guessedElement.innerHTML = this.guessedIncorrect.join(",");
                this.numOfGuesses--;
                guessesElement.innerHTML = this.numOfGuesses;
                return false;
            }
        }

        return false;

    },

    checkWin: function (letter) {
        if (this.currentWord.length == 0) {
            this.wins++;
            winsElement.innerHTML = this.wins;
            gameObj.init();
        }
    }
}

//Events
window.onload = function () {
    gameObj.init();
}

document.onkeyup = function (event) {
    if (gameObj.checkLetter(event.key)) {
        var key = document.querySelectorAll('[data-letter="' + event.key + '"]');
        for (var i = 0; i < key.length; i++) {
            key[i].innerHTML = event.key + " ";
        }

    }
    gameObj.checkWin();
}