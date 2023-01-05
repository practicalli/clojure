# REPL Driven Development

REPL driven development is the foundation of working with Clojure effectively.

The REPL is an instant feedback workflow that continually runs your code without the need to manually run an explicit compile-build-run cycle.

The REPL contains the live application to which you interact with by calling (evaluating) code.  A single expression can be called to focus in on its behavior and see the results.  Even when evaluating a whole namespace, each expression is evaluated by itself in turn, within the REPL process.

![Clojure repl driven development using Clojure aware editor](https://raw.githubusercontent.com/jr0cket/developer-guides/master/clojure/clojure-repl-driven-development-rebel-readline.png)

> #### Hint::Always run a REPL
> Coding with a REPL provides instant feedback as design decisions are coded.  The REPL feedback helps test the assumptions that are driving the design choices.  Important design choices should be codified in unit tests, optionally using spec.


* Read - code is read by the Clojure reader, passing any macros to the macro reader which converts those macros into Clojure code.

* Evaluate - code is compiled into the host language (e.g. Java bytecode) and executed

* Print - results of the code are displayed, either in the REPL or as part of the application.

* Loop - the REPL is a continuous process that evaluates code, either a single expression or the whole application.


## Evaluating source code

![Clojure repl driven development using Clojure aware editor](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-repl-driven-development-clojure-aware-editor.png){ align=right loading=lazy }

A REPL connected editor is the primary tool for evaluating Clojure code from source code files, displaying the results inline.

Source code is evaluated in its respective namespace, removing the need to change namespaces in the REPL directly, (`in-ns`), or use fully qualified names to call functions.

<iframe width="560" height="315" src="https://www.youtube.com/embed/rQ802kSaip4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



## Rich Comment blocks - living documentation

The `(comment ,,,)` function wraps code that is only run directly by the developer using a [Clojure aware editor](/clojure-editors/).

Expressions in rich comment blocks can represent how to use the functions that make up the namespace API.  For example, starting/restarting the system, updating the database, etc.  Expressions provide examples of calling functions with typical arguments and make a project more accessible and easier to work with.

![Practicalli Clojure Repl Driven Development - Rich comment blocks example](/images/practicalli-clojure-repl-driven-development-rich-comment-blocks.png)

Rich comment blocks are very useful for rapidly iterating over different design decisions by including the same function but with different implementations.  Hide [clj-kondo linter](/clojure-cli/install/install-clojure.html#clj-kondo-static-analyser--linter) warnings for redefined vars (`def`, `defn`) when using this approach.

```clojure
;; Rich comment block with redefined vars ignored
#_{:clj-kondo/ignore [:redefined-var]}
(comment
  (defn value-added-tax []
    ;; algorithm design - first try)

  (defn value-added-tax []
    ;; algorithm design - first try)

  ) ;; End of rich comment block
```

The "Rich" in the name is an honourary mention to Rich Hickey, the author and benevolent dictator of Clojure design.


## Design Journal

A journal of design decisions makes the code easier to understand and maintain.  Code examples of design decisions and alternative design discussions are captured, reducing the time spent revisiting those discussions.

Journals simplify the developer on-boarding processes as the journey through design decisions are already documented.

A Design Journal is usually created in a separate namespace, although it may start as a rich comment at the bottom of a namespace.

A journal should cover the following aspects

* Relevant expressions use to test assumptions about design options.
* Examples of design choices not taken and discussions why (saves repeating the same design discussions)
* Expressions that can be evaluated to explain how a function or parts of a function work

The design journal can be used to create meaningful documentation for the project very easily and should prevent time spent on repeating the same conversations.

> #### HINT::Add example journal
> [Design journal for TicTacToe game using Reagent, ClojureScript and Scalable Vector Graphics](https://github.com/jr0cket/tictactoe-reagent/blob/master/src/tictactoe_reagent/core.cljs#L124)


## Viewing data structures

Pretty Print show results of function calls in a human-friendly form. When results are data structures, pretty print makes it easier for a developer to parse and more likely to notice incorrect results.

[Clojure Data Browsers](/clojure-cli/data-browsers/) provide effective tools to navigate through a nested data structures and large data sets.

![Clojure - viewing large data sets](/images/spacemacs-clojure-inspect-java-lang-persistent-vector.png)


## Code Style and idiomatic Clojure

Clojure aware editors should automatically apply formatting that follows the [Clojure Style guide](https://github.com/bbatsov/clojure-style-guide).  For example, line comments as `;;`, 2 space indents and aligning forms.

Live linting with [clj-kondo](https://github.com/borkdude/clj-kondo) highlights a wide range of syntax errors as code is written, minimizing bugs and therefore speeding up the development process.

![clj-kondo static analysis for live linting of Clojure code](/images/spacemacs-clojure-linting-code-marks-and-flycheck-list-errors.png)

> The [Clojure Style guide](https://github.com/bbatsov/clojure-style-guide) provides examples of common formatting approaches, although the development team should decide which of these to adopt.  Emacs `clojure-mode` will automatically format code and so will Clojure LSP (via cljfmt).  These tools are configurable and should be tailored to the teams standard.


## Test Driven Development and REPL Driven Development

Test Driven Development (TDD) and REPL Driven Development (RDD) complement each other as they both encourage incremental changes and continuous feedback.

> Test Driven Development also works well with Hammock Time and spending more time thinking about what you want to do than typing lots of code.

* RDD enables rapid design experiments so different approaches can easily and quickly be evaluated .
* Unit tests focus the results of the REPL experiments to guide delivery of the correct outcomes. Tests also provide critical feedback when changes break that design.

![Clojure REPL driven development (RDD) and Test Driven Development (TDD)](https://raw.githubusercontent.com/practicalli/graphic-design/live/repl-tdd-flow.png)

[Unit tests](/testing/unit-testing/) should support the public API of each namespace in a project to help prevent regressions in the code.  Its far more efficient in terms of thinking time to define unit tests as the design starts to stabilize than as an after thought.

`clojure.test` library is part of the Clojure standard library that provides a simple way to start writing unit tests.

[Clojure spec](/clojure-spec/) can also be used for generative testing, providing far greater scope in values used when running unit tests.  Specifications can be defined for values and functions.

Clojure has a number of [test runners](/testing/test-runners/) available.  Kaocha is a test runner that will run unit tests and function specification checks.

With the power of the REPL, it is easy to get feedback on exactly how your code works.  Tests provide the codification of your evolving design and give you feedback when you break that design.

![Clojure REPL Driven Development and Test Driven Development](https://raw.githubusercontent.com/practicalli/graphic-design/live/repl-tdd-flow.png)

At some point before production you should have unit tests around the public API of each namespace in your project to catch regressions before committed.  It is much more efficient in terms of thinking time to create these tests as you stabilise the design that as an after thought.  So it makes sense to write these tests as part of the design process.

> #### Hint::Automate local test runner
> Use [kaocha](https://github.com/lambdaisland/kaocha) test runner in watch mode to run tests and specification check automatically (when changes are saved)
>
```bash
clojure -X:test/watch
```


## Continuous Integration and Deployment

Add a [continuous integration service](/testing/integration-testing/) to run tests and builds code on every shared commit (or every commit if you run a CI server locally).

Spin up testable deployments of your application or service based on pre-defined branch commits or every commit if you do not share branches (i.e. push to shared master or develop branch), eg. Heroku Pipelines.

* [CircleCI](/testing/integration-testing/circle-ci/) provides a simple to use service that supports Clojure projects.
* [GitHub actions](https://github.com/features/actions) and [GitLab](https://about.gitlab.com/) also provide CI services.
* [GitLab CI](https://docs.gitlab.com/ee/ci/introduction/index.html)
* [Deployment via continuous integration](https://practical.li/clojure-web-services/projects/banking-on-clojure/deployment-via-ci.html) ensures all tests pass before deployment.
* [Defining a deployment pipeline](https://practical.li/clojure-web-services/projects/banking-on-clojure/deployment-pipeline.html) provides an efficient way to deploy applications and also get fast feedback from a wider range of stakeholders and users, especially when spin up testable deployments of your application based on commits  (i.e. push to shared develop or feature branch).

![Git, CircleCI and Heroku continuous integration and deployment](https://practical.li/clojure-web-services/images/circleci-workflow-sequential-git-heroku.png)


## Live Coding with Data - Stuart Halloway

There are few novel features of programming languages, but each combination has different properties. The combination of dynamic, hosted, functional, extended Lisp in Clojure gives developers the tools for making effective programs. Less well understood are the ways in which Clojure's unique combination of features can yield a highly effective development process.

Over more than a decade, we have developed an effective approach to writing code in Clojure whose power comes from composing many of its key features. As different as Clojure programs are from e.g. Java programs, so to can and should be the development experience. You are not in Kansas anymore!

This talk presents a demonstration of the leverage you can get when writing programs in Clojure, with examples, based on my experiences as a core developer of Clojure and Datomic.

{% youtube %}
https://youtu.be/Qx0-pViyIDU
{% endyoutube %}
