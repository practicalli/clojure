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


## Excluding dependencies
Adding several libraries as dependencies to a project may cause conflicts. The `:exclusions`  key will prevent libraries within a library dependency from being included in the project

For example, library-a and library-b both have a dependency on library-c, as defined in the project configuration for library-a and library-b.  When including library-a and library-b in the project as dependencies, there could be a conflict if the both libraries use a different version of library-c.  Adding an exclude to library-a or library-b will stop library-c being included twice.

A Library that is self-contained and does not itself include any dependencies on any other libraries is unlikely to cause conflicts.  Using these self-contained libraries simplifies the overall application design.


{% tabs deps="deps.edn projects", lein="Leiningnen projects" %}

{% content "deps" %}
### Clojure CLI tools
Top level dependencies

```clojure
{:deps {:org.clojure/clojure {:mvn/version "1.10.2"}
        :cheshire/cheshire  {:mvn/version "5.10.0"
            :exclusions "com.fasterxml.jackson.core/jackson-core"}}}
```


{% content "lein" %}
### Leiningen

```
(defproject my-project "1.0.0"
  :dependencies [[org.clojure/clojure "1.10.2"]
                 [cheshire "5.10.0" :exclusions [com.fasterxml.jackson.core/jackson-core]]])
```


{% endtabs %}
