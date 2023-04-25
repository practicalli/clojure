# With Maps

Maps allow you to model data with its contextual meaning.  The keys of a map can give the context and the values are the specific data.

> **Note** Define a shopping list of items you want, including how many of each item you want to buy

<!--sec data-title="Reveal answer" data-id="answer001" data-collapse=true ces-->

```clojure
(def shopping-list
  {"cat food"  10
   "soya milk" 4
   "bread"     1
   "cheese"    2})
```

<!--endsec-->

> **Note** Define a star-wars characters, eg. luke skywalker, jarjar binks.  The star-wars character should include a name and a skill (it doesn't matter what these are).

> Use the 'get' function to return the value of a given key, eg. name.  Use keywords to return a given value if you used keywords for the map keys.

<!--sec data-title="Reveal answer" data-id="answer002" data-collapse=true ces-->

In this answer we have defined three different star-wars characters, all using the same map keys.

```clojure
(def luke   {:name "Luke Skywalker" :skill "Targeting Swamp Rats"})
(def darth  {:name "Darth Vader"    :skill "Crank phone calls"})
(def jarjar {:name "JarJar Binks"   :skill "Upsetting a generation of fans"})
```

Lets see what the specific skill luke has

```clojure
(get luke :skill)
```

When you use a keyword, eg. :name, as the key in a map, then that keyword can be used as a function call on the map to return its associated value.  Maps can also act as functions too.

```clojure
(:name luke)
(luke :name)
```

There are also specific functions that work on maps that give all the `keys` of a map and all the `values` of that map

```clojure
(keys luke)
(vals luke)
```

<!--endsec-->
