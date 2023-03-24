# Basic Terminal REPL UI

The `clojure` command will start a REPL by default or if given the `--repl` or `-r` argument.  The basic repl does not provide history of commands.

`clj` is a script that wraps the `clojure` command and requires `rlwrap`, an external readline command, to navigate REPL history via the ++arrow-up++ and ++arrow-down++ keys.

Use `clj` when you want to run a repl (or preferably use [rebel readline](rebel-readline/) instead) and `clojure` for everything else.

!!! HINT "Rebel Rich Terminal UI"
    [rebel readline](/clojure/clojure-cli/repl/) is a terminal REPL UI that provides interactive help, function autocomplete, signature prompts and many other features to provide a very rich REPL experience.

    [Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) includes the `-M:repl/rebel` alias to run rebel readline REPL.


`clj` command in a terminal window starts a Clojure REPL and shows the version of Clojure used.  The command does not need to be in a directory containing a Clojure project.

```bash
clj
```

Type in a Clojure expression at the `=> user` REPL prompt and press ++enter++ to see the result

++ctrl+"d"++ to exit the REPL

![Clojure CLI Tools REPL](https://clojure.org/images/content/guides/repl/show-terminal-repl.gif)
