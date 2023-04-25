# Anonymous Functions

`clojure.core/fn` is a function for defining custom functions.

`fn` is called the anonymous function as it has no external name by which it can be referred by. They are used within the scope of another function call, as having no name they cannot be called from another part of the code.

```clojure
(map (fn [args] ,,,) [1 2 3])
((fn [args] ,,,))
```

The value of using anonymous functions comes when there is a short, specific piece of behaviour required which is unlikely to be needed elsewhere in the code.  An anonymous function can always be refactored into a `defn` expression if used in multiple places.

## Definition of an anonymous function

```clojure
(fn [argument] (str "some behaviour, typically using the arguments passed:" argument ))
```

This expression is a function call to `fn` which has the arguments called `argument`

## Calling an anonymous function

To get a value from evaluating this function you need to pass it a value (or another function) as an argument,  as well as calling it as a function by placing the anonymous function as the first element of a list.

```
((fn [arguments] (str "behaviour, typically using the arguments passed: " arguments )) "Is this the right room for an argument")
```

## Binding a local names

`fn` can have a local name which can be used to write a recursive function (a fn that calls itself).

Adding a name also helps with debugging code, as the name will be used to identify that function call if it appears in a stack trace of an exception.

A recursive function that counts the elements in a collection

```clojure
(fn -count [xs]
  (if (empty? xs)
    0
    (inc (-count (rest xs)))))
```

```clojure
(fn meaningful-name
  []
  (str "If I fail, you will know my name"))
```

## Anonymous function Syntactic Sugar

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
