# map with fn - anonymous function

> #### TODO::work in progress, sorry


```clojure
(map (fn [arg] (+ arg 5)) [1 2 3 4 5])
```

There is a syntactic short-cut for the anonymous function that does not require a name for the arguments

```#(+ %1 5)```

Adding this into our previous expression we can see that its still quite readable and helps keep the code clean.

```clojure
(map #(+ arg 5) [1 2 3 4 5])
```



> #### Hint::anonymous function naming
> Anonymous functions can not be referred to by name and must be used in-line with an expression.
> The `fn` function can be given a name, however, this is only available in the scope of that function definition, it cannot be used to refer to that function definintion outside of that defninition.  The name assingment within a `fn` definition enables the function to call itself, therefore creating an anonymous recursive function.
