//HTML Selectors
var wordElement = document.getElementById("word");
var winsElement = document.getElementById("wins");
var guessesElement = document.getElementById("guesses");
var guessedElement = document.getElementById("guessed");
var gameResults = document.getElementById("game-results");
var playBtn = document.getElementById("play-btn");
var startText = document.getElementById("start-text");
var displayImage = document.getElementById("display-image");


//Game Object
var gameObj = {
    wins: 0,
    numOfGuesses: 12,
    guessedCorrect: [],
    guessedIncorrect: [],
    words: ['baseball', 'basketball', 'football', 'soccer', 'tennis', 'skiing', 'track', 'bowling', 'biking', 'boxing', 'cycling', 'swimming', 'hockey', 'gaming', 'lacrosse'],
    currentWord: "",
    displayWord: "",
    image: "",
    playing: true,
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
        gameResults.innerHTML = "";
        this.playing = true;
        playBtn.style.visibility = "hidden";
        startText.style.visibility = "visible";
        this.image = "";
        displayImage.src = "";
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
            gameResults.innerHTML = "You won! The word was " + this.displayWord;
            this.playing = false;
            playBtn.style.visibility = "visible";
            this.displayImage(this.displayWord);
            displayImage.src = this.image;
        }
    },

    checkLoss: function () {
        //If number of guesses reaches 0, the player has loss
        //Alerts player loss and resets game
        if (this.numOfGuesses == 0) {
            gameResults.innerHTML = "You Lost! The word was " + this.displayWord;
            this.playing = false;
            playBtn.style.visibility = "visible";
            this.displayImage(this.displayWord);
            displayImage.src = this.image;
        }
    },

    displayImage: function (word) {

        switch (word) {
            case 'basketball':
                this.image = "https://www.coastmountainnews.com/wp-content/uploads/2019/05/17072610_web1_raptors-pacers.jpg";
                break;
            case 'baseball':
                this.image = "http://www.jwj.org/wp-content/uploads/2018/03/baseball-2410657_960_720.jpg";
                break;
            case 'football':
                this.image = "https://static.clubs.nfl.com/image/private/t_editorial_landscape_8_desktop_mobile/f_auto/giants/gsgsnwpipmodx1qkshfk.jpg";
                break;
            case 'soccer':
                this.image = "https://ca-times.brightspotcdn.com/dims4/default/16bfc49/2147483647/strip/true/crop/2048x1475+0+0/resize/840x605!/quality/90/?url=https%3A%2F%2Fca-times.brightspotcdn.com%2Fc1%2F6c%2F376643999f17bb01f681898356cf%2Fla-1561396589-nnre6r6ynu-snap-image";
                break;
            case 'tennis':
                this.image = "https://www.economist.com/sites/default/files/20180825_BLP501_0.jpg";
                break;
            case 'skiing':
                this.image = "https://www.outsideonline.com/sites/default/files/styles/img_600x600/public/2018/11/13/skiier-and-dog_s.jpg?itok=q1XEUS_i";
                break;
            case 'track':
                this.image = "http://d21gd0ap5v1ndt.cloudfront.net/web01/img.php?src=/images/2018-19/wtf052419.jpg&site=pointp&width=1140&height=641&crop";
                break;
            case 'bowling':
                this.image = "https://i.ytimg.com/vi/CACAmH4r1fw/maxresdefault.jpg";
                break;
            case 'biking':
                this.image = "https://3v718laqyo244ii5v20dg6ff-wpengine.netdna-ssl.com/wp-content/uploads/2017/10/Essential-Mountain-Biking-Tips-for-Beginners-752x472.jpg";
                break;
            case 'boxing':
                this.image = "https://i.ytimg.com/vi/S9qGpS6IHuQ/maxresdefault.jpg";
                break;
            case 'cycling':
                this.image = "https://cdn.road.cc/sites/default/files/styles/main_width/public/one-pro-cycling-2018-ovo-energy-tour-britain-picture-credit-alex-whitehead-swpix.com.jpg?itok=3dkm2s45";
                break;
            case 'swimming':
                this.image = "https://cdn.swimswam.com/wp-content/uploads/2017/01/16x9_8.jpg";
                break;
            case 'hockey':
                this.image = "https://media2.s-nbcnews.com/j/newscms/2019_23/2886121/190606-bruins-blues-al-1116_f47c35ef52f511c624125b7544d71b42.fit-760w.jpg";
                break;
            case 'gaming':
                this.image = "https://i.gadgets360cdn.com/large/gaming_afp_full_1569305003511.jpg";
                break;
            case 'lacrosse':
                this.image = "https://www.morningside.edu/assets/caches/images/assets/uploads/general/paul-rabil-usa-700x375.jpg";
                break;
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

    //If playing is true, game is in progress, execute code
    if (gameObj.playing) {

        //Checks if letter typed is in alphabet
        if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)) {
            startText.style.visibility = "hidden";

            //if letter was correct selects all html elements with data-letter attribute value that matches the letter typed
            //then adds the letter typed to the html selected
            if (gameObj.checkLetter(event.key.toLowerCase())) {
                var key = document.querySelectorAll('[data-letter="' + event.key + '"]');
                for (var i = 0; i < key.length; i++) {
                    key[i].innerHTML = event.key + " ";
                }

            }
            gameObj.checkWin();
            gameObj.checkLoss();
        }
    }

}

//Starts the game when click play again button
playBtn.onclick = function () {
    gameObj.init();
}