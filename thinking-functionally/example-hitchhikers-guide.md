# Example: Hitchhikers Guide

This is an example of using the threading macros and  a REPL to give fast feedback as you are developing code.

> **Note** Write functions that will give a list of the most used words used in a book, excluding the common English words like "the, and, it, I".  Join those functions with a threading macro.

Suggest you use the assumed perfectly legal copy of the [Hitchhickers book text](http://clearwhitelight.org/hitch/hhgttg.txt) using the `slurp` function


**Approximate algorithm**
* Use a regular expression to create a collection of individual words - eg. **#"[a-zA-Z0-9|']+"**
* Convert all the words to lower case so they match with common words source - `clojure.string/lower-case`
* `Remove` the [common English words](http://www.textfixer.com/resources/common-english-words.txt) used in the book, leaving more context specific words
* Calculate the `frequencies` of the remaining words, returning a map of word & word count pairs
* `Sort-by` word count values in the map
* `Reverse` the collection so the most commonly used word is the first element in the map


<!--sec data-title="Reveal answer" data-id="answer001" data-collapse=true ces-->

```clojure
(def book (slurp "http://clearwhitelight.org/hitch/hhgttg.txt"))

(def common-english-words
  (-> (slurp "http://www.textfixer.com/resources/common-english-words.txt")
      (clojure.string/split #",")
      set))

;; using a function to pull in any book
(defn get-book [book-url]
  (slurp book-url))


(defn -main [book-url]
  (->> (get-book book-url)
       (re-seq #"[a-zA-Z0-9|']+")
       (map #(clojure.string/lower-case %))
       (remove common-english-words)
       frequencies
       (sort-by val)
       reverse))

;; Call the program 

(-main "http://clearwhitelight.org/hitch/hhgttg.txt")
```

# Deconstructing the code in the repl

To understand what each of the functions do in the `-main` function then you can simply comment out one or more expressions using in front of the expression **#_** 

```clojure
(defn -main [book-url]
  (->> (get-book book-url)
       #_(re-seq #"[a-zA-Z0-9|']+")
       #_(map #(clojure.string/lower-case %))
       #_(remove common-english-words)
       #_frequencies
       #_(sort-by val)
       #_reverse))

```

Now the `-main` function will only return the result of the `(get-book book-url)` function.  To see what each of the other lines do, simply remove the **#_** character from the front of an expression and re-evaluate the `-main` function in the repl

> **Hint** In Spacemacs / Emacs, the keybinding C-c C-p show the output in a seperate buffer.  Very useful when the function returns a large results set.


## Off-line sources of Hitchhickers book and common English words

```
(def book (slurp "./hhgttg.txt"))

(def common-english-words
  (-> (slurp "common-english-words.txt")
      (clojure.string/split #",")
      set))
```

Original concept from Misophistful: [Understanding thread macros in clojure](https://www.youtube.com/watch?v=qxE5wDbt964)


> **Hint** The `slurp` function holds the contents of the whole file in memory, so it may not be appropriate for very large files.  If you are dealing with a large file, consider wrapping slurp in a lazy evaluation or use Java IO (eg. `java.io.BufferedReader`, `java.io.FileReader.`).  See the [Clojure I/O cookbook](http://nakkaya.com/2010/06/15/clojure-io-cookbook/) and [The Ins & Outs of Clojure](http://blog.isaachodes.io/p/clojure-io-p1/) for examples.

<!--endsec-->
