# Model name generation map

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

The following alternative data structure design is very simple and more consise, however it does loose some of the semantic meaning.  The position of the names is not defined in terms of the contenxt of the problem.

```clojure
(def slone-names
  {:a ["Ally-Pally" "Anstruther" "Arbuthnot"]})
```

This next design removes some of the redundancy in defining each letter of the alphabet several times.  Apart from less typing and therefore reading by the development teeam, it also explicitly defines the semantic meaning of each name within the context of this problem.

```clojure
(def slone-names
  {:a {:first "Ally-Pally" :second "Anstruther" :third "Arbuthnot"}})
```

<!--endsec-->
