# Rebel Readline
Start a Clojure REPL with Rebel Readline

```shell
clojure -A:rebel
```

A REPL prompt displays and will evaluate code entered.

![Clojure REPL rebel readline](/images/clojure-repl-rebel-readline.png)


## Install rebel readline
Add an alias called `:rebel` to the `~/.clojure/deps.edn` configuration to make rebel readline available to all `deps.edn` projects.

```clojure
:rebel {:extra-deps {com.bhauman/rebel-readline {:mvn/version "0.1.4"}}
                   :main-opts  ["-m" "rebel-readline.main"]}
```

* [`practicalli/clojure-deps-edn` GitHub repository](https://github.com/practicalli/clojure-deps-edn) contains an alias for rebel readline.

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


## Configure rebel readline

In `~/.clojure/rebel_readline.edn` you can provide a map with the
following options:

```
:key-map         - either :viins or :emacs. Defaults to :emacs

:color-theme     - either :light-screen-theme or :dark-screen-theme

:highlight       - boolean, whether to syntax highlight or not. Defaults to true

:completion      - boolean, whether to complete on tab. Defaults to true

:eldoc           - boolean, whether to display function docs as you type.
                   Defaults to true

:indent          - boolean, whether to auto indent code on newline. Defaults to true

:redirect-output - boolean, rebinds root *out* during read to protect linereader
                   Defaults to true

:key-bindings    - map of key-bindings that get applied after all other key
                   bindings have been applied
```


For example, to change the default keybindings to vi, edit `~/.clojure/rebel_readline.edn` and add

```
{:key-map :viins}
```


[![asciicast](https://asciinema.org/a/160597.png)](https://asciinema.org/a/160597)
