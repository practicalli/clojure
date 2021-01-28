# Add libraries to a project
Add library dependencies to specific project `deps.edn` files to make use of software that has already been developed.  There are thousands of Clojure and ClojureScript libraries available via [clojars.org](https://clojars.org).


## Adding libraries as project dependencies
To use a namespace that is in a library which is not part of your project, that library should be included as a dependency.

{% tabs deps="deps.edn projects", lein="Leiningnen projects" %}

{% content "deps" %}
In the project `deps.edn` file:
```clojure
{:deps
 {org.clojure/clojure        {:mvn/version "1.10.1"}
  org.clojure/clojurescript  {:mv/version "1.10.520"}
  com.stuartsierra/component {:mvn/version "1.0.0"}
  compojure                  {:mvn/version "1.6.1"}
  duct                       {:mvn/version "0.8.2"}
  environ                    {:mvn/version "1.1.0"}}}
```



{% content "lein" %}
In Leiningen:
```clojure
(defproject server-side-webapp "0.1.0-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.10.1"]
                 [org.clojure/clojurescript "1.10.520"]
                 [com.stuartsierra/component "0.3.0"]
                 [compojure "1.6.1"]
                 [duct "0.8.2"]
                 [environ "1.0.1"]])
```


{% endtabs %}


## Excluding dependency dependencies
Libraries may also contain their own library dependencies.  When several libraries are added as dependencies to a project, it is possible that the dependencies of included libraries conflict with each other.

Adding `:exclude` when adding a library as a dependency will prevent the specified libraries dependency from being included.

> TODO: dependency :excludes examples required
