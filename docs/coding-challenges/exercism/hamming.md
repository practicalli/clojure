# Hamming

![Exercism Hamming logo](https://assets.exercism.org/exercises/hamming.svg){align=right loading=lazy}

[:globe_with_meridians: Clojure Track: Hamming](https://exercism.org/tracks/clojure/exercises/hamming){target=_blank .md-button}

Calculate the [:globe_with_meridians: Hamming Distance](https://en.wikipedia.org/wiki/Hamming_distance){target=_blank} between two DNA strands.

The human body is made up of cells that contain DNA. Those cells regularly wear out and need replacing, which they achieve by dividing into daughter cells.

The average human body experiences about 10 quadrillion cell divisions in a lifetime!

When cells divide, their DNA replicates too. Sometimes during this process mistakes happen and single pieces of DNA get encoded with the incorrect information.

By comparing two strands of DNA and counting the differences between them we can see how many replication mistakes occurred. This is known as the [:globe_with_meridians: Hamming Distance](https://en.wikipedia.org/wiki/Hamming_distance){target=_blank}.

We read DNA using the letters C,A,G and T. Two strands might look like this:

```shell
    GAGCCTACTAACGGGAT
    CATCGTAATGACGGCCT
    ^ ^ ^  ^ ^    ^^
```

They have 7 differences, and therefore the Hamming Distance is 7.

The [:globe_with_meridians: Hamming Distance](https://en.wikipedia.org/wiki/Hamming_distance){target=_blank} is useful for lots of things in science, not just biology, so it's a nice phrase to be familiar with :)


# Implementation notes

The Hamming distance is only defined for sequences of equal length, so an attempt to calculate it between sequences of different lengths would not give meaningful results.

Test both DNA strands are of equal length before running the hamming distance calculation.


## Source of challenge

The Calculating Point Mutations problem at Rosalind [:globe_with_meridians: http://rosalind.info/problems/hamm/](http://rosalind.info/problems/hamm/){target=_blank}



## Topics covered

The Clojure core functions used in the solution include:

`defn`, `if`, `filter`, `apply`, `identity`, `map`, `mapcat`, `when`


## Create the project

Download the RNA transcription exercise using the exercism CLI tool

!!! NOTE ""
    ```shell
    exercism download --exercise=hamming --track=clojure
    ```

!!! HINT "Use the REPL workflow to explore solutions locally"
    Open the project in a [:fontawesome-solid-book-open: Clojure aware editor](/clojure/clojure-editors) and [:fontawesome-solid-book-open: start a REPL](/clojure/coding-challenges/exercism/#repl-workflow), using a rich comment form to experiment with code to solve the challenge.


!!! HINT "Code for this solution on GitHub"
    [:fontawesome-brands-github: practicalli/exercism-clojure-guides](https://github.com/practicalli/exercism-clojure-guides/) contains the design journal and solution to this exercise and many others.
