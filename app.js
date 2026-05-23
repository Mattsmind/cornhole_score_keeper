// Player Objects
const p1 = {
    name: "Player 1",
    score: 0,
    display: document.querySelector('#p1Score'),
}

const p2 = {
    name: "Player 2",
    score: 0,
    display: document.querySelector('#p2Score'),
}

// Game Conditions
const maxScore = document.querySelector('#maxScore');
let isGameOver = false;

// Our Buttons
const buttons = document.querySelectorAll('button');
for (let button of buttons) {
    button.addEventListener('click', function (e){
        e.preventDefault();
        
        // Can't change the score after the game has started.
        if (!maxScore.disabled) {
            maxScore.disabled = true;
        }

        // Scoring Buttons
        if (button.id === 'p1Up') {
            updateScore(p1, p2);         
        } else if (button.id === 'p2Up') {
            updateScore(p2, p1);

        // Reset Button     
        } else if (button.id === 'reset') {
            resetGame();

        // We should NEVER get here.     
        } else {  
            console.error(">.< Something went terribly wrong >.< ");
        }

    });
}
maxScore.addEventListener('change', resetGame)

// A function to update the score and see if we have any winners.
function updateScore(player, opponent) {
    player.score++;
    player.display.innerText = player.score;
    
    const max = parseInt(maxScore.value)
    if (player.score >= max) {
        player.display.classList.add('has-text-success');
        opponent.display.classList.add('has-text-danger');
        console.log(`${player.name} Wins!`);
        setGameOver();
    }           
}

// Set the game over 
function setGameOver() {
    for (let button of buttons) {
        if (button.id !== 'reset' && !button.disabled) {
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

