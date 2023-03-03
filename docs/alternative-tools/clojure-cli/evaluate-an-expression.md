# Evaluating an expression with Clojure CLI tools
An expression is a piece of Clojure code that can be evaluated and return a result

This expression calls the `+` function with the arguments `1 2 3 4 5`.  As this code works, we get a result.

```clojure
(+ 1 2 3 4 5)
```


Using the `-e` option an expression can be passed to the Clojure CLI tools and a value returned


```bash
clojure -e (+ 1 2 3 4 5)
```


## Expressions returning `nil`
If the expressing used returns a value of `nil`, a legal value in Clojure, then no result is printed out.


## When to use this?
`clojure -e` is a quick way to see what an expression does without having to set anything up (although starting a REPL is very little extra effort).

Using the `-e` option is useful for running simple scripts written in Clojure, especially on servers and remote environments.

The lack of return value for nil is very useful when using Clojure CLI tools to evaluate Clojure code within another script.
