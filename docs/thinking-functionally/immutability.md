# Immutability

There is a strong emphasis on immutability in Clojure.  Rather than create variables that change, Clojure uses values that do not change.

Values in Clojure include numbers, characters, strings.

When functions act on values, a new value is created and returned, rather than modifying the existing value.

> **TODO** include a diagram to visualise this...

# Immutabile data structures

List, Map, Vector and Set are all immutable data structures in Clojure.

So when you use these data structures with a function, a new data structure is returned.

> **Hint** When a new data structure is created from an existing data structure, then under the covers the two data structures actually share memory use for any elements that are common.  This keeps copies very cheap to create in terms of memory used.

> See the section on [data structures](/data-structures/) for more details.
