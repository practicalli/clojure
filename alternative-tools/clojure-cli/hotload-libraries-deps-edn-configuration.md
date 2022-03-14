# Using add-libs with project configuration file

A project `deps.edn` file can also be used to hotload libraries with `add-lib`.  This has the advantage that newly added libraries become part of the normal project dependency configuration.

Add a namespace definition to the `deps.edn` file to help editors understand the `deps.edn` file is being used for code.  Use the `#_` comment reader macro with the namespace definition to only evaluate this code manually as a developer.

Add the `add-libs` expression after the `:deps` key so that it is easy to slurp in the existing and new dependencies as a single hash-map.  Use the comment reader macro `#_` to only evaluate this code manually.

To hotload, remove the `#_` temporarily and slurp in the hash-map of dependencies, placing a `'` at the start of the hash-map.  Add the name and version of libraries to hotload in the hash-map.  Evaluate the `add-libs` expression which should return a list of new namespaces added.

Once hotload has finished, barf the hash-maps of dependencies from the `add-libs` expression, removing the `'`.  Add the `#_` to the `add-libs` expression and save the file.

The hotloaded libraries are now available by requiring their namespaces.  If the REPL is restarted, the new dependencies will be included in the Classpath as they are now part of the project configuration.


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

## Example video

See the [REPL driven development video by Sean Corfield](https://youtu.be/gIoadGfm5T8?t=1390) for this technique.

{% youtube %}
https://youtu.be/gIoadGfm5T8
{% endyoutube %}

> Jump to 23 minutes into the video to see this form of hotload in action.
