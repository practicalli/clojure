![Hotload libraries into a Clojure Editor](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-repl-hotload-libraries-terminal-ui.png)


# Hotload libraries in a terminal REPL UI

Start a REPL session using the Clojure CLI tools with the hot-load alias, including rebel readline for an enhance REPL UI.

```bash
clojure -M:lib/hotload:repl/rebel
```

The required libraries for the `:hotload-libs` alias are downloaded (if not already available locally in `~/.m2` maven cache on first run).

The REPL process with start and the terminal will show the Rebel UI.

![Clojure REPL - hot load library dependencies](/images/clojure-repl-hot-load-deps-rebel.png)

Require the `clojure.tools.deps.alpha` library and refer the `add-libs` function.  The `add-libs` function can then be called without having to use an alias or the fully qualified name.

```clojure
(require '[clojure.tools.deps.alpha.repl :refer [add-libs]])
```

Hotload a library into the REPL using the `add-lib` function in the following form, where `domain/library` is the fully qualified name of the library and `RELEASE` is a string of the version number of that library to use.

```clojure
(add-libs '{domain/library {:mvn/version "RELEASE"}})
```

Multiple libraries can be hot-loaded in a single `add-libs` expression

```clojure
(add-libs '{hhgttg/meaning {:mvn/version "4.2.0"}
            eternity/room  {:mvn/version "1.0.1"}})
```


### Hotload hiccup in a terminal REPL
The hiccup library converts clojure structures into html, where vectors represent the scope of keywords that represent html tags.

Load the hiccup library using add-libs

```clojure
(add-libs '{hiccup/hiccup {:mvn/version "2.0.0-alpha2"}})
```

Require the hiccup library so its functions are accessible from the current namespace in the REPL.

```clojure
(require '[hiccup.core :as hiccup])
```

Enter an expression using the `hiccup/html` function to convert a clojure data structure to html.

```clojure
(hiccup/html [:div {:class "right-aligned"}])
```

The hiccup expression returns a string of the html code.

![Clojure REPL hot load dependencies ](/images/clojure-repl-hotload-add-libs-hiccup-example.png)
