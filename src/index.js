let gameState = -1;

const getComputerChoice = () => {
    const min = 1;
    const max = 3;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    switch (randomNum) {
        case 1:
            return 'ROCK'
        case 2:
            return 'PAPER'
        case 3:
            return 'SCISSORS'
    }
}

const formatChoice = (choice) => {
    const regex = /[^A-Z]+/g;
    return choice.toUpperCase().trim().replace(regex, '');
}

const roundResult = (message, result) => {
    return {
        message: message,
        result: result
    }
}

const playRound = (playerChoice, computerChoice) => {    
    if (playerChoice === computerChoice) {
        return roundResult('Tie!', 0);
    }

    const computerWinsMessage = `You lose! ${computerChoice} beats ${playerChoice}.`;
    const playerWinsMessage = `You win! ${playerChoice} beats ${computerChoice}.`;

    switch(playerChoice) {
        case 'ROCK':
            if (computerChoice === 'PAPER') return roundResult(computerWinsMessage, -1);
            return roundResult(playerWinsMessage, 1);
        case 'PAPER':
            if (computerChoice === 'SCISSORS') return roundResult(computerWinsMessage, -1);
            return roundResult(playerWinsMessage, 1);
        case 'SCISSORS':
            if (computerChoice === 'ROCK') return roundResult(computerWinsMessage, -1);
            return roundResult(playerWinsMessage, 1);
        default:
            throw `Invalid player choice ${playerChoice}`;
    }
}

const getPlayerChoice = () => {
    let playerChoice = prompt('Rock, Paper, or Scissors?');
    playerChoice = formatChoice(playerChoice);
    if (playerChoice !== 'ROCK' && playerChoice !== 'PAPER' && playerChoice !== 'SCISSORS') {
        console.warn(`${playerChoice} is not a valid choice. Please choose again.`)
        return getPlayerChoice();
    }
    return playerChoice;
}

const game = () => {
    const score = {
        player: 0,
        computer: 0,
        tie: 0
    }
    
    const numRounds = 5;

    for (let r=1; r<=numRounds; r++) {
        const result = playRound(getPlayerChoice(), getComputerChoice());

        console.log(result.message);
        switch (result.result) {
            case 0:
                score.tie++;
                break;
            case 1:
                score.player++;
                break;
            case -1:
                score.computer++;
                break;
        }

        if (score.player / numRounds > 0.5 || score.computer / numRounds > 0.5) {
            console.log('Game concluding early');
            break;
        }
    }

    if (score.player > score.computer) {
        console.log(`You won! ${score.player} / ${numRounds} rounds with ${score.tie} ties`)
    } else {
        console.log(`You lose! Computer won ${score.computer} / ${numRounds} rounds with ${score.tie} ties`)
    }
}

const displayMessage = (message) => {
    // Create <li> element with text inside <p> element
    const resultListItem = document.createElement('li');
    const resultListItemText = document.createElement('p');
    resultListItemText.textContent = message;
    resultListItem.appendChild(resultListItemText);
    resultsList.appendChild(resultListItem);

    removeAfterDelay(resultListItem, 1500);
}

const gameNotYetStarted = () => {
    displayMessage('The game has not yet begun!');
}

/* UI Element References */

/* Menu */
const menuSection = document.querySelector('#menu-section');
const btnStart = document.querySelector('#btn-start');

/* Game */
const gameSection = document.querySelector('#game-section');
const btnRock = document.querySelector('#btn-rock');
const btnPaper = document.querySelector('#btn-paper');
const btnScissors = document.querySelector('#btn-scissors');
const resultsList = document.querySelector('#results-list');

/* All Buttons */
const buttonList = document.querySelectorAll('.btn-weapon');

buttonList.forEach(button => {
    button.addEventListener('click', (event) => {
        event.target.classList.add('shake');
        removeClassAfterDelay(event.target, 'shake', 500);
    })
})

/* User Input */

/* Menu */
btnStart.addEventListener('click', (event) => {
    showAfterDelay(gameSection,500);
    hideAfterDelay(menuSection,500);
    setTimeout(() => {
        gameState = 1;
    }, 500)
})

/* Game */
btnRock.addEventListener('click', (event) => {
    setTimeout(() => {
        if (gameState !== 1) {
            gameNotYetStarted();
        } else {
            displayMessage(playRound('ROCK', getComputerChoice()).message);
        }
    }, 250)
})
btnPaper.addEventListener('click', (event) => {
    setTimeout(() => {
        if (gameState !== 1) {
            gameNotYetStarted();
        } else {
            displayMessage(playRound('PAPER', getComputerChoice()).message);
        }
    }, 250)
})
btnScissors.addEventListener('click', (event) => {
    setTimeout(() => {
        if (gameState !== 1) {
            gameNotYetStarted();
        } else {
            displayMessage(playRound('SCISSORS', getComputerChoice()).message);
        }
    }, 250)
})