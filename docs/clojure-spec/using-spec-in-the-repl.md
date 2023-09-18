# REPL Experiments with Clojure Spec

??? HINT "Create a minimal Project"
    Clojure Spec can be tried without creating a Clojure project, although creating a project is useful if saving the Clojure Spec code experiments.

    Create a minimal Clojure project with a Clojure CLI deps.edn configuration.
    ```shell
    clojure -T:project/create :template practicalli/minimal :name practicalli/spec-experiments
    ```

Run a [Clojure REPL with a rich terminal UI](/clojure/clojure-cli/repl/)

=== "REPL Rebel"
    A REPL with a rich terminal UI
    ```shell
    clojure -M:repl/rebel
    ```

=== "REPL Reloaded"
    A REPL with a rich terminal UI and tools to support the [Practicalli REPL Reloaded workflow](/clojure/clojure-cli/repl-reloaded).
    ```shell
    clojure -M:repl/reloaded
    ```

Require the `clojure.spec.alpha` using an alias called `spec` to use functions from that namespace.

```clojure
(require '[clojure.spec.alpha :as spec])
```

> NOTE: `clojure.spec.alpha` is often aliased as `s`, although  Practicalli avoids

## Spec auto-completion

Using rebel-readline for the Clojure REPL will show autocompletion for all spec functions once the spec namespace has been required.

> Type `(spec /` and press `TAB` to list all the functions in the namespace.

![Clojure REPL - rebel autocompletion for spec functions](https://github.com/practicalli/graphic-design/blob/live/clojure/rebel/clojure-repl-rebel-completion-spec-light.png?raw=true#only-light){loading=lazy}
![Clojure REPL - rebel autocompletion for spec functions](https://github.com/practicalli/graphic-design/blob/live/clojure/rebel/clojure-repl-rebel-completion-spec-dark.png?raw=true#only-dark){loading=lazy}

Typing a space character after the full name of a function shows the function signature with arguments that should be passed to that function.

![Clojure REPL - rebel readline spec conform function signature](https://github.com/practicalli/graphic-design/blob/live/clojure/rebel/clojure-repl-rebel-eldoc-conform-light.png?raw=true#only-light){loading=lazy}
![Clojure REPL - rebel readline spec conform function signature](https://github.com/practicalli/graphic-design/blob/live/clojure/rebel/clojure-repl-rebel-eldoc-conform-dark.png?raw=true#only-dark){loading=lazy}

++ctrl++ ++"x"++ ++ctrl++ ++"d"++ displays the documentation for the current function 

![Clojure REPL - rebel readline spec conform documentation](https://github.com/practicalli/graphic-design/blob/live/clojure/rebel/clojure-repl-rebel-doc-spec-conform-light.png?raw=true#only-light){loading=lazy}
![Clojure REPL - rebel readline spec conform documentation](https://github.com/practicalli/graphic-design/blob/live/clojure/rebel/clojure-repl-rebel-doc-spec-conform-dark.png?raw=true#only-dark){loading=lazy}

![Clojure REPL - rebel readline spec valid? documentation](https://github.com/practicalli/graphic-design/blob/live/clojure/rebel/clojure-repl-rebel-doc-spec-valid-light.png?raw=true#only-light){loading=lazy}
![Clojure REPL - rebel readline spec valid? documentation](https://github.com/practicalli/graphic-design/blob/live/clojure/rebel/clojure-repl-rebel-doc-spec-valid-dark.png?raw=true#only-dark){loading=lazy}


## Check data conforms to specification

Use the `spec/conform` and `spec/valid?` functions to test if data matches a specification.  In these examples, predicate functions are used as a specification.

![Clojure REPL - rebel readline spec examples](https://github.com/practicalli/graphic-design/blob/live/clojure/rebel/clojure-repl-rebel-spec-expression-examples-light.png?raw=true#only-light)
![Clojure REPL - rebel readline spec examples](https://github.com/practicalli/graphic-design/blob/live/clojure/rebel/clojure-repl-rebel-spec-expression-examples-dark.png?raw=true#only-dark)


### Example expressions

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
