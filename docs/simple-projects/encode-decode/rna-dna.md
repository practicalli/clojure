# RNA to DNA transcription

Given a DNA strand, return its RNA complement ([RNA transcription](http://hyperphysics.phy-astr.gsu.edu/hbase/Organic/transcription.html)).

![RNA Transcription](/images/rna-transcription.png)

Both DNA and RNA strands are a sequence of nucleotides.

The four nucleotides found in DNA are adenine (A), cytosine (C), guanine (G) and thymine (T).

The four nucleotides found in RNA are adenine (A), cytosine (C), guanine (G) and uracil (U).

Given a DNA strand, its transcribed RNA strand is formed by replacing each nucleotide with its complement:

    G -> C
    C -> G
    T -> A
    A -> U


??? HINT "Inspired by Exercism.io challenge"
    This project was inspired by the RNA Transcription exercise on Exercism.io.  Related exercises include Nucleotide Count and Hamming.


## Create a project

[:fontawesome-solid-book-open: Pracitcalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) provides the `:project/create` alias to create projects using deps-new project.

```bash
clojure -T:project/create :template app :name practicalli/rna-transcription
```


## Define unit tests

Open the `test/practicalli/rna-transcription.clj` and add the following tests

```clojure
(ns practicalli.rna-transcription-test
  (:require [clojure.test :refer [deftest is testing]]
            [rna-transcription :as SUT]))

(deftest rna-transcription-test
  (testing "transcribe cytosine to guanine"
    (is (= "G" (SUT/to-rna "C"))))

  (testing "transcribe guanine to cytosine"
    (is (= "C" (SUT/to-rna "G"))))

  (testing "transcribe adenine to uracil"
    (is (= "U" (SUT/to-rna "A"))))

  (testing "transcribe thymine to adenine"
    (is (= "A" (SUT/to-rna "T"))))

  (testing "transcribe all nucleotides"
    (is (= "UGCACCAGAAUU" (rna-transcription/to-rna "ACGTGGTCTTAA"))))

  (testing "validate dna strands"
    (is (thrown? AssertionError (rna-transcription/to-rna "XCGFGGTDTTAA")))))
```


## Code the RNA transcription

Edit the `src/practicalli/rna-transcription.clj` file and require the `clojure.string` library.  The library is part of the Clojure standard library, so does not need to be added as a project dependency.

```clojure
(ns practicalli.rna-transcription
  (:require [clojure.string :as string]))
```

Define a dictionary to convert from DNA nucleotide to its RNA complement

```clojure
(def dictionary-dna->rna
  "Convert DNA to RNA"
  {"G" "C"
   "C" "G"
   "T" "A"
   "A" "U"}
  )
```

Define a function to convert a single DNA nucleotide (one of `G`, C, T, A) into its RNA complement, using the dictionary.

The algorithm is a simple hash-map lookup using the DNA nucleotide as the Key and returning the RNA complement as the value.

```clojure
(defn convert-nucleotide
  "Convert a specific nucleotide from a DNA strand,
  into a nucleotide for an RNA strand"
  [dictionary nucleotide]
  (get dictionary (str nucleotide)))

```

Now a single nucleotide can be converted, another function can be defined to convert all DNA nucleotides in a given sequence.

```clojure
(defn to-rna [dna-sequence]
  (if (clojure.string/includes? dna-sequence "X")
    (throw (AssertionError.))
    (apply str
           (map #(convert-nucleotide dictionary-dna-rna %) dna))))
```

Although `apply str` provides the correct answer, it is more idiomatic to use the `clojure.string/join` function.

```clojure
(defn to-rna [dna-sequence]
  (if (clojure.string/includes? dna-sequence "X")
    (throw (AssertionError.))
    (string/join
           (map #(convert-nucleotide dictionary-dna-rna %) dna))))
```

The functions provide the correct answer, however, `to-rna` is not a pure function as the dictionary is pulled in as a side cause.

Update all the tests in `test/practicalli/rna-transcription.clj` to call `SUT/to-rna` with a dictionary included in the argument.


```clojure
(ns practicalli.rna-transcription-test
  (:require [clojure.test :refer [deftest is testing]]
            [rna-transcription :as SUT]))

(deftest rna-transcription-test
  (testing "transcribe cytosine to guanine"
    (is (= "G" (SUT/to-rna SUT/dictionary-dna->rna "C"))))

  (testing "transcribe guanine to cytosine"
    (is (= "C" (SUT/to-rna SUT/dictionary-dna->rna "G"))))

  (testing "transcribe adenine to uracil"
    (is (= "U" (SUT/to-rna SUT/dictionary-dna->rna "A"))))

  (testing "transcribe thymine to adenine"
    (is (= "A" (SUT/to-rna SUT/dictionary-dna->rna "T"))))

  (testing "transcribe all nucleotides"
    (is (= "UGCACCAGAAUU" (SUT/to-rna SUT/dictionary-dna->rna "ACGTGGTCTTAA"))))

  (testing "validate dna strands"
    (is (thrown?
           AssertionError
           (SUT/to-rna SUT/dictionary-dna->rna "XCGFGGTDTTAA")))))
```

Update `to-rna` to be a pure function by including the dictionary as an argument and also pass the updated tests.

```clojure
(defn to-rna [dictionary dna-sequence]
  (if (clojure.string/includes? dna-sequence "X")
    (throw (AssertionError.))
    (string/join
           (map #(convert-nucleotide dictionary %) dna))))
```


## Idiomatic improvements

The `to-rna` function is not pure, as it relies on a shared value in the namespace, the `dictionary-dna-rna` transcription map.

Passing `dictionary-dna-rna` as an argument to the `to-rna` function as well as the dna sequence would make `to-rna` a pure function.  It would also allow use of a range of transcription maps.

```clojure
(defn to-rna
  "Transcribe each nucleotide from a DNA strand into its RNA complement
  Arguments: string representing DNA strand
  Return: string representing RNA strand"
  [transcription dna]
  (string/join
    (map #(or (transcription %)
              (throw (AssertionError. "Unknown nucleotide")))
         dna )))
```

The change to the `to-rna` function will break all the tests.

> #### Hint::Exercisim project and the pure function
> If you wish to keep the Exercisim project passing, then add a new namespace to the project by create a new file called `rna-transcript-pure.clj`.  Add the new design of the `to-rna` function to that namespace.  Copy the tests into a new namespace by creating a file called `rna-transcription-pure.clj` and update the tests to use two arguments when calling `to-rna`

Updated unit tests that call `to-rna` with both arguments

```clojure
(ns rna-transcription-pure-test
  (:require [clojure.test :refer [deftest is]]
            [rna-transcription-pure :as SUT]
            [rna-transcription :as data]))

(deftest transcribes-cytosine-to-guanine
  (is (= "G" (SUT/dna->rna data/dna-nucleotide->rna-nucleotide "C"))))

(deftest transcribes-guanine-to-cytosine
  (is (= "C" (SUT/dna->rna data/dna-nucleotide->rna-nucleotide "G"))))

(deftest transcribes-adenine-to-uracil
  (is (= "U" (SUT/dna->rna data/dna-nucleotide->rna-nucleotide "A"))))

(deftest it-transcribes-thymine-to-adenine
  (is (= "A" (SUT/dna->rna data/dna-nucleotide->rna-nucleotide "T"))))

(deftest it-transcribes-all-nucleotides
  (is (= "UGCACCAGAAUU" (SUT/dna->rna data/dna-nucleotide->rna-nucleotide "ACGTGGTCTTAA"))))

(deftest it-validates-dna-strands
  (is (thrown? AssertionError (SUT/dna->rna data/dna-nucleotide->rna-nucleotide "XCGFGGTDTTAA"))))
```


## Summary

This exercise has covered the concept of using a Clojure hash-map structure as a dictionary lookup.
