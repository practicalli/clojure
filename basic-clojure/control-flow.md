# Control Flow 

The following section of functions gives examples of control flow.  Many of these functions will be familiar to other syntax in non-functional programming languages.

As you gain more experience with Clojure, you will discover more functional ways to achieve the same (or better) results.


## If this then that, else the other

  Using the `if` funtion you can test if an expression evaluates to true.  If it is true, the first value is returned, if its false the second value is returned.
  
  Here is a simple example to see if one number is bigger that another

```clojure
(if (> 3 2) "Higher" "Lower")

=> "Higher"
```

```clojure
    (fn [x]
      (if (even? x)
        (inc x)
        (dec x)))
```

```
(doc if)
(doc if-not)
```

## When 

```clojure
    (when (> 3 2)
      (println "3 is greater than 2")
      "Higher")

=> 3 is greater than 2
=> "Higher"
```
  You can use Lighttable to see the docs for a function by placing the cursor over the function name and pressing `Cntrl-d` - or search the Clojure docs in the command window 
```
(doc when)
(doc when-not)
```


## Conditional - Case 

```clojure
(case (inc 3)
         3 "Uh oh"
         4 "Yep!"
         "Not so sure...")
```
```
"Yep!"
```

```clojure
(cond
         (= 4 (inc 2)) "(inc 2) is 4"
         (= 4 (/ 8 2)) "Cond picks the first correct case"
	 (zero? (- (* 4 2) 8) "This is true, but we won't get here"
         :otherwise "None of the above."
```
```
"Cond picks the first correct case"
```

```
(doc cond)
(doc condp)
```

## While

Do something while the condition is true

(while (condition) 
  (do something))
  
Here is a simple while example that uses a (mutable) counter and prints out the results to the repl window.

```clojure
;; create a counter using a mutable counter
(def counter (atom 10))

;; While the counter is positive (is a number greater than zero), print out the current value of the counter.
(while (pos? @counter)
  (do
    (println @counter)
    (swap! counter dec)))
```

> This example uses mutable state and causes a side effect by printing to the repl.  Both these kinds of things are typically kept to a minimum in Clojure.


## Loop & Recur 

There are also `loop` and `recur` functions in Clojure that can be used for control flow, however they are considered low level operations and higher order functions are typically used.

A common patter is to create a sequence of values (characters in a string, values in a map, vector, set or list) and apply one or more of clojure's sequence functions (doseq, dorun, take-while, etc.)

The following example reads the first username from /etc/passwd on unix like systems.

```clojure
(require '[clojure.java [io :as io]])

(defn char-seq
  "create a lazy sequence of characters from an input stream"
  [i-stream]
  (map char 
   (take-while
    (partial not= -1)
    (repeatedly #(.read i-stream)))))

;; process the sequence one token at a time
;; with-open will automatically close the stream for us 

(with-open [is (io/input-stream "/etc/passwd")]
  (doseq [c (take-while (partial not= \:) (char-seq is))]
    ;; your processing is done here
    (prn c)))

```

> Example taken from Stack Overflow http://stackoverflow.com/questions/1053926/clojure-while-loop
