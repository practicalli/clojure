# Naming Conventions

## Kebab-case

Kebab-case is the naming convention for all Clojure function names than contain more than one word.  Its name comes from the Shish Kebab style of cooking, where the words are the tofu and vegetables and the dashes are the skewers.

```
clj-time
string-parser
display-name
```

## Predicates

Examples of predicate naming conventions from `clojure.core`

```
contains?
empty?
every?
not-empty?
null?
```


## Namespace requires and aliases

Required libraries should be given a contextually meaningful name as an alias, helping to identify the purpose of functions defined outside of the namespace.

Giving meaningful context helps code to be understood by any person reading the code.  It is also easier to search for usage of functions from that context in the current project.

Aliases are rarely typed more than once in full as Clojure editors have auto-complete, so there is no benefit to short of single character aliases.

```clojure
(ns status-monitor.handler
  (:require [hiccup.page :refer :as web-page]
            [hiccup.form :refer :as web-form]))
```


In very commonly used libraries or very highly used functions through out the code, refer those functions explicitly

```clojure
(ns naming.is.hard
  (:require [compojure.core :refer [defroutes GET POST]]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]))
```


## Converting functions

When a function takes values in one format or type and converts them to another

Examples

```
md->html

map->Record-name  ; map factory function of a record -- creates a new record from a map
->Record-name     ; positional factory function of a record -- creates a new record from a list of values
```
