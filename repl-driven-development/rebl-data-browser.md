# REBL data browser
REBL is a interactive tool for browsing Clojure data, initially created for Datomic and useful for navigating data structures especially larger in size.

![Clojure REBL data browser](https://raw.githubusercontent.com/cognitect-labs/REBL-distro/master/screenshot.png)

> #### WARNING::Free for non-commercial use
> Commercial use requires an active Datomic customer or subscriber to the [REBL patreon](https://www.patreon.com/cognitect)

## Install REBL
REBL is only available as a [direct download from rebel.cognitect.com](http://rebl.cognitect.com/download.html).  Download the .zip file and extract to a preferred location.

Add an alias called `:rebel` to `~/.clojure/deps.edn` with the specific path to the extracted REBL jar
```clojure

:rebl
 {:extra-deps
  {org.clojure/clojure {:mvn/version "1.10.0"}
   org.clojure/core.async {:mvn/version "0.4.490"}
   com.cognitect/rebl {:local/root "/path/to/REBL/REBL-VERSION.jar"}
   org.openjfx/javafx-fxml     {:mvn/version "11.0.1"}
   org.openjfx/javafx-controls {:mvn/version "11.0.1"}
   org.openjfx/javafx-swing    {:mvn/version "11.0.1"}
   org.openjfx/javafx-base     {:mvn/version "11.0.1"}
   org.openjfx/javafx-web      {:mvn/version "11.0.1"}}
  :main-opts  ["-m" "cognitect.rebl"]}
```


## Running REBL with a project
Run the project using the Clojure CLI tools rlwrap repl.

```shell
clj -R:rebl -m cognitect.rebl
```

Or include rebel.readline as part of the REBL command

```shell
clojure -R:rebl -A:rebel -m cognitect.rebl
```

REBL is the main namespace.  Once the REPL starts, `require` the main namespace of the project and change to that namespace with `in-ns`
