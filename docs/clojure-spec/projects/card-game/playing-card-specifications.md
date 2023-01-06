# Representing playing cards as specifications
<!-- Klipse: Set namespace and require clojure spec -->
<pre class="hidden">
  <code class="lang-eval-clojure"
  data-preamble="(ns practicalli.card-game (:require [clojure.spec.alpha :as spec]))">
  </code>
</pre>


A playing card has a face value and a suit. There are 4 suits in a card deck.

A specification for the possible suits can be defined using literal values

```eval-clojure
(spec/def ::suits #{:clubs :diamonds :hearts :spades})
```

As the set is a predicate then it could just be bound to a name, i.e. `(def suits? #{:clubs :diamonds :hearts :spades})`


## Representing different aspects of card game decks
[Suits from different regions](https://en.wikipedia.org/wiki/Playing_card_suit) are called by different names.  Each of these suits can be their own spec.

```eval-clojure
(spec/def ::suits-french #{:hearts :tiles :clovers :pikes})
```

```eval-clojure
(spec/def ::suits-german #{:hearts :bells :acorns :leaves})
```

```eval-clojure
(spec/def ::suits-spanish #{:cups :coins :clubs :swords})
```

```eval-clojure
(spec/def ::suits-italian #{:cups :coins :clubs :swords})
```

```eval-clojure
(spec/def ::suits-swiss-german #{:roses :bells :acorns :shields})
```

A composite specification called `::card-suits` provides a simple abstraction over all the variations of suits.  Using `::card-suits` will be satisfied with any region specific suits.

```eval-clojure
(spec/def ::card-suits
  (spec/or :french ::suits-french
           :german ::suits-german
           :spanish ::suits-spanish
           :italian ::suits-italian
           :swiss-german ::suits-swiss-german
           :international ::suits-international))
```


<!-- TODO: check if a deck contains 4 suits -->
<!-- TODO: check if a deck is one of the regions above -->


## Define an alias for a specification
Jack queen king are called face cards in the USA and occasionally referred to as court cards in the UK.

Define a spec for ::face-cards and then make ::court-cards and alias for ::face-cards
```eval-clojure
(spec/def ::face-cards #{:jack :queen :king :ace})
```

```eval-clojure
(spec/def ::court-cards ::face-cards)
```

Any value that conforms to the `::face-card` specification also conforms to the `::court-cards` specification.
```eval-clojure
(spec/conform ::court-cards :ace)
```


## Playing card rank
Each suit in the deck has the same rank of cards explicitly defining a rank

```eval-clojure
(spec/def ::rank #{:ace 2 3 4 5 6 7 8 9 10 :jack :queen :king})
```

rank can be defined more succinctly with the `clojure.core/range` function.  The expression `(range 2 11)` will generates a sequence of integer numbers from 2 to 10 (the end number is exclusive, so 11 is not in the sequence).

Using `clojure.core/into` this range of numbers can be added to the face card values.

```eval-clojure
(into #{:ace :jack :queen :king} (range 2 11))
```

The `::rank` specification now generates all the possible values for playing cards.
```eval-clojure
(spec/def ::rank (into #{:ace :jack :queen :king} (range 2 11)))
```
The specification only checks to see if a value is in the set, the order of the values in the set is irrelevant.


## Playing Cards
A playing card is a combination of suit and face value, a pair of values, referred to as a tuple.

Clojure spec has a `tuple` function, however, we need to define some predicates first

```eval-clojure
(spec/def ::playing-card (spec/tuple ::rank ::suits ))
```

Use the spec with values to see if they conform.  Try you own values for a playing card.
```eval-clojure
(spec/conform ::playing-card [:ace :spades])
```
