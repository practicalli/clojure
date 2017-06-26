## Article by Chris Ford

https://thoughtworks.github.io/p2/issue05/cooking-with-clojure/

Cooking with Clojure

Words and Music by Chris Ford

When I speak to developers about functional programming, they’re often interested, but are sometimes concerned that functional programming might make it hard to model the “real world”. The theory goes that the everyday world is full of objects that evolve over time, so the most natural way to describe it is using object-oriented design.

Leaving aside the question of whether or not programmers should be overly concerned about this thing referred to as the “real world”, functional programming provides a rich set of concepts that are more than adequate for modelling complex domains.

As a demonstration of functional design, I’ll use Clojure to describe a recipe. Clojure is a variant of Lisp designed to run on the Java Virtual Machine, and it has the key ingredient that makes functional programming possible – functions that can be passed around as values, and that reliably return the same output for the same inputs.

Here are a couple of simple examples of Clojure:

(def y 3)

(+ 2 y)
;=> 5

(reduce + [2 3 4 5])
;=> 14

The first example simply binds the name y to the value 3. The second example is straightforward enough, though it might seem strange that the function + appears inside the braces and in the first position. That’s the way that all Lisps depict function invocation.

The third example has a curious aspect – + is being passed as an argument to the reduce function, which uses it to boil down a list of numbers into a single total. Using functions as values that can be passed around isn’t possible in many object-oriented programming languages like Java, but it turns out to be very useful.

Values in Clojure are immutable, meaning that we never destroy old values, we only create new ones representing the new state. Whereas in Java, y = y + 1 means “add one to y”, the equivalent in Clojure is just a comparison:

(= y (+ y 1))
  ;=> false

Of course, simple expressions on their own aren’t very useful. Here is how to define a named function in Clojure:

(defn plus-one [n] (+ 1 n))

(plus-one 4)
  ;=> 5

Clojure functions can themselves return functions. Here’s a function that makes plus functions. Note that while defn defines a named function, fn creates an anonymous function.

(defn plus [incrementor]
  (fn [n] (+ incrementor n)))

(def plus-three (plus 3))

(plus-three 4)
  ;=> 7

Here’s another function that works like plus, but uses Clojure’s fnil function to use a default value of 0 if nil is supplied:

(defn safe-plus [n] (fnil (plus n) 0))

((safe-plus 4) nil)
  ;=> 4

Each stage in the recipe will be represented as a simple hash map. Some functional programming languages, like Haskell, have very sophisticated type systems that can tell the compiler when functions are invoked on the wrong kind of arguments. Such systems can be tremendously powerful, but they are not strictly necessary for doing functional programming. By using Clojure, we do not have to manage types or type annotations, but we must accept the burden of ensuring that we invoke our functions in the right way without strong compiler support.

The following represents butterbeans with some water added (measured in grams):

{:butterbeans 150, :water 300}

But we’re modelling a process, not a fixed state, so we also need a way to depict time and change. The following represents the same ingredients, five minutes into the recipe.

{:time 5, :butterbeans 150, :water 300}

The process of preparing a recipe can then be represented as a series of states:

[{:time 0},
 {:time 1, :butterbeans 150},
 {:time 3, :butterbeans 150, :water 300}]

But how do we get from one state to another? This is where the functions come in. Functions are just a way of representing a mapping from one state to another. Here is a simple function that represents mixing in a certain amount of an ingredient:

(defn mix-in [dish ingredient quantity]
  (update-in dish [ingredient] (safe-plus quantity)))

(mix-in {:time 1, :butterbeans 150} :water 300)
  ;=> {:time 1, :butterbeans 150, :water 300} 

There’s no need to overwrite the original state of the dish. Instead of having objects with identity that morph and mutate over time, functions take the original state and produce a new state. In the example above, mix-in takes a dish that has one minute of elapsed time and 150 grams of butterbeans, and produced a new state that had one minute of elapsed time, 150 grams of butterbeans and 300 grams of water.

Remember, functions are themselves values in a functional programming language, so we can represent the addition of a particular ingredient as a function. Note that add is a function that takes the ingredient and its quantity as arguments, and returns another function that represents the actual addition. Clojure has no good way to print functions, so it’s forced to use a somewhat cryptic identifier when dislaying a function to the screen:

(defn add [ingredient quantity]
  (fn [dish] (mix-in (mix-in dish ingredient quantity) :time 1)))

