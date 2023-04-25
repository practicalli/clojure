# Data structures

Clojure is a very data-centric language.  `clojure.core` contains a great number of functions for manipulating data structures, especially the immutable built in data structures, referred to generically as collections.

Collections can take any types of elements and types can be mixed.  Collections can even have other collections as an element.

Collections are passed as arguments to function (either in part or in full) and functions often return collections as a result.

## Built-in collections

Values can be represented as a collection of discrete pieces of data: number, string, boolean value.

Clojure has great facilities for working with collections of data, providing many types of data structures and a uniform way to use all of these data structures.

The 4 commonly used built-in data structures

| Name     | syntax           | Description                                                                          |
|:---------|:-----------------|:-------------------------------------------------------------------------------------|
| list     | `()`             | A linked list, optomised for sequential access from the front (head)                 |
| vector   | `[]`             | An indexed array optimised for random access                                         |
| hash-map | `{:key "value"}` | Associative collection of key / value pairs, keys must be unique. Keys are the index |
| set      | `#{}`            | A unique set of values                                                               |

Vector and hash-map are the most commonly collections used to model information with Clojure.

Lists are not explicitly used to model data, although data may be returned by a function as a list (referred to as a sequence)

## Collection Characteristics

Clojure data structure share the following characteristics:

* **Immutable** - once a data structure is defined it cannot be changed
* **Persistent** - functions may return an altered copy of a data structure which will share common values with the original data structure for efficient memory use (structural sharing)
* **Dynamically typed** - a data structure can contain any value, including functions (as they evaluate to a value) and other data structures (nested data structures)

This section will cover the Clojure built in persistent data structures in more detail.

## Common Data Structures

Simple data

(def name value)

Sequential data

(list ...) sequence - always processed sequentially

(vector) sequencw with randon access

Dictionary

(key value
 key1 value
 key2 value)

 Connverting data, data decoder/encoder, state machine, etc

 Data set

```clojure
(def name
  [{:identical-keys "with evolving values"}
   {:identical-keys "values differ from each other"}
   {:identical-keys "values collectively provide meaning"}])
```

 Weather monitoring data, bank transactions, stock exchange rates, etc

### Hierarchical data

```clojure
(def name
  {:simple-key value
   :composite-key {:nested-key value}
   :deeper-composite-key {:nested-key {:deeper-nested-key value}}})
```

representing state,
structure of a website
Starwars example,

walk the hierarchy to get the appropriate values

extract only the values required by a function and pass as arguments

hierachiecy can become too complex to manage, the flatest possible structure is usually simpler to work with (transform)
