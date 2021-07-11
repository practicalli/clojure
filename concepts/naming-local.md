# Naming - local scope


## Local names in functions
  You can define names for things within the scope of a function using the `let` function.


### Example

You can use the let function to define a simple expression, for which everyting will go out of scope once it has been evaluated

```
(let [local-name "some value"])
(let [minutes-in-a-day (* 60 60 24)])
```

You can also use `let` inside a function to do something with the arguments passed to that function.  Here we calculate the hourly-rate from a yearly salary, returning the calculated-rate.


(defn hourly-rate [yearly-salary weeks-in-year days-in-week]
  (let [calculated-rate (/ yearly-salary weeks-in-year days-in-week)]
    calculated-rate))

(hourly-rate 60000 48 5)
```



## Local names in data structures

  When defining a map you are creating a series of key value pairs.  The key is essentially a name that represents the value it is paired with.  Keys are often defined using a `:keyword`.

```clojure
  {:radius 10, :pi 22/7 :colour purple}

  (def my-circle {:radius 10, :pi 22/7 :colour purple})
```

> **Fixme** This is incorrect, as a Clojure keyword type (a name starting with :) have global scope within a namespace.  If the keys were strings, then they would have the scope of just the collection.
