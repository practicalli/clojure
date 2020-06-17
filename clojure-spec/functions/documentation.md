# clojure.spec adds documentation to function definitions
Using doc to show the spec

```eval-clojure
(ns practicalli.clojure
  (:require [clojure.repl :as repl]
            [clojure.spec.alpha :as spec]))
```

```eval-clojure
(repl/doc map)
```

(clojure.repl/doc :playing-card/suit)

prints in the REPL buffer:
:playing-card/suit

Spec

```eval-clojure
 #{:spade :heart :diamond :club}

```


```eval-clojure
(repl/doc :cat-show:cat-bread)

```
