# Hotload Libraries into a running REPL
Avoid restarting the REPL when using a new library for a project by using the `add-libs` function from `clojure.tools.deps.alpha`.

`add-libs` will "hotload" one or more libraries into a running REPL so that any namespace from those libraries can be required as if the dependency had been added to the project configuration before the REPL started.

> #### WARNING::WARNING: Not officially supported approach
> The `add-libs` function is not officially part the Clojure CLI tools.  The code design may change so this approach should be used with caution and not relied upon in your workflow.

{% tabs practicalli="practicalli/clojure-deps-edn", manual="Manually add Alias" %}

{% content "practicalli" %}

## Use alias for tools.deps.alpha dependency
[Install practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn/) which included the `:alpha/hotload-libs` alias which adds the `clojure.tools.deps.alpha.repl` library as an extra dependency.


{% content "manual" %}

## Add alias for tools.deps.alpha
Edit the project `deps.edn` configuration and add an `:alpha/hotload-libs` alias for the `clojure.tools.deps.alpha.repl` library.

```clojure
  :alpha/hotload-libs
  {:extra-deps {org.clojure/tools.deps.alpha
               {:git/url "https://github.com/clojure/tools.deps.alpha"
                :sha     "d77476f3d5f624249462e275ae62d26da89f320b"}}}
```

> Alias example from [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn/)

{% endtabs %}


## Hotload libraries in a terminal REPL UI
Start a REPL session using the Clojure CLI tools with the hot-load alias, including rebel readline for an enhance REPL UI.

```shell
clojure -M:alpha/hotload-libs:repl/rebel
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


## Hotload libraries in a Clojure editor
Start a REPL in a terminal and use the connect command of the editor to connect the editor to the REPL process.  For example, run a Rebel UI repl in the terminal with the `clojure.tools.deps.alpha` library included

```shell
clojure -M:alpha/hotload-libs:repl/rebel-nrepl
```

Alternatively, use the editors jack-in function to start a REPL process and connect, ensuring that an alias is loading the `clojure.tools.deps.alpha` library.

Once the editor is connected to the REPL, edit the source code to require the `clojure.tools.deps.alpha.repl` namespace and write `add-lib` expressions to hotload libraries.

Use a rich comment block to hold the code that hot-loads libraries so that code is only evaluated manually by a developer.

```clojure
(comment
  ;; Add-lib library for hot-loading
  (require '[clojure.tools.deps.alpha.repl :refer [add-libs]])

  (add-libs
   '{ring/ring {:mvn/version "RELEASE"}
     ring/ring-defaults {:mvn/version "0.3.2"}})
  )
```

Alternatively, add the `add-libs` expression to the `deps.edn` configuration file, using the comment reader macro `#_` to temporarily comment the `:deps` key when using add-libs and comment the `add-libs` expression once hotloading has finished.

See the [REPL driven development video by Sean Corfield](https://youtu.be/gIoadGfm5T8) for this technique.
