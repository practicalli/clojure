# Naming things - data structues and functions 

The `def` function is used to name data structures in Clojure.

You can also use `def` to name functions, however it is more common to use `defn` (which is a macro around def) to give a function a name.


## Keeping things private 

  There is less empasis on keeping functions and data structures private (compared to Java, C++, C#).  If you want to define a function name so that it is only accessible by other functions of the same namespace, you can use the `defn-` function.
  
  There is no private equivaltent for `def` (as of Clojure 1.6) however you can use metadata to specify this

(def ^:private name data)

> TODO: check if there is anything new around this or other common practices


## Misc - writing a private def macro

  You could write your own macro to create a private `def` called `def-`

```clojure
(defmacro def- [item value]
  `(def ^{:private true} ~item ~value)
)
```

> There are no naming conventions for a private symbol name.  As its defined an used within the scope of that one namespace (file), then there is no real need to make a special convention.  Private functions will just be called as normal within the namespace and it will be quite clear from the function definition that it is private.

[Clojure community style guilde](https://github.com/bbatsov/clojure-style-guide)


## example



Learning Clojure #4: private functions
http://tech.puredanger.com/2010/02/09/clojure-4-private-functions/


Sometimes in a Clojure file you just want some helper functions that shouldn’t be exposed outside the namespace. You can create a private function using the special defn- macro instead of defn.

For instance, create a file foo/bar.clj with a public and a private function:

(ns foo.bar)
(defn- sq [x] (* x x))
(defn sum-squares [a b] (+ (sq a) (sq b)))

Then use it from the REPL:

user=> (use 'foo.bar)
nil
user=> (sum-squares 3 4)
25
user=> (sq 5)
java.lang.Exception: Unable to resolve symbol: sq in this context (NO_SOURCE_FILE:6)
