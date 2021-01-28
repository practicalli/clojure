![Exercism.io Clojure Track banner](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/exercism/exercisim-clojure-track.png)

[Exercism.io](https://exercism.io/my/tracks) is a learning platform that combining coding challenges and mentors who review and advise on your solutions.  Each challenge comes with Leiningen project that includes code and unit tests, although Exercism itself doesn't run those tests.

Use the [Exercism CLI tool](#getting-started-exercism-cli-tool) to download the Leiningen project for each challenge and use your preferred development tools to create the solutions.  When feedback is required or you wish to share a solution, submit the code using the [Exercism CLI tool](#getting-started-exercism-cli-tool).  If tests are changed as well as source code, both files should be submitted.


## Clojure Track
All the challenges are groups into specific [language tracks](https://exercism.io/my/tracks), including the [Clojure track](https://exercism.io/my/tracks/clojure)

Join the language track and select either mentored mode or practice mode.

![Clojure code challenges - Exercism Clojure track](/images/clojure-code-challenges-exercism-track-mentor-mode.png)

In mentored mode your solutions are added to the mentors dashboard for review from any of the available mentors.  In practice mode you can complete as many solutions as you wish without waiting for a mentor.

![Clojure code challenges - Exercism Clojure track](/images/clojure-code-challenges-exercism-clojure-track.png)


## Getting Started: Exercism CLI tool
Select an exercise and follow the **Get started** guide to download and install the exercism tool.  This tool will download the project code and submit solutions back to the Exercism web site.

![Clojure code challenges - Exercism getting started](/images/clojure-code-challenges-exercism-getting-started.png)

Use the Exercism tool to download a Leiningnen project for the exercise

```shell
exercism download --exercise=exercise-name --track=clojure
```

Open the project in your [preferred Clojure editor](/clojure-editors/) and write a solution to solve the tests in the exercise.  Run the tests using Leiningen in the command line, using `lein test` or the test runner in your editor.

Once the tests pass and you are happy with the solution, submit it to the Exercism website

```shell
exercism submit /path/to/src-file
```

## Using Clojure CLI tools
With [Clojure CLI tools installed](/clojure-tools/install/), then simply add a `deps.edn` file to the root directory of the Leiningen project downloaded by the Exercism CLI tool.

The `deps.edn` should contain the `:paths` for the `src` directory (and `test` if your test runner requires that path, eg. cider test runner).

```clojure
{:paths ["src"]}
```

To run tests, use an alias such as `:test/runner` from [practicalli/clojure-deps-edn](/clojure-tools/install/community-tools.md), an alias from your own `~/.clojure/deps.edn` or add an alias directly to the project `deps.edn` file just created.


## Support
The mentors on the Exercism website will provide a review of your submissions and you can switch between mentorship and practice modes as you prefer.

[practicalli/exercism-clojure-guides](https://github.com/practicalli/exercism-clojure-guides/) contains the design journal and solution to several Clojure exercises.

Ask for advice in the [#exercism](clojurians.slack.com/messages/exercism) or [#beginners](clojurians.slack.com/messages/beginners) channels of the Clojurians Slack community.
