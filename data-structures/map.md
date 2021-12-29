# Map

A map is a key / value pair data structure.  Keys are usually defined using a keyword, although they can be strings or anything else.

Keywords point to themselves, so using them for the keys makes it very easy to get values out of the map, or for updating existing values in the map.

> **Note** Explore creating maps

```clojure
{:key "value"}
(:key 42)
{:key :value}
{"key" "value"}
("key" :value)
{:a 1 :b 2 :c 3}
{:monday 1 :tuesday 2 :wednesday 3 :thursday 4 :friday 5 :saturday 6 :sunday 7}
```

## Maps of other collections

Its also quite common to have maps made up of other maps, maps of vectors or vectors of maps.

> #### NOTE::Create a map to represent the world of Star Wars
> include various characters & ships, indicating the factions that characters and ships belong to.

```clojure
{:characters
  {:jedi   ["Luke Skywalker" "Obiwan Kenobi"]
   :sith   ["Darth Vader" "Darth Sideous"]
   :droids ["C3P0" "R2D2" "BB8"]}
 :ships
   {:rebel-alliance  ["Millenium Falcon" "X-wing figher"]
    :imperial-empire ["Intergalactic Cruser" "Destroyer"
                      "Im just making these up now"]}}
```


Individual Star Wars characters can be defined using a map of maps

```clojure
 {:luke   {:fullname "Luke Skywalker" :skill "Targeting Swamp Rats"}
  :vader  {:fullname "Darth Vader"    :skill "Breaking the rules and peoples hearts"}
  :jarjar {:fullname "JarJar Binks"   :skill "Failing upwards"}}
```

To make the Star Wars character information easier to use, lets give the collection of characters a name using the def function

```clojure
(def starwars-characters
   {:luke   {:fullname "Luke Skywalker" :skill "Targeting Swamp Rats"}
    :vader  {:fullname "Darth Vader"    :skill "Breaking the rules and peoples hearts"}
    :jarjar {:fullname "JarJar Binks"   :skill "Failing upwards"}})
```

Now we can refer to the characters using keywords.  Using the get function we return all the information about Luke

```clojure
(get starwars-characters :luke)
(get (get starwars-characters :luke) :fullname)
```

By wrapping the get function around our first, we can get a specific piece of information about Luke.  There is also the get-in function that makes the syntax a little easier to read

```clojure
(get-in starwars-characters [:luke :fullname])
(get-in starwars-characters [:vader :fullname])
```

Or if you want the data driven approach, just talk to the map directly

```clojure
(starwars-characters :luke)
(:fullname (:luke starwars-characters))
(:skill (:luke starwars-characters))

(starwars-characters :vader)
(:skill (:vader starwars-characters))
(:fullname (:vader starwars-characters))
```

And finally we can also use the threading macro to minimise our code further

```clojure
(-> starwars-characters
    :luke)

(-> starwars-characters
    :luke
    :fullname)

(-> starwars-characters
    :luke
    :skill)
```

This technique is called destructuring.  Find out [more on Destructuring](https://gist.github.com/john2x/e1dca953548bfdfb9844)


Duplicate keys in a map are not allowed, so the following maps...

```clojure
{"fish" "battered" "chips" "fried" "fish" "battered and fried"}
{:fish "battered" :chips "fried" :fish "battered & fried"}

;; ...throw dupicate key errors

;; Duplicate values are okay though
{:fish "fried" :chips "fried" :peas "mushy"}
```

<!-- ## Updating maps -->

<!-- > #### Note::Update a map example -->
<!-- > Get the current project information and create a map to hold that information -->

<!-- ```clojure -->
<!-- (->> "project.clj" -->
<!--      slurp -->
<!--      read-string -->
<!--      (drop 2) -->
<!--      (cons :version) -->
<!--      (apply hash-map) -->
<!--      (def project-configs)) -->

<!-- ;; Evalute the new map defined as project -->
<!-- project -->
<!-- ``` -->

<!--   We pull out the map of project information using `slurp`, tidy the text up using `read-string` and drop the first two elements (defproject playground).  This returns a list that we want to turn into a map, but first we need to add a key to the version number.  Using the `cons` function we can add an element to the start of the list, in this case the `:version` keyword -->

<!--   Now we can successfully convert the list that is returned into a map, with balanced key-value pairs.  Then we simply create a name for this new map, `project-configs`, so we can refer to it elsewhere in the code. -->
