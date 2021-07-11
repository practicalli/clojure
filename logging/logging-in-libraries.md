# Logging in Clojure Libraries

[`clojure.tools.logging`](https://clojure.github.io/tools.logging/) provides a simple wrapper over a wide range of (Java) logging libraries in a way that lets users of your library control the implementation.


How do I make logging backends pluggable from the user end while providing a sane default?

## Logging from Clojure libraries
Clojure projects that use the library should provide an implementation of the clojure.tools.logging as a dependency in code that uses the library.

Note in the README of a library that it uses clojure.tools.logging and expects a project to provide an implementation.

## Example: [next.jdbc](https://github.com/seancorfield/next-jdbc/blob/develop/deps.edn#L28-L35)
The next.jdbc library has a `:test` alias in the project `deps.edn` to select an implementation for unit tests

```clojure
;; supplementary test stuff
;; use log4j 2.x:
org.apache.logging.log4j/log4j-api {:mvn/version "2.13.3"}
;; bridge into log4j:
org.apache.logging.log4j/log4j-1.2-api {:mvn/version "2.13.3"}
```

next.jdbc does not actually depend on org.clojure/tools.logging for day-to-day use. An implementation is required to run unit test, however projects can choose a different implementation
