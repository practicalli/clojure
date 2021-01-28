# Cognitect REBL data browser
Cognitect REBL is a interactive tool for capturing the results of evaluating expressions and visualizing that data for human consumption. REBL was initially created to support development with the Datomic database and is useful viewing and navigating data structures, especially nested data structures and large data sets.

Alternatives include [Reveal](/clojure-tools/data-browsers/reveal.md) and [Portal](/clojure-tools/data-browsers/portal.md)

{% youtube %}
https://www.youtube.com/watch?v=c52QhiXsmyI
{% endyoutube %}

## Sign-up for Cognitect dev-tools license
REBL is part of the [Cognitect dev-tools project](https://cognitect.com/dev-tools/index.html) that also includes [Datomic dev-local](https://docs.datomic.com/cloud/dev-local.html) (local running instance of Datomic).

[Accept the Cognitect dev-tools license](https://cognitect.com/dev-tools/) to receive an email containing a link to download the latest version of Datomic local and a personal access token for access to the Cognitect Maven repository which contains the REBL library.

Follow the maven configuration link in the email to configure your build tool (Clojure CLI tools or Leiningent) and the repository in the project pom.xml.


## Aliases for Cognitect REBL
Follow the [REBL installation steps](https://docs.datomic.com/cloud/other-tools/REBL.html#installation) to create an alias in the user-wide deps.edn configuration.

Alternatively, use the [practicalli/clojure-deps-edn configuration]({{book.P9IClojureDepsEdnInstall}}) which contains the `:inspect/rebl` alias for use with Java 11.

## Running REBL with a project
Run the project using the Clojure CLI tools

```shell
clojure -M:inspect/rebl
```

If [rlwrap](/clojure-tools/install/install-clojure.html#optional-rlwrap-readline) is installed, then use:
```shell
clj -M:inspect/rebl
```


## Configure REBL with CIDER for Spacemacs / Emacs
[nrebl.middleware](https://github.com/RickMoynihan/nrebl.middleware) is an nREPL middleware library that will spy on an nREPL connection and sent the results of every evaluation to Cognitect REBL.

![Cognitect REBL with CIDER in Spacemacs](/images/cognitect-rebl-and-spacemacs.png)

> This library is described as very alpha but works in basic tests run by Practicalli.

{% tabs practicalli2="practicalli/clojure-deps-edn", manual2="Manually add Alias" %}

{% content "practicalli2" %}

An `:middleware/nrebl` alias along with the supporting `:lib/cider-nrepl` aliases are included in [practicalli/clojure-deps-edn configuration]({{ book.P9IClojureDepsEdnInstall }})

{% content "manual2" %}

Add an alias called `:middleware/nrebl` to `~/.clojure/deps.edn` or a `deps.edn` file in the root of a specific project

```clojure
  :middleware/nrebl
  {:extra-deps {rickmoynihan/nrebl.middleware {:mvn/version "0.3.1"}}
   :main-opts  ["-e" "((requiring-resolve,'cognitect.rebl/ui))"
                "-m" "nrepl.cmdline"
                "-i"
                "--middleware" "[nrebl.middleware/wrap-nrebl,cider.nrepl/cider-middleware]"]}
```

Supporting aliases for nrebl.middleware

```clojure
  :lib/cider-nrepl
  {:extra-deps {nrepl/nrepl                   {:mvn/version "0.8.2"}
                cider/cider-nrepl             {:mvn/version "0.25.3"}
                refactor-nrepl/refactor-nrepl {:mvn/version "2.5.0"}}}
```

{% endtabs %}


## Run REBL for nREPL based editors
The [Cognitect REBL documentation](https://docs.datomic.com/cloud/other-tools/REBL.html#nRPEL) shows how to use nREPL with REBL, including [cider-repl](https://github.com/admiralbumblebee/cider-rebl) that has a configurable behavior to send evaluated forms to REBL.


### Using nREBL middleware for CIDER and Calva
nREBL middleware will send the results of all evaulated forms to Cognitect REBL via nREPL protocol.

CIDER and Calva use the `nREPL` protocol to connect to the REBL REPL and have all the evaluated code in those editors automatically display the results in the REBL UI.

In a terminal, run REBL listening to nREPL using the command
```shell
clojure -M:lib/cider-nrepl:inspect/rebl:middleware/nrebl
```

{% tabs cider="CIDER - Spacemacs/Emacs", calva="Calva - VSCode" %}

{% content "cider" %}

Then `cider-connect-clj` in Spacemacs / Emacs and CIDER will connect to the nREPL port and results of evaluated code are sent to REBL UI.

To start a REBL REPL from `cider-jack-in-clj` add a `.dir-locals.el` file to the root of a Clojure project. The `.dir-locals.el` configuration adds the nREBL aliases set via `cider-clojure-cli-global-options` and all other automatically injected configuration is disabled (to prevent those dependencies over-riding the nREBL aliases).
```
((clojure-mode . ((cider-preferred-build-tool . clojure-cli)
                  (cider-clojure-cli-global-options . "-M:lib/cider-nrepl:inspect/rebl:middleware/nrebl")
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


## References
* [Cognitect Labs REBL-distro repository](https://github.com/cognitect-labs/REBL-distro) and [issue tracker](https://github.com/cognitect-labs/REBL-distro/issues)
* [Cognitect Local Dev and CI with dev-local](https://docs.datomic.com/cloud/dev-local.html)
* [practicalli/clojure-deps-aliases common aliases for Clojure]({{ book.P9IClojureDepsEdnInstall }})
* [nrebl.middleware project](https://github.com/RickMoynihan/nrebl.middleware) and [documentation](https://cljdoc.org/d/rickmoynihan/nrebl.middleware/CURRENT/doc/readme)
* [#rebl channel on Clojurians Community](https://clojurians.slack.com/messages/rebl)
* [nrepl-rebl](https://github.com/DaveWM/nrepl-rebl) alternative to nrebl.middleware
* [cider-repl](https://github.com/admiralbumblebee/cider-rebl) - configurable form results with REBL
