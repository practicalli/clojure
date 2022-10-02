![REPL Driven development and Unit testing in Clojure](https://raw.githubusercontent.com/practicalli/graphic-design/live/repl-tdd-flow.png)

In Clojure the unit under test is the function.  Unit test coverage should test all public function that form the API of their respective namespace.

`clojure.test` namespace provides a unit testing framework and is included in the Clojure library, so is available in all Clojure projects.

[Test runners](/testing/test-runners/) are used to run one or more tests in a project.


## Simple principles for writing unit tests

* A `test` namespace for each `src` namespace under test
* A `deftest` function for each function under test
* Multiple assertions (`is` `are`) for one function
    * `are` to testing similar functionality with different data sets (or use generative testing)
* `testing` to logically group assertions and provide a meaningful description of that grouping (easier to identify tests when they fail)
* Test API rather than implementation (or add metadata to easily skip them)
    * test generic helper or private functions through public functions of each namespace (minimize test churn and time to run all tests)
    * `^:helper` on tests for more generic functions, to skip those tests via a test selector
* Use [generative testing](/clojure-spec/) to create less code and yet test with more extensive range of data
* Use [test selectors](test-selectors.md) to organize tests and optimize speed of test runs
* Limit mocking of systems to integration tests (although mocking data is good)


## Test with Development REPL and Command Line

There is value in running unit tests via the REPL used to develop the code as well as using a test runner via the command line (optionally using a watcher).

![Clojure unit testing approach - editor and command line](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-testing-approach.png)

Using the develop-time REPL provides fast selection of tests using editor commands and shows instant feedback  within the editor itself, helping maintain focus.

Using the develop-time REPL to run tests does require evaluation of both test and source code to ensure changes are loaded into the REPL.  Stale definitions, especially stale tests should be removed from the REPL when using this approach, either `undef`-ing a `deftest` before renaming or re-evaluating other changes to a `deftest` expression.

Running tests via a command like tool (i.e. koacha, Cognitect Labs runner) ensures tests are run from a known state, as all changes are captured in the source code files and a clean REPL state is established each time the tests. This clearly defined state is especially valuable for running integration tests.

Using a watch process with a command line tool can also give fast feedback, especially if the test runner can be configure to run only selective tests (i.e kaocha)

Run all tests (including integration tests) via the command line before pushing commits to ensure all changes to the code have been tested.

If tests are not running in the REPL or are returning unexpected errors, a command line test runner is a useful way to diagnose if it is the test code or test tools causing the error.

The CLI approach is also more robust for longer running tests than running within an editor.



## Project structure with tests
By convention, separate `src` and `test` directories are used to hold the source code and the code that tests that source code.

For each source code file in `src` there should be a corresponding file in test with the same name and `_test` postfix.

For example, code to test the `src/codewars/rock_paper_scissors.clj` is saved in the file `src/codewars/rock_paper_scissors_test.clj` file.

![Clojure project structure - src and test branches](/images/clojure-project-structure-src-test-tree.png)

[Example project: CodeWars: Rock Paper Scissors](https://github.com/practicalli/codewars-guides/tree/develop/rock-paper-scissors)

## Source and Test Namespaces
As with file names, the namespaces for each test code file is the same as the source code it is testing, with a `-test` postfix.

`codewars/rock-paper-scissors` source code namespace will have a matching `codewars/rock-paper-scissors-test` namespace.

> #### Hint::Create Projects from templates
> Templates typically include a parallel `test` and `src` directory structure.  The `clj-new` tool has build it templates (app, lib) and will create `src` and `test` directories in the projects it creates.
>
> `clojure -X:project/new :template app :name practicalli/rock-paper-scissors-lizard-spock`

<!-- TODO: clj-new - does this add a test namespace if you add a src namespace to an existing project? -->

## Project Examples: Code challenges with unit tests
* [TDD Kata: Recent Song-list](/simple-projects/tdd-kata/recent-song-list.md) - simple tests examples
* [Codewars: Rock Paper Scissors (lizard spock) solution](https://github.com/practicalli/codewars-guides/tree/develop/rock-paper-scissors) - `and` examples
* [practicalli/numbers-to-words](https://github.com/practicalli/numbers-to-words) - overly verbose example, ripe for refactor
* [practicalli/codewars-guides](https://github.com/practicalli/codewars-guides) - deps.edn projects
* [practicalli/exercism-clojure-guides](https://github.com/practicalli/exercism-clojure-guides) - Leiningen projects


## References
* [Example based unit testing in Clojure](https://purelyfunctional.tv/mini-guide/example-based-unit-testing-in-clojure/) - PurelyFunctional.tv
