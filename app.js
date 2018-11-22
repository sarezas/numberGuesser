// GAME FUNCTIONS:
// - Player guesses a number between a min an a max
// - Player gets a defined amount of guesses
// - App notifies player of guesses remaining
// - App notifies the player when he guessed correctly
// - App notifies player of correct number even if game is lost
// - App lets player choose to play again

// Game vals.
let min = 1,
    max = 10,
    // also possible to assign this random num var to a separate function for hoisting
    winningNum = Math.floor(Math.random() * (max - min + 1) + min),
    guessesLeft = 3;
    // for testing (or cheating) purpose
    console.log(winningNum);


// UI elems.
const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.getElementById('guess-btn'),
      guessInput = document.getElementById('guess-input'),
      message = document.querySelector('.message');
      
// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// listen for play again e.
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
});

// listen for guess e.
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    // validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // check if won
    if (guess === winningNum) {
        gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else {
        // loosing - subtract number of guesses left
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // game over
            gameOver(false, `Game over, you lost. The correct number was ${winningNum}!`);
        } else {
            // game continues if wrong answer
            guessInput.value = '';
            guessInput.style.borderColor = 'red';
            setMessage(`${guess} is incorrect, ${guessesLeft} guesses left.`,
            'red');
        }
    }
});

// game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    // disable input
    guessInput.disabled = true;
    // change color accordingly 
    guessInput.style.borderColor = color;
    message.style.color = color;
    // set message
    setMessage(msg);

    // play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}