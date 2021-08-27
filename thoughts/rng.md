---
title: Random Number Generation
desc: In this article I discuss random number generators and how to generate seemingly random numbers computationally using mathematics.
date: 08/25/21 20:21
lastUpdated: 08/25/21 20:21
tags:
  - tech
---

Have you ever wondered how a computer random number generator works? How a computer can generate seemingly random numbers? How are computers able to deterministically choose random values and return them to the user? Computers evidently don't have a magical pair of electrical dice they can just roll to determine random values. How do computers come up with truly mathematically random numbers? Is it random electrical signals? Arbitrary bit arithmetic? Reading garbage data from memory?

When computers generate random numbers for games, lottery programs, and programming language libraries, they don't have magical dice they can roll - instead, they use intelligent mathematics. In this article I will explain how you can deterministically generate random numbers using only mathematics, and create a program which does so.

### Mathematically Random

Before diving into the realm of mathematics, it is important to first clarify what it means for a given outcome to be mathematically random. Picture rolling a single six-sided dice: the outcome is considered _mathematically random_ when each dice face has an equal chance of landing face up. This means that the probability of rolling a `1` is `1/6`, the probability of rolling a `2` is `1/6`, and so on. In practicality, achieving a perfectly random dice roll every time is impossible - a dice can land on uneven surfaces and be tossed at different angles and speeds. However, each outcome has approximately the same probability of occurring. In other words, ceteris paribus, each dice face has the exact same probability of landing face up - `1/6`. This is what we call "mathematical randomness".

For the rest of this article, the term "random" will be used to denote "mathematically random".

### Deterministic

It is equally important to define what it means for an outcome to be deterministic. An outcome that is _deterministic_ is an outcome that can be logically or mathematically calculated. Consider the digits of `pi`: each decimal place can be _deterministically_ calculated by performing divisions, computing series, and so on. Each value in the string of digits can be determined exactly with the aid of mathematics.

### Preconditions

If we are to create a random number generator program, we need to first determine the rules of the program. What are the conditions or goals that a random number generator must achieve? With any random number generator there are two preconditions that must be satisfied:

1. **The generated outcomes are mathematically random**. In other words, each outcome has an equal chance of being chosen.
2. **The generated outcomes must contain no detectable pattern**. In other words, the next outcome cannot be predictable.

The first precondition is relatively easy to meet - generating string of numbers is a trivial task; however, generating a string of outcomes with no detectable pattern is much more difficult. This is why it is inconceivable for the sequence `1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5` of dice outcomes to be considered random. While the generated outcomes all have an equal chance of being chosen, the next outcome is far too predictable.

### Pseudorandom

The question remains: how is it possible to deterministically generate a random string of numbers that satisfy both conditions?

The truthful answer is that _we can't_. It is _mathematically impossible_ for a computer to deterministically generate a truly random string of numbers.

That's the end of this article.

...

Just kidding.

Instead, we can use what is called a pseudorandom number generator. A _pseudorandom number generator_ is a fake number generator that chooses values deterministically (mathematically) while appearing seemingly random. If we go back to the aforementioned preconditions, we can use a pseudorandom number generator to approximately satisfy both preconditions: the generated outcomes will not be nearly mathematically random, but we can make them contain no easily detectable pattern.

In other words, _we fake randomness_, and this is in fact the approach that all computer randomness originates from. So how does this work?

### Choosing a Sequence

The sequence of numbers we choose needs to appear random, but the hardest step is choosing a viable sequence. There are a few options for infinite number sequences.

1. Selecting the digits of a continuous decimal such as `1/7`.
2. Selecting the digits of an irrational number like `the square root of 2`, `pi`, or `phi`.
3. Selecting an arbitrary number and performing calculation on it in order to get the next number. In other words, selecting a mathematical series.

It is immediately apparent that a continuous decimal will not work because the digits begin repeating after a short sequence, but what about irrational numbers or mathematical series? Irrational numbers are a bit too predictable and not convincing , and the patterns of most series are, simply put, too predictable. We can do better.

### Lagged Fibonacci

The Fibonacci Sequence is one of the most interesting numerical sequences ever devised in mathematics due to its simplistic nature and vast applications. The Fibonacci Sequence is a mathematical series in which the next number in sequence is a summation of the previous two numbers. In other words, the sequence's first 15 digits are as follows:

```
1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, ...
```

What makes the Fibonacci Sequence different from the aforementioned number sequences? The key here is consistency. Each of the previous sequences have a consistent formula for retrieving the next number in the sequence. For example, to find the next digit of `1/7` using long division, bring down another digit from the dividend and divide by the divisor. To find the next digit in `pi`, add the next fraction in the series until convergence. Each new digit is _independent_ of the results of the previous digits. Fibonacci, however, relies on the previous numbers its sequence in order to compute the next result. The Fibonacci sequence is therefor simulataneously reproducible, arbitrary, and regrettably predictable. Let's reduce predictability.

We can solve this issue by confining our sequence to single digits. Say we want to create a pseudorandom number generator that generates values between 0 and 9. That means that we should be able to compute a string of outcomes between 0 and 9 that have equal probabilities and appear random in sequence. If we continue using the Fibonacci Sequence as a basis, the mathematical modulo operator can be used to clamp our results to this range.

