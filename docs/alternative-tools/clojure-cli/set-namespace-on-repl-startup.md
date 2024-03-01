# Set namespace on REPL startup

The REPL process does not evaluate project code on start-up.  If it did and that code had a error, it could prevent the REPL from starting.

The common approach is to require the main namespace for the project, making the functions in that namespace available.  This will also make available functions from those namespaces.

Switching to a specific namespace in the REPL allows calling functions by name, without the fully qualified name.


## Set namespace via the command line

To require and switch to a namespace on startup, use the `clojure` or `clj` commands with the --eval option to run the specific commands.  The --repl option will ensure the repl starts.

```shell
clj --eval "(require 'practicalli.random-clojure-core-function)" --eval "(in-ns 'practicalli.random-clojure-core-function)" --repl
```


`-r` or `(clojure.main/repl)` are the same as using the `--repl` option

```shell
clj -e "(ns foo.bar) (alter-var-root #'*ns* (constantly 'foo.bar))" -r
clj -e "(ns foo.bar) (alter-var-root #'*ns* (constantly 'foo.bar)) (clojure.main/repl)"
```


## Set namespace with Rebel Readline

Set the namespace using Rebel Readline alias from [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/)

```clojure
clj -M:lib/rebel -e "(ns foo.bar) (alter-var-root #'*ns* (constantly (find-ns 'foo.bar)))" -m rebel-readline.main

#object[clojure.lang.Namespace 0x46cf05f7 "foo.bar"]
[Rebel readline] Type :repl/help for online help info
foo.bar=>
```

The `:lib/rebel` alias adds the rebel library as a dependency without calling clojure main on the rebel namespace.  `alter-var-root` sets the namespace. The `-m` flag defines the namespace which Clojure main will run the `-main` function from, starting the rebel UI on the command line.

The `--eval` approach will be blocked if used with aliases that set the main namespace, such as `:repl/rebel`.


## Set namespace using an editor

It is not necessary to set the namespace when evaluating code in a Clojure aware editor.  Expressions are evaluated within the scope of the namespace in which they are defined.

Using an editor to evaluate Clojure is much simpler and quicker than using a command line REPL, especially when working with Clojure projects with more than one namespace.


<!-- ## Changing Namespaces using `dev/user.clj` -->
<!-- I am not sure it did in Leiningen projects either... -->
<!-- When using the REPL directly it can be changed into a specific namespace using the `in-ns` function. -->

<!-- Changing to the project namespace allows the `-main` namespace to be called -->
<!-- ```clojure -->
<!-- (ns user -->
<!--   :require [practicalli.project-namespace]) -->

<!-- (in-ns 'practicalli.project-namespace) -->

<!-- (-main) -->
<!-- ``` -->
