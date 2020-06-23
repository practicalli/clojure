# Card game: spec and generative testing
Specifications to represent the data that composes to create a deck of playing cards and functions that define a simple card game.  spec generators are used to return varied sample data from those specifications. Function definitions are instrumented and check for correct arguments when those functions are called.

## Create a project
Create a new Clojure project using `clj-new` tool for Clojure Tools.
```shell
clojure -A:new app practicalli/card-game
```

> #### Hint::Use practicalli/clojure-deps-edn to add common tools
> fork and clone the [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn) GitHub repository to `~/.clojure/`  and instantly have access to dozens of tools for Clojure software development

## Add the Clojure spec namespace
Open the `src/practicalli/card_game.clj` file and require the `clojure.spec.alpha` namespace

```eval-clojure
(ns practicalli.card-game.clj
  (:require [clojure.spec.alpha :as spec]))
```

> #### Hint::Hiding code
> Each page in this guide runs a self contained REPL, so the `practicalli.card-game` namepace, require expressions and specifications needed for each page are included as a hidden section at the top of each page.  This approach removes the need to duplicate code from previous sections.
