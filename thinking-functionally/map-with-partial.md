# map with partial

Lets look at differnt ways we can map functions over collections with `partial`

We can map over a collection of words and increment them by writing an anonymous function.

```clojure
(map (fn [animal] (str animal "s")) ["pig" "cow" "goat" "cat" "dog" "rabbit"])
```

;; or using the syntactic sugar form of an anonymous function we get

```
(map #(str % "s") ["pig" "cow" "goat" "cat" "dog" "rabbit"])
```

;; by default map returns a list. We can specify a vector be returned instead using `mapv'

```
(mapv #(str % "s") ["pig" "cow" "goat" "cat" "dog" "rabbit"])
```

;; what about sheep, where the plural is sheep?  We would want to add a condition or filter somewhere

;; first lets abstact out the annonymous function

```
(defn pluralise
  "Pluralise a given string value"
  [string]
  (str string "s"))
```

and give a name to our collection of animals

```
(def animals ["pig" "cow" "goat" "cat" "dog" "rabbit"])

(map pluralise animals)
```

Using an if statement as a filter

```
(defn pluralise
  "Pluralise a given string value"
  [string]
  (if (= string "sheep")
    string
    (str string "s")))

(map pluralise animals)
```

but there are quite a lot of things that do not have a plural form.  So lets define a collection of animals that are not plural

```
(def non-plural-words ["deer" "sheep" "shrimp" ])

(defn pluralise
  "Pluralise a given string value"
  [string]
  (if (some #{string} non-plural-words)
    string
    (str string "s")))

(def animals ["pig" "cow" "goat" "cat" "dog" "rabbit" "sheep" "shrimp" "deer"])

(map pluralise animals)
```

To keep the function pure, we should really pass the non-plural-words as an argument

```
(defn pluralise
  "Pluralise a given string value"
  [string non-plural-words]
  (if (some #{string} non-plural-words)
    string
    (str string "s")))
```

;; using an anonymous function we can send the two arguments required to the pluralise function, as map will replace the % character with an element from the animals collection for each element in the collection.

```
(map #(pluralise % non-plural-words) animals)
```


;; we could also use a partical function, saving on having to create an anonymous

```
(defn pluralise
  "Pluralise a given string value"
  [non-plural-words string]
  (if (some #{string} non-plural-words)
    string
    (str string "s")))
```

Now we can call pluralise by wrapping it as a partial function.

The argument that is the non-plural-words is constant, its the individual elements of animals I want to get out via map.  So when map runs it gets an element from the animals collection and adds it to the call to pluralise, along with non-plural-words

```
(map (partial pluralise non-plural-words) animals)
```

Using partial here is like calling `(pluralise non-plural-words ,,,)` but each time including an element from animals where the `,,,` is. 

At first I was getting incorrect output, `["deer" "sheep" "shrimp"]`, then I realised that it was returning the non-plural-words as string, so the arguements from the partial function were being sent in the wrong order.  So I simply changed the order in the pluralise function and it worked.

I checked this by adding some old-fashioned print statement.  There are probably better ways to do that in Clojure though.

```
(defn pluralise
  "Pluralise a given string value"
  [non-plural-words string]
  (if (some #{string} non-plural-words)
    (do
      (println (str string " its true"))
      string)
    (do
      (println (str string " its false"))
      (str string "s"))))
```
