# Clojure Predicate functions

A predicate function takes a single argument and returns a truthy value, e.g. `true` or `false`

![Clojure - Simple projects - Encoding and decoding](https://github.com/practicalli/graphic-design/blob/live/code-challenges/simple-projects-encoding-true-false.png?raw=true)


There are over 70 predicate functions provided by the `clojure.core` namespace. 

| `clojure.core` predicates      | Description |
|--------------------------------|-------------|
| >0? (^:private)                |             |
| >1? (^:private)                |             |
| any?                           |             |
| associative?                   |             |
| boolean?                       |             |
| bound?                         |             |
| bytes?                         |             |
| chunked-seq? (^:static)        |             |
| class?                         |             |
| coll?                          |             |
| contains?                      |             |
| counted?                       |             |
| decimal?                       |             |
| delay?                         |             |
| distinct?                      |             |
| double?                        |             |
| empty?                         |             |
| even?                          |             |
| every?                         |             |
| false?                         |             |
| fits-table? (defn-)            |             |
| float?                         |             |
| fn?                            |             |
| future?                        |             |
| future-cancelled?              |             |
| future-done?                   |             |
| ident?                         |             |
| identical?                     |             |
| ifn?                           |             |
| indexed?                       |             |
| inst?                          |             |
| int?                           |             |
| integer?                       |             |
| isa?                           |             |
| is-annotation? (defn-)         |             |
| is-runtime-annotation? (defn-) |             |
| keyword?                       |             |
| libspec? (defn-)               |             |
| list?                          |             |
| map-entry?                     |             |
| nat-int?                       |             |
| neg?                           |             |
| neg-int?                       |             |
| nil?                           |             |
| number?                        |             |
| odd?                           |             |
| pos?                           |             |
| pos-int?                       |             |
| qualified-ident?               |             |
| qualified-keyword?             |             |
| qualified-symbol?              |             |
| ratio?                         |             |
| rational?                      |             |
| reader-conditional?            |             |
| realized?                      |             |
| reduced?                       |             |
| reversible?                    |             |
| seqable?                       |             |
| sequential?                    |             |
| set?                           |             |
| simple-ident?                  |             |
| simple-keyword?                |             |
| simple-symbol?                 |             |
| some?                          |             |
| sorted?                        |             |
| special-symbol?                |             |
| symbol?                        |             |
| tagged-literal?                |             |
| thread-bound?                  |             |
| true?                          |             |
| uri?                           |             |
| uuid?                          |             |
| var?                           |             |
| volatile?                      |             |
| zero?                          |             |
