# Higher Order functions

Functions can be used as an arguments to other functions as we have seen in function composition.  This is possible because a function always evaluates to a value.  This is the basis of function composition.

Higher Order functions can also return a function definition, as when that function definition is evaluated it to will return a value.

You could have a function that returns a function definition which in turn returns a function definition, but at some point this will get very confusing for the developers (yes, that means you).


> #### Note::Return the even numbers from 1 to 10
> Generate a range of numbers from 1 to 10
>
> Use a function that checks if a number is even
> and filter the range of numbers to return only the numbers that match
```clojure

```

<!--sec data-title="Return the even numbers between 1 and 10" data-id="answer002" data-collapse=true ces-->

```
(filter
 even?
 (range 1 10))

```

<!--endsec-->



> #### Note::Create a named function as a higher order function called `twice`
> The function twice which takes a function and value as arguments.
>
> The twice function should call the function passed as an argument on the value passed as an argument.
>
> The result should be then used as an argument to calling the function passed as an argument again.
>
> Call the twice function with an inline function which takes a number as an argument and adds it to Pi, `3.14`.
```clojure
(defn twice [f]
  ,,,)
```


<!--sec data-title="Higher order function to add a number twice" data-id="answer001" data-collapse=true ces-->

```
;; Our higher order function

(defn twice [function x]
  (function (function x)))

(twice
  (fn [arg]
    (* 3.14 arg))
  21)
;; => 207.0516

;; using the short syntax for a function definition

(twice #(+ 3.14 %) 21)
;; => 207.0516
```
<!--endsec-->


> #### Note::Define a function that returns a function
>
> The function should take a clojure.core function for a mathematical calculation, i.e. `+`, `-`, `*`, `/`
>
> The returning function should take one or more arguments `[& args]`
> and use the function originally passed as an argument to `reduce` the data to a single value.
```clojure
(defn calculation [f]
  ,,,)
```

<!--sec data-title="Higher order function that returns a function definition" data-id="answer003" data-collapse=true ces-->

```
(defn calculation [f]
  (fn [& args]
    (reduce f args)))

((calculation +) 1 1 2 3 5 8 13)

;; The result of `(calculation +)` is also in a list,
;; so it will be called as a function, with the arguments 1 1 2 3 5 8 13
```
<!--endsec-->




# References
* [Writing Elegant Clojure code using Higher Order functions](http://christophermaier.name/blog/2011/07/07/writing-elegant-clojure-code-using-higher-order-functions)
