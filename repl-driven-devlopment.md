# REPL Driven Development
REPL driven development is the foundation of working with Clojure.

The REPL is an instant feedback workflow that continually runs your code without the need of a separate compile-build-run cycle. The REPL contains your live application to which you interact with by calling(evaluating) code.

![Clojure repl driven development using Clojure aware editor](https://raw.githubusercontent.com/jr0cket/developer-guides/master/clojure/clojure-repl-driven-development-rebel-readline.png)

> #### Hint::Always run a REPL
> Coding with a REPL provides fast feedback as design decisions are encoded, giving every opportunity to testing assumptions driving those design choices.


<!-- * Read - code is read by the Clojure reader, passing any macros to the macro reader which converts those macros into Clojure code. -->

<!-- * Evaluate - code is compiled into the host language (e.g. Java bytecode) and executed -->

<!-- * Print - results of the code are displayed, either in the REPL or as part of the application. -->

<!-- * Loop - the REPL is a continuous process that evaluates code, either a single expression or the whole application. -->


## Evaluating source code
A REPL is typically used from an editor with files that compose the project code base.  A Clojure aware editor can evaluate code from the source code files to and display the results inline.

![Clojure repl driven development using Clojure aware editor](https://raw.githubusercontent.com/jr0cket/developer-guides/master/clojure/clojure-repl-driven-development-clojure-aware-editor.png)


## Design Journal
It is highly recommended to journal your design process to make your code easier to understand and maintain.  Journals avoid the need for long hand-over or developer on-boarding processes as the journey through design decisions are already documented.

It is recommended to create a Design Journal section at the bottom of each namespace.  This journal should cover

* All the important REPL experiments used to create the resulting namespace code.
* Discussions of design choices, including those not taken and why.
* Expressions that can be evaluated to explain how a function or parts of a function works

The design journal can be used to create meaningful documentation for the project very easily and should prevent time spent on repeating exactly the same conversations.

> #### HINT::Add example journal
> [Design Journal for TicTacToe game using reagent, clojurescript and scalable vector graphics](https://github.com/jr0cket/tictactoe-reagent/blob/master/src/tictactoe_reagent/core.cljs#L124)


## Viewing data structures
Use Pretty Print to view data structures that are the result of evaluating your code.  This makes those data structures easier to parse as a developer and more likely to notice incorrect results.

Data inspectors (cider-inspect, [REBL](https://github.com/cognitect-labs/REBL-distro)) provide effective ways to navigate through a nested data structures and large data sets.

![Clojure - viewing large data sets](/images/spacemace-clojure-inspect-java-lang-persistentvector.png)


## Code Style and idiomatic Clojure
Your editor should automatically apply formatting that follows the [Clojure Style guide](https://github.com/bbatsov/clojure-style-guide).

Continuous linting with [clj-kondo](https://github.com/borkdude/clj-kondo)  significantly reduces a wide range of bugs and syntax errors as they happen, speeding up the development process.

> #### Hint::Additional code analysis tools
> [Eastwood](https://github.com/jonase/eastwood) also provides linting and is typically used as a batch process before a code commit or as part of continuous integration.
>
> Kibit provides suggestions to help ensure idiomatic Clojure.


## Test Driven Development and REPL Driven Development
Test Driven Development (TDD) and REPL Driven Development (RDD) complement each other as they both encourage incremental changes and continuous feedback.

RDD supports rapid design as different approaches can easily be explored and evaluated.   and tests focus the results of those experiments to guide delivery of the correct outcomes.

Tests provide an simple tool to define and test your assumptions from the evolving design and give you feedback when changes break that design.

![Clojure REPL driven development (RDD) and Test Driven Development (TDD)](https://raw.githubusercontent.com/practicalli/graphic-design/master/repl-tdd-flow.png)

[Unit tests](/testing/unit-testing/) should support the public API of each namespace in a project to help prevent regressions in the code.  Its far more efficient in terms of thinking time to define unit tests as the design starts to stabilize that as an after thought.

`clojure.test` library is part of the Clojure standard library that provides a simple way to start writing unit tests.

Clojure has a number of [test runners](/testing/test-runners/) available.


## Continuous Integration and Deployment
Wire up a [continuous integration service](/testing/integration-testing/) that runs tests and builds code on every shared commit (or every commit if you run a CI server locally).

[CircleCI](/testing/integration-testing/circle-ci/) provides a simple to use service that supports Clojure projects.

[Defining a deployment pipeline](https://practicalli.github.io/clojure-webapps/projects/banking-on-clojure/deployment-pipeline.html) provides an efficient way to deploy applications and also get fast feedback from a wider range of stakeholders and users, especially when spin up testable deployments of your application based on commits  (i.e. push to shared develop or feature branch).

Ideally the [deployment should run via continuous integration service](https://practicalli.github.io/clojure-webapps/projects/banking-on-clojure/deployment-via-ci.html) to ensure all tests pass before deployment.

![Git, CircleCI and Heroku continuous integration and deployment](https://practicalli.github.io/clojure-webapps/images/circleci-workflow-sequential-git-heroku.png)


> #### Hint::Tools that support Clojure development
> * [Circle CI](https://circleci.com/)
> * [GitHub Actions](https://github.com/features/actions)
> * [Heroku CI](https://devcenter.heroku.com/articles/heroku-ci)
> * [Heroku Pipelines](https://devcenter.heroku.com/articles/pipelines)
