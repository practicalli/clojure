![RNA Transcription](/images/rna-transcription.png)

# Exercise: RNA Transcription
Given a DNA strand, return its RNA complement (per RNA transcription).

Both DNA and RNA strands are a sequence of nucleotides.

The four nucleotides found in DNA are adenine (A), cytosine (C), guanine (G) and thymine (T).

The four nucleotides found in RNA are adenine (A), cytosine (C), guanine (G) and uracil (U).

Given a DNA strand, its transcribed RNA strand is formed by replacing each nucleotide with its complement:

* G -> C
* C -> G
* T -> A
* A -> U

> #### Hint::Code for this solution on GitHub
> [practicalli/exercism-clojure-guides](https://github.com/practicalli/exercism-clojure-guides/) contains the design journal and solution to this exercise


## Create the project
Download the RNA transcription exercise using the exercism CLI tool

```shell
exercism download --exercise=rna-transcription --track=clojure
```

> To use the Clojure CLI tool instead of Leiningen, create a `deps.edn` file containing an empty hash-map, `{}` and clone [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn) to `~/.clojure/`.


## Designing the solution
To convert a collection of values, define a hash-map where the keys are the initial value and the values are the transformed value (conversion, encoding, etc).  This is often refered to as a dictionary.

A string is used as a collection of character values by many of the functions in `clojure.core`.  The dictionary uses characters for its keys and values.

```clojure
{\G \C \C \G \T \A \A \U}
```

Use the `map` function to pass the dictionary over the dna string (collection of characters) to create the RNA transcription.

Use an anonymous function to wrap the dictionary and pass each a character (nucleotide) from the DNA string in turn.

```clojure
(defn to-rna
  [dna]
  (map (fn [nucleotide] (get {\G \C \C \G \T \A \A \U} nucleotide))
       dna))
```

```clojure
(to-rna "GCTA")
```
<!-- ;; => (\C \G \A \U) -->


The result is returned as a sequence of characters.

Refactor the `to-rna` function and add `clojure.string/join` to return the RNA value as a string

```clojure
(defn to-rna
  [dna]
  (clojure.string/join
    (map (fn [nucleotide] (get {\G \C \C \G \T \A \A \U} nucleotide))
         dna)))
```

Now the function returns a string rather than a collection of characters.

```clojure
(to-rna "GCTA")
```
<!-- ;; => "CGAU" -->

## Throwing an assertion error for incorrect nucleotide
In the Exercism test suite, one test checks for an AssertionError when an incorrect nucleotide is passed as part of the DNA string.

```clojure
(deftest it-validates-dna-strands
  (is (thrown? AssertionError (rna-transcription/to-rna "XCGFGGTDTTAA"))))
```

The `throw` function can be use to return any of the Java errors. An assertion error would be thrown using the following code

```clojure
(throw (AssertionError. "Unknown nucleotide"))
```

Refactor the `to-rna` function to throw an assertion error if a nucleotide if found that is not part of the dictionary.

An `if` function could be used with a conditional to check if each nucleotide is one of the keys in the dictionary and throw an AssertionError if not found.  This would mean consulting the dictionary twice, once for the conditional check and once for the conversion.

Is there a way to consult the dictionary once for each nucleotide?

The `get` function can return a specific not-found value when a key is not found in a map.

What if the `throw` function is used as the not-found value in the `get` function?

```clojure
(defn to-rna
  [dna]
  (clojure.string/join
    (map (fn [nucleotide ](get {\G \C \C \G \T \A \A \U} nucleotide
                               (throw (AssertionError. "Unknown nucleotide")) ))
         dna)))
```

Unfortunately this approach will evaluate the throw expression regardless of if the nucleotide is found in the dictionary, so calling this version of the function always fails.


The `or` function evaluate the first expression and if a true value is returned then any additional expressions are skipped over.

If the first expression returns false or a falsey value, i.e. `nil`, then the next expression is evaluated.


```clojure
(defn to-rna
  [dna]
  (clojure.string/join
    (map (fn [nucleotide](or (get {\G \C \C \G \T \A \A \U} nucleotide)
                             (throw (AssertionError. "Unknown nucleotide"))))
         dna)))
```

```clojure
(to-rna "GCTA")
```
<!-- ;; => "CGAU" -->


Call the `to-rna` function with a DNA string that contains an invalid nucleotide.

```clojure
(to-rna "GCXA")
```

An `AssertionError` is thrown as the `X` character does not exist in the dictionary hash-map, so the `get` expression returns `nil`.


## Refactor and streamline
Now the function is working, some minor adjustments could be made to streamline the code.

A hash-map can be called as a function and takes a key as an argument.  This acts the same as the `get` function, returning the value  associated to a matching key, otherwise returning `nil` or the not-found value if specified.

```clojure
(defn to-rna
  [dna]
  (clojure.string/join
    (map (fn [nucleotide ](or ({\G \C \C \G \T \A \A \U} nucleotide)
                              (throw (AssertionError. "Unknown nucleotide"))))
         dna)))
```

The anonymous function has a terser form.

`#(* %1 %2)` is the same as `(fn [value1 value2] (+ value1 value2))`

This syntax sugar is often use with `map`, `reduce`, `apply` functions as the function definition tends to be compact and of single use.

If the function definition is more complex or used elsewhere in the namespace, then the `defn` function should be used to define shared behavior.

```clojure
(defn to-rna
  [dna]
  (clojure.string/join
    (map #(or ({\G \C \C \G \T \A \A \U} %)
              (throw (AssertionError. "Unknown nucleotide")))
         dna )))
```

Replace the hard-coded hash-map by defining a name for the dictionary.

```clojure
(def dictionary-dna-rna {\G \C \C \G \T \A \A \U})
```

Refactor the `to-rna` function to use the dictionary by name.

```clojure
(defn to-rna
  [dna]
  (clojure.string/join
    (map #(or (dictionary-dna-rna %)
              (throw (AssertionError. "Unknown nucleotide")))
         dna)))
```


## Making the function pure
Its beyond the scope of the Exercism challenge, however, its recommended to use pure functions where possible.

A pure function only uses data from its arguments.

Adding a dictionary as an argument to the `to-rna` function would be simple.

```clojure
(defn to-rna
  [dictionary dna]
  (clojure.string/join
    (map #(or (dictionary %)
              (throw (AssertionError. "Unknown nucleotide")))
         dna )))
```

With a dictionary as an argument the function is also more usable, as other dictionaries could be used with the function.

The function would now be called as follows

```clojure
(to-rna dictionary-dna-rna "GTGAC")
```
