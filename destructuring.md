# Destructuring - abstract structural binding

Destructuring is a form of pattern matching where you return specific elements from a collection and assign those elements names.  It is commonly used in function parameter lists or with the `let` function.

Destructuring is also known as abstract structural binding


A simple example of destructuring is assigning the values of a collection, in this case a vector.

```clojure
(def co-ordinates [5 7])

(let [[x y] co-ordinates]
 (str "x:" x "y:" y))
;; => x: 5 y: 7
```

;; Sometimes we do not need all the information, so we can just use the elements we need.

```clojure
(def three-dee-co-ordinates [2 7 4])

(let [[x y] three-dee-co-ordinates]
  (str "I only need the 2D co-ordinates, X: " x " and Y: " y ))
;; => "I only need the 2D co-ordinates, X: 2 and Y: 7"
```


Its quite common to take the first element as a specific name and use another name for the rest of the elements

```clojure
(def shopping-list ["oranges" "apples" "spinach" "carrots" "potatoes" "beetroot"])

(defn get-item [items]
  (let [[next-item & other-items] items]
    (str "The next item to get is: " next-item)))

(get-item shopping-list)
;; => "The next item to get is: oranges"
```

This example seems a little redundant at first, however if we add recursion then we can iterate through the shoping list and it should make more sence


 splitting a vector into a head and a tail. When defining a function with an arglist** you use an ampersand. The same is true in destructuring.

(def indexes [1 2 3])


user=> (let [[x & more] indexes]
         (println "x:" x "more:" more))
x: 1 more: (2 3)

It's also worth noting that you can bind the entire vector to a local using the :as directive.

user=> (def indexes [1 2 3])
#'user/indexes

user=> (let [[x & more :as full-list] indexes]
         (println "x:" x "more:" more "full list:" full-list))
x: 1 more: (2 3) full list: [1 2 3]

Vector examples are the easiest; however, in practice I find myself using destructuring with maps far more often.

Simple destructuring on a map is as easy as choosing a local name and providing the key.

user=> (def point {:x 5 :y 7})
#'user/point

user=> (let [{the-x :x the-y :y} point]
         (println "x:" the-x "y:" the-y))
x: 5 y: 7

As the example shows, the values of :x and :y are bound to locals with the names the-x and the-y. In practice we would never prepend "the-" to our local names; however, using different names provides a bit of clarity for our first example. In production code you would be much more likely to want locals with the same name as the key. This works perfectly well, as the next example shows.

user=> (def point {:x 5 :y 7})
#'user/point

user=> (let [{x :x y :y} point]
         (println "x:" x "y:" y))
x: 5 y: 7

While this works perfectly well, creating locals with the same name as the keys becomes tedious and annoying (especially when your keys are longer than one letter). Clojure anticipates this frustration and provides :keys directive that allows you to specify keys that you would like as locals with the same name.

user=> (def point {:x 5 :y 7})
#'user/point

user=> (let [{:keys [x y]} point]
         (println "x:" x "y:" y))
x: 5 y: 7

There are a few directives that work while destructuring maps. The above example shows the use of :keys. In practice I end up using :keys the most; however, I've also used the :as directive while working with maps.

The following example illustrates the use of an :as directive to bind a local with the entire map.

user=> (def point {:x 5 :y 7})
#'user/point

user=> (let [{:keys [x y] :as the-point} point]
         (println "x:" x "y:" y "point:" the-point))
x: 5 y: 7 point: {:x 5, :y 7}

We've now seen the :as directive used for both vectors and maps. In both cases the local is always assigned to the entire expression that is being destructured.

For completeness I'll document the :or directive; however, I must admit that I've never used it in practice. The :or directive is used to assign default values when the map being destructured doesn't contain a specified key.

user=> (def point {:y 7})
#'user/point
 
user=> (let [{:keys [x y] :or {x 0 y 0}} point]
         (println "x:" x "y:" y))
x: 0 y: 7

Lastly, it's also worth noting that you can destructure nested maps, vectors and a combination of both.

The following example destructures a nested map

user=> (def book {:name "SICP" :details {:pages 657 :isbn-10 "0262011530"}})
#'user/book

user=> (let [{name :name {pages :pages isbn-10 :isbn-10} :details} book]
         (println "name:" name "pages:" pages "isbn-10:" isbn-10))
name: SICP pages: 657 isbn-10: 0262011530

As you would expect, you can also use directives while destructuring nested maps.

user=> (def book {:name "SICP" :details {:pages 657 :isbn-10 "0262011530"}})
#'user/book
user=> 
user=> (let [{name :name {:keys [pages isbn-10]} :details} book]
         (println "name:" name "pages:" pages "isbn-10:" isbn-10))
