# Creating Hash-maps

Hash-maps can be defined literally using `{}` and including zero or more key / value pairs.  Keys and values can be any legal Clojure type.

Keywords are very commonly used for keys as they provide a convenient way to look up values.



## Literal hash-map examples

A hash-map defining Obi-wan, a character from the Star Wars universe.

```clojure
{:name "Obi-wan Kenobi" :homeworld "Stewjon"}
```

A hash-map defining Leia, another character from the Star Wars with additional information

```clojure
{:name "Leia Skywalker" :homeworld "Alderaan" :birthplace "Polis Massa"}
```

Use `def` to bind a name to a hash-map, making it easier to pass the map to a function as an argument.

```clojure
(def luke {:name "Luke Skywalker" :homeworld "Tatooine" :birthplace "Polis Massa"})
```

## Data set of maps

Create a data set by defining a vector of hash-maps

```clojure
[{:name "Obi-wan Kenobi"  :homeworld "Stewjon"   :occupation "Jedi"}
 {:name "Jyn Erso"        :homeworld "Vallt"     :occupation "Soldier"}
 {:name "Leia Skywalker"  :homeworld "Alderaan"  :occupation "Senator"}
 {:name "Luke Skywalker"  :homeworld "Tatooine"  :occupation "Jedi"}
 {:name "Qui-Gon Jinn"    :homeworld "Coruscant" :occupation "Jedi"}
 {:name "Padmé Amidala"   :homeworld "Naboo"     :occupation "Senator"}
 {:name "Sheev Palpatine" :homeworld "Naboo"     :occupation "Supreme Chancellor"}]
```


### Example: nested hash-maps


Create a map to represent the world of Star Wars, including various characters & ships, indicating the factions that characters and ships belong to.



Individual Star Wars characters can be defined using a map of maps

```clojure
 {:luke   {:name "Luke Skywalker" :skill "Targeting Swamp Rats"}
  :vader  {:name "Darth Vader"    :skill "Breaking the rules and peoples hearts"}
  :jarjar {:name "JarJar Binks"   :skill "Failing upwards"}}
```

Hash-maps can also use other collections as values

```clojure
{:characters
  {:jedi   ["Luke Skywalker" "Obiwan Kenobi"]
   :sith   ["Darth Vader" "Darth Sideous"]
   :droids ["C3P0" "R2D2" "BB8"]}
 :ships
   {:rebel-alliance  ["Millennium Falcon" "X-wing fighter"]
    :imperial-empire ["Intergalactic Cruiser" "Destroyer"
                      "Im just making these up now"]}}
```

Use the def function to bind a name to the Star Wars character information, making it easier to pass to several functions

```clojure
(def star-wars-characters
   {:luke   {:fullname "Luke Skywalker" :skill "Targeting Swamp Rats"}
    :vader  {:fullname "Darth Vader"    :skill "Breaking the rules and peoples hearts"}
    :jarjar {:fullname "JarJar Binks"   :skill "Failing upwards"}})
```



## Generating hash-maps

`hash-map` is a clojure.core function that returns a hash-map of the given arguments, or an empty hash-map, `{}`, if no arguments are given.

Arguments should be key-value pairs, otherwise the function will return nil



## Converting collections to hash-maps

```clojure
(apply hash-map [:a 1 :b 2])
;;=> {:b 2 :a 1}
```

Order of keys in a hash-map is not guaranteed.  However, order of keys should be irrelevant as the keys are unique within a map.


```clojure
(into {} ,,,)
```

map

reduce


merge returns a hash-map that is a merging of the key value pairs from all maps, for any duplicate keys the value from the last key (left to right) is used




## Setting default values

Calling a function with a hash-map as an argument is a flexible way to design the API of a namespace and Clojure application in general.

As functions are talking a map, a function call with fewer or more keys than needed will still result in a successful call (alhtough results could be interesting)

If fewer keys are passed then defaults can be set.

`merge` can be used to ensure any required keys with default values are always present, and still over-ridden by keys passed in as an argument

`merge` should passed the default key values first, with the argument map merged on top. This ensures all keys are present and that the argument values are used if duplicate keys exist between the maps.

```clojure
(merge {:option1 "default-value" :option2 "default-value"}
       {:option1 "custom-value"})
;;=> {:option1 "custom-value" :option2 "default-value"}
```

The `merge` function can be used in a function to return the merged map of default and argument values
When a function has a number of options  with default values.

```clojure
(defn parse-cli-tool-options
  "Return the merged default options with any provided as a hash-map argument"
[arguments]
   (merge {:replace false :report true :paths ["."]}
          arguments))

(parse-cli-tool-options {:paths ["src" "test"] :report false})
;; => {:replace false, :report false, :paths ["src" "test"]}
```

If an empty hash-map is sent as an argument, the default values are returned

```clojure
(parse-cli-tool-options {})
;; => {:replace false, :report true, :paths ["."]}
```






zipmap

```clojure
(zipmap [:a :b :c] [1 2 3])
;; => {:a 1, :b 2, :c 3}
```




## Custom merging with a function






## Create a sub-set of existing map


### filter

Create a sub-set of an existing map



;; #61 - Map Construction
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Difficulty:	Easy
;; Topics:	core-functions
;; Special Restrictions: zipmap

;; Write a function which takes a vector of keys and a vector of values and constructs a map from them.

;; Tests
(= (__ [:a :b :c] [1 2 3]) {:a 1, :b 2, :c 3})
(= (__ [1 2 3 4] ["one" "two" "three"]) {1 "one", 2 "two", 3 "three"})
(= (__ [:foo :bar] ["foo" "bar" "baz"]) {:foo "foo", :bar "bar"})

;; If we could use zipmap then the answer would be simple

(zipmap [:a :b :c] [1 2 3])
;; => {:a 1, :b 2, :c 3}

(= (zipmap [:a :b :c] [1 2 3]) {:a 1, :b 2, :c 3})
;; => true

;; So now we have to figure out the algorithm that zipmap uses

;; Analyse the problem
;; We want to create a paring of values from the first and second vectors
;; Then each pair should be made into a key value pair within a map data structure.

;; The map function will work over multiple collections, returning a single collection

;; A simple example of map function in action:
(map str [:a :b :c] [1 2 3])
;; => (":a1" ":b2" ":c3")

;; In stead of string, we could use hash-map

(map hash-map [:a :b :c] [1 2 3])
;; => ({:a 1} {:b 2} {:c 3})

;; now we just need to put all the maps into one map, so perhaps merge will work

(merge (map hash-map [:a :b :c] [1 2 3]))
;; => ({:a 1} {:b 2} {:c 3})


(conj (map hash-map [:a :b :c] [1 2 3]))
;; => ({:a 1} {:b 2} {:c 3})

(reduce conj (map hash-map [:a :b :c] [1 2 3]))
;; => {:c 3, :b 2, :a 1}



;; (reduce conj (map vectork ks vs))

((fn [key-sequence value-sequence]
   (into {}
         (map vector key-sequence value-sequence)))
 [:a :b :c] [1 2 3])
;; => {:a 1, :b 2, :c 3}
