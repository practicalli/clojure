# Calling Functions

  To call a function in Clojure you use the name of the function as the first element of a list.  
  
  In this simple example, a function is defined that takes no arguments, then that function is called.

```clojure
(defn my-function []
  (str "I only return this string"))
  
(my-function)
```

  Functions can be defined to take arguments. 

## Arity 

  This is the term to describe the number of arguments a function takes.  This can be a fixed number or variable number of arguments.  
  
  Simple polymorphism can also be used to have one function take different numbers of arguments, as with the `multi-arity` function in the examples below.


```clojure
(defn single-arity [] 
  (str "I do not take any arguments"))

(defn single-arity [argument] 
  (str "I take 1 argument only"))

(defn triple-arity [argument1 argument2 argument3] 
  (str "I take 3 arguments only"))

(defn multi-arity 
 ([argument] 
   (str "I match 1 argument only"))
 ([argument1 argument2]
   (str "I match when 2 arguments are used")))
   
(defn variable-arity [argument & more-arguments]
  (str "I assign the first argument to argument, 
        all other arguments to more-arguments"))
```

---
