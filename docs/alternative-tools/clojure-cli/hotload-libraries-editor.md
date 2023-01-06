![Hotload libraries into a Clojure Editor](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-repl-hotload-libraries-editors.png)

# Hotload libraries in a Clojure editor

Connect or jack-in to a Clojure REPL which is configured with the [add-libs branch of tools.deps.alpha added as a dependencies via an alias](hotload-libraries.md).

Use a rich comment block or [a `dev/user.clj` file](/clojure-cli/projects/configure-repl-startup.md) to require the `clojure.tools.deps.alpha.repl` namespace and write `add-libs` expressions to hot-load libraries.

## Rich Comment Block

A rich comment block ensures `add-libs` code is only evaluated manually by a developer.

```clojure
(comment
  (require '[clojure.tools.deps.alpha.repl :refer [add-libs]])
  (add-libs '{http-kit/http-kit {:mvn/version "2.5.1"}})
)
```


## Clojure LSP snippets

[Snippets provided by Clojure LSP](https://clojure-lsp.io/features/#snippets) include `rich-comment-hotload`, to add a rich comment block with a require for `clojure.tools.deps.alpha` and an `add-libs` expression, making it very quick to add this code.

`deps-maven` and `deps-git` snippets help ensure the correct syntax is used for the `add-libs` expression for each library dependency to be added.


## Hotload Example - a simple web server

Create a web server from scratch, serving pages generated from hiccup, with all libraries hot-loaded as the code is being written.  Demonstrates that it is possible to write an application when only starting the REPL once.

```clojure
(comment
  ;; run REPL with :lib/hotload alias
  (require '[clojure.tools.deps.alpha.repl :refer [add-libs]])

  ;; hotload the libraries required for the server
  (add-libs
    '{http-kit/http-kit {:mvn/version "2.5.1"}})
  ;; => (http-kit/http-kit)


  ;; Require the namespace from the http-kit library
  (require '[org.httpkit.server :as app-server])

   ;; Define a handler for http requests
  (defn welcome-page
    [request]
    {:status  200
     :body    "Welcome to the world of Clojure CLI hotloading"
     :headers {}})

  ;; Start the application server with the handler
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
