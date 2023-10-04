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
    const playerChoiceFormatted = formatChoice(playerChoice);
    const computerChoiceFormatted = formatChoice(computerChoice);
    
    if (playerChoiceFormatted === computerChoiceFormatted) {
        return roundResult('Tie!', 0);
    }

    const computerWinsMessage = `You lose! ${computerChoiceFormatted} beats ${playerChoiceFormatted}.`;
    const playerWinsMessage = `You win! ${playerChoiceFormatted} beats ${computerChoiceFormatted}.`;

    switch(playerChoiceFormatted) {
        case 'ROCK':
            if (computerChoiceFormatted === 'PAPER') return roundResult(computerWinsMessage, -1);
            return roundResult(playerWinsMessage, 1);
        case 'PAPER':
            if (computerChoiceFormatted === 'SCISSORS') return roundResult(computerWinsMessage, -1);
            return roundResult(playerWinsMessage, 1);
        case 'SCISSORS':
            if (computerChoiceFormatted === 'ROCK') return roundResult(computerWinsMessage, -1);
            return roundResult(playerWinsMessage, 1);
        default:
            throw `Invalid player choice ${playerChoiceFormatted}`;
    }
}