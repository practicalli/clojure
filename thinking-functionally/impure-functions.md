# Impure functions

We have seen some simple examples of pure functions, so lets see impure functions as a comparison.

```
(def global-value '(5 4 3 2 1))

(defn impure-increment-numbers [number-collection]
  (map inc global-value))

(impure-increment-numbers '(1 2 3 4 5))
```

The above function is using a global value rather than the argument passed makes this function undeterministic


## Side Effect: Printing to the console log

Although the following example is probably quite harmless, it is a simple example of a function effecting the state of something outside.  These side effects should be avoided where possible to keep your code simpler to reason about.

```
(defn print-to-console [value-to-print]
  (println "The value is:" value-to-print))

(print-to-console "a side effect")
```


## Side Causes: Calling libraries

To demonstrate a side causes form of impure functions, lets create a task-comple function that marks a current task complete using the current timestamp.

```
(:import java.util.Date)

(defn task-complete [task-name]
  (str "Setting task " task-name " completed on " (java.util.Date.)))

(task-complete "hack clojure")
```

> **Hint** The function `(java.util.Date.)` is actually a call to instantiate a java.util.Date object.  The fullstop character at the end of the name makes it a function call and is the short form of `(new java.util.Date)`

In this example we have called to the outside world to generate a value for us. The above example is fairly simple, however by calling the outside world rather than passing in a date it makes the functions purpose far less clear.

> **Note** Re-write the task-complete function to take both the task-name and completed-date as arguments.

<!--sec data-title="Reveal answer..." data-id="answer001" data-collapse=true ces-->
```
(:import java.util.Date)

(defn task-complete [task-name completed-date]
  (str "Setting task " task-name " completed on " completed-date))

(task-complete "hack clojure" (java.util.Date.))
```

Required values should be generated outside a function where possible.  In this case in the `(java.util.Date.)` function is first evaluated and replaced by its value, then that date value is passed to the function as an argument, keeping the function pure.

<!--endsec-->
