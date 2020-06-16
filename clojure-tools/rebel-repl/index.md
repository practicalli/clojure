# Rebel - a command line REPL UI
The REPL is the environment in which all Clojure code runs, whether that be during development, testing and production systems.

rebel is a REPL UI that provides auto-completion, function call syntax help, themes and key binding styles to enhance the development experience.  Clojure tools also include [a REPL with a minimal interface](basic-repl.md) by default.

![Clojure REPL rebel readline - example of autocompletion](/images/clojure-repl-rebel-readline-function-autocomplete.png)

## Install rebel readline
[`practicalli/clojure-deps-edn` GitHub repository](https://github.com/practicalli/clojure-deps-edn) contains an alias for rebel readline.  Fork and clone this repository to `~/.clojure` to include the `rebel` alias and many other useful aliases.

If using your own `~/.clojure/deps.edn` configuration, add an alias called `:rebel`

```clojure
:rebel {:extra-deps {com.bhauman/rebel-readline {:mvn/version "0.1.4"}}
        :main-opts  ["-m" "rebel-readline.main"]}
```


## Starting a rebel REPL
Start a Clojure REPL with Rebel Readline

```shell
clojure -A:rebel
```

A REPL prompt displays and will evaluate code entered.

![Clojure REPL rebel readline](/images/clojure-repl-rebel-readline.png)

# Help at the REPL
rebel readline provides tools to help you discover and use functions from clojure.core and any other libraries you add to the REPL.

`:repl/help` will show all the commands available for rebel readline

`TAB` to autocomplete the current characters into a function name.  All functions that match the characters will be show, allowing quick discovery of functions available.
Typing in the first few characters of a function and press

![Clojure REPL rebel readling - autocompletion](/images/clojure-repl-rebel-readline-function-autocomplete.png)

Moving the cursor after the name of a function will show the signatures available, so the correct arguments can be used with the function call.

![Clojure REPL rebel readline - function signature help](/images/clojure-repl-rebel-readline-function-signature-help.png)

`Ctrl-x Ctrl-D` or using the function `clojure.repl/doc` function will show the documentation for functions, so you can understand the functions purpose.

![Clojure REPL rebel readline - doc function showing a function docstring](/images/clojure-repl-repl-readline-doc-reduce.png)



## rebel commands
Type `:repl/help` or `:repl` TAB to see a list of available commands.

| Keybinding                | Description                                                       |
|---------------------------|-------------------------------------------------------------------|
| `:repl/help`              | Prints the documentation for all available commands.              |
| `:repl/key-bindings`      | search or list current key bindings                               |
| `:repl/quit`              | Quits the REPL                                                    |
| `:repl/set-color-theme`   | Change the color theme `:dark-screen-theme` `:light-screen-theme` |
| `:repl/set-key-map`       | Change key bindings to given key-map, `:emacs` `:vicmd` `:viins`  |
| `:repl/toggle-color`      | Toggle ANSI text coloration on and off                            |
| `:repl/toggle-completion` | Toggle the completion functionality on and off                    |
| `:repl/toggle-eldoc`      | Toggle the auto display of function signatures on and off         |
| `:repl/toggle-highlight`  | Toggle readline syntax highlighting on and off                    |
| `:repl/toggle-indent`     | Toggle the automatic indenting of Clojure code on and off         |


## Key-bindings

| Keybinding      | Description                                                                   |
|-----------------|-------------------------------------------------------------------------------|
| `Ctrl-C`        | aborts editing the current line                                               |
| `Ctrl-D`        | at the start of a line => sends an end of stream message                      |
| `TAB`           | word completion or code indent when cursor in whitespace at the start of line |
| `Ctrl-X_Ctrl-D` | Show documentation for word at point                                          |
| `Ctrl-X_Ctrl-S` | Show source for word at point                                                 |
| `Ctrl-X_Ctrl-A` | Show apropos for word at point                                                |
| `Ctrl-X_Ctrl-E` | Inline eval for SEXP before the point                                         |

Examine key-bindings with the `:repl/key-bindings` command.
