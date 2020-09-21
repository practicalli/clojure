# Mutants Assemble

> #### TODO::work in progress, sorry

In this section you will apply changes to values, how to define your own simple functions.

We will also introduce the following functions for the first time:

| `atom`       | create an anonymous function, one without a name |
| `deref`, `@` | assign a name to a function                      |

## Create a new Clojure project
Use [Clojure CLI tools and clj-new](/clojure-tools/install/install-clojure.html#clojure-cli-tools-common-aliases) to create a new Clojure project.

```shell
clojure -A:new app practicalli/mutants-assemble
```

Open the `src/practicalli/mutants-assemble.clj` file in a Clojure aware editor and start the REPL.


## Define an atom
Use the standard `def` function to bind a name to an atom.

The atom wraps data, initially an empty vector.

```eval-clojure
(def mutants (atom []))
```

Define a function using `defn` which takes a mutant as an argument and updates the value managed by the atom.  The reference to the atom is also an argument, making this a pure function and more generic as any given atom can be updated with this function.

```eval-clojure

(defn add-mutant [mutants mutant]
  (swap! mutants conj mutant))
```

[`swap!`](https://clojuredocs.org/clojure.core/swap!) uses a function to create a new value for the atom to manage.  In this case the `conj` function is used to join the value of mutant with the existing mutants atom value, creating a new vector.

[`swap!`](https://clojuredocs.org/clojure.core/swap!) is a macro so the syntax is a little different. Essentially this is the same as an expression `(conj mutants mutant)`, with the value this returns swapped into the atom.


Call the function with the `mutants` atom and a mutant to add, which is a string containing the name of a mutant character.

```clojure
(add-mutant mutants "Black Widow")
```

The value the atom is managing has been swapped for a new value.  The original value was not modified (vectors are immutable) so the atom now points to a new value, a vector containing a string.

## Viewing the value managed by the atom
Use the `deref` function to see the value the atom is managing.

```eval-clojure
(deref mutants)
```

It is idiomatic to use `@` which is a syntax alias for the `deref` function, rather than explicitly using `deref`.

```eval-clojure
@mutants
```

## Reset the atom value
`reset!` will change the value managed by the atom by providing the new value.  This is simpler than using `swap!` as it does not use the existing value in the atom.

```
(reset! mutants [])
```

Now all the mutants are gone (and we can start looking for new ones to add).
