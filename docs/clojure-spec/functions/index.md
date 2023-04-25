# Specification for function definitions

 Define specifications for your custom functions

* Additional documentation - argument and return values and the relationship between them.
* Instrumenting functions - checking for correct argument values
* Generative testing - using argument specifications to generate comprehensive test data.

Many of the functions in `clojure.core` have [specifications](https://github.com/clojure/core.specs.alpha) in the latest version of Clojure.  The specifications for clojure.core functions can be found in the [clojure/core.specs.alpha](https://github.com/clojure/core.specs.alpha) repository on GitHub.

## clojure.core examples

Specifications used for the `defn`, `defn-`, `fn` functions in `clojure.core`

!!! EXAMPLE "clojure.core specification examples"
    ```clojure
    (s/def ::param-list
      (s/and
        vector?
        (s/cat :params (s/* ::binding-form)
               :var-params (s/? (s/cat :ampersand #{'&} :var-form ::binding-form)))))

    (s/def ::params+body
      (s/cat :params ::param-list
             :body (s/alt :prepost+body (s/cat :prepost map?
                                               :body (s/+ any?))
                          :body (s/* any?))))

    (s/def ::defn-args
      (s/cat :fn-name simple-symbol?
             :docstring (s/? string?)
             :meta (s/? map?)
             :fn-tail (s/alt :arity-1 ::params+body
                             :arity-n (s/cat :bodies (s/+ (s/spec ::params+body))
                                             :attr-map (s/? map?)))))
    ```
