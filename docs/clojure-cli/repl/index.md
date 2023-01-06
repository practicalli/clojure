# Rebel - a command line REPL UI
The REPL is the environment in which all Clojure code runs, whether that be during development, testing and production systems.

rebel is a REPL UI that provides auto-completion, function call syntax help, themes and key binding styles to enhance the development experience.  Clojure tools also include [a REPL with a minimal interface](/alternative-tools/clojure-cli/basic-repl.md) by default.

{% youtube %}
https://youtu.be/U19TWMsg0s0
{% endyoutube %}

<!-- ![Clojure REPL rebel readline - example of autocompletion](/images/clojure-repl-rebel-readline-function-autocomplete.png) -->

## Install rebel readline
[`practicalli/clojure-deps-edn` GitHub repository](https://github.com/practicalli/clojure-deps-edn) contains an alias for rebel readline.  Fork and clone this repository to `~/.clojure` to include the `rebel` alias and many other useful aliases.

If using your own `~/.clojure/deps.edn` configuration, add an alias called `:repl/rebel`

```clojure
:repl/rebel {:extra-deps {com.bhauman/rebel-readline {:mvn/version "0.1.4"}}
             :main-opts  ["-m" "rebel-readline.main"]}
```


## Running the rebel REPL
Start a Clojure REPL with Rebel Readline

```bash
clojure -M:repl/rebel
```

A REPL prompt displays and will evaluate code entered.

![Clojure REPL rebel readline](/images/clojure-repl-rebel-readline.png)

Evaluate Clojure code by typing at the `=> user` prompt pressing `Return`, the results of evaluating the code are printed on the next line.

`:repl/quit` as the prompt will end the REPL session and all changes not saved to a file will be lost.

The following sections use the REPL to help you discover some common Clojure functions and syntax.
