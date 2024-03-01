# Card game: spec and generative testing

Define a data specification that represent a deck of playing cards, adding functional specifictations to check the values passed to the functions use to play a card game.

spec generators are used to return varied sample data from those specifications. Function definitions are instrumented and check for correct arguments when those functions are called.

## Create a new project

Create a new Clojure project using `:project/create` from [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) or add an alias definition of your choosing to the Clojure CLI user configuration.

```shell
clojure -T:project/create :template app :name practicalli/card-game
```

Open the `src/practicalli/card_game.clj` file and require the `clojure.spec.alpha` namespace

```clojure
(ns practicalli.card-game.clj
  (:require [clojure.spec.alpha :as spec]))
```

## Playing card specifications

A playing card has a face value and a suit. There are 4 suits in a card deck.

A specification for the possible suits can be defined using literal values

```clojure
(spec/def ::suits #{:clubs :diamonds :hearts :spades})
```

Define a predicate function to check a value conforms to the spec using the pattern matching that is build-in to the Clojure `set` data type.

```clojure
(def suits? #{:clubs :diamonds :hearts :spades})
```

### Card game decks

[Suits from different regions](https://en.wikipedia.org/wiki/Playing_card_suit) are called by different names.  Each of these suits can be their own spec.

```clojure
(spec/def ::suits-french #{:hearts :tiles :clovers :pikes})
(spec/def ::suits-german #{:hearts :bells :acorns :leaves})
(spec/def ::suits-spanish #{:cups :coins :clubs :swords})
(spec/def ::suits-italian #{:cups :coins :clubs :swords})
(spec/def ::suits-swiss-german #{:roses :bells :acorns :shields})
```

A composite specification called `::card-suits` provides a simple abstraction over all the variations of suits.  Using `::card-suits` will be satisfied with any region specific suits.

```clojure
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

### Define an alias

Jack queen king are called face cards in the USA and occasionally referred to as court cards in the UK.

Define a spec for `::face-cards` and then define `:court-cards` and alias

```clojure
(spec/def ::face-cards #{:jack :queen :king :ace})
(spec/def ::court-cards ::face-cards)
```

Any value that conforms to the `::face-card` specification also conforms to the `::court-cards` specification.

```clojure
(spec/conform ::court-cards :ace)
```

### Playing card rank

Each suit in the deck has the same rank of cards explicitly defining a rank

```clojure
(spec/def ::rank #{:ace 2 3 4 5 6 7 8 9 10 :jack :queen :king})
```

Rank can be defined more succinctly with the `clojure.core/range` function.  The expression `(range 2 11)` will generates a sequence of integer numbers from 2 to 10 (the end number is exclusive, so 11 is not in the sequence).

Using `clojure.core/into` this range of numbers can be added to the face card values.

```clojure
(into #{:ace :jack :queen :king} (range 2 11))
```

The `::rank` specification now generates all the possible values for playing cards.

```clojure
(spec/def ::rank (into #{:ace :jack :queen :king} (range 2 11)))
```

The specification only checks to see if a value is in the set, the order of the values in the set is irrelevant.

### Playing Card

A playing card is a combination of suit and face value, a pair of values, referred to as a tuple.

Clojure spec has a `tuple` function, however, we need to define some predicates first

```clojure
(spec/def ::playing-card (spec/tuple ::rank ::suits ))
```

Use the spec with values to see if they conform.  Try you own values for a playing card.

```clojure
(spec/conform ::playing-card [:ace :spades])
```

### Game specs

Define specifications for data used to represent players and the overall card game.

The player name is a very simple spec.

```clojure
(spec/def ::name string?)
```

Score will keep a running total of a player score across games, again a simple integer value.

```clojure
(spec/def ::score int?)
```

A player is represented by a hash-map that contains their name, score and the hand they are currently dealt.  The hand is a collection of tuples representing a playing card.

```clojure
(spec/def ::player
          (spec/keys
            :req [::name ::score ::dealt-hand]))
```

### Game deck specs

A card game has a deck of 52 cards, one card for each combination of suit and rank.

The size of the card deck changes over the course of a game, so the deck can contain any number of cards.  The deck must contain only cards to be valid.

```clojure
(spec/def ::card-deck (spec/* ::playing-card))
```

At this stage in the design, a card game can have any number of players

```clojure
(spec/def ::players (spec/* ::player))
```

A game is represented by a hash-map with a collection of players and a card deck

```clojure
(spec/def ::game (spec/keys :req [::players ::card-deck]))
```

## Generative data from Specifications

Clojure spec can generate random data which conforms to a specification, highly useful in testing Clojure code with a wide variety of values.

* `clojure.spec.alpha/gen` returns a generator for the given specification.
* `clojure.spec.gen.alpha/generate` takes that generator and creates a random value that conforms to the specification.
* `clojure.spec.gen.alpha/sample` will generate a collection of random values that each conform to the specification.

Require the clojure spec namespaces to make use of their functions.

```clojure
(ns practicalli.card-game.clj
  (:require [clojure.spec.alpha :as spec]
            [clojure.spec.gen.alpha :as spec-gen]
            [clojure.spec.test.alpha :as spec-test]))

(spec/def ::suits #{:clubs :diamonds :hearts :spades})
(spec/def ::rank #{:ace 2 3 4 5 6 7 8 9 10 :jack :queen :king})
```

To generated data based on a specification, first get a generator for a given spec,

```clojure
(spec/gen ::suits)
```

`generate` will return a value using the specific generator for the specification.

```clojure
(spec-gen/generate (spec/gen ::suits))
```

`sample` will generate a number of values from the given specification

```clojure
(spec-gen/sample (spec/gen ::rank))
```

### Card Game data

Generate a random value for the `::player` specification

```clojure
(spec-gen/generate (spec/gen ::player))
```

??? EXAMPLE
    Expected output from `generate`
    ```clojure
    #:practicalli.spec-generative-testing
    {:name "Yp34KE63vAL1eriKN4cBt",
     :score 225,
     :dealt-hand ([9 :hearts] [4 :clubs] [8 :hearts] [10 :clubs] [:queen :spades] [3 :clubs] [6 :hearts] [8 :hearts] [7 :diamonds] [:king :spades] [:ace :diamonds] [2 :hearts] [4 :spades] [2 :clubs] [6 :clubs] [8 :diamonds] [6 :spades] [5 :spades] [:queen :clubs] [:queen :hearts] [6 :spades])}

```

Generate a random value for the `::game` specification

```clojure
(spec-gen/generate (spec/gen ::game))
```

Generate a collection of random values that each conform to the specification.

```clojure
(spec-gen/sample (spec/gen ::game))
```

## Function Specifications

A function specification can contain a specification for the arguments, the return values and the relationship between the two.

The specifications for the function may be composed from previously defined data specifications.

```clojure
(ns practicalli.card-game
  (:require [clojure.spec.alpha :as spec]
            [clojure.spec.gen.alpha :as spec-gen]
            [clojure.spec.test.alpha :as spec-test]))

(spec/def ::suit #{:clubs :diamonds :hearts :spades})
(spec/def ::rank (into #{:jack :queen :king :ace} (range 2 11)))
(spec/def ::playing-card (spec/tuple ::rank ::suit))
(spec/def ::dealt-hand (spec/* ::playing-card))

(spec/def ::name string?)
(spec/def ::score int?)
(spec/def ::player (spec/keys :req [::name ::score ::dealt-hand]))
(spec/def ::card-deck (spec/* ::playing-card))
(spec/def ::players (spec/* ::player))
(spec/def ::game (spec/keys :req [::players ::card-deck]))
```

### Function definition

The card game application has three functions to start with.

```clojure
(defn regulation-card-deck
  "Generate a complete deck of playing cards"
  [{:keys [::deck ::players] :as game}]
  (apply + (count deck)
         (map #(-> % ::delt-hand count) players)))
```

At the start of function design, the algorithm may still be undefined.  Using the specifications and generators mock data can be returned as a placeholder.

```clojure
(defn deal-cards
  "Deal cards to each of the players
   Returns updated game hash-map"
  [game]
  (spec-gen/generate (spec/gen ::game)))
```

```clojure
(defn winning-player
  "Calculate winning hand by comparing each players hand
  Return winning player"
  [players]
  (spec-gen/generate (spec/gen ::player)))
```

??? EXAMPLE
    The expected form of a player won game:

    ```clojure
      #:practicalli.player-won
      {:name      "Jenny Nada",
       :score     225,
       :dealt-hand [[9 :hearts] [4 :clubs] [8 :hearts] [10 :clubs] [:queen :spades]]}
    ```

### Spec definitions

Define a function specification for the `deal-cards` function

* argument must be of type `::game`
* return type is `::game`
* function applies arguments to a game and returns the game

```clojure
(spec/fdef deal-cards
  :args (spec/cat :game ::game)
  :ret ::game
  :fn #(= (regulation-card-deck (-> % :args :game))
          (regulation-card-deck (-> % :ret))))
```

Define a function specification for the `winning-player` function

* argument must be of type `::players`
* return type is `::players`

```clojure
(spec/fdef winning-player
  :args (spec/cat :players ::players)
  :ret ::player)
```

## Instrument functions

Instrumenting functions will wrap a function definition and check the arguments of any call to the instrumented function.

```clojure
(spec-test/instrument `deal-cards)
```

Calling the `deal-cards` function with an incorrect argument returns an error that describes where in the specification the error occurred.

```clojure
(deal-cards "fake game data")
```

Error in an easier to read format

```clojure
ERROR: #error
 {:message "Call to #'practicalli.card-game/deal-cards did not conform to spec:\n\
 "fake game data\" - failed:
 map? in: [0] at: [:args :game] spec: :practicalli.card-game/game\n",
 :data {:cljs.spec.alpha/problems
 [{:path [:args :game],
   :pred cljs.core/map?,
   :val "fake game data",
   :via [:practicalli.card-game/game :practicalli.card-game/game],
   :in [0]}],
 :cljs.spec.alpha/spec #object[cljs.spec.alpha.t_cljs$spec$alpha17968],
 :cljs.spec.alpha/value ("fake game data"),
 :cljs.spec.alpha/args ("fake game data"),
 :cljs.spec.alpha/failure :instrument}}
```

### Organizing function instrumentation

Instrumenting functions creates a wrapper around the original function definition.

When you change the function definition and evaluate the new code, it replaces the instrumentation of the function.  Therefore each time a function is redefined it should be instrumented.

There is no specific way to manage instrumenting a function, however, a common approach is to define a collection of functions to instrument, then use a helper function to instrument all the functions at once.

Bind a name to the collection of function specifications.

```clojure
(def ^:private function-specifications
  [`card-game/deal-cards
   `card-game/winning-player])
```

Define a simple helper function to instrument all the functions in the collection.

```clojure
(defn instrument-all-functions
  []
  (spec-test/instrument function-specifications))
```

Refactoring the code may involve a number of changes benefit from instrumentation being switched off until its complete.  The `unstrument` function will remove instrumentation from all the functions in the collection.

```clojure
(defn unstrument-all-functions
  []
  (spec-test/unstrument function-specifications))
```

!!! HINT "Koacha Test Runner can include functional specifications"
    [Koacha test runner](https://cljdoc.org/d/lambdaisland/kaocha/CURRENT/doc/1-introduction) can manage the testing of function specifications and is especially useful for managing unit level testing with specifications.
