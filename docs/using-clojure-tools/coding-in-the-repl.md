# Coding in the REPL

> #### Hint::Use an Editor for Clojure Projects
> Using an editor (or ide) is a more effective way to develop projects, although having a command line REPL is very fast and convenient way to experiment and discover Clojure.


## Evaluating code
Type Clojure code at the REPL prompt, not forgetting to ensure your parens are balanced.  Press `Enter` to evaluate the code and see the result.  The REPL evaluates one expression at a time, although it remembers all expressions that correctly evaluate.  This enables your own function definitions to be called, until you end the REPL session.

![Clojure REPL clj evaluate map function](/images/clojure-repl-clj-eval-map-function.png)

Up / down arrow keys navigate the REPL history, providing an efficient way to evaluate the same or similar code many times.


## Including code from a file

Clojure code is typically saved in files, with each file representing a specific namespace in the project.

A namespace is a collection of expressions that have a logical grouping within the project.

Any namespace on the class path can be included in the REPL using the [clojure.core/require](https://clojuredocs.org/clojure.core/require) function.

```clojure
(require 'practicalli.playground)
```

The `'` character is a short-cut for the quote function that wraps the namespace name, ensuring that only the symbol name of the namespace is passed to `require`.  The `require` function will take the symbol name and read in all the code from that namespace and evaluate each expression.

Functions defined in the required namespace are available using their fully qualified names.  Assuming the namespace contains a function called `greet`, that function can be called using `(practicalli.playground/greet)`.


> #### Hint::Loading a file into the REPL
> The [load-file](https://clojuredocs.org/clojure.core/load-file) function will read and evaluate the code in a given file, e.g. (load-file "src/practicalli/playground.clj")


### Changing to a namespace

Change the default `user` namespace to `practicalli.playground` and functions defined in that namespace can be called by just the function name, eg. `(greet)`.

`in-ns` will change change the current namespace to the one specified as an argument.

```clojure
(in-ns 'practicalli.playground)
```

Now the `(greet)` function can be called without having to include the full namespace name.

## Including changes from a file

The `:reload` option to `require` will load in any changes to a namespace that happened outside of the REPL, eg. change in the source code file.

```clojure
(require 'practicalli.playground :reload)
```


> #### Hint::Workflow regardless of tooling
> It is more effective to connect an editor to a REPL process, however, the above workflow is still the same.


## Clojure projects

A terminal UI REPL can start even without a Clojure project, e.g. `clojure -M:repl/rebel`.  In this case only the user level `deps.edn` and Clojure CLI configuration is used.

When a REPL starts from a Clojure project, the `deps.edn` configuration file in the root of the project directory is added to or over-rides the user level configuration.