How does the modulo operator clamp the range of numbers? To recap, the modulo operator uses "clock arithmetic" to return the remainder in a division. This means that the resulting modulus will never exceed the divisor. This can be easily illustrated with the number 3 in the table below.

| dividend | divisor | dividend modulo divisor |
| :------: | :-----: | :---------------------: |
|    0     |    3    |            0            |
|    1     |    3    |            1            |
|    2     |    3    |            2            |
|    3     |    3    |            0            |
|    4     |    3    |            1            |
|    5     |    3    |            2            |
|    6     |    3    |            0            |
|    7     |    3    |            1            |

Notice that the resultng modulus never exceeds the divisor - in other words, the range of the modulus will always be `0` to `divisor - 1`. Therefore, if we want all digits between 0 and 9, we can simply `modulo 10` on the new result in the series. What does that look like?

| Fibonacci         | `1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, ...` |
| :---------------- | :-------------------------------------------------------------- |
| Clamped Fibonacci | `1, 1, 2, 3, 5, 8, 3, 1, 4, 5, 9, 4, 3, 7, 0, ...`              |

At first glance, Clamped Fibonacci appears to be an extremely strong candidate for pseudorandom number generation. However, stretching the sequence further emphasizes its glaring issues.

`1, 1, 2, 3, 5, 8, 3, 1, 4, 5, 9, 4, 3, 7, 0, 7, 7, 4, 1, 5, 6, 1, 7, 8, 5, 3, 1, 4, 5, 9, 4, 3, 7, 0, 7, 7, ...`

First, notice that the sequence contains a repeating sequence every 19 digits (starting with `5, 8, ...`). Additionally, a predictable pattern presents itself in the sequence near zeros (see `0, 7, 7, ...`). Notice that at each instance of 0, the next digit will always be the digit preceeding the zero. Furthermore, the next digit will always be a repeat since the sum of any number and 0 will be itself. This pattern cannot be contained in the pseudorandom generator. The sequence needs to be improved to prevent sequence repeats and predictable patterns.

A Lagged Fibonacci sequence is a Fibonacci sequence that further conceals the pattern of the standard Fibonacci Sequence. In Lagged Fibonacci, the next number in the sequence is not derived from the summation of the previous two digits; rather, it is derived from the summation of the previous digit and a previous digit `n` places away. For example if `let n = 2` the sequence will be as follows:

`1, 1, 2, 3, 4, 6, 9, 13, 19, 28, 41, 60, ...`

Lagged Fibonacci increases at a much slower rate than Fibonacci. This proves to be useful when clamping a Lagged Fibonacci generator because it signifies that the sequence will repeat less frequently - repeating approximately every `10^n` digits. This is where the Lagged Fibonacci sequence gets its name, where the lag indicates the number of digits from the previous digit to the second operand. It is therefore ideal to have a large lag. Below is a sample of lag 8:

`0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 1, 4, 8, 3, 9, 6, 4, 2, 1, 2, 6, 4, 7, 6, 2, 6, 8, 9, 1, 7, 1, 8, 4, ...`

This is our resulting sequence. Let's perform an experiment to demonstrate its effectiveness.

### The Experiment

We can use computer programming to demonstrate each potential random number sequence. I will be using the [Typescript](https://www.typescriptlang.org/) language to demonstrate the results but the underlying logic should be easy enough to follow.

A basic outline of how the program will work follows:

1. A function `pseudorandom()`, when called, will return a pseudorandom number in the sequence. This is the function that will be changed with each sequence.
2. The function `pseudorandom()` is called 1000 times and the resulting digits are stored in an array `sequence[]`.
3. The digits in `sequence[]` are tallied and the frequency of each digit is measured via a `reducer` and the results are stored in an object.
4. The final results are printed to the user.

In a perfect world, the frequency of each digit should be exactly `number of iterations / number of digits`. Therefore, with 1000 iterations and 10 possible outcomes, we know that each digit should approximately occur 100 times. This information can be used to calculate the percent error of each individual digit, then the results can be averaged to product an overall percent error.

And now we can test against two variants: first, the control, in which perfect accuracy is expected; second, the native builtin pseudorandom implementation, which stems from the Javascript `Math` library.

### The Results

The results of the experiment are recorded below.

| Implementation            | Percent Error |
| :------------------------ | ------------: |
| Control                   |        `0.0%` |
| Native Implementation     |        `9.8%` |
| Lagged Fibonacci (lag 10) |        `8.2%` |

From the results above, we can see that our Lagged Fibonacci implementation actually performed better than the native implementation - however, this is likely due to flaky testing methodology. In a more heavily monitored testing environment, I would imagine that the native implementation might perform slightly better.

Lagged Fibonacci is a very rudimentary implementation of pseudorandom number generation, but it is [still used by many different programming languages and libraries for a variety of different purposes](https://en.wikipedia.org/wiki/Lagged_Fibonacci_generator), including efficiency, simplicity, and convenience. Even so, Lagged Fibonacci is a perfect candidate for learning and understanding math principles that make up the building blocks of today's technology.

If you'd like to see my code implementation, you can [download it here](/thoughts/rng.ts). If you've made it this far, I appreciate your support and I hope you'll stick around :)
