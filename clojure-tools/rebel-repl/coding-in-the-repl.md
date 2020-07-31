# Coding in the REPL
Starting a REPL is a fast way to start experimenting with Clojure.  Clojure code can be typed into the REPL directly and the result instantly returned.  Code can also be evaluated from a file, allowing

## Evaluating code
Type Clojure code at the REPL prompt, e.g `(map inc [1 2 3 4 5])`.  Press `Enter` to evaluate the code and see the result.

![Clojure REPL clj evaluate map function](/images/clojure-repl-clj-eval-map-function.png)

{{ book.KeyUpArrow }} and {{ book.KeyDownArrow }} navigate the REPL history, providing an efficient way to evaluate the same code many times, ore .


## Including code from a file
Clojure code is usually saved in files and each file has a namespace definition that matches the file path, using the `ns` function. The file `src/practicalli/application.clj` has the namespace `practicalli.application`

```clojure
(ns practicalli.application)
```

Requiring the namespace of a file will evaluate the code from that file in the REPL.

```clojure
(require 'practicalli.application)
```

Functions from the file can be called using their fully qualified names.  Assuming the namespace contains a function called `main`, that function can be called using `(practicalli.application/main)`.


## Changing namespaces
If the default `user` namespace is change to `practicalli.application` then functions in that namespace can be called by just the function name, eg. `(main)`.

`in-ns` will change change the current namespace to the one specified as an argument.
```clojure
(in-ns 'practicalli.application)
```

Now the `(main)` function can be called without having to include the full namespace name.

## Reloading code changes from a file
The `:reload` option to `require` will load in any changes to a namespace that happened outside of the REPL, eg. using an editor to change the source code in the file.

```clojure
(require 'practicalli.application :reload)
```

When using an editor that is not connected to the Clojure REPL, then reloading is an effective way of updating the code with all the changes saved in the file.

> #### Hint::Workflow regardless of tooling
> An [editor connected a a Clojure REPL](/clojure-editors/) is typically used rather than typing into the command line REPL directly.  Regardless of tooling though, the above workflow is still the same.


## Clojure projects
A REPL can start without creating a Clojure project, however, libraries of code are easily added when a project is created.

[Clojure Tools - create projects](/create-projects.html) covers how to create projects.

Or jump to [simple projects](/simple-projects) to start writing example applications.
