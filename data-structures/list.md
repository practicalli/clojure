# List

  The list is used extensively in Clojure, it is a List (List Processing) language after all.  The unique thing about lists is that the first element is always evaluated as a function call, therefore lists are most commonly used for defining and calling functions.  
  
  Lists are sometimes used as a data structure and have a linear lookup time.  Its more common to use vectors and maps which typically offer quicker access as they can be looked up via an index or key.

> **Note** Explore the list data structure and discover which line of code fails.  Try work out why that line of code fails.

```clojure
(list 1 2 3 4)
(list -1 -0.234 0 1.3 8/5 3.1415926)
(list "cat" "dog" "rabit" "fish")
(list :cat 1 "fish" 22/7 (str "fish" "n" "chips"))
(list 1 2 "three" [4] five '(6 7 8 9))
(list )

( 1 2 3 4)

(quote (1 2 3 4))
'(1 2 3 4)

;; Duplicate elements in a list ?
(list 1 2 3 4 1)
(list "one" "two" "one")
(list :fred :barney :fred)
```


> **Commnet** As you read about the List data structure, remember that in Clojure everything is a list and the first element of a list is evaluated as a function call. 

We can create a list using the `list` function

(list 1 2 3 4)

This evaluates to `(1 2 3 4)`

We can give this result a name 

(def my-list (list 1 2 3 4))

Then when we evaluate my-list it will return the list as a result

However, if we create a list directly by using `(1 2 3 4)`, this will fail when evaluated as 1 is not a function.  So when we define a data structure as a list we need to use the quote function or ' syntax

(quote (1 2 3 4))
'(1 2 3 4)



<!-- Clojure through code -->


;; list ()
;; a general set of elements with a sequential lookup time

;; you can use the list function to create a new list
(list 1 2 3 4)
(list -1 -0.234 0 1.3 8/5 3.1415926)
(list "cat" "dog" "rabit" "fish")

;; you can use any "types" in your list or any other Clojure collection
(list :cat :dog :rabit :fish)

;; you can mix types because Clojure is dynamic and it will work it out later,
;; you can even have functions as elements, because functions always return a value
(list :cat 1 "fish" 22/7 (str "fish" "n" "chips"))


;; further examples of mixing types
(def five 5)

(list )
(list 1 2 3 4)
(list 1 2 "three" [4] five '(6 7 8 9))

(1 2 3 4)

'(+ 1 2 3 4)

(quote (1 2 3 4))

;; one unique thing about lists is that the first element is always evaluated as a function call,
;; with the remaining elements as arguments.

;; So, defining a list just using () will cause an error

;; This list definition will fail, unless you have defined a function called 1
(1 2 3 4)  ;;fail

;; There is a special function called quote that tells Clojure to just treat the
;; list as data.

(quote (1 2 3 4))

;; This syntax is actually more code to type than (list 1 2 3 4),
;; so there is a shortcut for the quote function using the ' character

'(1 2 3 4)
'(-1 -0.234 0 1.3 8/5 3.1415926)
'("cat" "dog" "rabit" "fish")
'(:cat :dog :rabit :fish)
'(:cat 1 "fish" 22/7 (str "fish" "n" "chips"))

;; The quote shortcust is uses where ever you have a list that you want to treat just as data.
;; Another example is when you are including functions from other namespaces
;;(ns my-namespace.core
;;  use 'my-namespace.library)

<!-- end of clojure through code -->




#### Properties of lists 


#### Common functions working on lists 


conj
cons 
