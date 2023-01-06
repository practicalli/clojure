# Design a map for name generation

Imagine you are writing a simple name generator that takes your name and creates an alternative version.  For example this could be a generator of your "Posh" or "Hipster" name.

> **Note** Define a data structure to model sloane names that has three names for every letter of the alphabet.  For name suggestions, see the [Tattler sloane name generator](http://www.tatler.com/news/articles/july-2015/sloane-name-generator).

<!--sec data-title="Reveal answer" data-id="answer001" data-collapse=true ces-->

The following seems to be the simplest way to model the sloane names.  This follows the representation in the original source material.

```clojure
(def sloane-first-name
  {"a" "Ally-Pally"
   "b" "Bongo"
   "c" "Chipper"})

(def slone-second-name
  {"a" "Anstruther"
   "b" "Beaufort"
   "c" "Cholmondeley"})

(def slone-third-name
  {"a" "Arbuthnot"
   "b" "Battenburg"
   "c" "Coutts"})
```

The following alternative data structure design is very simple and more concise, however it does loose some of the semantic meaning.  The position of the names is not defined in terms of the context of the problem.

```clojure
(def slone-names
  {:a ["Ally-Pally" "Anstruther" "Arbuthnot"]})
```

This next design removes some of the redundancy in defining each letter of the alphabet several times.  Apart from less typing and therefore reading by the development team, it also explicitly defines the semantic meaning of each name within the context of this problem.

```clojure
(def slone-names
  {:a {:first "Ally-Pally" :second "Anstruther" :third "Arbuthnot"}})
```
<!--endsec-->

For extra points you could try and implement a function that generated your sloane name.

<!--sec data-title="Reveal answer" data-id="answer002" data-collapse=true ces-->

## Creating the algorithm to construct your sloane name

* The first sloane name is chosen from the first character of the first name
* The second sloane name chosen from the first character of the second name
* The third sloane name is chosen from the second character of the second name

You can get the first element of a string by treating it just like a collection.  However this returns a character

```clojure
(first "Strings also act as collections")
```

A string can be converted to a keyword, a character cannot
```clojure
(keyword "a")
```

A character can be converted to a string using the str function
```clojure
(str (first "Strings also act as collections"))
```

The keywords need to be the same case, so convert the first character to lower case (which returns a string, so the explicit str function is no longer required.)

```clojure
(clojure.string/lower-case (first "Strings also act as collections"))
```

Putting it all together.
```clojure
(keyword (clojure.string/lower-case (first "Strings also act as collections")))
```

## Create a function to calculate your sloane name

Putting all this together in a function to generate your sloan name, given your a string with your first and last name.

```clojure
(defn sloane-name
  "Given a first and last name as a string, returns your equivalent Sloane name as a string"
  [name]
  (let [first-name  (keyword (clojure.string/lower-case (first (first (clojure.string/split name #" ")))))
        middle-name (keyword (clojure.string/lower-case (first (second (clojure.string/split name #" ")))))
        last-name   (keyword (clojure.string/lower-case (second (second (clojure.string/split name #" ")))))]
    (str (get-in slone-names [first-name  :first])
         " "
         (get-in slone-names [middle-name :second])
         " "
         (get-in slone-names [last-name   :third]))))
```

Supply a name that will test if the `sloane-name` function works

```clojure
(sloane-name "Billy Abstainer")
;; => "Bongo Anstruther Battenburg"
```

<!--endsec-->
