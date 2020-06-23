## Matching sub-sequences
`re-seq` returns a lazy seq of all of the matches. The elements of the seq are the restults that `re-find` would return.

```eval-clojure
(re-seq #"s+" "Helloween")
```
   <!-- ("e" "ee") -->



## Most common word
`re-seq` is used in the most common word challenge to split a string into individual words.

Extract from Project Guttenburg the text of The importance of being Earnest by Oscar Wilde.  This returns a string of the whole book.

The book is broken down into a collection of individual words using `re-seq` and a regular expression pattern.

The collection of words is converted to lower case, so that `The` and `the` are not counted as separate words. `frequencies` returns a collection of tuples, each tuple being a word and a value representing how often it occurs.  This collection is sorted by the value in descending order to show the word with the most occurrences at the top.

```clojure
(->> (slurp "http://www.gutenberg.org/cache/epub/844/pg844.txt")
     (re-seq #"[a-zA-Z0-9|']+")
     (map #(clojure.string/lower-case %))
     frequencies
     (sort-by val dec))
```

TODO: add link to complete example.
