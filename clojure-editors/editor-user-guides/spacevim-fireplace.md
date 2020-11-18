# SpaceVim and vim-fireplace
SpaceVim uses vim-fireplace to provide a [simple Clojure development experience](https://spacevim.org/use-vim-as-a-clojure-ide/) that runs very quickly.

![SpaceVim and vim-fireplace - Clojure project and REPL](/images/spacevim-clojure-repl-gruvbox-light.png)


## Starting a REPL
Open a Clojure file, either `deps.edn`, `project.clj`, or a source code file (`.clj`, `.cljs`, `.cljc`)

`, s i` to start the Clojure REPL f

`, s b` to evaluate the code in a source code buffer

`, s l` to evaluate the top-level expression under the cursor


> TODO: restart a REPL ?  Stop/Start SpaceVim


## Making changes
Parens matching happens automatically, so adding a `(` will also add the closing `)`.  The same for `[` and `{`.

Typing Clojure function names will show a pop-up menu with auto-completion options.

![SpaceVim autocompletion](/images/spacevim-clojure-autocomplete-example.png)

Live linting is configured in the  Practicalli configuration example and continually runs `clj-kondo` on the code as you type.

![SpaceVim Linting Clojure](/images/spacevim-clojure-lint-error-warning.png)


## Structured Editing

<!-- TODO: -->
<!-- - vim-sexp -->
<!-- -  kovisoft/paredit -->



## Buffer management
`SPC b` menu provides commands to manage buffers.  A buffer is open as a vim tab and all tabs are displayed along the top.



## Version control
General commands for [version control](https://spacevim.org/layers/VersionControl/#key-bindings)

`SPC '` opens a shell in the directory of the current buffer.  Run `git init` to create a local repository.

`SPC g .` is the transient menu

`w` to stage, `u` to unstage

`c` with popup, `C` to commit directly

`l` shows the git log

`D` to see diff of unstaged hunks

`F` pull from remote repository with popup

`P` push to remote repository with popup

See [VersionControl layer keybindings](https://spacevim.org/layers/VersionControl/#key-bindings) for more commands

<!--
Splits
:vs filename  opens a split with the new file

C-w d
-->
