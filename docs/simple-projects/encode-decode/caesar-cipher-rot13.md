# Caesar Cipher ROT13

![Caesar Cipher ROT13](/images/caesar-cipher-rot13.png)

[ROT13](https://en.wikipedia.org/wiki/ROT13) is one of the simplest ciphers which uses an alphabet as a circle of characters, swapping each character with a character 13 positions later in the alphabet, assuming 26 character of an English alphabet.

A dictionary can be generated to translate between the original alphabet and the rotated alphabet, providing a simple way to generate an encrypted message.

## Create a project

[:fontawesome-solid-book-open: Pracitcalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) provides the `:project/create` alias to create projects using deps-new project.

```shell
clojure -T:project/create :template app :name practicalli/caesar-cipher
```

## Define an alphabet

Define an alphabet to use as a basis for conversion.  Take the string of all characters and convert to a sequence of character types.

```clojure title="src/practicalli/caesar-cipher.clj"
(def english-alphabet
  (seq "abcdefghijklmnopqrstuvwxyz"))
```

## Generate a cypher

To convert a character, first build up a cypher.  A cypher in this case is simply a hash-map that creates a dictionary lookup defining what each character should be changed to.

`cycle` creates a lazy sequence of the alphabet that continually cycles.  This provides an 'infinite' sequence from which we will take only the characters needed.

```
(cycle "abcdefghijklmnopqrstuvwxyz")
```

The dictionary is composed of the original alphabet and a new alphabet that is offset by 13 characters, half the number of characters in the dictionary.

`(drop 13 (cycle alphabet))`  will drop the first 13 characters.  As `cycle` creates an 'infinite' alphabet, there are still plenty of characters to make a second alphabet.

`(take 26 (drop 13 (cycle alphabet)))` will get a new alphabet of 26 characters, starting from the 14th character, `n`.

`zipmap` is used to join two collections together to form a hash-map, e.g. the lookup dictionary. In this case the original alphabet and the new alphabet.

`(zipmap alphabet (take 26 (drop 13 (cycle alphabet))))`

This expression is nested and can be harder to parse by those new to Clojure.  The code can be written using a threading marco, that demonstrated the flow of data transformation.

Using the thread last macro, `->>`, the result of each expression becomes the last argument for the next expression.

```clojure
(->> (cycle alphabet)
     (drop 13)
     (take 26)
     (zipmap alphabet))
```

Using the clojure.core/replace function with the cypher hash-map and a string of text returns a converted string of text.

## Define a function

Define a `rot13` function with the algorithm created.  The function takes the alphabet and the text to be encrypted.  Passing both pieces of data as arguments ensures that the function is pure, i.e. free from side effects.

```clojure title="src/practicalli/caesar-cipher.clj"
(defn rot13 [alphabet text]
  (let [cipher (->> (cycle alphabet)
                    (drop 13)
                    (take 26)
                    (zipmap alphabet))]
    (apply str (replace cipher text))))
```

Call the rot13 function with the `english-alphabet` and a sentence as a string.

```clojure
(rot13 english-alphabet "The Quick Brown Fox Jumped Over The Lazy Dog!")
```

An encrypted copy of the sentence is returned.

## Idiomatic improvements

[`clojure.string` library](https://clojuredocs.org/clojure.string/join) is more idiomatic approach when working with string types.

In the `practicalli.cypher-rot13` solution `apply str` was used to join a sequence of characters into a string.  [`clojure.string/join`](https://clojuredocs.org/clojure.string/join) combines a sequence of characters into a string.

Require the `clojure.string` namespace to use the functions contained within.  Add the require to the namespace definition of `practicalli.cypher-rot13`

```clojure title="src/practicalli/caesar-cipher.clj"
(ns practicalli.ceaser-cypher
  (:gen-class)
  (:require [clojure.string :as string]))
```

Update the `rot13` function to use [`clojure.string/join`](https://clojuredocs.org/clojure.string/join) rather than `apply str`.

```clojure
(defn rot13 [alphabet text]
  (let [cipher (->> (cycle alphabet)
                    (drop 13)
                    (take 26)
                    (zipmap alphabet))]
    (string/join (replace cipher text))))
```

<!-- ## Upper and Lowercase cypher -->

<!-- ```clojure -->
<!-- (def english-alphabet -->
<!--   (into #{} "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")) -->

<!-- ``` -->

<!-- Using the `clojure.core/map` function -->

<!-- Create a Clojure set with the lower and uppercase characters of the English alphabet -->

<!-- ```clojure -->
<!-- (def english-alphabet -->
<!--   (into #{} "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")) -->

<!-- (defn rot13 [alphabet xs] -->
<!--   (let [combinations (->> (cycle alphabet) (drop 26) (take 52) (zipmap alphabet))] -->
<!--     (apply str (map #(combinations % %) xs)))) -->

<!-- (rot13 english-alphabet "The Quick Brown Fox Jumped Over The Lazy Dog!") -->
<!-- ``` -->

<!-- ```clojure -->
<!-- (let [a (int \a) m (int \m) A (int \A) M (int \M) -->
<!--       n (int \n) z (int \z) N (int \N) Z (int \Z)] -->
<!--   (defn rot-13 [^Character c] -->
<!--     (char (let [i (int c)] -->
<!--       (cond-> i -->
<!--         (or (<= a i m) (<= A i M)) (+ 13) -->
<!--         (or (<= n i z) (<= N i Z)) (- 13)))))) -->

<!-- (apply str (map rot-13 "The Quick Brown Fox Jumped Over The Lazy Dog!")) -->

<!-- ``` -->
