# Run the REPL

  You can try out your new project in Clojure's run time environment, the REPL.

  Inside your project directory, `practicalli` run the following command:  

    lein repl 

  You will see a REPL prompt, where you can enter Clojure expressions for evaluation.  Lets try some simple Clojure:

    (+ 1 2)
    (str "Hello" " " "Clojure world")
    (def author "John Stevenson")
    author 

 
> **fixme** add some extra examples to try
   

## Reload changes from file 

If you do not have your editor connected to the REPL you can still reload changes made to files by reloading the changed namespace in the REPL.

Enter the following into the REPL, specifying your namespace

```clojure
(use 'your.namespace :reload)
```

You can also use https://github.com/clojure/tools.namespace, however, as refresh throws away the current namespace you have to enter both lines of code each time

```clojure
(use '[clojure.tools.namespace.repl :only (refresh)])

(refresh)
```

