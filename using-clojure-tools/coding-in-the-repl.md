# Coding in the REPL

> #### Hint::Use an Editor for Clojure Projects
> Using an editor (or ide) is a more effective way to develop projects, although having a command line REPL is very fast and convienient way to experiment and discover Clojure.


## Evaluating code
Type Clojure code at the REPL prompt, not forgetting to ensure your parens are balanced.  Press `Enter` to evaluate the code and see the result.  The REPL evaluates one expression at a time, although it remembers all expressions that correctly evaluate.  This enables your own function definitons to be called, until you end the REPL session.

![Clojure REPL clj evaluate map function](/images/clojure-repl-clj-eval-map-function.png)

Up / down arrow keys navigate the REPL history, providing an efficient way to evaluate the same or similar code many times.


## Including code from a file
Clojure can be saved in files and loaded into the REPL
```clojure
(load-file "src/practicalli/core.clj")
```

Once the file is loaded, the code it contains can be used by requiring the namespace that contains the code.  The namespace is the path to the file from under the `src` directory.  So the file `src/practicalli.core.clj` has the namespace `practicalli.core`
```clojure
(require 'practicalli.core)
```

Now the functions are available using their fully qualified names.  Assuming the namespace contains a function called `main`, that function can be called using `(practicalli.core/main)`.

If the default `user` namespace is change to `practicalli.core` then functions in that namespace can be called by just the function name, eg. `(main)`.

`in-ns` will change change the current namespace to the one specified as an argument.
```clojure
(in-ns 'practicalli.core)
```

Now the `(main)` function can be called without having to include the full namespace name.

The `:reload` option to `require` will load in any changes to a namespace that happened outside of the REPL, eg. change in the source code file.
* reloading a namespace
```clojure
(require 'namespace.name :reload)
```


> #### Hint::Workflow regardless of tooling
> An editor is typically used rather than the command line repl, however, the above workflow is still the same.


## Clojure projects
A REPL can start even without a Clojure project.

When a REPL starts from a Clojure project, the `deps.edn` configuration file is added to or over-rides the `~/.clojure/deps.edn` configuration for that project.
