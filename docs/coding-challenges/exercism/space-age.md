# Space Age

![Exercism](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/exercism/exercisim-exercise-space-age-banner.png)

## Topics covered


!!! HINT "Code for this solution on GitHub"
    [practicalli/exercism-clojure-guides](https://github.com/practicalli/exercism-clojure-guides/) contains the design journal and solution to this exercise and many others.

## Create the project

Download the RNA transcription exercise using the exercism CLI tool

!!! NOTE ""
    ```bash
    exercism download --exercise=rna-transcription --track=clojure
    ```

!!! HINT "Use the REPL workflow to explore solutions locally"
    Open the project in a [Clojure aware editor](/clojure/clojure-editors) and [start a REPL](/clojure/coding-challenges/exercism/#repl-workflow), using a rich comment form to experiment with code to solve the challenge.


## Challenge introduction

Given an age in seconds, calculate how old someone would be on:

- Earth: orbital period 365.25 Earth days, or 31557600 seconds
- Mercury: orbital period 0.2408467 Earth years
- Venus: orbital period 0.61519726 Earth years
- Mars: orbital period 1.8808158 Earth years
- Jupiter: orbital period 11.862615 Earth years
- Saturn: orbital period 29.447498 Earth years
- Uranus: orbital period 84.016846 Earth years
- Neptune: orbital period 164.79132 Earth years

So if you were told someone were 1,000,000,000 seconds old, you should be able to say that they're 31.69 Earth-years old.
