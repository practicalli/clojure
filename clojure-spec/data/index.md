# Clojure Spec for data
Specifications can be defined for any data in Clojure, be that simple values or complex data structures.

Specifications can be predicate functions, ,,, or custom functions that return true or false.

There three ways to work with data specifications

* `conform` - test if data conforms to a specification
* `valid?` - predicate to test if data conforms to a specification
* `explain` - explain why a value is not conforming to a specification

## Workflow for data specifications
Using Clojure Specification is very flexible, they can be used as much or as little as required.

Typically Specifications are created when data structures are being modelled, which can be done via experimenting in the repl or taking a test first approach.  Either way is viable.

The generative tests section shows how specifications are used to generate mock data, so creating specifications earlier on in the development process will provide a wider range of data for unit tests and repl experimentation.

## Explain

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
