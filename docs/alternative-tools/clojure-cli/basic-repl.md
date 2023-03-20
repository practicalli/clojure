# Basic Command Line REPL UI

The `clojure` command will start a REPL by default or if given the `--repl` argument.

`clj` is a script that wraps the `clojure` command and uses `rlwrap`, an external readline command, to navigate REPL history via the <kbd>↑</kbd> and <kbd>↓</kbd> keys.  Use `clj` when you want to run a repl and `clojure` for everything else.


The `clj` command in a terminal window starts a Clojure REPL and shows the version of Clojure used.  The command does not need to be in a directory containing a Clojure project.

```bash
clj
```

Type in a Clojure expression at the `=> user` prompt and press `Return` to see the result

Clojure code can now be run in the REPL by typing the code and pressing the `ENTER` key.

Exit the REPL by typing `Ctrl+D` (pressing the `Ctrl` and `D` keys at the same time).

![Clojure CLI Tools REPL](https://clojure.org/images/content/guides/repl/show-terminal-repl.gif)
