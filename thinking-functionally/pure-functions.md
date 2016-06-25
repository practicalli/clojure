# Pure functions

A function is considered pure if it causes no side effects as well as not being affected by other functions.

When you pass arguments to a function and that function returns a value without interacting with any other part of the system, then that function is considered pure.

Should something from outside a function be allowed to affect the result of evaluating a function, or if that function be allowed to affect the outside world, then its an impure function.

![Pure function basic concept](/images/functional-programming-concepts-pure-function.png)


So lets look at a simple code example



> **Note** Write a pure function that adds two numbers together ?

<!--sec data-title="Add two numbers" data-id="answer001" data-collapse=true ces-->
```
(defn increment-numbers [number1 number2]
  (+ number1 number2))

(increment-numbers 1 2)
```

Lets look at each line of this suggested answer

```
(defn increment-numbers [number1 number2]   ;; function takes 2 arguments
  (+ number1 number2))                      ;; function uses both arguments for result

(increment-numbers 1 2)                     ;; specific values are passed as arguments
```
<!--endsec-->


# An example with map

> **Note** Define a collection called numbers and write a named function that increments each number of the numbers collection.

> Is your function pure or impure ?

<!--sec data-title="Increment elements in a Collection by one" data-id="answer002" data-collapse=true ces-->

Impure function example.

```
(def numbers '(5 4 3 2 1))

(defn increment-numbers []
  (map inc numbers))

(impure-increment-numbers)

```
The function takes no arguments and is pulling in a value from outside the function.  This is a trivial example, but if all your code is like this it would be more complex.

Here is a Pure function example

```
(def numbers '(5 4 3 2 1))

(defn impure-increment-numbers [number-collection]
  (map inc number-collection))

(impure-increment-numbers numbers)

```

In this example we are explicitly passing the number collection to the function.  The function works on passed value and returns a predictable result.


```
(def numbers '(5 4 3 2 1))

(defn impure-increment-numbers [numbers]
  (map inc numbers))

(impure-increment-numbers numbers)

```

In this example we still have a pure function, as the name numbers in the `(map inc numbers)` expression uses the value of numbers taken from the argument and not the more global `(def numbers ...)`

<!--endsec-->



# Another example (not currently working, sorry)

This example needs fixing, you could try with staff-salaries as just a vector [300 344 5000], but the code still needs tweeking a little

<!--sec data-title="Update Salary" data-id="answer003" data-collapse=true ces-->

(def staff-salaries {:bob 30000 :carol 34000 :jane 42000})

(defn salary-updates [staff-pay]
  (map #(+ % 5000)))

(salary-updates staff-salaries)

<!--endsec-->
