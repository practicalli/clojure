# Unit Testing
In Clojure the unit under test is the function.  Unit test coverage should test all public function that form the API of their respective namespace.

`clojure.test` namespace provides a unit testing framework and is included in the Clojure library, so is available in all Clojure projects.

[Test runners](/testing/test-runners/) are used to run one or more tests in a project.


## Simple principles for writing test code
* One `test` namespace for each `src` namespace
* One `deftest` function for each function under test
* Multiple `is` assertions for one function
* Group assertions in `testing` and provide a meaningful description of that grouping, adding more information when reviewing test failures especially for larger code bases.
* `are for testing similar functionality with different data sets
* Test private functions indirectly through the public function API of each namespace (minimizes test churn and time to run all tests)
* Use [generative testing](/clojure-spec/) to create less code and yet test with more extensive range of data

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
> `clojure -M:clj-new app practicalli/rock-paper-scissors-lizard-spock`

<!-- TODO: clj-new - does this add a test namespace if you add a src namesspace to an existing project? -->

## Project Examples: Code challenges with unit tests
* [TDD Kata: Recent Songlist](/simple-projects/tdd-kata/recent-songlist.md) - simple tests examples
* [Codewars: Rock Paper Scissors (lizard spock) solution](https://github.com/practicalli/codewars-guides/tree/develop/rock-paper-scissors) - `and` examples
* [practicalli/numbers-to-words](https://github.com/practicalli/numbers-to-words) - overly verbose example, ripe for refactor
* [practicalli/codewars-guides](https://github.com/practicalli/codewars-guides) - deps.edn projects
* [practicalli/exercism-clojure-guides](https://github.com/practicalli/exercism-clojure-guides) - Leiningen projects


## References
* [Example based unit testing in Clojure](https://purelyfunctional.tv/mini-guide/example-based-unit-testing-in-clojure/) - PurelyFunctional.tv
