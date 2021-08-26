// ==============================================
// Perfect Accuracy Implementation
// ==============================================

// let prev = -1;
// function pseudorandom(): number {
//   prev = prev + 1;
//   if (prev > 9) prev = 0;
//   return prev;
// }

// ==============================================
// Language Pseudorandom Implementation
// ==============================================

// function pseudorandom(): number {
//   return Math.floor(Math.random() * 10);
// }

// ==============================================
// Lagged Fibonacci Implementation
// ==============================================

const lag = 10
const fib: number[] = []
function pseudorandom(): number {
  // initial starting point
  while (fib.length < lag) {
    fib.push(fib.length)
  }

  // operands
  const op1 = fib[fib.length - lag]
  const op2 = fib[fib.length - 1]

  // next digit in sequence
  const next = (op1 + op2) % 10
  fib.push(next)

  return next
}

// ==============================================
// Experiment
// ==============================================

const sequence: number[] = []
const iterations = 1000

for (let i = 0; i < iterations; i++) {
  sequence.push(pseudorandom())
}

// reduce results

const initialfrequencies: { [key: string]: number } = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
}

const frequencies = sequence.reduce((acc, val) => {
  const key = String(val)
  acc[key] = acc[key] + 1
  return acc
}, initialfrequencies)

const percentErrors: number[] = Object.keys(frequencies).reduce(
  (acc: number[], key: string) => {
    const theoretical = 100
    const actual = frequencies[key]
    const percentError = Math.abs((theoretical - actual) / theoretical)
    acc.push(percentError)
    return acc
  },
  []
)
const overallError =
  percentErrors.reduce((acc, val) => (acc += val)) / percentErrors.length

// print results

console.log(`Sequence\n====================\n${sequence}\n`)

console.log(`Frequencies\n====================`)
Object.keys(frequencies).forEach((key) => {
  console.log(`${key}: ${frequencies[key]} hits`)
})

console.log(`\nPercent Error\n====================`)
console.log(`${overallError * 100}%`)
