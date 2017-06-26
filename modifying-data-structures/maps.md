# Maps

The `conj` function works on all of the Clojure collections.  The map collection also has functions that affect the evaluation of a map and the value of map returned.

# Adding new values with `conj`

If you have a collection of maps, you can add another map to that collection with the `conj` function.

```clojure
(conj [{:map1 1}] {:map2 2})

;; => [{:map1 1} {:map2 2}]
```


# Changing values with `assoc`

The `assoc` function is used to update a value in a map without neccessary being concerned about the current value.  `assoc` returns a complete new map with the specified value. 

```clojure
(assoc {:food "Fish"} :food "Fish&Chips")

;; => {:food "Fish&Chips"}
```

It does not matter how many keys are in the map, as keys are unique, then `assoc` will look up the specific key and change its value to that specified in the third argument.

If a key is not in the map, `assoc` will add both the key and the value.

```clojure
(def alphabet-soup {:a 1 :b 2 :c 3})

(assoc alphabet-soup :d 4)

;; => {:a 1, :b 2, :c 3, :d 4}
```

If there are multiple levels to the structure of your map, ie. the value of a key in the map is also a map 

For example, the value of `:luke` in the `starwars-characters` map is represented as a map too `{:fullname "Luke Skywarker" :skill "Targeting Swamp Rats"}`

```clojure
(def starwars-characters
   {:luke   {:fullname "Luke Skywarker" :skill "Targeting Swamp Rats"}
    :vader  {:fullname "Darth Vader"    :skill "Crank phone calls"}
    :jarjar {:fullname "JarJar Binks"   :skill "Upsetting a generation of fans"}})
```

To update the skill of one of the characters we can use `assoc-in` to update the correct value by traversing the map via the given keys.

```clojure
(assoc-in starwars-characters [:vader :skill] "The Dark Side of the Force")

;; => {:luke {:fullname "Luke Skywarker", :skill "Targeting Swamp Rats"}, 
       :vader {:fullname "Darth Vader", :skill "The Dark Side of the Force"}, 
       :jarjar {:fullname "JarJar Binks", :skill "Upsetting a generation of fans"}}
```

# Update values in a map with `update`

Rather than replace the current value with one specified, `update` applys a function to the existing value in order to update that value.

```clojure
(def alphabet-soup {:a 1 :b 2 :c 3})

(update alphabet-soup :a inc)

;; => {:a 2, :b 2, :c 3}
```

> **Hint** As with `assoc` you can also use `update` on nested maps using the `update-in` function.
