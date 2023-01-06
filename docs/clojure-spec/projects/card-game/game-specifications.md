# Game specifications
Specifications for data used to represent players and the overall card game.

## Specification definition so far

```eval-clojure
(ns practicalli.card-game
  (:require [clojure.spec.alpha :as spec]
            [clojure.spec.gen.alpha :as spec-gen]
            [clojure.spec.test.alpha :as spec-test]))

(spec/def ::suit #{:clubs :diamonds :hearts :spades})
(spec/def ::rank (into #{:jack :queen :king :ace} (range 2 11)))
(spec/def ::playing-card (spec/tuple ::rank ::suit))
(spec/def ::dealt-hand (spec/* ::playing-card))
```

## Player specifications
The player name is a very simple spec.
```eval-clojure
(spec/def ::name string?)
```

Score will keep a running total of a player score across games, again a simple integer value.
```eval-clojure
(spec/def ::score int?)
```

A player is represented by a hash-map that contains their name, score and the hand they are currently dealt.  The hand is a collection of tuples representing a playing card.

```eval-clojure
(spec/def ::player
          (spec/keys
            :req [::name ::score ::dealt-hand]))
```


## Card game deck specifications
A card game has a deck of 52 cards, one card for each combination of suit and rank.

The size of the card deck changes over the course of a game, so the deck can contain any number of cards.  The deck must contain only cards to be valid.

```eval-clojure
(spec/def ::card-deck (spec/* ::playing-card))
```

At this stage in the design, a card game can have any number of players

```eval-clojure
(spec/def ::players (spec/* ::player))
```

A game is represented by a hash-map with a collection of players and a card deck

```eval-clojure
(spec/def ::game (spec/keys :req [::players ::card-deck]))
```


## Generating random player data

```eval-clojure
(spec-gen/generate (spec/gen ::player))
```
<!-- ;; => #:practicalli.spec-generative-testing{:name "Yp34KE63vAL1eriKN4cBt", :score 225, :dealt-hand ([9 :hearts] [4 :clubs] [8 :hearts] [10 :clubs] [:queen :spades] [3 :clubs] [6 :hearts] [8 :hearts] [7 :diamonds] [:king :spades] [:ace :diamonds] [2 :hearts] [4 :spades] [2 :clubs] [6 :clubs] [8 :diamonds] [6 :spades] [5 :spades] [:queen :clubs] [:queen :hearts] [6 :spades])} -->


## Generating random game data
`clojure.spec.alpha/gen` returns a generator for the given specification.

`clojure.spec.gen.alpha/generate` takes that generator and creates a random value that conforms to the specification.

```eval-clojure
(spec-gen/generate (spec/gen ::game))
```

`clojure.spec.gen.alpha/sample` will generate a collection of random values that each conform to the specification.

```eval-clojure
(spec-gen/sample (spec/gen ::game))
```
