$(document).ready(function() {
    //object to hold all the Players Names, Images and Hints
    var players = new Array(5);
    players[0] = new Player("jackie bradley jr", "JackieB.jpg", "This 26-year-old Red Sox center fielder carried a .418 batting average over a streak of 28 hits in 2016");
    players[1] = new Player("michael saunders", "michaelSaunders.jpg", "This 29 year old Blue Jay was Drafted by the Seattle Mariners in the 11th round of the 2004 amateur draft.");
    players[2] = new Player("mike trout", "mikeTrout.jpg", "This 24 year L.A. Angels Outfielder is Signed thru 2020, 6 yrs/$144.5M");
    players[3] = new Player("carlos gonzalez", "carGo.jpg", "This three-time all-star was signed by the Diamondbacks at the age of 17, but did not make his MLB debut until 2008 with the Oakland Athletics.");
    players[4] = new Player("ryan braun", "ryanBraun.jpg", "This 32 year old Brewer is Signed thru 2020, 5 yrs/$105M");
    console.log("players Object = " , players);
    //players constructor Function
    function Player(name, image, hint) {
        this.name = name;
        this.image = image;
        this.hint = hint;
    }
    //initialize variables and arrays
    var regletters = /^[A-Za-z]+$/;
    var wordInPlay = null;
    var lettersOfTheWord = [];
    var matchedLetters = [];
    var guessedLetters = [];
    var namesToGuess = [];
    var guessesLeft = 0;
    var totalGuesses = 0;
    var letterGuessed = null;
    var wins = 0;
    var gameStarted = false;
    var outs = 0;
    var score = 0;

/**=====================
  *Initialize Game with random player and update the screen
========================*/
    function startGame() {
        var playerPicked = players[Math.floor(Math.random() * players.length)];//pick a rando player
        wordInPlay = playerPicked.name; //get the player name
        hint = playerPicked.hint;// get the hint for that player
        document.querySelector('#hints').innerHTML = hint;
        image = playerPicked.image;
        document.querySelector('#playerImage').innerHTML = '<img class="player-card" src="assets/images/'+image+'" alt="" />';
        console.log("hint=" + hint);
         // Display the hint to the panel
        lettersOfTheWord = wordInPlay.split('');//split the name up into individual letters
        rebuildWordView();//Displays unmatched letters as underscores
        processUpdateTotalGuesses();//Creates a total of guesses depending on length of name
        console.log("lettersOfTheWord = " + lettersOfTheWord);
    }

/**=====================
  *Initialize Game with random player and update the screen
========================*/
    function updatePage(letter) {
                updateGuesses(letter);
                updateMatchedLetters(letter);
                rebuildWordView();
                console.log("Update Page Function Called passing in = ", letter);
                // if (updateWins() === true) {
                //     restartGame();
                // }
    }
    function updateGuesses(letter) {
      if (guessesLeft === 0) {
          console.log("GuessesLeft = ", guessesLeft);
          console.log("Update Page Function Called passing in = ", letter);
          document.querySelector('#outs').innerHTML = "Strike Three! Your Outta There!!";
          outs++;
          startGame();
      } else if ((guessedLetters.indexOf(letter) === -1) && (lettersOfTheWord.indexOf(letter) == -1)) {
        guessedLetters.push(letter);
        guessesLeft--;
        document.querySelector('#guessesLeft').innerHTML = guessesLeft;
        document.querySelector('#wrongGuesses').innerHTML = guessedLetters.join(',');
      }

    }
    //--> This is the function that rebuilds the word blanks
    function rebuildWordView() {
        //set the view for the current word to blank
        var wordView = "";

        for (var i = 0; i < lettersOfTheWord.length; i++) {
            if (matchedLetters.indexOf(lettersOfTheWord[i]) != -1) {
                wordView += lettersOfTheWord[i];
            }else if(lettersOfTheWord[i] !== ' '){
                  wordView += '&nbsp;_&nbsp;';
            }else{
                  wordView += '&nbsp;&nbsp;';
            }
        }

        // console.log("wordView inside rebuild= " +   wordView);
        document.querySelector('#wordblanks').innerHTML = wordView;
    }
    //---> This counts and compare guesses
    function processUpdateTotalGuesses() {
        guessesLeft = 6;
        // -- Render the guesses Left
        document.querySelector('#guessesLeft').innerHTML = guessesLeft;
    }

/**=====================
  *Check the letter guessed, if it's in the word put that letter in matched letters array
========================*/
    function updateMatchedLetters(letter) {
      //loop through the letters of the Current players Name
        for (var i = 0; i < lettersOfTheWord.length; i++) {
            if ((letter === lettersOfTheWord[i]) && (matchedLetters.indexOf(letter) == -1)) {
                matchedLetters.push(letter);
            }
        }

    }

/**=====================
  *Empty all the values, Start the Game again update the screen
========================*/
    function restartGame() {
      wordsInPlay = null;
      matchedLetters = [];
      guessedLetters = [];
      guessesLeft = 0;
      totalGuesses = 0;
      lettersGuessed = null;
      wins = 0;
      startGame();
      rebuildWordView();
    }

/**=====================
  *Apply call to Start Button
========================*/
    $('#startGame').click(function() {
        startGame();
    });

/**=====================
  *Capture the users guess
========================*/
      document.onkeyup = function(event) {//fires whenever a key is pressed
        console.log("Some key was pressed = ", event.keyCode);
        if(event.keyCode >= 65 && event.keyCode <= 90){//Only fire when the key is a letter
          console.log("Letter key was Pressed = ", event.keyCode);
          letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();//grab the actual letter
          updatePage(letterGuessed);//
          console.log(letterGuessed);
        };
      };
});
