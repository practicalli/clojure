# Most common word

In this challenge we would like you to find the most used word in a book. The word should not be part of the [common English words](common-english-words.csv) (i.e. the, a, i, is).

This functionality is useful for generating word maps or identifying patterns across data sets.

![word map](/images/word-cloud-big-data.png)

Copyright free books for use are available via Project Guttenburg, e.g. [“The Importance of Being Earnest” by Oscar Wilde](http://www.gutenberg.org/cache/epub/844/pg844.txt).

## Suggested approach

A suggested approach to find the most common word:

* Pull the content of the book into a collection
* Use a regular expression to create a collection of individual words - eg. `#”[a-zA-Z0-9|’]+”`
* Remove the common English words used in the book
* Convert all the words to lower case so they match with [common words source](common-english-words.csv)
* Count the occurrences of the remaining words (eg. each word is associated with the number of times it appears in the book)
* Sort the words by the number of the occurrences
* Reverse the collection so the most commonly used word is shown first

## Create a project

[:fontawesome-solid-book-open: Pracitcalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) provides the `:project/create` alias to create projects using deps-new project.

```bash
clojure -T:project/create :template app :name practicalli/common-words
```

## Get the book contents

`clojure.core/slurp` will read in a local file or a remote resource (file, web page, etc) and return a single string of the contents.

```clojure
(slurp "https://www.gutenberg.org/files/844/844-0.txt")
```

Wrap the `slurp` expression in a `def` to bind a name to the book.

```clojure
(def being-earnest (slurp "https://www.gutenberg.org/files/844/844-0.txt"))
```

Project Gutenberg now compresses the books with GZip, so a stream can be created to read the file and decompress it.  Then slurp is used to read in the uncompressed text of the book into a string.

```clojure
(def being-earnest
  (with-open [uncompress-text (java.util.zip.GZIPInputStream.
                  (clojure.java.io/input-stream
                   "https://www.gutenberg.org/cache/epub/844/pg844.txt"))]
    (slurp uncompress-text)))
 ```

## Individual words from the book

The book contents should be broken down into individual words.

A regular expression can be used to identify word boundaries, especially where there are apostrophes and other characters.

`clojure.core/re-seq` returns a new lazy sequence containing the successive matches of a pattern from a given string.  So given a sentence

Using `re-seq` to convert the first sentence of the `being-earnest` book using a regex word boundary pattern, `\w+`.

```clojure
(re-seq #"\w+" "Morning-room in Algernon's flat in Half-Moon Street.")

;; => ("Morning" "room" "in" "Algernon" "s" "flat" "in" "Half" "Moon" "Street")
```

The result is a sequence of the individual words, however, the hyphenated words and the apostrophes have been split into separate words.

Extending the regex pattern the results can be refined.

```clojure
(re-seq #"[\w|'-]+" "Morning-room in Algernon's flat in Half-Moon Street.")

;; => ("Morning-room in Algernon's flat in Half-Moon Street")
```

```clojure
(re-seq #"[\w|'-]+" being-earnest)
```

> The #"[\w|'-]+" is the same pattern as the more explicit pattern #"[a-zA-Z0-9|'-]+"

## Removing common English words

In any book the most common word its highly likely to be a common English word (the, a, and, etc.).  To make the most common word in any book more specific, the common English words should be removed.

[`common-english-words.csv`](common-english-words.csv) contains comma separate words.

Using slurp and a regular expression the individual words can be extracted into a collection.

Rather than `re-seq` the `clojure.string/split` can be used.  This is a more specific function for splitting a string using a regular expression pattern, in this case the pattern for a comma, `#","`.

```clojure
 (clojure.string/split (slurp "common-english-words.csv") #",")
```

An additional step is to place the common English words into a Clojure set, a data structure which contains a unique set of values.

```clojure
 (set (clojure.string/split (slurp "common-english-words.csv") #","))
```

The advantage of using a set for the common English words is that the data structure can be used as a predicate to remove matching words.  So a common English words set can be used to remove the common English words from `being-earnest` book.

Define a name for the common English words set.

```clojure
(def common-english-words (set (clojure.string/split (slurp "common-english-words.csv") #",")))
```

This can also be written using the threading macro, to show the sequential nature of the data transformation.

```clojure
(def common-english-words
  (-> (slurp "common-english-words.csv")
      (clojure.string/split #",")
      set))
```

The `common-english-words` set can now be used with the `being-earnest` book.

```clojure
(remove common-english-words (re-seq #"[\w|'-]+" being-earnest))
```

## Counting Occurrences

`clojure.core/frequencies` takes a collection and returns a map where the keys are the unique elements from the collection and the value for each key is the number of times that element occurred in the collection.

```clojure
(filter (remove common-english-words (re-seq #"[\w|'-]+" being-earnest)))
```

The resulting hash-map is not in any order.  `clojure.core/sort-by` will return the same results but sorted by a given function.  To sort a hash-map the `key` and `val` functions are function that will sort by key and value respectively.  As it is the value that has the number of occurrences, then `val` is the function to use.

```clojure
(sort-by val (filter (remove common-english-words (re-seq #"[\w|'-]+" being-earnest))))
```

The result is sorted from smallest to largest value.  The result could be reversed using `clojure.core/reverse` or by supplying an extra function to the `sort-by` expression.  Using greater-than, `>` the result will be returned in descending order.

```clojure
(sort-by val dec (filter (remove common-english-words (re-seq #"[\w|'-]+" being-earnest))))
```

## Assembling the most-common-word function

Define a function called `most-common-word` that assembles all the previous steps.  The function should take all the values it needs for the calculation as arguments, creating a pure function without side effects.

```clojure
(defn most-common-word
  [book common-words]
  (sort-by val >
    (frequencies
      (remove common-words
        (map #(clojure.string/lower-case %)
             (re-seq #"[\w|'-]+" book))))))
```

This may seem a little hard to parse, so the function definition can be re-written using a threading macro.

```clojure
(defn most-common-word
  [book common-words]
  (->> book
       (re-seq #"[\w|'-]+" ,,,)
       (map #(clojure.string/lower-case %))
       (remove common-words)
       frequencies
       (sort-by val >)))
```

Call this function with the `being-earnest` book and the `common-english-words`

```clojure
(most-common-word being-earnest common-english-words)
```

## Running from the command line

Update the code to take the book reference from the command line.

Remove the `def` that hard-coded the being-earnest book.

In the `most-common-word` wrap the book with `slurp` to read the book reference in and convert it to a string, to be processed by the rest of the expressions.

Add a `-main` function that takes a reference for the source of the book and the source of the common words.

```clojure
(ns practicalli.common-word)

(defn decode-book
  [book-gzip]
  (with-open
    [uncompress-text (java.util.zip.GZIPInputStream.
                      (clojure.java.io/input-stream book-gzip))]
    (slurp uncompress-text)))

(defn common-words
  [csv]
  (-> (slurp csv)
      (clojure.string/split #",")
      set))

(defn most-common-word
  [book-gzip common-words]
  (->> (decode book-gzip)
       (re-seq #"[\w|'-]+")
       (map #(clojure.string/lower-case %))
       (remove common-words)
       frequencies
       (sort-by val >)))

(defn -main
  [book-gzip common-word-csv]
  (most-common-word book-gzip (common-words common-word-csv)))
```

Now call the code on the command line.

```bash
clojure -m practicalli.common-word "https://www.gutenberg.org/cache/epub/844/pg844.txt" "common-english-words.csv"
```
