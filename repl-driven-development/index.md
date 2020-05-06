# REPL Driven Development
REPL driven development is the foundation of working with Clojure.

The REPL is an instant feedback workflow that continually runs your code without the need of a separate compile-build-run cycle. The REPL contains your live application to which you interact with by calling(evaluating) code.

> #### Hint::Always run a REPL
> Coding with a REPL provides fast feedback as design decisions are encoded, giving every opportunity to testing assumptions driving those design choices.


<!-- * Read - code is read by the Clojure reader, passing any macros to the macro reader which converts those macros into Clojure code. -->

<!-- * Evaluate - code is compiled into the host language (e.g. Java bytecode) and executed -->

<!-- * Print - results of the code are displayed, either in the REPL or as part of the application. -->

<!-- * Loop - the REPL is a continuous process that evaluates code, either a single expression or the whole application. -->


## Evaluating source code
A REPL is typically used from an editor with files that compose the project code base.  A Clojure aware editor can evaluate code from the source code files to and display the results inline.

> #### TODO:: VSCode / Spacemacs examples
> Evaluate the current form and show the result. Showing results as comments is a great way to demonstrate the design of your code, especially in a journal.


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

> #### TODO::View large data sets screenshot/video


## Code Style and idiomatic Clojure
Your editor should automatically apply formatting that follows the [Clojure Style guide](https://github.com/bbatsov/clojure-style-guide).

Continuous linting with [clj-kondo](https://github.com/borkdude/clj-kondo)  significantly reduces a wide range of bugs and syntax errors as they happen, speeding up the development process.

> #### Hint::Additional code analysis tools
> [Eastwood](https://github.com/jonase/eastwood) also provides linting and is typically used as a batch process before a code commit or as part of continuous integration.
>
> Kibit provides suggestions to help ensure idiomatic Clojure.


## Test Driven Development and REPL Driven Development
Test Driven Development and REPL Driven Development work very well together.  There is a very natural merging of these approaches as they both encourage incremental changes and continuous feedback.

RDD is very useful for spikes and exploring different design approaches and tests focus the results of those experiments to guide delivery of the correct outcomes.

Test Driven Development also works well with Hammock Time, as you should spend more time thinking about what you want to do than typing in code.  Tests provide an easy way to define and test your assumptions of your well considered design

With the power of the REPL, it is easy to get feedback on exactly how your code works.  Tests provide the codification of your evolving design and give you feedback when you break that design.

At some point before production you should have unit tests around the public API of each namespace in your project to catch regressions before committed.  It is much more efficient in terms of thinking time to create these tests as you stabilise the design that as an after thought.  So it makes sense to write these tests as part of the design process.

> #### Hint::Automate local test runner
> Set up an automated test runner that will run on each file save
>
> [kaocha test runner](https://github.com/lambdaisland/kaocha) in [watch mode](https://cljdoc.org/d/lambdaisland/kaocha/1.0.629/doc/7-watch-mode)


## Continuous Integration and Deployment
Wire up a continuous integration server that runs tests and builds code on every shared commit (or every commit if you run a CI server locally).

Spin up testable deployments of your application or service based on pre-defined branch commits or every commit if you do not share branches (i.e. push to shared master or develop branch). .

> #### Hint::Tools
> * [Circle CI](https://circleci.com/)
> * [GitHub Actions](https://github.com/features/actions)
> * [Heroku CI](https://devcenter.heroku.com/articles/heroku-ci)
> * [Heroku Pipelines](https://devcenter.heroku.com/articles/pipelines)
