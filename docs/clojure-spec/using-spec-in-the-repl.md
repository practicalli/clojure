# REPL Experiments with Clojure Spec

Run a [Clojure REPL with a rich terminal UI](/clojure/clojure-cli/repl/)

=== "Rebel"
    ```bash
    clojure -M:repl/rebel
    ```

=== "REPL Reloaded"
    ```bash
    clojure -M:repl/reloaded
    ```

Require the `clojure.spec.alpha` using an alias called `spec` to use functions from that namespace.

```clojure
(require '[clojure.spec.alpha :as spec])
```

Use `(in-ns 'namespace.name)` if you need to change into a specific namespace.


## Spec auto-completion

Using rebel-readline for the Clojure REPL will show autocompletion for all spec functions once the spec namespace has been required.

> Type `(spec /` and press `TAB` to list all the functions in the namespace.

![Clojure REPL - rebel readline autocompletion for spec](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-repl-rebel-require-spec-tab-function-autocompletion.png)

Typing a space character after the full name of a function shows the function signature with arguments that should be passed to that function.

![Clojure REPL - rebel readline spec conform function signature](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/cloure-repl-rebel-readline-spec-function-help-conform.png)


## Check data conforms to the specification

Use the `spec/conform` and `spec/valid?` functions to test if data matches a specification.  In these examples, predicate functions are used as a specification.

![Clojure REPL - rebel readline spec examples](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-repl-rebel-readline-spec-examples-conform-valid.png)


## Examples

`spec/conform` will return the value if it conforms to the specification, or `:clojure.spec.alpha/invalid` if the data does not conform.

!!! EXAMPLE "Clojure Spec - Conform values"
    ```clojure
    (spec/conform odd? 101)

    (spec/conform integer? 1)

    (spec/conform seq? [1 2 3])

    (spec/conform seq? (range 10))

    (spec/conform map? {})

    (spec/conform map? (hash-map :a 1 :b 2))
    ```

`spec/valid?` returns true or false

!!! EXAMPLE "Clojure Spec - validate values"
    ```clojure
    (spec/valid? even? 180)

    (spec/valid? string? "Am I a valid string")

    (spec/valid? (fn [value] (> value 10000)) 30076)

    (spec/valid? #(> % 10000) 30076)

    (spec/conform #(> % 10000) 30076)
    ```
