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



> #### Hint::Anonymous function name
> Anonymous functions do not have an externally referable name, so must be used in-line with an expression.
>
> The `fn` function can be defined with a name, however, this is only available in the scope of that function definition, the name cannot be used to refer to that function outside of its definition.
>
> Including a name within a `fn` definition enables the function to call itself, therefore creating an anonymous recursive function.
