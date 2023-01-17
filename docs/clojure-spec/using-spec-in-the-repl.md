# Using Clojure Spec in the REPL
Clojure 1.10.x or greater includes the clojure.spec.alpha library.  `clojure -Sdescribe` in a terminal will show the version of Clojure.

Run a Clojure REPL in a terminal window from your operating system using [rebel readline](https://github.com/bhauman/rebel-readline).

```bash
clojure -M:repl/rebel
```

> #### Hint::Rebel Alias in practicalli/clojure-deps
> The [practicalli/clojure-deps](/clojure/clojure-cli/install/community-tools.md) repository includes the `:repl/rebel` alias to run a rebel readline powered Clojure REPL.  Alternative use `clj` if you have `rlwrap` installed or `clojure` to run a basic Clojure REPL UI.


Require the `clojure.spec.alpha` using an alias called `spec` to use functions from that namespace.

```clojure
(require '[clojure.spec.alpha :as spec])
```

Use `(in-ns 'namespace.name)` if you need to change into a specific namespace.

## Spec auto-completion
Using rebel-readline for the Clojure REPL will show autocompletion for all spec functions once the spec namespace has been required.

Type `(spec /` and press `TAB` to list all the functions in the namespace.

![Clojure REPL - rebel readline autocompletion for spec](/images/clojure-repl-rebel-require-spec-tab-function-autocompletion.png)

Typing a space character after the full name of a function shows the function signature with arguments that should be passed to that function.

![Clojure REPL - rebel readline spec conform function signature](/images/cloure-repl-rebel-readline-spec-function-help-conform.png)


## Check data conforms to the specification
Use the `spec/conform` and `spec/valid?` functions to test if data matches a specification.  In these examples, predicate functions are used as a specification.

![Clojure REPL - rebel readline spec examples](/images/clojure-repl-rebel-readline-spec-examples-conform-valid.png)


## Try examples in the REPL
`spec/conform` will return the value if it conforms to the specification, or `:clojure.spec.alpha/invalid` if the data does not conform.

```clojure
(spec/conform odd? 101)

(spec/conform integer? 1)

(spec/conform seq? [1 2 3])

(spec/conform seq? (range 10))

(spec/conform map? {})

(spec/conform map? (hash-map :a 1 :b 2))
```

`spec/valid?` returns true or false

```clojure
(spec/valid? even? 180)

(spec/valid? string? "Am I a valid string")

(spec/valid? (fn [value] (> value 10000)) 30076)

(spec/valid? #(> % 10000) 30076)

(spec/conform #(> % 10000) 30076)
```
