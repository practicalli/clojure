# Specifications for function definitions
Specifications for the function definitions can be defined, using the specifications previously defined where relevant.

A function specification can contain a specification for the arguments, the return values and the relationship between the two.

<!-- Klipse reagent include to generate SVG graphics - hidden as not relevant at this point -->
<pre class="hidden">
  <code class="lang-eval-clojure"
  data-preamble="
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
">
  </code>
</pre>

## Function definitions
The card game application has three functions to start with.

```eval-clojure
(defn regulation-card-deck
  "Generate a complete deck of playing cards"
  [{:keys [::deck ::players] :as game}]
  (apply + (count deck)
         (map #(-> % ::delt-hand count) players)))
```

At the start of function design, the algorithm may still be undefined.  Using the specifications and generators mock data can be returned as a placeholder.

```eval-clojure
(defn deal-cards
  "Deal cards to each of the players
   Returns updated game hash-map"
  [game]
  (spec-gen/generate (spec/gen ::game)))
```

```eval-clojure
(defn winning-player
  "Calculate winning hand by comparing each players hand
  Return winning player"
  [players]
  (spec-gen/generate (spec/gen ::player)))
```

  <!-- #:practicalli.player-won -->
  <!-- {:name      "Jenny Nada", -->
  <!--  :score     225, -->
  <!--  :dealt-hand [[9 :hearts] [4 :clubs] [8 :hearts] [10 :clubs] [:queen :spades]]} -->


## Function specification

```eval-clojure
(spec/fdef deal-cards
  :args (spec/cat :game ::game)
  :ret ::game
  :fn #(= (regulation-card-deck (-> % :args :game))
          (regulation-card-deck (-> % :ret))))
```


```eval-clojure
(spec/fdef winning-player
  :args (spec/cat :players ::players)
  :ret ::player)
```


## Instrument functions
Instrumenting functions will wrap a function definition and check the arguments of any call to the instrumented function.

```eval-clojure
(spec-test/instrument `deal-cards)
```
> Ignore the Warning message in the result, this is an issue with the REPL implementation used in this page.


Calling the `deal-cards` function with an incorrect argument will return an error, detailing where in the specification the error occurred.

```eval-clojure
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
