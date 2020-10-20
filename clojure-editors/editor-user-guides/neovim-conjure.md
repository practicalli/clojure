# Neovim and Conjure user guide

[![Neovim and Conjure](https://raw.githubusercontent.com/practicalli/graphic-design/master/banners/neovim-conjure-banner.png)](https://raw.githubusercontent.com/practicalli/graphic-design/master/banners/neovim-conjure-banner.png)

![Clojure editors - neovim and conjure with clojure project](/images/clojure-editors-neovim-conjure-clojure-project.png)


## Learning to use Conjure
 `:help conjure` opens the conjure documentation in neovim. Use `j` to scroll down, `k` to scroll up.

 `:ConjureSchool` command will start an interactive tutorial and introduce Conjure's workflow and key mappings

## Start a REPL on the command line
Using [`practicalli/clojure-deps-edn`](http://practicalli.github.io/clojure/clojure-tools/install/install-clojure.html#clojure-cli-tools-common-aliases) aliases, run a REPL with `nrepl` and `cider-nrepl`

```shell
clojure -X:middleware/nrepl
```

Then open a Clojure file and Conjure will (magically) connect to the running REPL and pop-up a connect message in the top right corner.

## Starting a REPL from Vim
Start neovim with a Clojure file, `nvim src/practialli/playground.clj` or run `nvim` and then open a file to edit `:e src/practicalli/playground.clj`.  A Clojure file is any ending in `*.clj`, `*.cljc` or `.edn`.

Start a REPL from within neovim

`:Clj` command to start a REPL using Clojure CLI Tools
`:Lein` command to start a REPL using Leiningen

> Neovim switches to a terminal state, use `C-\ C-n` to leave the terminal state.  Use `:N` or `:previous` to switch back to the source code buffer

`, c f` to connect to the REPL from Conjure, or simply open a Clojure file.  Automated connection will be added in a future version on Conjure.

> The vim-jack-in plugin enables Neovim to call out to Clojure tools or Leiningen to start a REPL and connect to it once its started.

A full screen REPL log is displayed.  `, l q` to close the log window and return to the Clojure file.
`, l v` to create a vertical split between code and REPL log, `, l h` for a horizontal split.

## Evaluating code
With the maplocalleader key set to `,`

`, e b` evaluates the current buffer
`, e f` evaluate the code in the file (from the file system)
`, e e` evaluate the current expression
`, e r` evaluate top level form (root)
`, e !` evaluate current form and replace with result

> NOTE: Conjure results appear in a pop-up panel which displays until the cursor is moved.  Whilst the pop-up is displaying, it is not possible to quit a file with `:q`.  Move the cursor or use `g t` to change tabs to remove the popup.

## Neovim commands
`:` in Vim normal mode to start entering a command
`q:` to popup a list of recent commands


## File management
https://neovim.io/doc/user/usr_07.html

`nvim src.clj deps.edn readme.org` will open three files

`:n` or `:next` to switch to the next file, `:2next` to jump 2 files, `:last` for the last file.
`:N` or `:previous` to switch to the previous file

`C-^` to toggle to last shown file

`:NERDTree` or `:NERDTreeToggle` to show a graphical file manager in a left side split.


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
Quit neovim to load the updted configuration (unless there is someway to reload the configuration)

Run neovim and `:PlugInstall` to install all plugins defined in the `~/.config/nvim/init.vim` configuration


## Running tests
`, t n` to test the current namespace


## Structural editing
?

## Searching through projects


## Refactor code
?