name: SICP pages: 657 isbn-10: 0262011530

Destructuring nested vectors is also very straight-forward, as the following example illustrates

user=> (def numbers [[1 2][3 4]])
#'user/numbers

user=> (let [[[a b][c d]] numbers]
  (println "a:" a "b:" b "c:" c "d:" d))
a: 1 b: 2 c: 3 d: 4

    Since binding forms can be nested within one another arbitrarily, you can pull apart just about anything -- http://clojure.org/special_forms

The following example destructures a map and a vector at the same time.

user=> (def golfer {:name "Jim" :scores [3 5 4 5]})
#'user/golfer

user=> (let [{name :name [hole1 hole2] :scores} golfer] 
         (println "name:" name "hole1:" hole1 "hole2:" hole2))
name: Jim hole1: 3 hole2: 5

The same example can be rewritten using a function definition to show the simplicity of using destructuring in parameter lists.

user=> (defn print-status [{name :name [hole1 hole2] :scores}] 
  (println "name:" name "hole1:" hole1 "hole2:" hole2))
#'user/print-status

user=> (print-status {:name "Jim" :scores [3 5 4 5]})
name: Jim hole1: 3 hole2: 5

There are other (less used) directives and deeper explanations available on http://clojure.org/special_forms and in The Joy of Clojure. I recommend both.

**(defn do-something [x y & more] ... )
Posted by Jay Fields at 7:44 AM Email ThisBlogThis!Share to TwitterShare to FacebookShare to Pinterest
Labels: clojure, destructuring
10 comments:

    fogus8:26 AM

    Nice post. One other note that naturally follows from the end of your post is that destructuring forms the basis of Clojure's named arguments:

    (defn print-status [& {name :name [hole1 hole2] :scores}]
    (println "name:" name "hole1:" hole1 "hole2:" hole2))

    (print-status :name "Joey" :scores [42 18])


    You can also use pre-conditions to check if certain arguments are passed in:


    (defn print-status [& {name :name [hole1 hole2] :scores}]
    {:pre [name]}
    (println "name:" name "hole1:" hole1 "hole2:" hole2))

    (print-status :scores [42 18])
    ; java.lang.AssertionError: Assert failed: name

    (print-status :name "Joey" :scores [42 18])
    ; name: Joey hole1: 42 hole2: 18


    :f
    Reply
    Jay Fields9:08 AM

    Good stuff Fogus, thanks.

    Cheers, Jay
    Reply
    Matt Todd5:31 PM

    Can you combine :as and :or et al?
    Reply
    Anonymous7:29 PM

    Yes, all the directives can be used at the same time.

    Cheers, Jay
    Reply
    Laurent PETIT3:08 AM

Hi, one note about using destructuring for function arguments : by doing so, you're quite explicitly establishing a more detailed contract with the consumer of the function. That is, you open the internals of the passed arguments.

Depending on the fact that the user may or may not be aware of the internals of the arguments, it may or may not be a good idea.

So I tend to think about the use of destructuring function arguments directly in the function signature, depending on whether the "layout" of the arguments of the function is part of the user API.
    Reply
    
    
    
---

Clojure Destructuring Tutorial and Cheat Sheet
==============================================

