# Hotload libraries in Clojure Projects

When starting a REPL process the dependencies listed in the project `deps.edn` file are added to the class path.  To add further dependencies the REPL has to be  restarted to include new libraries added to the `deps.edn` file.

![Hotload libraries into a Clojure Editor](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-repl-hotload-libraries-editors.png){loading=lazy}

[Practicalli REPL Reloaded workflow ](/clojure/clojure-cli/repl-reloaded/) allows new dependencies to be added to a running REPL process, negating the need to restart the REPL process which would loose the current REPL state.


## Hotload REPL

Start a REPL with an alias that includes the `add-libs` library.

=== "Terminal REPL"
    Start a terminal  REPL with the `:repl/reloaded` alias and connect

    ```shell
    clojure -M:repl/reloaded
    ```
    Connect to the REPL process from a Clojure editor for an enhanced development experience.


=== "Clojure Editor"
    Run a Clojure REPL from the editor (jack-in command) configured with the `:dev/reloaded` alias or `:lib/hotload` alias in an Editor jack-in command or other REPL startup command.

   Alternatively, run a Terminal REPL and connect the editor to that REPL process (connect command) 


[Practicalli REPL Reloaded Configuration](/clojure/clojure-cli/repl-reloaded/){target=_blank .md-button}


## Rich Comment Block

Use a rich comment block or [a `dev/user.clj` file](/clojure-cli/projects/configure-repl-startup.md) to require the `clojure.tools.deps.alpha.repl` namespace and write `add-libs` expressions to hot-load libraries.

A rich comment block ensures `add-libs` code is only evaluated manually by a developer.

```clojure
(comment
  (require '[clojure.tools.deps.alpha.repl :refer [add-libs]])
  (add-libs '{http-kit/http-kit {:mvn/version "2.5.1"}})
)
```


??? rich-comment-hotload snippets
    [Practicalli Clojure LSP Config](/clojure/clojure-editors/clojure-lsp/practicalli-snippets/) includes the `rich-comment-hotload` snippet which adds a rich comment block with a require for `clojure.tools.deps.alpha` and an `add-libs` expression, making it very quick to add this code.

    `deps-maven` and `deps-git` snippets help ensure the correct syntax is used for the `add-libs` expression for each library dependency to be added.


## Hotload Example

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


??? INFO "Using add-libs with project deps.edn"
    A project `deps.edn` file can also be used to hotload libraries with `add-lib`.  This has the advantage that newly added libraries become part of the normal project dependency configuration.
    
    Add a namespace definition to the `deps.edn` file to help editors understand the `deps.edn` file is being used for code.  Use the `#_` comment reader macro with the namespace definition to only evaluate this code manually as a developer.
    
    Add the `add-libs` expression after the `:deps` key so that it is easy to slurp in the existing and new dependencies as a single hash-map.  Use the comment reader macro `#_` to only evaluate this code manually.
    
    To hotload, remove the `#_` temporarily and slurp in the hash-map of dependencies, placing a `'` at the start of the hash-map.  Add the name and version of libraries to hotload in the hash-map.  Evaluate the `add-libs` expression which should return a list of new namespaces added.
    
    Once hotload has finished, barf the hash-maps of dependencies from the `add-libs` expression, removing the `'`.  Add the `#_` to the `add-libs` expression and save the file.
    
    The hotloaded libraries are now available by requiring their namespaces.  If the REPL is restarted, the new dependencies will be included in the Classpath as they are now part of the project configuration.
    
    
    ```clojure
    ;; ---------------------------------------
    ;; Project Configuration with  Hotload
    ;; ---------------------------------------
    
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

## Live Coding video

See the [REPL driven development video by Sean Corfield](https://youtu.be/gIoadGfm5T8?t=1390) for this technique.

<p style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/gIoadGfm5T8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>

> Jump to 23 minutes into the video to see this form of hotload in action.
