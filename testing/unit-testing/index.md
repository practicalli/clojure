# Unit Testing
In Clojure the unit under test is the function.  Unit test coverage should test all public function that form the API of their respective namespace.

`clojure.test` namespace provides a unit testing framework and is included in the Clojure library, so is available in all Clojure projects.

[Test runners](/testing/test-runners/) are used to run one or more tests in a project.


## Principles for writing test code
* One `test` namespace for each `src` namespace
* One `deftest` function for each function under test
* Multiple `is` assertions for one function
* Group assertions in `testing` and provide a meaningful description of that grouping, adding more information when reviewing test failures especially for larger code bases.


## Project structure with tests
By convention, separate `src` and `test` directories are used to hold the source code and the code that tests the source code.

For each source code file in `src` there should be a corresponding file in test with the same name and `-test` postfix.

For example, code to test the `src/codewars/rock_paper_scissors.clj` is saved in the file `src/codewars/rock_paper_scissors_test.clj` file.

![Clojure project structure - src and test branches](/images/clojure-project-structure-src-test-tree.png)

[Example project: CodeWars: Rock Paper Scissors](https://github.com/practicalli/codewars-guides/tree/develop/rock-paper-scissors)

> #### Hint::Create Projects from templates
> Templates typically include a parallel `test` and `src` directory structure.  The `clj-new` tool has build it templates (app, lib) and will create `src` and `test` directories in the projects it creates.
>
> `clojure -A:clj-new app practicalli/rock-paper-scissors-lizard-spock`

<!-- TODO: clj-new - does this add a test namespace if you add a src namesspace to an existing project? -->

## References
* [codewars: rock paper scissors (lizard spock) solution](https://github.com/practicalli/codewars-guides/tree/develop/rock-paper-scissors)
* [Example based unit testing in Clojure](https://purelyfunctional.tv/mini-guide/example-based-unit-testing-in-clojure/) - PurelyFunctional.tv
https://purelyfunctional.tv/mini-guide/example-based-unit-testing-in-clojure/
