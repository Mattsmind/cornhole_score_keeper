const buttons = document.querySelectorAll('button');
const p1score = document.querySelector('#p1Score');
const p2score = document.querySelector('#p2Score');
const maxScore = document.querySelector('#maxScore');

// Score holders
let score1 = 0;
let score2 = 0;

// Game Condition
let isGameOver = false;

for (let button of buttons) {
    button.addEventListener('click', function (e){
        e.preventDefault();
        
        // Can't change the score after the game has started.
        if (maxScore.disabled === false) {
            maxScore.disabled = true;
        }

        // Scoring Buttons
        if (button.id === 'p1Up') {
            score1++;
            p1score.innerText = score1;          
        } else if (button.id === 'p2Up') {
            score2++;
            p2score.innerText = score2;

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
function checkWin () {
    const max = parseInt(maxScore.value)
    if (score1 >= max) {
        p1score.classList.add('winner');
        p2score.classList.add('loser');
        console.log('P1 Wins!');
        setGameOver();

    } else if (score2 >= max) {
        p1score.classList.add('loser');
        p2score.classList.add('winner');
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
    score1 = 0;
    score2 = 0;
    p1score.innerText = score1;
    p1score.classList.remove('winner', 'loser');
    p2score.innerText = score2;
    p2score.classList.remove('winner', 'loser');
    enableButtons();
    if (maxScore.disabled) {
        maxScore.disabled = false;
    }
    if (isGameOver) {
        isGameOver = false;
    }
}







// THIS WASN'T THE CORRECT IDEA HERE.......
// Replaced the toggler for 2 functions setGameOver() and enableButtons()

// Button Toggler
//  
// function toggleButtons() {
//     for (let button of buttons) {
//         if (button.id !== 'reset') {
//             if (button.disabled && !isGameOver) {
//                 button.disabled = false;
//             } else {
//                 button.disabled = true;
//             }
//         }
//     }
// }
