# Accessing Nested Hash-maps

Its also quite common to have maps made up of other maps, maps of vectors or vectors of maps.

Now we can refer to the characters using keywords.  Using the get function we return all the information about Luke

```clojure
(get star-wars-characters :luke)
(get (get star-wars-characters :luke) :fullname)
```

By wrapping the get function around our first, we can get a specific piece of information about Luke.  There is also the get-in function that makes the syntax a little easier to read

```clojure
(get-in star-wars-characters [:luke :fullname])
(get-in star-wars-characters [:vader :fullname])
```

Or if you want the data driven approach, just talk to the map directly

```clojure
(star-wars-characters :luke)
(:fullname (:luke star-wars-characters))
(:skill (:luke star-wars-characters))

(star-wars-characters :vader)
(:skill (:vader star-wars-characters))
(:fullname (:vader star-wars-characters))
```

And finally we can also use the threading macro to minimise our code further

```clojure
(-> star-wars-characters
    :luke)

(-> star-wars-characters
    :luke
    :fullname)

(-> star-wars-characters
    :luke
    :skill)
```

This technique is called destructuring.  Find out [more on Destructuring](https://gist.github.com/john2x/e1dca953548bfdfb9844)

Duplicate keys in a map are not allowed, so the following maps...

```clojure
{"fish" "battered" "chips" "fried" "fish" "battered and fried"}
{:fish "battered" :chips "fried" :fish "battered & fried"}

;; ...throw duplicate key errors

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

<!-- ;; Evaluate the new map defined as project -->
<!-- project -->
<!-- ``` -->

<!--   We pull out the map of project information using `slurp`, tidy the text up using `read-string` and drop the first two elements (defproject playground).  This returns a list that we want to turn into a map, but first we need to add a key to the version number.  Using the `cons` function we can add an element to the start of the list, in this case the `:version` keyword -->

<!--   Now we can successfully convert the list that is returned into a map, with balanced key-value pairs.  Then we simply create a name for this new map, `project-configs`, so we can refer to it elsewhere in the code. -->
