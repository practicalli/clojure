# Set namespace on REPL startup



## Require and set namespace on REPL start
The REPL does not evaluate project code on start-up.  If it did and that code had a error, it may prevent the REPL from starting.

Standard practice is to required the main namespace for the project, then switch the REPL to that namespace.  The functions for the project are now available.

### Via the command line
To require and switch to a namespace on startup, use the `clojure` or `clj` commands with the --eval option to run the specific commands.  The --repl option will ensure the repl starts.
```shell
clj --eval "(require 'practicalli.random-clojure-core-function)" --eval "(in-ns 'practicalli.random-clojure-core-function)" --repl
```

The --eval approach will be blocked if used with aliases that set the main namespace, such as `:rebel`.

Alternative approach - either of these expressions in the command line
```shell
clj -e "(ns foo.bar) (alter-var-root #'*ns* (constantly 'foo.bar))" -r
clj -e "(ns foo.bar) (alter-var-root #'*ns* (constantly 'foo.bar)) (clojure.main/repl)"
```


## Require and set namepace with Rebel Readline
Set the namespace
```clojure
clj -R:rebel -e "(ns foo.bar) (alter-var-root #'*ns* (constantly (find-ns 'foo.bar)))" -m rebel-readline.main
#object[clojure.lang.Namespace 0x46cf05f7 "foo.bar"]
[Rebel readline] Type :repl/help for online help info
foo.bar=>
```

Using the `-R` flag to pull in the rebel dependecies without running the main namespace.  Then run the expression to set the specific namespace.  Then set the main namespace for rebel which will run its -main function.


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
