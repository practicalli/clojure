# Exercism Challenges

![Exercisim Clojure Track icon](https://dg8krxphbh767.cloudfront.net/tracks/clojure.svg){align=right loading=lazy style="height:150px;width:150px"}

[:globe_with_meridians: Exercism Clojure Track](https://exercism.org/tracks/clojure){target=_blank .md-button}

[:globe_with_meridians: Exercism](https://exercism.org/tracks){target=_blank} is a learning platform for multiple programming languates (currently 67) which combines carefully crafted coding challenges and mentors who review and advise on solutions.

Solve challenges via the built-in Exercism editor.

![Exercism Clojure Editor](https://raw.githubusercontent.com/practicalli/graphic-design/live/code-challenges/exercism/exercism-editor-clojure-example-licians-luscious-lasagna.png)

Or download each exercise locally using the [:globe_with_meridians: Exercism CLI](https://exercism.org/cli-walkthrough){target=_blank}, providing a [:globe_with_meridians: Clojure CLI](/clojure/clojure-cli/){target=_blank} configured project with a test runner.

Use the [:globe_with_meridians: Exercism CLI](https://exercism.org/cli-walkthrough){target=_blank} to submit a solution for metor feedback.

??? INFO "Exercism embdedded Clojure editor"
    The Exercisim Clojure editor is powered by [:fontawesome-brands-github: babashka/sci](https://github.com/babashka/SCI)


## Clojure Track

All the challenges are groups into specific [:globe_with_meridians: language tracks](https://exercism.io/my/tracks){target=_blank}, including the [:globe_with_meridians:
Clojure track](https://exercism.org/tracks/clojure){target=_blank}

Join the language track to be presented with available challenges and progress through that specific track.

![Clojure code challenges - Exercism Clojure track](https://github.com/practicalli/graphic-design/blob/live/code-challenges/exercism/exercism-tracks-clojure-overview-progress.png?raw=true)

## Working Locally

[:globe_with_meridians: Exercism Guide to working locally](https://exercism.org/docs/using/solving-exercises/working-locally){target=_blank .md-button}

Follow the [:fontawesome-solid-book-open: Practicalli Clojure CLI Install](/clojure/install/) steps (Exercism includes a similar [:globe_with_meridians: Clojure CLI install guide](https://exercism.org/docs/tracks/clojure/installation){target=_blank})

The [:globe_with_meridians: Exercism CLI](https://exercism.org/cli-walkthrough){target=_blank} can download a Clojure project containing the code for a specific challeng and submit the code back to exercism to confirm if the tests have passed and complete the challenge (or get feedback from a mentor).

??? HINT "Each challenge shows the download and submit commands"
    Each Exercise page shows the command to download the code for that specific exercise, which is of the form
    ```bash
    exercism download --exercise=exercise-name --track=clojure
    ```

Open the project source code downloaded from Exercism in a [:fontawesome-solid-book-open: preferred Clojure editor](/clojure/clojure-editors/){target=_blank} and write a solution to solve the exercise.


`clojure -X:test` command in the root of the downloaded project will run the tests supplied by the exercise

??? HINT "Practicalli Test Runner aliases"

    `clojure -X:test/run` runs the Kaocha test runner from the [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/)

    `clojure -X:test/watch` will automatically re-run tests when file changes are detected.

    [:fontawesome-solid-book-open: Clojure test runner](/clojure/testing/test-runner/) covers test runner options in more detail.


Once the tests pass and you are happy with the solution, submit it to the Exercism website

```bash
exercism submit /path/to/src-file
```


## REPL Workflow

Use a REPL workflow to get instant feedback on code written to make the unit test assersions pass.

=== "Terminal UI"
    Start a REPL via a Terminal UI in the root of the Exercism project

    ```shell
    clojure -M:repl/rebel
    ```

    Open the project in a [:fontawesome-solid-book-open: Clojure aware editor](/clojure/clojure-editors/) and connect to the REPL process.


=== "Editor connected REPL"

    Open the project in a [:fontawesome-solid-book-open: Clojure aware editor](/clojure/clojure-editors/) and start a Clojure REPL, e.g. jack-in


Use a rich `comment` to experiment with clojure expressions that help move towards a solution, typically solving one unit test at a time. This separates experimental code from finished designs.

```clojure
(comment 
  ;; experiment with clojure code 
  ;; evaluate expressions in the Clojure editor
  ;; and see the evalaution results inline
)
```

!!! HINT "Disable Linter rules"
    Disable Linter rules within the `comment` expression that are not useful for REPL experiments.

    It is common to have several implmentations of a function with the same name, so `:redefined-var` is disabled.

    Functions defined in the REPL experments are not ment to be used publicly (until they are copied/moved out of the comment form), so `:clojure-lsp/unused-public-var` lint rule is disabled
    ```clojure
    #_{:clj-kondo/ignore [:redefined-var :clojure-lsp/unused-public-var]}
    (comment
      ,,,
    )
    ```


## Support

Mentors on the Exercism website will provide a review of your submissions and you can switch between mentor and practice modes as you prefer.

[:fontawesome-brands-github: practicalli/exercism-clojure-guides](https://github.com/practicalli/exercism-clojure-guides/){target=_blank} contains a design journal of solutions to several Clojure exercises.

Ask for advice in the [#exercism](clojurians.slack.com/messages/exercism){target=_blank} or [#beginners](clojurians.slack.com/messages/beginners){target=_blank} channels of the Clojurians Slack community.
