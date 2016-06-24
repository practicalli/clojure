# Defining Funtions

  Here is a simple function definition that takes a number and divides it by two

```clojure
    (defn half-a-number 
      "Divide a given number by 2"
      [number]
      (/ number 2))
```

  Once you have defined a function, you can call it by using the function name as the first element of a list

```Clojure
    (half-a-number 4)
```

## Breaking down the defn syntax  

  The syntax `defn` is what we call a macro, it is a simpler way to write clojure code that does the same thing.  
  
  You can think of defining a function with `defn` as two steps
  
  1) Give the function a name - using the `def` syntax
  2) Define the functions behaviour and arguments it takes - using the `fn` syntax

  Here is the same function if you typed it out in full
  
```clojure
    (def half-a-number
      (fn [number]
        (/ number 2)))
```

> **fixme** is it too soon to show macroexpand ?
