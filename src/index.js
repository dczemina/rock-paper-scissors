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
            return 'SCISSOR'
    }
}

const playRound = (playerChoice, computerChoice) => {
    const playerChoiceFormatted = formatChoice(playerChoice);
    const computerChoiceFormatted = formatChoice(computerChoice);
    console.log(playerChoiceFormatted, computerChoiceFormatted)
}

const formatChoice = (choice) => {
    const regex = /[^A-Z]+/g;
    return choice.toUpperCase().trim().replace(regex, '');
}