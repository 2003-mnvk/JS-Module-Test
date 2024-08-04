const choices = document.querySelectorAll('.choice');
const resultMessage = document.getElementById('result-message');
const playAgainBtn = document.getElementById('play-again');
const rulesBtn = document.getElementById('rules-btn');
const rulesPopup = document.getElementById('rules-popup');
const closeBtn = document.getElementById('close-btn');
const computerScoreDisplay = document.getElementById('computer-score');
const yourScoreDisplay = document.getElementById('your-score');

let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
let yourScore = parseInt(localStorage.getItem('yourScore')) || 0;

computerScoreDisplay.textContent = computerScore;
yourScoreDisplay.textContent = yourScore;

const choicesArray = ['rock', 'paper', 'scissors'];

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const playerChoice = choice.id;
        const computerChoice = choicesArray[Math.floor(Math.random() * choicesArray.length)];
        determineWinner(playerChoice, computerChoice);
    });
});

playAgainBtn.addEventListener('click', () => {
    resultMessage.textContent = '';
    choices.forEach(choice => {
        choice.style.pointerEvents = 'auto';
    });
});

rulesBtn.addEventListener('click', () => {
    rulesPopup.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    rulesPopup.style.display = 'none';
});

function determineWinner(playerChoice, computerChoice) {
    let result;
    if (playerChoice === computerChoice) {
        result = 'It\'s a draw!';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'scissors' && computerChoice === 'paper') ||
        (playerChoice === 'paper' && computerChoice === 'rock')
    ) {
        result = 'You win!';
        yourScore++;
    } else {
        result = 'You lose!';
        computerScore++;
    }
    updateScores();
    displayResult(playerChoice, computerChoice, result);
}

function updateScores() {
    localStorage.setItem('computerScore', computerScore);
    localStorage.setItem('yourScore', yourScore);
    computerScoreDisplay.textContent = computerScore;
    yourScoreDisplay.textContent = yourScore;
}

function displayResult(playerChoice, computerChoice, result) {
    resultMessage.textContent = `You picked ${playerChoice}. Computer picked ${computerChoice}. ${result}`;
    choices.forEach(choice => {
        choice.style.pointerEvents = 'none';
    });
    if (result === 'You win!') {
        // Add celebration animation
        resultMessage.classList.add('celebrate');
        setTimeout(() => {
            resultMessage.classList.remove('celebrate');
        }, 3000);
    }
}
