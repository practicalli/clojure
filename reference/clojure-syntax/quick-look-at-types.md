# A quick look at types

  As we mentioned before, underneath Clojure lurks Java byte code so there are going to be types in Clojure.  However, Clojure being a dynamic language, most of the time you can just let Clojure manage the types for you.
  
> **Hint** When you run Clojure on a different host platform, eg. .Net or Javascript (via Clojurescript), Clojure will use the types of that host platform.
  
  Should you want to know the type of something you are working on, you can use two functions, `type` and `class`.

> **Note** Discover the class or type of some common Clojure code 

```clojure 
(class 1)
(class 1.1)
(class "")
(class true)
(class false)
(class nil)

(class ())
(class (list 1 2 3 4))
(class (str 2 3 4 5))
(class (+ 22/7))

(type [1 2 3])
(type {:a 1 :b 2})
(type (take 3 (range 10)))
```

![](../images/clojure-playground-types-examples.png)

> **Hint** If you cant live without static type checking, look at [core.typed](http://typedclojure.org/), a type system for Clojure all in one library

