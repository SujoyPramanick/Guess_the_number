let randomNumber = parseInt(Math.random() * 100 + 1);

const submit =  document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrhi = document.querySelector('.lowOrhi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if(playGame){
    submit.addEventListener('click' , function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    })
}

function validateGuess(guess){
    if(isNaN(guess)){
        alert("Please enter a valid number");
    }
    else if(guess<1){
        alert("Please enter a number more then 1");
    }
    else if(guess>100){
        alert("Please enter a number lower then 100");
    }
    else{
        prevGuess.push(guess);
        if(numGuess === 12){
            displayGuess(guess);
            displayMessager(`Game Over. Random number was ${randomNumber}`);
            endGame();
        }
        else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    if(guess === randomNumber){
        displayMessager('You guessed it right');
        endGame();
    }
    else if (guess < randomNumber){
        displayMessager('Your number is low');
    }
    else if(guess > randomNumber){
        displayMessager('Your number is high');
    }
}

function displayGuess(guess){
    userInput.value = '';
    guessSlot.innerHTML  +=  `${guess}  `;
    numGuess++;
    remaining.innerHTML = `${9 - numGuess}`;
    if(remaining.innerHTML === -1){
        remaining.innerHTML = 0;
    }
}

function displayMessager(message){
    lowOrhi.innerHTML = `<h3>${message}</h3>`;
}

function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled' , '');
    p.classList.add('button');
    p.innerHTML =`<button class="btn" type="button" id = "newGame">
    <strong>Start new Game</strong>
    <div id="container-stars">
      <div id="stars"></div>
    </div>
    <div id="glow">
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
  </button>
  `;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame(){
    const newGameButtton = document.querySelector('#newGame');
        newGameButtton.addEventListener('click' , function(e){
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [] ;
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML =  `${10 - numGuess}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        displayMessager("");
        playGame = true ;
    })
}