Clojure quick guide
====================

Simple clojure stuff
====================

; what version of clojure are we using?
(clojure-version)

; understanding what something does
(doc doc)
(source doc)


**Prefix Notation**

; Basic prefix notaition examples
(* 2 2)
(+ 1 2 3)
(\ 24 4 3 2)
(\ 2 4)
(\ 2.0 4)
(+ (* 4 5) 22)
(+ 4 (* 3 2) 7)
(+ 3 (* 2 (- 7 2) 4) (/ 16 4))

(+ 3 3)
(- 3 3)
(- 2 3)
(+ 1 2 3 4 5 6)

; showing the advantage of prefix notaition for helping you
; follow the values of the expression

(+ 1 2 (+ 1 2) (* 2 2) (/ 25 5) (- (- 12 18)))


;; Prefix makes understanding the evaluation order much simpler and consistent than infix notation used in languages such as Java, C++ and C#.

;; Prefix notation is one example where clojure can minimise the amount of cerimony (typing) involved in coding.




**Ratio**

; Using the division function (/ ) shows another interesting characteristic of Clojure, the fact that it is lazy.  This is not lazy in a bad way, but lazy evaluation of data structures.  This actually helps to make clojure more efficient at dealing with data, especially very large data sets.

(/ 10 3)
10/3

(/ 10 3.0)
3.3333333333333335

(/ 22 7)
22/7

(/ 22 7.0)
3.142857142857143


(/ 2 4)
(/ 2.0 4)
(/ 1 3)
(/ 1.0 3)
(class (/ 1 3)

;; Using a Ratio means that the mathmatical division is not evaluated when using whole numbers (Integers) that would produce a decimal number.  If you do return a decimal number then what precision of decimal are you expecting.  By specifying one or more of the numbers as a decimal value you are giving Clojure a precision to infer and can therefore provide a specific decimal result.


;; example of Java integration - PI is a static double from the java.lang.Math object
http://docs.oracle.com/javase/6/docs/api/java/lang/Math.html

(. Math PI)
3.141592653589793

; An interesting aside is that 22 divided by 7 is not the same value as pie, but a close approximation to it.




What class is that...

(class (str "Jr0cket"))

(class (defn hello-world [name] (str "Hello cruel world")))


The type function will return the metadata or class of something.




defining functions
==================

(def square (fn [x] (* x x)))

(fn [x] (* x x))  ;; annonymous function



Using functions with functions
==============================

(map inc [1 2 3 4])

(2 3 4 5)


(defn hello-world [name] (println(str "Hello " name)))

(hello-world "jr0cket")



Data Structures
===============

; There are four data structure types in Clojure:
* List - an ordered linked list
* Vector - an array
* Map - a key value pair
* Set - an ordered set

The most commonly used are the vector and map.

(doc list)

(doc vector)


(doc map)

(doc set)

(set [2 3 4 5])







Coin toss
=========

(defn coin-toss []
  (= 1 (rand-int 2)))

(defn toss-score [toss]
  (if toss 1 -1))


user=> (toss-score true)
1
user=> (toss-score false)
-1
user=> (toss-score (coin-toss))
-1
user=> (toss-score (coin-toss))
1

(repeatedly 5 coin-toss)
(true true false false true)




Whats my salary
===============
;; really bad example of Clojure code

(whats-my-monthly-takehome 60000)
(whats-my-yearly-takehome 60000)


Interesting stuff
=================


(defonce name value) ; only define this name once, even when recompiled



Caves of clojure
================
Shows a terminal in either text or swing

http://stevelosh.com/blog/2012/07/caves-of-clojure-01/


Quil
===
Coloured-balls - lein run - displays coloured balls
CljBoids - lein run - follows the mouse around - uses atoms, quite involved code



Recursion
=========
(defn recursive-counter [value]
  (print value)
  (if (< value 1000)
    (recur (+ value 4))))

(recursive-counter 100)


(defn recursive-counter [value]
  (println value)
  (if (< value 1000)
    (recur (+ value 100))))

(recursive-counter 100)



To Sort
=======

(whats-my-monthly-takehome 60000)
(whats-my-yearly-takehome 60000)


(type rand-int)

(doc rand-int)

(class "jr0cket")


(class
  (defn hello-world [name]
    (str "Hello cruel world")))


;;(javax.swing.JOptionPane/showMessageDialog nil
    "Hello Java Developers")

(Math/cos 3)




(println "Clojure for java developers")

(list 1 2 3 4)

(def me {:name "john"
     :twitter "@jr0cket"} )

(println me)


(type(/ 10 3))
(/ 22.7 7.0)
(. Math PI)

(type 7.0)
(type 7)

(type (list 1 2 3 4))

(type (defn square [x]
  (* x x)))



Code to show off LightTable
===========================


(+ 1 2)

(def person {:name "John" :twitter "@jr0cket"})

(println person)

(use 'whats-my-salary.core)

(yearly-takehome? 35000)

(source yearly-takehome?)

(class yearly-takehome?)


(def random-data [1 2 3 (rand-int 5)])

(type (rand-int 5))


(conj (list 1 2 3)(list 4 5 6))

(conj [1 3] [2 4])

(doc cons)
