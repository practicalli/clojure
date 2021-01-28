[![Neovim and Conjure](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/neovim-conjure-banner.png)](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/neovim-conjure-banner.png)

![Clojure editors - neovim and conjure with clojure project](/images/clojure-editors-neovim-conjure-clojure-project.png)


## Learning to use Conjure
 `:help conjure` opens the conjure documentation in neovim. Use `j` to scroll down, `k` to scroll up.

 `:ConjureSchool` command will start an interactive tutorial and introduce Conjure's workflow and key mappings

## Start a REPL on the command line
{% tabs rebel="Rebel REPL with nREPL", basic="Basic REPL with nREPL" %}

{% content "rebel" %}

Using [`practicalli/clojure-deps-edn`]({{ book.P9IClojureDepsEdnInstall }}) aliases, run a command line REPL that starts a nrepl server and starts the rebel readline terminal UI

```shell
clojure -M:repl/rebel-nrepl
```


{% content "basic" %}

Using [`practicalli/clojure-deps-edn`]({{ book.P9IClojureDepsEdnInstall }}) aliases, run a command line REPL that starts an nrepl server

```shell
clojure -M:middleware/nrepl
```

{% endtabs %}


Then open a Clojure file and Conjure will (magically) connect to the running REPL and pop-up a connect message in the top right corner.

## Starting a REPL from Vim
Start neovim with a Clojure file, e.g. `nvim src/practialli/playground.clj` or run `nvim` and open a Clojure file using `:NERDTree`.  A Clojure file has a name ending in `*.clj`, `*.cljc` or `.edn`.

`:Clj` command to start a REPL using Clojure CLI Tools
`:Lein` command to start a REPL using Leiningen

> Neovim switches to a terminal state, use `C-\ C-n` to leave the terminal state.  Use `:N` or `:previous` to switch back to the source code buffer

`, c f` to connect to the REPL from Conjure, or simply open a Clojure file.  Automated connection will be added in a future version on Conjure.

> The `vim-jack-in` plugin enables Neovim to call out to Clojure tools or Leiningen to start a REPL and connect to it once its started.

A full screen REPL log is displayed.  `, l q` to close the log window and return to the Clojure file.
`, l v` to create a vertical split between code and REPL log, `, l h` for a horizontal split.


## Evaluating code
With the `maplocalleader` key set to `,`

* `, e b` evaluates the current buffer
* `, e f` evaluate the code in the file (from the file system)
* `, e e` evaluate the current expression
* `, e r` evaluate top level form (root)
* `, e !` evaluate current form and replace with result

> NOTE: Conjure results appear in a pop-up panel which displays until the cursor is moved.  Whilst the pop-up is displaying, it is not possible to quit a file with `:q`.  Move the cursor or use `g t` to change tabs to remove the popup.


## Neovim commands and history
`:` in Vim normal mode to start entering a command, type the start of a command and press `TAB` to use command completion.  `TAB` and `Shift-TAB` navigate the completion menu.

`q:` to popup a list of recent commands


## File management
Multiple files can be opened in Neovim, either as split windows or tabs.

`nvim src.clj deps.edn readme.org` will open three files in separate tabs

`:n` or `:next` to switch to the next tab, `:2next` to jump 2 tabs, `:last` for the last tab.
`:N` or `:previous` to switch to the previous tab

`C-^` to toggle to last shown tab

`:NERDTree` or `:NERDTreeToggle` to show a graphical file manager in a left side split.

NERDTree opens files as splits.  `C-w` followed by either `jkhl` will move the cursor to the split in that direction.

* [Neovim reference: editing more than one file](https://neovim.io/doc/user/usr_07.html)


## Navigation within projects
`g d` go to definition of current symbol


## General vim commands
`:cd` changes the current working directory, use by `:e`

`:lcd` ^ but local to the current window

`:windo` lcd ^ for all windows in the current tab

`:pwd` prints the current working directory

`:e!` reloads the current buffer, discarding unsaved changes

`:find` to search for file names relative to the path option (set path?) and open them.


## Completion
Install the Deoplete plugin (from Olical configuration)
https://github.com/Shougo/deoplete.nvim

```
" Completion support
Plug 'Shougo/deoplete.nvim' | Plug 'ncm2/float-preview.nvim'
"
```
Quit neovim to load the updated configuration (unless there is someway to reload the configuration)

Run neovim and `:PlugInstall` to install all plugins defined in the `~/.config/nvim/init.vim` configuration

> Alternative completion plugin: [Conquer of Completion](https://github.com/neoclide/coc.nvim) - required node.js install


## Running tests
`, t n` to test the current namespace


## Structural editing
`>)`, `<)`, `>(`, and `<(` to slurp and barf, where the angle bracket indicates the direction, and the parenthesis indicates which end to operate on.

* See [vim-sexp mappings for regular people](https://github.com/tpope/vim-sexp-mappings-for-regular-people) for more structural editing


## Searching through projects
TODO:


## Refactor code
TODO: find equivalents for narrowing, iedit and helm search results editing for vim


## Code analysis and idom checking
clj-kondo automatically checks Clojure code at it is typed, providing instant feedback on Clojure syntax and idioms

Linting works continually once the dense/ale plugin and clj-kondo is installed via the 'w0rp/ale' plugin
