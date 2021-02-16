![Hotload libraries into a Clojure REPL](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-repl-hotload-libraries.png)

## Hotload Libraries into a running REPL
Avoid restarting the REPL when using a new library for a project by using the `add-libs` function from `clojure.tools.deps.alpha`.

`add-libs` will "hotload" one or more libraries into a running REPL so that any namespace from those libraries can be required as if the dependency had been added to the project configuration before the REPL started.

[practicalli/clojure-webapp-hotload-libraries](https://github.com/practicalli/clojure-webapp-hotload-libraries) is an example project that uses REPL driven development and hot loading of libraries to build a very simple web server using http-kit and hiccup.

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
  ;; run REPL with :alpha/hotload-libs alias
  (require '[clojure.tools.deps.alpha.repl :refer [add-libs]])

  ;; hotload the libraries required for the server
  (add-libs
    '{http-kit/http-kit {:mvn/version "2.5.1"}})
  ;; => (http-kit/http-kit)


  (require '[org.httpkit.server :as app-server])


  ;; What functions are ava
  (ns-publics (find-ns 'org.httpkit.server))

  ;; efine an entry point for the application
  (defn welcome-page
    [request]
    {:status  200
     :body    "Welcome to the world of Clojure CLI hotloading"
     :headers {}})

  ;; Start the application server
  (app-server/run-server #'welcome-page {:port (or (System/getenv "PORT") 8888)})

  ;; Visit http://localhost:8888/ to see the welcome-page

  ;; Hotload Hiccup to generate html for the welcome page
  (add-libs '{hiccup/hiccup {:mvn/version "2.0.0-alpha2"}})

  (require '[hiccup.core :as hiccup])
  (require '[hiccup.page :as hiccup-page])

  ;; Create a page template
  (defn page-template [content]
    (hiccup-page/html5
      {:lang "en"}
      [:head (hiccup-page/include-css "https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css")]
      [:body
       [:section {:class "hero is-info"}
        [:div {:class "hero-body"}
         [:div {:class "container"}
          [:h1 {:class "title"} (:title content) ]
          [:p {:class "subtitle"} (:sub-title content)]]]]]))

  ;; Check the page template returns HTML
  (page-template {:title     "Hotload Libraries in the REPL"
                  :sub-title "REPL driven development enables experimentation with designs"})


  ;; redefine the welcome page to call the page template
  (defn welcome-page
    [request]
    {:status  200
     :body    (page-template {:title     "Hotload Libraries in the REPL"
                              :sub-title "REPL driven development enables experimentation with designs"})
     :headers {}})

  ;; Visit http://localhost:8888/ and refresh the page to see the new welcome-page
  )
```

## Using add-libs with project configuration file
A project `deps.edn` file can also be used to hotload libraries with `add-lib`.  This has the advantage that newly added libraries become part of the normal project dependency configuration.

Add a namespace definition to the `deps.edn` file to help editors understand the `deps.edn` file is being used for code.  Use the `#_` comment reader macro with the namespace definition to only evaluate this code manually as a developer.

Add the `add-libs` expression after the `:deps` key so that it is easy to slurp in the existing and new dependencies as a single hash-map.  Use the comment reader macro `#_` to only evaluate this code manually.

To hotload, remove the `#_` temporarily and slurp in the hash-map of dependencies, placing a `'` at the start of the hash-map.  Add the name and version of libraries to hotload in the hash-map.  Evaluate the `add-libs` expression which should return a list of new namespaces added.

Once hotload has finished, barf the hash-maps of dependencies from the `add-libs` expression, removing the `'`.  Add the `#_` to the `add-libs` expression and save the file.

The hotloaded libraries are now available by requiring their namespaces.  If the REPL is restarted, the new dependencies will be included in the Classpath as they are now part of the project configuration.

See the [REPL driven development video by Sean Corfield](https://youtu.be/gIoadGfm5T8?t=1390) for this technique.

```clojure
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Project Configuration with  Hotload
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; Hotload requires
#_(ns deps.edn
    (:require [clojure.tools.deps.alpha.repl :refer [add-libs]]))

;; Project configuration
{:paths
 ["src" "resources"]

 :deps
 #_ (add-libs)
 {org.clojure/clojure {:mvn/version "1.10.1"}
  http-kit/http-kit   {:mvn/version "2.5.1"}
  hiccup/hiccup       {:mvn/version "2.0.0-alpha2"}}

 :aliases {}
```
