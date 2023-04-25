# Lists

  You can change lists with the `cons` function, see `(doc cons)` for details

(cons 5 '(1 2 3 4))

You will see that `cons` does not change the existing list, it create a new list that contains the number 5 and a link to all the elements of the existing list.

 You can also use cons on vectors `(cons 5 [1 2 3 4])`

```
(cons "fish" '("and" "chips"))

(conj '(1 2 3 4) 5)

(conj [1 2 3 4] 5)


;; Lets define a simple list and give it a name
(def list-one '(1 2 3))

;; the name evaluates to what we expect
list-one

;; If we add the number 4 using the cons function, then we
;; get a new list in return, with 4 added to the front (because thats how lists work with cons)
(cons 4 list-one)

;; If we want to keep the result of adding to the list, we can assign it a different name
(def list-two (cons 4 list-one))
;; and we get the result we want
list-two

;; we can also pass the original name we used for the list to the new list
(def list-one (cons 4 list-one))

;; If we re-evaluate the definition above, then each time we will get an extra
;; number 4 added to the list.

list-one

;; Again, this is not changing the original list, we have just moved the name
;; of the list to point to the new list.
;; Any other function working with this data structure before reassigning the name
;; will not be affected by the re-assignment and will use the unchanged list.

```
