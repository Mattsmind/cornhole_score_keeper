// Need to refactor with an object to represent players.
// This will allow for cleaner code with simpler functions,
// and less duplication of code.

const p1 = {
    score: 0,
    display: document.querySelector('#p1Score'),
}

const p2 = {
    score: 0,
    display: document.querySelector('#p2Score'),
}

const buttons = document.querySelectorAll('button');
const maxScore = document.querySelector('#maxScore');

// Game Condition
let isGameOver = false;

for (let button of buttons) {
    button.addEventListener('click', function (e){
        e.preventDefault();
        
        // Can't change the score after the game has started.
        if (!maxScore.disabled) {
            maxScore.disabled = true;
        }

        // Scoring Buttons
        if (button.id === 'p1Up') {
            p1.score++;
            p1.display.innerText = p1.score;          
        } else if (button.id === 'p2Up') {
            p2.score++;
            p2.display.innerText = p2.score;

        // Reset Button     
        } else if (button.id === 'reset') {
            resetGame();

        // We should NEVER get here.     
        } else {  
            console.error(">.< Something went terribly wrong >.< ");
        }

        if (button.id !== 'reset') {
            checkWin();
        }
    });
}

maxScore.addEventListener('change', resetGame)

// A function to see if we have any winners. [This could be refactored.]
// [FUTURE DIRECTION] checkWin() to be made into updateScore()
// This will accept 2 parmeters, player and opponent. 
function checkWin () {
    const max = parseInt(maxScore.value)
    if (p1.score >= max) {
        p1.display.classList.add('has-text-success');
        p2.display.classList.add('has-text-danger');
        console.log('P1 Wins!');
        setGameOver();

    } else if (p2.score >= max) {
        p1.display.classList.add('has-text-danger');
        p2.display.classList.add('has-text-success');
        console.log('P2 Wins!');
        setGameOver();
    } else {
        console.log('No Winner.');
    }
}

// Set the game over 
function setGameOver() {
    for (let button of buttons) {
        if (button.id !== 'reset' && button.disabled === false) {
            button.disabled = true;
        }
    }

    maxScore.disabled = false;
    isGameOver = true;
}

// Re-enable Buttons
function enableButtons() {
    for (let button of buttons) {
        if (button.disabled){
            button.disabled = false;
        }
    }
}

// Reset the Game
function resetGame() {
    console.log('Reset');
    p1.score = 0;
    p2.score = 0;
    p1.display.innerText = p1.score;
    p1.display.classList.remove('has-text-danger', 'has-text-success');
    p2.display.innerText = p2.score;
    p2.display.classList.remove('has-text-danger', 'has-text-success');
    enableButtons();
    if (maxScore.disabled) {
        maxScore.disabled = false;
    }
    if (isGameOver) {
        isGameOver = false;
    }
}


