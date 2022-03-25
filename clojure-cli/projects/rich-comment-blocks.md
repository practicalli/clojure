# Rich Comments for REPL Driven Development
<!-- TODO: rich comments for RDD examples required -->

The `(comment ,,,)` form is commonly used to contain living experimental code, so it is often referred to as a rich comment as its purpose is more than just commenting out code.


## Experimental design

Whilst iterating through designs, much experimental code can be created which is not (yet) ready to be part of the main namespace.

Experimental code can be written in a `(comment ,,,)` form to keep it separate from more finalised implementations.

When a namespace is evaluted, code within the `(comment ,,,)` form is not automatically loaded.

Most editors support evaluation of Clojure code within the `(comment ,,,)` form, allowing a range of design implementations to be evaluated against each other.

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


## Design Journal

When the problem domain or libraries selected are relatively unknown, a significant amount of learning and experimentation may be required.  This learning can be captured in a separate namespace, often referred to as a design journal.

Creating a journal of the decisions made as code is designed makes the project easier to understand and maintain.  Journals avoid the need for long hand-over or painful developer on-boarding processes as the journey through design decisions are already documented.

A design journal can be added as a `(comment ,,,)` section at the bottom of each namespace, or more typically in its own namespace.

A journal should cover the following aspects

* Relevant expressions use to test assumptions about design options.
* Examples of design choices not taken and discussions why (saves repeating the same design discussions)
* Expressions that can be evaluated to explain how a function or parts of a function work

The design journal can be used to create meaningful documentation for the project very easily and should prevent time spent on repeating the same conversations.

> #### HINT::Add example journal
> [Design journal for TicTacToe game using Reagent, ClojureScript and Scalable Vector Graphics](https://github.com/jr0cket/tictactoe-reagent/blob/master/src/tictactoe_reagent/core.cljs#L124)


## Snippets

[clojure-lsp](https://clojure-lsp.io/features/#snippets) contains a number of snippets to create variations of a comment form.

* `rich-comment` a basic comment form
* `rich-comment-rdd` comment form that informs clj-kondo to ignore duplicate function definitions, avoids warnings when testing multiple implementations of the same function
* `rich-comment-hotload` - comment form with [Clojure CLI library dependency hotloading via add-libs](/alternative-tools/clojure-cli/hotload-libraries.html)


## Migrating design to tests

Code within rich comment blocks is often a good source of code that can be put into formal unit tests, using `clojure.test`

![REPL Driven Development and Test Driven Development](https://raw.githubusercontent.com/practicalli/graphic-design/live/repl-tdd-flow.png)


## Live examples

A rich comment at the end of a namespace can include code that demonstrates how to use the key aspects of the namespace API.

![Rich Comments - living documentation of a namespace](https://practical.li/clojure/images/practicalli-clojure-repl-driven-development-rich-comment-blocks.png)
