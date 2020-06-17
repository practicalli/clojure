# Defining specifications
`clojure.spec.alpha/def` binds a name to a specification, just like `clojure.core/def` binds a name to a value.

Binding a name means specifications are available throughout the code and in other projects if the project is included as a library.

## Naming - fully qualified keywords
Specification names should use fully qualified keywords, typically using the namespace in which the specification is defined in.

Define a namespace for the page and require Clojure Spec

```eval-clojure
(ns practicalli.clojure.specifications
  (:require [clojure.spec.alpha :as spec]))
```


```eval-clojure
(spec/def :practicalli.clojure.specifications/number number?)
```

## auto-resolve macro
`::` double colon is the auto-resolve macro, which will pre-pend the current namespace to the specification keyword. The `::` notation removes the need to edit fully qualified names should a specification be moved to a different namespace.

```eval-clojure
(spec/def ::number number?)
```


> #### Hint::Fully Qualified keywords
> Using fully qualified keywords ensures they are unique and therefore can be used across all projects.
>
> Namespaces are usually unique as they include the name of the company or organization behind the code and any project or component names used to organize the code.
