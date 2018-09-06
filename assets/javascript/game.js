//Javascript Document 

//declare and initialize arrays 
var computerChoices = ("abcdefghijklmnopqrstuvwxyz").split("");
var words = ["pheobe","jerry","carlton","michelle","urkel","topanga","grace","kelly","tia","fez"];
var lives = 10;
var winCounter = 0; 
var loseCounter = 0; 
var messages = { 
    win: 'You are a 90s champion!',
    lose: 'You lose. Game Over',
    guessed: 'Enter a letter from A-Z',
}
var isLetter = false; 
var alreadyGuessed = false; 
var lettersGuessed = [];
var guesses = 0; 
var currentWord; 
var unknownWord = [];
var correctLetter = false; 
var winnerWon = true; 
var wordInt; 
//music choices 
var dir = "music"; 
var playlist = ["pheobe", "jerry","carlton","michelle","urkel","topanga","grace","kelly","tia","fez"]; 
var ext = '.mp3'; 
var audio = new Audio(); 


//Create a function to display the letters to be guessed

function newGaem () {
    wordInt = Math.floor((Math.random() * words.length)); 
    currentWord = words[wordInt];
    console.log(currentWord);

    if (unknownWord.length !== currentWord.length) ;{
        unknownWord = []
    }

    //Create spaces for letters 
    for (var i = 0; i < currentWord.length; i++){
        if (currentWord[i] === " ") {
            unknownWord[i] = " ";
        } else {
            unknownWord[i] = (" _ ");
        }
    }

    $('#unknownWord').html(unknownWord);
}

//Keyboard Inputs 
document.onkeyup = function(event) {
    var playerGuess = String.fromCharCode(event.keyCode.).toUpperCase();
    var enter = (event.keyCode);

    audio.pause();
    //Press Enter to Play 
    if (enter == 13) {
        newGame();
    }

    //Check to see if the letter guessed is correct  
    for (var i = 0; < computerChoices.length; i++) {
        if (playerGuess === computerChoices.charAt(i)) {
            isLetter = true; 
        }
    }

    if (isLetter == false && enter !=13) { 
        $('#messages').html(messages.validLetter);
    }

    //If letter guessed, messaged: guessed 
    for (var i = 0; i < lettersGuessed.length; i++) {
        if (playerGuess === lettersGuessed[i]) { 
            alreadyGuessed = true; 
        }
    }

    //If already in the clue, then returns alert saying guessed already 
    for (var i = 0; i < unknownWord.length; i++) {
        if (playerGuess == unknownWord[i]) {
            alreadyGuessed = true; 
        }
    }

    if (alreadyGuessed == true) {
        $('#messages').html(messages.guessed); 
    }

    //Correct Letter match and letter display loop 
    for (var i = 0; i < currentWord.length; i++) {
        if(currentWord[i] === playerGuess) { 
            unknownWord[i] = currentWord[i];
            correctLetter = true; 
        }
    }

    //Lists letters and takes away a life if incorrect 
    if(isLetter == true && alreadyGuessed == false && correctLetter == false) { 
        lettersGuessed.push(playerGuess); 
        lives--; 
        $('#lives').html(lives); 
    }

    $('#lettersGuessed').html(lettersGuessed); 
    $('#hiddenWord').html(this.hiddenWord); 

    //Lives are all out, player loses and a new game starts 
    if (lettersGuessed).length == 10) { 
        $('#messages').html(messages.lose); 
        lettersGuessed []; 
        $('#lettersGuessed').html(lettersGuessed); 
        loseCounter++; 
        $('#loseCounter').html(loseCounter); 
        lives = 10; 
        newGame();
    }

    //Resets 
    correctLetter = false; 
    isLetter = false; 
    alreadyGuessed = false; 

    //Asks if player has won 
    if (enter != 10) { 
        win(); 
    }
}

function win () { 

    for (var i = 0; i < currentWord.length; i++) { 
        if (unknownWord[i] == " _ "){
            winnerWon = false; 
        }
    }

    if (winnerWon == true) { 
        $('#messages').html(messages.win); 

        //plays music to go along with each corresponding word 
        for (var i = 0; i < playlist.length; i++) { 
            if (wordInt === i) { 
                audio.src = dir + playlist[i] + ext; 
                audio.play(); 
            }
        }

        winCounter++; 
        $('winCounter').html(winCounter); 
        lettersGuessed = []; 
        $('#lettersGuessed').html(lettersGuessed); 
        lives = 10; 

        newGame(); 
    }

    winnerWon = true; 
}

 window.onload = function()
{ 
    setup(); 
    $("submit").onclick = submit; 
}