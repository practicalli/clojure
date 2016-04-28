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
