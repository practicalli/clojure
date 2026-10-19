# Hot-load libraries in Projects

From Clojure 0.12 onward, libraries can be hot-loaded into the running REPL using [clojure.repl.deps functions](https://clojuredocs.org/clojure.repl.deps){target=_blank}.

Use a [rich comment block](#rich-comment-block) when using source code files to evaluate code in the REPL, i.e. a REPL connected editor.

Update and [synchronise the project `deps.edn` configuration](#synchronising-library-dependencies) when there is certainty that a library should become part of the project.

![Hotload libraries into a Clojure Editor](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-repl-hotload-libraries-editors.png){loading=lazy}


!!! INFO "Reload Namespaces using Practicalli Reloaded REPL workflow"
    [Practicalli REPL Reloaded workflow](../repl-reloaded/) provides additional tools to reload namespaces in a running REPL process, without loosing the current REPL state.


## Rich Comment Block

A rich comment block separates hot-load code to ensure is only evaluated manually and not included when evaluating the whole namespace.

!!! EXAMPLE "Adding a single library"
    ```clojure
    (comment
      (require '[clojure.repl.deps :refer [add-lib]])
      (add-lib 'http-kit/http-kit {:mvn/version "2.5.1"})
    )
    ```

??? TIP "Clojure LSP snippets for hot-loading"
    `rich-comment-hotload` snippet from [Practicalli Clojure LSP Config](../../clojure-editors/clojure-lsp/practicalli-snippets/) expands to a rich comment block with a require for `clojure.repl.deps`, with an `add-lib`.

    `deps-maven` and `deps-git` snippets ensure the correct syntax is used for the`coord` argument of `add-lib` and `add-libs` functions for a library.


## Hot-load Web Server

Create a web server from scratch, serving pages generated from hiccup.

All libraries are hot-loaded as the code is written, showing its possible to write a application when only starting the REPL once.

!!! EXAMPLE "REPL log for hot-load web server"
    ```clojure
    (comment
      ;; run REPL with :lib/hotload alias
      (require '[clojure.repl.deps :refer [add-lib]])

      ;; add latest http-kit library
      (add-lib 'http-kit/http-kit {:mvn/version "2.5.1"}})
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
      (add-lib 'hiccup/hiccup {:mvn/version "2.0.0-RC1"})

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


## Synchronising Library Dependencies

`sync-deps` function will ensure all libraries defined in the `:deps` key of the project `deps.edn` configuration are loaded in the currently running REPL.

If new libraries have be added to the `:deps` key they will be downloaded and included (added to the JVM class path).

This approach ensures added libraries become part of the normal project dependency configuration.

!!! TIP "Comment Reader Macro for optional libraries"
    The `#_` comment reader macro ignores the next form. A `#_#_` will ignore a library and coord of a dependency without breaking the syntax of the `deps.edn` configuration.

    To hotload a commented library, remove `#_#_` and run `sync-deps`.


!!! EXAMPLE "Project Configuration with Hot-load"
    ```clojure title="deps.edn"
    {:paths
     ["src" "resources"]

     :deps
     {org.clojure/clojure {:mvn/version "1.12.1"}
      http-kit/http-kit   {:mvn/version "2.5.1"}
      #_#_hiccup/hiccup       {:mvn/version "2.0.0-alpha2"}})

     :aliases {}
    ```
