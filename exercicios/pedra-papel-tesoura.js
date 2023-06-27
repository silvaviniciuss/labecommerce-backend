const randonPcChoices = ['pedra', 'papel', 'tesoura']

const choiceComputer = randonPcChoices[
    Math.floor(Math.random() * randonPcChoices.length)
]
const userChoice = process.argv[2]

if(userChoice === choiceComputer) {
    console.log(`Você escolheu ${userChoice} e o computador escolheu ${choiceComputer}. Empate!`)
} else if (userChoice === 'pedra' && choiceComputer === 'tesoura' 
|| userChoice === 'papel' && choiceComputer === 'pedra'
|| userChoice === 'tesoura' && choiceComputer === 'papel') {
    console.log(`Você escolheu ${userChoice} e o computador escolheu ${choiceComputer}. Você Ganhou!`)
} else {
    console.log(`Você escolheu ${userChoice} e o computador escolheu ${choiceComputer}. Você Perdeu!`)
}