([Related blog post](http://john2x.com/blog/clojure-destructuring))

Simply put, destructuring in Clojure is a way extract values from a datastructure and bind them to symbols, without having to explicitly traverse the datstructure. It allows for elegant and concise Clojure code.

Vectors
-------

**Syntax:** `[symbol another-symbol] ["value" "another-value"]`

```clojure
(def my-vector [:a :b :c :d])
(def my-nested-vector [:a :b :c :d [:x :y :z]])

(let [[a b c d] my-vector]
  (println a b c d))
;; => :a :b :c :d

(let [[a _ _ d [x y z]] my-nested-vector]
  (println a d x y z))
;; => :a :d :x :y :z
```

You don't have to match the full vector.

```clojure
(let [[a b c] my-vector]
  (println a b c))
;; => :a :b :c
```

You can use `& the-rest` to bind the remaining part of the vector to `the-rest`. 

```clojure
(let [[a b & the-rest] my-vector]
  (println a b the-rest))
;; => :a :b (:c :d)
```

When a destructuring form "exceeds" a vector (i.e. there not enough items in the vector to bind to), the excess symbols will be bound to `nil`.

```clojure
(let [[a b c d e f g] my-vector]
  (println a b c d e f g))
;; => :a :b :c :d nil nil nil
```

You can use `:as some-symbol` as the *last two items* in the destructuring form to bind the whole vector to `some-symbol`

```clojure
(let [[:as all] my-vector]
  (println all))
;; => [:a :b :c :d]

(let [[a :as all] my-vector]
  (println a all))
;; => :a [:a :b :c :d]

(let [[a _ _ _ [x y z :as nested] :as all] my-nested-vector]
  (println a x y z nested all))
;; => :a :x :y :z [:x :y :z] [:a :b :c :d [:x :y :z]]
```

You can use both `& the-rest` and `:as some-symbol`.

```clojure
(let [[a b & the-rest :as all] my-vector]
  (println a b the-rest all))
;; => :a :b (:c :d) [:a :b :c :d]
```

### Optional arguments for functions

With destructuring and the `& the-rest` form, you can specify optional arguments to functions.

```clojure
(defn foo [a b & more-args]
  (println a b more-args))
(foo :a :b) ;; => :a :b nil
(foo :a :b :x) ;; => :a :b (:x)
(foo :a :b :x :y :z) ;; => :a :b (:x :y :z)

(defn foo [a b & [x y z]]
  (println a b x y z))
(foo :a :b) ;; => :a :b nil nil nil
(foo :a :b :x) ;; => :a :b :x nil nil
(foo :a :b :x :y :z) ;; => :a :b :x :y :z
```

Maps
----

**Syntax:** `{symbol :key, another-symbol :another-key} {:key "value" :another-key "another-value"}`

```clojure
(def my-hashmap {:a "A" :b "B" :c "C" :d "D"})
(def my-nested-hashmap {:a "A" :b "B" :c "C" :d "D" :q {:x "X" :y "Y" :z "Z"}})

(let [{a :a d :d} my-hashmap]
  (println a d))
;; => A D

(let [{a :a, b :b, {x :x, y :y} :q} my-nested-hashmap]
  (println a b x y))
;; => A B X Y
```

Similar to vectors, if a key is not found in the map, the symbol will be bound to `nil`.

```clojure
(let [{a :a, not-found :not-found, b :b} my-hashmap]
  (println a not-found b))
;; => A nil B
```

You can provide an optional default value for these missing keys with the `:or` keyword and a map of default values.

```clojure
(let [{a :a, not-found :not-found, b :b, :or {not-found ":)"}} my-hashmap]
  (println a not-found b))
;; => A :) B
```

The `:as some-symbol` form is also available for maps, but unlike vectors it can be specified anywhere (but still preferred to be the last two pairs).

```clojure
(let [{a :a, b :b, :as all} my-hashmap]
  (println a b all))
;; => A B {:a A :b B :c C :d D}
```

And combining `:as` and `:or` keywords (again, `:as` preferred to be the last).

```clojure
(let [{a :a, b :b, not-found :not-found, :or {not-found ":)"}, :as all} my-hashmap]
  (println a b not-found all))
;; => A B :) {:a A :b B :c C :d D}
```

There is no `& the-rest` for maps.

### Shortcuts

Having to specify `{symbol :symbol}` for each key is repetitive and verbose (it's almost always going to be the symbol equivalent of the key), so shortcuts are provided so you only have to type the symbol once.

Here are all the previous examples using the `:keys` keyword followed by a vector of symbols:

```clojure
(let [{:keys [a d]} my-hashmap]
  (println a d))
;; => A D

(let [{:keys [a b], {:keys [x y]} :q} my-nested-hashmap]
  (println a b x y))
;; => A B X Y

(let [{:keys [a not-found b]} my-hashmap]
  (println a not-found b))
;; => A nil B

(let [{:keys [a not-found b], :or {not-found ":)"}} my-hashmap]
  (println a not-found b))
;; => A :) B

(let [{:keys [a b], :as all} my-hashmap]
  (println a b all))
;; => A B {:a A :b B :c C :d D}

(let [{:keys [a b not-found], :or {not-found ":)"}, :as all} my-hashmap]
  (println a b not-found all))
;; => A B :) {:a A :b B :c C :d D}
```

There are also `:strs` and `:syms` alternatives, for when your map has strings or symbols for keys (instead of keywords), respectively.

```clojure
(let [{:strs [a d]} {"a" "A", "b" "B", "c" "C", "d" "D"}]
  (println a d))
;; => A D

(let [{:syms [a d]} {'a "A", 'b "B", 'c "C", 'd "D"}]
  (println a d))
;; => A D
```

### Keyword arguments for function

Map destructuring also works with lists (but not vectors).

```clojure
(let [{:keys [a b]} '("X", "Y", :a "A", :b "B")]
(println a b))
;; => A B
```

This allows your functions to have optional keyword arguments.

```clojure
(defn foo [a b & {:keys [x y]}]
  (println a b x y))
(foo "A" "B")  ;; => A B nil nil
(foo "A" "B" :x "X")  ;; => A B X nil
(foo "A" "B" :x "X" :y "Y")  ;; => A B X Y
```
