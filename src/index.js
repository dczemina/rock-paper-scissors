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
    }

    if (score.player > score.computer) {
        console.log(`You won! ${score.player} / ${numRounds} rounds with ${score.tie} ties`)
    } else {
        console.log(`You lose! Computer won ${score.computer} / ${numRounds} rounds with ${score.tie} ties`)
    }
}