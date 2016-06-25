# Higher Order functions

Functions can be used as an arguments to other functions.  This is possible because a function always evaluates to a value.

It is also stated that higher order functions should return a function, usually when thinking in [typed lambda calculus](https://en.wikipedia.org/wiki/Typed_lambda_calculus) although some dispute this requirement.

> **Note** Create a named function as a higher order function, which adds a value to a number twice 

<!--sec data-title="Higher order function to add a number twice" data-id="answer001" data-collapse=true ces-->

```
(defn twice [function x]
  (function (function x)))

(twice #(+ % 3) 7) ;13
```
<!--endsec-->


> **Note** Return the even numbers from 1 to 10

<!--sec data-title="Return the even numbers between 1 and 10" data-id="answer002" data-collapse=true ces-->

```
(filter
 even?
 (range 1 10))

```

<!--endsec-->

