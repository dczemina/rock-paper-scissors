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