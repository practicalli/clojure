# Logging in Clojure

* https://github.com/clojure/tools.logging
* https://lambdaisland.com/blog/2020-06-12-logging-in-clojure-making-sense-of-the-mess





{% tabs deps="deps.edn projects", lein="Leiningnen projects" %}

{% content "deps" %}

use log4j 2.x:

org.apache.logging.log4j/log4j-api {:mvn/version "2.13.3"}

```clojure
;; bridge into log4j:
org.apache.logging.log4j/log4j-1.2-api {:mvn/version "2.13.3"}
org.apache.logging.log4j/log4j-jcl {:mvn/version "2.13.3"}
org.apache.logging.log4j/log4j-jul {:mvn/version "2.13.3"}
org.apache.logging.log4j/log4j-slf4j-impl {:mvn/version "2.13.3"}
```


log4j-core is a dependency of log4j-slf4j-impl

```shell
clojure -Stree
```

```clojure
  org.apache.logging.log4j/log4j-slf4j-impl 2.13.3
    org.apache.logging.log4j/log4j-core 2.13.3
```


{% content "lein" %}
Example project.clj

setup log4j2
https://gist.github.com/ataggart/ac208c289c5d01dacf3b4b341a1c37f0

```clojure
(defproject example "0.1.0"
  :description "Example configuration for using log4j2 as the concrete logging
                implementation. Libraries that depend on other well-known java
                logging abstractions (e.g., SLF4J) will be logged with log4j2.
                Also configures tools.logging to choose log4j2."

  :dependencies [; Provide the log4j2 logging implementation:
                 [org.apache.logging.log4j/log4j-api "2.13.0"]
                 [org.apache.logging.log4j/log4j-core "2.13.0"]
                 ; Provide log4j2 adapters for other java logging abstractions:
                 [org.apache.logging.log4j/log4j-jcl "2.13.0"]
                 [org.apache.logging.log4j/log4j-jul "2.13.0"]
                 [org.apache.logging.log4j/log4j-slf4j-impl "2.13.0"]
                 ; Provide clojure logging abstraction:
                 [org.clojure/tools.logging "1.1.0"]]

  :exclusions [; Exclude transitive dependencies on concrete implementations
               ; and adapters of the above java logging abstractions:
               [ch.qos.logback/logback-classic]
               [ch.qos.logback/logback-core]
               [org.slf4j/jcl-over-slf4j]
               [org.slf4j/jul-to-slf4j]
               [org.slf4j/log4j-over-slf4j]
               [org.slf4j/slf4j-nop]]

  :jvm-opts [; Explicitly configure to use log4j2:
             "-Dclojure.tools.logging.factory=clojure.tools.logging.impl/log4j2-factory"]

  :profiles {:dev {; Use a different log4j2 config in dev (defaults to log4j2.properties):
                   :jvm-opts "-Dlog4j.configurationFile=resources/log4j2-dev.properties"}})
```

{% endtabs %}
