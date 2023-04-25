# Clojure Spec for data

Specifications can be defined for any data in Clojure, be that simple values or complex data structures. More complex specifications are composed of individual specifications, providing a flexible way to define specifications without building a brittle hierarchy.

## What is a specification

Specifications can be [predicates](predicate-specifications.md) (return true or false), [literal values](literal-values.md) in sets and [entity maps](entity-maps.md).

There are many [predicate functions that come with Clojure](/reference/clojure/predicate-functions.md) which help speed the creation of specifications.  Clojure function definitions (`fn`, `defn`) can be used to define custom predicate functions too.

## Do values meet a specification

The functions use to compare data with a specification are:

* `conform` - test if data conforms to a specification, returning the conformed value
* `valid?` - predicate to test if data conforms to a specification, returning true of false
* `explain` - explain why a value is not conforming to a specification

There are variations on explain, that present the results in different formats.

## Workflow for data specifications

Using Clojure Specification is very flexible, they can be used as much or as little as required.

Typically Specifications are created when data structures are being modeled, which can be done via experimenting in the REPL or taking a test first approach.  Either way is viable.

The generative tests section shows how specifications are used to generate mock data, so creating specifications earlier on in the development process will provide a wider range of data for unit tests and repl experimentation.

<!--

;; Question: when use valid? rather than conform?

;; What about nil values
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Some predicates do not consider `nil` a valid value
;; typically those predicates that check for a specific type

;; spec/nilable will transform a predicate to use nil

(spec/valid? string? nil)

(type "what type am I")
(type nil)

(spec/valid? (spec/nilable string?) nil)

 -->