(add :water 300)
  ;=> #<user$add$fn__329 user$add$fn__329@316ae291>

(def add-some-water (add :water 200))

add-some-water is now a function representing the addition of some water. The function also increments the time taken so far in the recipe. We can use it to transform one state into another:

(add-some-water {:time 0, :butterbeans 100})
  ;=> {:time 1, :butterbeans 100, :water 200}

We can represent any step in our recipe as a function of one state to another. sit leaves the dish to sit for a certain number of minutes, cooling it if it’s warmer than room temperature. For the first time, we’ll use Clojure’s (let […]) form, which allows us to create local names:

(def room-temperature 21)

(defn sit [minutes]
  (fn [dish]
    (let [temperature (max
                        (- (:temperature dish) (* 2 minutes))
                        room-temperature)]
    (mix-in (assoc dish :temperature temperature) :time minutes)))) 

Sauteing heats up the dish, and evaporates away some of the water:

(defn saute [minutes]
  (fn [dish]
    (let [hot-dish (assoc dish :temperature 50)
          reduced-dish (update-in hot-dish [:water] (plus (- minutes)))]
      (mix-in reduced-dish :time minutes))))

add-water-for adds water to the dish based on the weight of a specified ingredient:

(defn add-water-for [ingredient]
  (fn [dish]
    (let [quantity (* 2 (ingredient dish))]
      ((add :water quantity) dish))))

soak transfers mass from :water to another ingredient, representing the water being absorbed over time. drain removes all water from the dish:

(defn soak [ingredient minutes]
  (fn [dish]
    (let [absorbtion (/ (:water dish) 2)
          swelling #(mix-in % ingredient absorbtion)
          reduction #(mix-in % :water (- absorbtion))
          absorb (comp swelling reduction)]
     (mix-in (absorb dish) :time minutes))))

(defn drain []
  (fn [dish]
    (mix-in (dissoc dish :water) :time 3)))

The recipe is therefore just a list of functions:

(def recipe
  [(add :beans 150)
   (add-water-for :beans)
   (soak :beans (* 4 60))
   (drain)
   (add :water 50)
   (add :garlic 5)
   (saute 15)
   (sit 10)
   (add :olive-oil 5)])

To work out how the dish changes over the course of its preparation, we just need to progressively apply each step to an initial state, which in this case is {:time 0, :temperature room-temperature}. Clojure’s standard library has a function called reductions that does that for us, returning a list of all the successive states.

(defn preparations [steps]
  (let [perform (fn [dish step] (step dish))]
    (reductions perform {:time 0, :temperature room-temperature} steps)))

(preparations recipe)
  ;=> ({:time 0, :temperature 21}
  ;    {:time 1, :temperature 21, :beans 150}
  ;    {:time 2, :temperature 21, :water 300, :beans 150}
  ;    {:time 242, :temperature 21, :water 150, :beans 300}
  ;    {:time 245, :temperature 21, :beans 300}
  ;    {:time 246, :temperature 21, :water 50, :beans 300}
  ;    {:time 247, :temperature 21, :garlic 5, :water 50, :beans 300}
  ;    {:time 262, :temperature 50, :garlic 5, :water 35, :beans 300}
  ;    {:time 272, :temperature 30, :garlic 5, :water 35, :beans 300}
  ;    {:time 273, :temperature 30, :olive-oil 5, :garlic 5, :water 35, :beans 300, :time 258})

To prepare a receipe, we just need to take the final state:

(defn prepare [steps] (last (preparations steps)))

(prepare recipe)
  ;=> {:time 273, :temperature 30, :olive-oil 5, :garlic 5, :water 35, :beans 300}

One advantage of representing a process like this is that we are modelling each state explicitly. For example, if we wanted to calculate what ingredients had been added at a certain time in the preparation, we could. If our dish had been a mutable object, then each time we performed a new step in the recipe the old state would have been lost:

(defn ingredients-after [minutes recipe]
  (let [all-states (preparations recipe)
        state (first (drop-while #(> minutes (:time %)) all-states))]
    (keys state)))

(ingredients-after 250 recipe)
  ;=> (:time :temperature :garlic :water :beans)

Paradoxically, by avoiding changing individual values, functional programming languages make representing change itself easier. Though functional programming can be used in any domain that object-oriented programming can, I have personally found that domains where time and change are important concepts are where functional programming languages like Clojure really shine.
