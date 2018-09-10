var Hangman = function(){
  this.word;
  this.hangmanArray = ["     ___________","     |         |","     |         ","     |        ","     |         ","     |        ","     |","   -----"]
  this.guessedLetters = []
  this.wrongCount = 0;
  this.blankSpacesArray = []
  this.solutionString;
}

 Hangman.prototype.start = function(){
  this.reset();
  console.log("Welcome to the Hangman Console App!!!");
  this.word = wordList[Math.floor(Math.random()*40)]
  for (var i = 0; i < this.word.length; i++) {
    this.blankSpacesArray.push("__");
  }
  this.solutionString = this.blankSpacesArray.join("  ");
  this.renderGame();
};


Hangman.prototype.renderGame = function(){
  console.clear();
  console.log(this.word);
  console.log("Guessed Letters: " + this.guessedLetters.join(','))
  for (var i = 0; i < this.hangmanArray.length; i++) {
    console.log(this.hangmanArray[i])
  }
  console.log(this.solutionString);
  this.checkForWinLose();
};


Hangman.prototype.checkForWinLose = function(){
  if (this.wrongCount === 7) {
    alert("Sorry you lose!");
    this.replay();
  }else if(this.solutionString.indexOf('__') === -1){
    alert("WINNER!!!")
    this.replay();
  }else{
    this.guess();
  }
};


Hangman.prototype.replay = function(){
  if(confirm("Do you want to play again?")){
    location.reload(true)
    this.start();
    return true;
  }else{
    location.reload(true)
    return false;
  }
};


Hangman.prototype.reset = function(){
  this.word;
  this.hangmanArray = ["     ___________","     |         |","     |         ","     |        ","     |         ","     |        ","     |","   -----"]
  this.guessedLetters = []
  this.wrongCount = 0;
  this.blankSpacesArray = []
  this.solutionString;
}


Hangman.prototype.updateBlanks = function(indexArr,guessedLetter){
  for (var i = 0; i < indexArr.length; i++) {
    this.blankSpacesArray[indexArr[i]] = guessedLetter
  }
  this.solutionString = this.blankSpacesArray.join("  ")
  this.guessedLetters.push(guessedLetter)
  this.renderGame();
};


Hangman.prototype.updateMan = function(){
  switch(this.wrongCount){
    case 1: this.hangmanArray[2] = this.hangmanArray[2].concat("0");
      this.renderGame();
      break;
    case 2: this.hangmanArray[3] = this.hangmanArray[3].concat("\\");
      this.renderGame();
      break;
    case 3: this.hangmanArray[3] = this.hangmanArray[3].concat("|");
      this.renderGame();
      break;
    case 4: this.hangmanArray[3] = this.hangmanArray[3].concat("/");
      this.renderGame();
      break;
    case 5: this.hangmanArray[4] = this.hangmanArray[4].concat("|");
      this.renderGame()
      break;
    case 6: this.hangmanArray[5] = this.hangmanArray[5].concat("/");
      this.renderGame();
      break;
    case 7: this.hangmanArray[5] = this.hangmanArray[5].concat(" \\");
      this.renderGame();
      break;
    default:
      break;
  }
};


Hangman.prototype.findMatches = function(guessedLetter){
  var tempArr = [];
  for (var i = 0; i < this.word.length; i++) {
    if(this.word[i] === guessedLetter){
      tempArr.push(i)
    }
  }
  return tempArr
};


Hangman.prototype.guess = function(){
  var guessedLetter = prompt("Please guess a letter")
  if(guessedLetter === "exit" || guessedLetter === null){
    location.reload(true)
  }else{
    guessedLetter = guessedLetter.toLowerCase().trim();
  }

  if(this.guessedLetters.indexOf(guessedLetter) > -1){
    alert("You already guessed this letter.")
    this.guess();
  }else if(this.word.indexOf(guessedLetter) > -1 && guessedLetter.length === 1){
    this.updateBlanks(this.findMatches(guessedLetter),guessedLetter)
  }else if(this.word.indexOf(guessedLetter) === -1 && guessedLetter.length === 1){
    this.guessedLetters.push(guessedLetter)
    this.wrongCount++;
    this.updateMan();
  }else{
    alert("Please give a valid input.")
    this.guess();
  }
};

document.addEventListener("DOMContentLoaded", function(event) {
    window.gHangman = new Hangman();
});
