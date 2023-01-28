# Coding in the REPL

Starting a REPL is a fast way to start experimenting with Clojure.  Clojure code can be typed into the REPL directly and the result instantly returned.  Code can also be evaluated from a project allowing pre-written code to be run.

!!! HINT "Clojure Editors are the main tool for writing code"
    An [editor connected a a Clojure REPL](/clojure-editors/) is far more effective for writing code than typing into the command line REPL directly.  Evaluating code in an editor will automatically use the correct namespace.


## Evaluating code

Type Clojure code at the REPL prompt, e.g `(map inc [1 2 3 4 5])`.  Press `Enter` to evaluate the code and see the result.

![Clojure REPL clj evaluate map function](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/rebel/clojure-repl-rebel-eval-map-function-dark.png#only-dark)
![Clojure REPL clj evaluate map function](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/rebel/clojure-repl-rebel-eval-map-function-light.png#only-light)

++arrow-up++ and ++arrow-down++ navigate the REPL history, providing an efficient way to evaluate the same code many times.

Typing part of function name shows matches available, ++tab++ to cycle through the choices, ++enter++ to select.

![Clojure REPL rebel readline - example of autocompletion](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/rebel/clojure-repl-rebel-function-autocomplete-map-dark.png#only-dark)
![Clojure REPL rebel readline - example of autocompletion](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/rebel/clojure-repl-rebel-function-autocomplete-map-light.png#only-light)


## Including code from a file

Clojure code is usually saved in files and each file has a namespace definition that matches the file path, using the `ns` function. The file `src/practicalli/playground.clj` has the namespace `practicalli.playground`

```clojure
(ns practicalli.playground)
```

Requiring the namespace of a file will evaluate the code from that file in the REPL.

```clojure
(require 'practicalli.playground)
```

Functions from the file can be called using their fully qualified names.  Assuming the namespace contains a function called `main`, that function can be called using `(practicalli.playground/main)`.


## Changing namespaces

If the default `user` namespace is change to `practicalli.playground` then functions in that namespace can be called by just the function name, eg. `(main)`.

`in-ns` will change change the current namespace to the one specified as an argument.

```clojure
(in-ns 'practicalli.playground)
```

Now the `(main)` function can be called without having to include the full namespace name.


## Reloading code changes from a file

The `:reload` option to `require` will load in any changes to a namespace that happened outside of the REPL, eg. using an editor to change the source code in the file.

```clojure
(require 'practicalli.playground :reload)
```

When using an editor that is not connected to the Clojure REPL, then reloading is an effective way of updating the code with all the changes saved in the file.


## Clojure projects

A REPL can run without a Clojure project, however, libraries and code are simpler to manage within project source and configuration files.

[Clojure projects guide](/clojure/clojure-cli/projects.md){.md-button}

Or jump to [simple projects](/clojure/simple-projects/) to start writing example applications.
