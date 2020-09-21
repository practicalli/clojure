# Mutating State in a Controlled way
Mutating state should be used carefully and sparingly in Clojure (and all other programming languages).

`atom` is a mutable container that can manage any value. The atom ensures that only one call at a time can affect the value it manages.  This is part of the [software transactions memory system](https://clojure.org/reference/refs) in Clojure.

As the atom is mutable in that the value it manages can be changed, however, this must be done with special commands (swap!, reset!, compare-and-set!, swap-vals!).

Even though the atom is mutable, the values it manages are not.  They are normal immutable (unchangable) Clojure values.

`ref` is similar to `atom` and can manage transactions, ensuring that all changes happen or no changes happen.

| Project          | Topics                | Overview                                                                                      |
|------------------|-----------------------|-----------------------------------------------------------------------------------------------|
| Mutants assemble | atom swap! reset!     | Using an atom to manage state changes                                                         |
| Undo/Redo        | atom add-watch        | Traversing the history of an atom                                                             |
| Poker game       | atom swap! reset! ref | Simple transaction management using atom and ref in a card game, using constraints on an atom |


## References
* [Atoms](https://clojure.org/reference/atoms) - clojure.org
* [Refs and Transactions](https://clojure.org/reference/refs) - clojure.org
* [Agents](https://clojure.org/reference/agents) - clojure.org
