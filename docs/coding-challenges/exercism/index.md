# Exercism.io Challenges

![Exercisim Clojure Track icon](https://dg8krxphbh767.cloudfront.net/tracks/clojure.svg){align=right loading=lazy style="height:150px;width:150px"}

[Exercism.io Clojure Track](https://exercism.io/tracks/clojure){target=_blank .md-button}

[Exercism.io](https://exercism.io/tracks){target=_blank} is a learning platform for 12 programming languates which combines carefully crafted coding challenges and mentors who review and advise on solutions.

Solve challenges via the built-in Exercism editor, so no install is reqiured.

Or download each exercise locally using the [Exercism CLI](https://exercism.org/cli-walkthrough){target=_blank}, providing a [Clojure CLI](/clojure/clojure-cli/){target=_blank} configured project with a test runner.  Use the [Exercism CLI](https://exercism.org/cli-walkthrough){target=_blank} to submit a solution for metor feedback.

??? INFO "Exercism embdedded Clojure editor"
    The Exercisim Clojure editor is powered by [babashka/sci](https://github.com/babashka/SCI)
    ![Exercism Clojure Editor](https://raw.githubusercontent.com/practicalli/graphic-design/live/exercism/exercism-editor-clojure-example-licians-luscious-lasagna.png)

## Clojure Track

All the challenges are groups into specific [language tracks](https://exercism.io/my/tracks){target=_blank}, including the [Clojure track](https://exercism.io/tracks/clojure){target=_blank}

Join the language track and select either mentored mode or practice mode.

![Clojure code challenges - Exercism Clojure track](https://raw.githubusercontent.com/practicalli/graphic-design/live/code-challenges/clojure-code-challenges-exercism-track-mentor-mode.png)

In mentored mode your solutions are added to the mentors dashboard for review from any of the available mentors.  In practice mode you can complete as many solutions as you wish without waiting for a mentor.

![Clojure code challenges - Exercism Clojure track](https://raw.githubusercontent.com/practicalli/graphic-design/live/code-challenges/clojure-code-challenges-exercism-clojure-track.png)

## Working Locally

[Exercism Guide to working locally](https://exercism.org/docs/using/solving-exercises/working-locally){target=_blank .md-button}

Follow the [Practicalli Clojure CLI Install](/clojure/install/) steps (Exercism includes a similar [Clojure CLI install guide](https://exercism.org/docs/tracks/clojure/installation){target=_blank})

The [Exercism CLI](https://exercism.org/cli-walkthrough){target=_blank} can download a Clojure project containing the code for a specific challeng and submit the code back to exercism to confirm if the tests have passed and complete the challenge (or get feedback from a mentor).

??? HINT "Each challenge shows the download and submit commands"
    Each Exercise page shows the command to download the code for that specific exercise, which is of the form
    ```bash
    exercism download --exercise=exercise-name --track=clojure

```

Open the project in your [preferred Clojure editor](/clojure/clojure-editors/) and write a solution to solve the exercise.

`clojure -X:test` command in the root of the downloaded project will run the tests supplied by the exercise or use any [Clojure test runner](/clojure/testing/test-runner/), e.g. `clojure -X:test/run` or `clojure -X:test/watch`

Once the tests pass and you are happy with the solution, submit it to the Exercism website

```bash
exercism submit /path/to/src-file
```

## Support

Mentors on the Exercism website will provide a review of your submissions and you can switch between mentor and practice modes as you prefer.

[practicalli/exercism-clojure-guides](https://github.com/practicalli/exercism-clojure-guides/){target=_blank} contains a design journal of solutions to several Clojure exercises.

Ask for advice in the [#exercism](clojurians.slack.com/messages/exercism){target=_blank} or [#beginners](clojurians.slack.com/messages/beginners){target=_blank} channels of the Clojurians Slack community.
