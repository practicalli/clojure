# Projects using Clojure spec - next-jdbc

The next-jdbc project is a modern low-level Clojure wrapper for JDBC-based access to databases.

The project defines data specifications using predicates and

## Defining specifications

Specifications are defined within a single file [`src/next/jdbc/specs.clj`](https://github.com/seancorfield/next-jdbc/blob/master/src/next/jdbc/specs.clj).

Specifications start with `clojure.spec.alpha/def` expressions, using predicate functions as specifications.  There is also a custom predicate function called

Function definition specifications follow, using the `clojure.spec.alpha/fdef` function.  The `fdef` functions define the specification for the arguments of each function.  The `fdef` function name is the same as the function definition it is defining a specification for.

## Instrumenting specifications

Instrumenting functions provides automatic checking that argument in a function call conforms to the specification.

Rather than write individual expressions to instrument each function, a var called `fns-with-specs` contains a collection of names for all the `fdef` function definition specifications.

```clojure
(def ^:private fns-with-specs
  [`jdbc/get-datasource
   `jdbc/get-connection
   `jdbc/prepare
   `jdbc/plan
   `jdbc/execute!
   `jdbc/execute-one!
   `jdbc/transact
   `jdbc/with-transaction
   `connection/->pool
   `prepare/execute-batch!
   `prepare/set-parameters
   `prepare/statement
   `sql/insert!
   `sql/insert-multi!
   `sql/query
   `sql/find-by-keys
   `sql/get-by-id
   `sql/update!
   `sql/delete!])
```

Instrument all the functions by passing `fns-with-specs` as an argument to the `clojure.spec.test.alpha/instrument` function.

This call is wrapped in a simple handler function for convenience.

```clojure
(defn instrument []
  (clojure.spec.test.alpha/instrument fns-with-specs))

```

To remove the checking of argument specifications, `clojure.spec.test.alpha/unstrument` is passed `fns-with-specs`, again wrapped in a convinced function.

```clojure
(defn unstrument []
  (clojure.spec.test.alpha/unstrument fns-with-specs))
```
