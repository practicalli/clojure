## String splitting using a regex pattern
`clojure.string/split` takes a string to be split and a pattern to split the string with.

```eval-clojure
(clojure.string/split "This is a string    that I am splitting." #"\s+")
   ["This" "is" "a" "string" "that" "I" "am" "splitting."]
```


## Most common words example
Extract a list of the most commonly used English words, returned as a string of words that are separated by a comma.

The `#","` regex pattern splits the string of words to form a collection of individual words, each word being its own string.

```clojure
(def common-english-words
  (set
    (clojure.string/split
      (slurp
        "http://www.textfixer.com/resources/common-english-words.txt")
      #",")))
```

TODO: add link to complete example.
