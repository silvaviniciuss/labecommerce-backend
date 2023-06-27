export function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

let pcNumber = getRndInteger(0,5)
let result = (+process.argv[3] + pcNumber)

if(process.argv[2] === 'par' && result % 2 === 0) {
    console.log(`Você escolheu par e o computador escolheu impar. O resultado foi ${result}. Você ganhou!`)
} else {
    console.log(`Você escolheu impar e o computador escolheu par. O resultado foi ${result}. Você perdeu!`)
}
