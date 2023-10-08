

let gameState;

const resetGameState = () => {
    gameState = {
        started: false,
        finished: false,
        score: {
            player: 0,
            computer: 0,
            tie: 0
        }
    } 
}

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

const handleRoundResult = (result) => {
    displayMessage(result.message);
    updateScore(result.result)
}

const displayMessage = (message) => {
    // Create <li> element with text inside <p> element
    const resultListItem = document.createElement('li');
    const resultListItemText = document.createElement('p');
    resultListItemText.textContent = message;
    resultListItem.appendChild(resultListItemText);
    resultsList.appendChild(resultListItem);

    // removeAfterDelay(resultListItem, 1500);
}

const updateScore = (adjust) => {
    const playerScore = document.querySelector('#player-score');
    const computerScore = document.querySelector('#computer-score');
    const tieScore = document.querySelector('#tie-score');

    if (adjust === 0) {
        gameState.score.tie++;
    } else if (adjust === 1) {
        gameState.score.player++;
    } else if (adjust === -1) {
        gameState.score.computer++;
    }
    computerScore.textContent = `Computer: ${gameState.score.computer}`;
    playerScore.textContent = `Player: ${gameState.score.player}`;
    tieScore.textContent = `Tie: ${gameState.score.tie}`;

    if (gameState.score.player === 5) {
        finishGame(true);
    } else if (gameState.score.computer === 5) {
        finishGame(false);
    } else {
        btnRock.disabled = false;
        btnPaper.disabled = false;
        btnScissors.disabled = false;
    }
}

const finishGame = (playerWins) => {
    gameState.playerWins = playerWins;
    gameState.finished = true;
    btnRock.disabled = true;
    btnPaper.disabled = true;
    btnScissors.disabled = true;

    const btnReturn = document.querySelector('#btn-return')
    showAfterDelay(btnReturn, 500);
    btnReturn.addEventListener('click', (event) => {
        resetGameState();
        hideAfterDelay(gameSection,500);
        showAfterDelay(menuSection,500);
    })

    const victor = document.querySelector('#victor');
    if (playerWins) {
        victor.textContent = 'You are victorious';
    } else {
        victor.textContent = 'You have been bested.';
    }
}

const gameNotYetStarted = () => {
    displayMessage('The game has not yet begun!');
}

const gameFinished = () => {
    displayMessage('The game is already over!');
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
        resetGameState();
        gameState.started = true;
    }, 500)
})

/* Game */
btnRock.addEventListener('click', (event) => {
    btnRock.disabled = true;
    setTimeout(() => {
        if (!gameState.started) {
            gameNotYetStarted();
        } else if (gameState.finished) {
            gameFinished();
        } else {
            handleRoundResult(playRound('ROCK', getComputerChoice()));
        }
    }, 250)
})
btnPaper.addEventListener('click', (event) => {
    btnPaper.disabled = true;
    setTimeout(() => {
        if (!gameState.started) {
            gameNotYetStarted();
        } else if (gameState.finished) {
            gameFinished();
        } else {
            handleRoundResult(playRound('PAPER', getComputerChoice()));
        }
    }, 250)
})
btnScissors.addEventListener('click', (event) => {
    btnScissors.disabled = true;
    setTimeout(() => {
        if (!gameState.started) {
            gameNotYetStarted();
        } else if (gameState.finished) {
            gameFinished();
        } else {
            handleRoundResult(playRound('SCISSORS', getComputerChoice()));
        }
    }, 250)
})