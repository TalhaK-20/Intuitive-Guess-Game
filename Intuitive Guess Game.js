const fs = require('fs');
const prompt = require("prompt-sync")({ sigint: true });

function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function playGame(playerName, minRange, maxRange){

  const key = getRandomNumber(minRange, maxRange);

  let attempt = 1;
  let chances = 5;

  while(chances > 0){
    const input = parseInt(prompt(`Dear ${playerName}, please enter your guess between ${minRange} and ${maxRange} = `));

    if(input === key){
      console.log(`Congratulations, ${playerName}! You have WON the game at attempt ${attempt}`);
      saveScore(playerName, attempt);
      break;
    } 

    else{
      chances--;
      attempt++;
      
      if(chances === 0){
        console.log(`You have LOSE the game, ${playerName}. You were unable to guess the number. The correct number was ${key}.`);
        saveScore(playerName, 0);
      } 
      
      else{
        console.log("\nOOPS! Incorrect Guess :(");
        console.log(`No worries ${playerName} ! Still you have ${chances} chances remaining....`);
      }
    }
  }

  promptPlayAgain();

}


function promptPlayAgain(){
  const answer = prompt("Do you want to play again? (Y/N) = ").toUpperCase();
  
  if(answer === 'Y'){
    Guess_Game();
  } 
  
  else{
    console.log("Thank you so much for playing the game. Have a lovely day :)");
  }

}

 
function saveScore(playerName, score){
  const currentTime = new Date().toLocaleString();
  const scoreData = {
    playerName,
    timeToPlay: currentTime,
    score
  };

  let historyData = [];
  
  try{
    const existingData = fs.readFileSync('Game History.json', 'utf8');
    historyData = JSON.parse(existingData);
  } 
  
  catch(err){
  }

   historyData.push(scoreData);

   fs.writeFileSync('Game History.json', JSON.stringify(historyData, null, 2), 'utf8');
}


function selectDifficulty(){
  console.log("\nSelect Difficulty Level:");
  console.log("1. Easy (Range: 1 - 50)");
  console.log("2. Medium (Range: 1 - 100)");
  console.log("3. Hard (Range: 1 - 200)");

  const choice = parseInt(prompt("Enter the number corresponding to your choice = "));
  
  switch(choice){
    case 1:
      return [1, 50];
   
    case 2:
      return [1, 100];
    
    case 3:
      return [1, 200];
    
    default:
      console.log("Invalid choice, selecting Medium difficulty by default.");
      return [1, 100];
    }
}


function Guess_Game(){
  console.log("     Welcome to the Number Guessing Game");
  console.log("        Developed by Talha Khalid\n");
  console.log("Rule ---> You only have 5 chances to guess the correct number");

  let playerName = prompt("Enter your beautifull name please = ");

  const [minRange, maxRange] = selectDifficulty();
  playGame(playerName, minRange, maxRange);

}

Guess_Game();
