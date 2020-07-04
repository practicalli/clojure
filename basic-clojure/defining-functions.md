# Defining Functions
`clojure.core/defn ` defines a custom function that can be called from anywhere in the current namespace by just using the name.  A defined function can be called from where ever its namespace is required in other namespaces.

Here is a simple function definition that takes a number and divides it by two

```eval-clojure
    (defn half-a-number
      "Divide a given number by 2"
      [number]
      (/ number 2))
```

Once you have defined a function, you can call it by using the function name as the first element of a list, `()`.  Any other elements in the list are arguments passed to the function.

```eval-clojure
    (half-a-number 4)
```


## Understanding the `defn` syntax
The standard form of `defn`:
```clojure
(defn name doc-string? attr-map? [params*] prepost-map? body)
```

**name** is a symbol used to call the function.

**doc-string?** is an optional string used to provide a meaningful description of the function definition.  This description is the living documentation of the function and can be accessed via `clojure.repl/doc** functions and Clojure aware editors.

**attr-map?** is an optional map for pre-conditions for a function.

**[params*]** is a zero or more vector of symbols that represent the arguments passed to a function.  The number of symbols defined must be matched when calling the function, or an exception will occur.

**prepost-map?** an optional map for post-conditions for a function.

**body** is the algorithm that will evaluate when the function is called.


There is a second form of the `defn` function, one which responds differently based on the number of arguments used to call the function (polymorphic).

```clojure
(defn name doc-string? attr-map?
  ([params*] prepost-map? body) + attr-map?)
```

[Thinking Functionally / Polymorphism](/thinking-functionally/ploymorphism.md) has examples of using defn to define polymorphic functions


## Breaking down the defn syntax

The syntax `defn` is what we call a macro, it is a simpler way to write clojure code that does the same thing.

You can think of defining a function with `defn` as two steps

1. Give the function a name - using the `def` syntax
2. Define the functions behaviour and arguments it takes - using the `fn` syntax

Here is the same function if you typed it out in full

```clojure
    (def half-a-number
      (fn [number]
        (/ number 2)))
```

> #### Hint::Macroexpand functions
> The `macroexpand-1` function takes an expression that includes one or more macros and returns the expanded version of Clojure code. The `macroexpand-all` will also expand macros into Clojure code, doing so recursively for all macros it finds.
>
> Clojure editors also provide evaluation functions that will macroexpand.
