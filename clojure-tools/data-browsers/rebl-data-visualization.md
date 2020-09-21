# Cognitect REBL data browser
Cognitect REBL is a interactive tool for capturing the results of evaluating expressions and visualizing that data for human consumption. REBL was initially created to support development with the Datomic database and is useful viewing and navigating data structures, especially nested data structures and large data sets.

![Clojure REBL data browser](https://raw.githubusercontent.com/cognitect-labs/REBL-distro/master/screenshot.png)

{% youtube %}
https://www.youtube.com/watch?v=c52QhiXsmyI
{% endyoutube %}


## Install REBL
REBL is part of the [Cognitect dev-tools project](https://cognitect.com/dev-tools/index.html) that also includes [Datomic dev-local](https://docs.datomic.com/cloud/dev-local.html) (local running instance of Datomic).

> The Cognitect install script requires [maven](https://maven.apache.org/) to be installed locally

Visit the [Cognitect dev-tools web page](https://cognitect.com/dev-tools/index.html) and provide an email address.  An email will be sent containing a link to download the latest version of Cognitect dev-tools (0.9.34 at time of writing).

Click the link in the email to download the .zip file and extract the .zip file.

In a terminal, run the **install** file (assuming [maven](https://maven.apache.org/) is installed)

```
./install
```

## Create an alias for Cognitect REBL

{% tabs practicalli="practicalli/clojure-deps-edn", manual="Manually add Alias" %}

{% content "practicalli" %}

A `:cognitect-rebl` alias is included in [practicalli/clojure-deps-edn configuration](/clojure-tools/install/install-clojure.html#clojure-cli-tools-common-aliases)

{% content "manual" %}

Add an alias called `:cognitect-rebl` to `~/.clojure/deps.edn` or a `deps.edn` file in the root of a specific project

If using Java11 for your projects then JavaFX library dependencies need to be explicitly added (JavaFX was separated from the Java distribution from Java 9 onwards).

```clojure
  :cognitect-rebl
  {:extra-deps {com.cognitect/rebl          {:mvn/version "0.9.241"}
                org.clojure/core.async      {:mvn/version "1.3.610"}
                org.openjfx/javafx-fxml     {:mvn/version "11.0.1"}
                org.openjfx/javafx-controls {:mvn/version "11.0.1"}
                org.openjfx/javafx-swing    {:mvn/version "11.0.1"}
                org.openjfx/javafx-base     {:mvn/version "11.0.1"}
                org.openjfx/javafx-web      {:mvn/version "11.0.1"}}
   :main-opts  ["-m" "cognitect.rebl"]}
```

Java8 contains JavaFX, so only the REBL library dependencies is required.

```clojure
  :cognitect-rebl-java8
  {:extra-deps {com.cognitect/rebl {:mvn/version "0.9.241"}}
   :main-opts  ["-m" "cognitect.rebl"]}
```

{% endtabs %}


## Running REBL with a project
Run the project using the Clojure CLI tools

```shell
clojure -A:cognitect-rebl
```

If [rlwrap](/clojure-tools/install/install-clojure.html#optional-rlwrap-readline) is installed, then use:
```shell
clj -A:cognitect-rebl
```


## Configure REBL with CIDER for Spacemacs / Emacs
[nrebl.middleware](https://github.com/RickMoynihan/nrebl.middleware) is an nREPL middleware library that will spy on an nREPL connection and sent the results of every evaluation to Cognitect REBL.

![Cognitect REBL with CIDER in Spacemacs](/images/cognitect-rebl-and-spacemacs.png)

> This library is described as very alpha but works in basic tests run by Practicalli.

{% tabs practicalli2="practicalli/clojure-deps-edn", manual2="Manually add Alias" %}

{% content "practicalli2" %}

An `:nrebl` alias along with the supporting `:nrepl` `:cider-nrepl` aliases are included in [practicalli/clojure-deps-edn configuration](/clojure-tools/install/install-clojure.html#clojure-cli-tools-common-aliases)

{% content "manual2" %}

Add an alias called `:nrebl` to `~/.clojure/deps.edn` or a `deps.edn` file in the root of a specific project

```clojure
  :nrebl
  {:extra-deps {nrepl/nrepl                   {:mvn/version "0.7.0"}
                cider/cider-nrepl             {:mvn/version "0.25.0"}
                refactor-nrepl/refactor-nrepl {:mvn/version "2.5.0"}
                rickmoynihan/nrebl.middleware {:mvn/version "0.3.1"}}
   :main-opts  ["-e" "((requiring-resolve,'cognitect.rebl/ui))"
                "-m" "nrepl.cmdline"
                "-i"
                "--middleware" "[nrebl.middleware/wrap-nrebl,cider.nrepl/cider-middleware]"]}
```

Supporting aliases for nrebl.middleware

```clojure
  :nrepl
  {:extra-deps {nrepl/nrepl {:mvn/version "0.7.0"}}}

  :cider-nrepl
  {:extra-deps {cider/cider-nrepl             {:mvn/version "0.25.0"}
                refactor-nrepl/refactor-nrepl {:mvn/version "2.5.0"}}}
```

{% endtabs %}


## Run REBL for nREPL based editors
CIDER and Calva use the `nREPL` protocol to connect to the REBL REPL and have all the evaluated code in those editors automatically display the results in the REBL UI.

In a terminal, run REBL listening to nREPL using the command
```shell
clojure -R:nrepl:cider-nrepl:cognitect-rebl -A:nrebl
```

{% tabs cider="CIDER - Spacemacs/Emacs", calva="Calva - VSCode" %}

{% content "cider" %}

Then `cider-connect-clj` in Spacemacs / Emacs and CIDER will connect to the nREPL port and results of evaluated code are sent to REBL UI.


To start a REBL REPL from `cider-jack-in-clj` add a `.dir-locals.el` file to the root of a Clojure project. The `.dir-locals.el` configuration adds the nREBL aliases set via `cider-clojure-cli-global-options` and all other automatically injected configuration is disabled (to prevent those dependencies over-riding the nREBL aliases).
```
((clojure-mode . ((cider-preferred-build-tool . clojure-cli)
                  (cider-clojure-cli-global-options . "-R:nrepl:cider-nrepl:cognitect-rebl -A:nrebl")
                  (cider-jack-in-dependencies . nil)
                  (cider-jack-in-nrepl-middlewares . nil)
                  (cider-jack-in-lein-plugins . nil)
                  (cider-clojure-cli-parameters . ""))))
```

> #### Hint::revert-buffer to load .dir-locals.el
> `revert-buffer` will force Emacs to load in the .dir-locals.el configuration if it was added to a project with files already opened.

{% content "calva" %}

See the excellent guide on [using VSCode Calva with REBL](https://calva.io/rebl/)

{% endtabs %}


<!-- <\!-- ## Running REBL with rebel readline -\-> -->
<!-- <\!-- Use rebel REPL UI with REBL for an enhanced REPL experience. -\-> -->

<!-- <\!-- ```shell -\-> -->
<!-- <\!-- clojure -R:rebl -A:rebel -m cognitect.rebl -\-> -->
<!-- <\!-- ``` -\-> -->


<!-- REBL is the main namespace.  Once the REPL starts, `require` the main namespace of the project and change to that namespace with `in-ns` -->

## References
* [Cognitect Labs REBL-distro repository](https://github.com/cognitect-labs/REBL-distro) and [issue tracker](https://github.com/cognitect-labs/REBL-distro/issues)
* [Cognitect Local Dev and CI with dev-local](https://docs.datomic.com/cloud/dev-local.html)
* [practicalli/clojure-deps-aliases common aliases for Clojure](http://practicalli.github.io/clojure/clojure-tools/install/install-clojure.html#clojure-cli-tools-common-aliases)
* [nrebl.middleware project](https://github.com/RickMoynihan/nrebl.middleware) and [documentation](https://cljdoc.org/d/rickmoynihan/nrebl.middleware/CURRENT/doc/readme)
* [#rebl channel on Clojurians Community](https://clojurians.slack.com/messages/rebl)
* [nrepl-rebl](https://github.com/DaveWM/nrepl-rebl) alternative to nrebl.middleware
