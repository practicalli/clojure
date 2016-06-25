# Anonymous Functions 

An anonymous function is a function that has not been bound to a name.  These anonymous functions are used in-line in your code to save on writing a named function.

The value of using anonymous functions comes when there is a short, specific piece of behaviour required which is unlikely to be needed elsewwhere in the code.  

Anonymous functions are used within the scope of another function or when using the REPL for testing & designing functions.

## Definition of an anonymous function

```
(fn [argument] (str "some behaviour, typically using the aguments passed:" argument ))
```

This expression is a function call to `fn` which has the arguments called `argument`


## Evaluating an anonymous function

To get a value from evaluating this function you need to pass it a value (or anonther function) as an argument,  as well as calling it as a function by placing the anonymous function as the first element of a list.

```
((fn [arguments] (str "behaviour, typically using the aguments passed: " arguments )) "Is this the right room for an argument")
```


## Anonymous function Syntatic Sugar

There is a short form of the function definition using the `#( ,,, )` syntax.

For example, if we want to increment an argument we could start to define an anonymous function as follows:

```
#(inc %)
```

The `%` represents a placeholder for an argument that is passed into the anonymous function.  This argument is anonymous as well as the value is simply swapped into the position of `%`.

To evaluate this anonymous function we need to give it an argument to work on.  Anything after the anonymous function is taken as its argument.  So in the following expression we pass the value 1 as the argument and we should get the result of incrementing 1 as a result

```
( #(inc %) 1 )

;; => 2
```

The `%` placeholder can also refer to a specific argument by adding an index number.  The index numbers refer to the position of the arguments supplied to the anonymous function.

Here we will add two different arguments together 

```
( #(+ %1 %2) 20 22)
```

So `%1` will represent the first argument and the `%2` will represent the second argument passed to this function.


Sometimes position can be important as the following two versions of code demonstrate

```
( #(/ %1 %2) 24 6)

( #(/ %2 %1) 24 6)

```

These two expressions give different values (and return different types, Integer and Ratio) as the positions of the arguments have been reversed.
