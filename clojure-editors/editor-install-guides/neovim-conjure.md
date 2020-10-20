# Neovim Conjure
[![Neovim and Conjure](https://raw.githubusercontent.com/practicalli/graphic-design/master/banners/neovim-conjure-banner.png)](https://raw.githubusercontent.com/practicalli/graphic-design/master/banners/neovim-conjure-banner.png)

Neovim is a hyperextensible Vim-based text editor that is a drop-in replacement of Vim, implemented in less coded, fully compatible with Vim's editing model and Vimscript extension language.  Neovim also allows configuration in Lua.

Conjure is an interactive environment for evaluating code within your running program, initially targeted at Lisp languages such as Clojure.

* [Getting started with Neovim and Conjure](https://oli.me.uk/getting-started-with-clojure-neovim-and-conjure-in-minutes/)
* [Neovim user guide](https://neovim.io/doc/user/)

## Quick try tutorial
Try the Conjure interactive :ConjureSchool tutorial without the need to install, only a recent version of neovim
```shell
curl -fL conjure.fun/school | sh
```
![Clojure editors - neovim and conjure tutorial](/images/clojure-editors-neovim-conjure-tutorial.png)

## Neovim install

{% tabs ubuntu="Debian/Ubuntu" %}

{% content "ubuntu" %}
### Neovim (plugin) requirements
Install `pip3` package manager for python3 (the default in Ubuntu 20.04)

```shell
sudo apt install python-pip3
```

Add msgpack package via pip3, [required for the deoplete plugin](https://github.com/Shougo/deoplete.nvim/issues/1073) for neovim)

```shell
pip3 install --upgrade msgpack
```

### Install newovim package
Use the apt command to install the neovim package

```shell
sudo apt install neovim
```

Set nvim as the default vim command

```shell
sudo update-alternatives --config vim
```

{% endtabs %}

## Neovim package manager
Follow instructions for neovim install on Ubuntu at: https://github.com/junegunn/vim-plug
```
sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs \
       https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
```
This created the following tree structure under `~/.local/share/nvim`
```
├── shada
│   └── main.shada
├── site
│   └── autoload
│       └── plug.vim
└── swap
```

## Create a neovim init file with essentail configuration
Create a directory for the neovim init file
`mkdir ~/.config/nvim`

Create a new init.vim file
`nvim ~/.config/nvim/init.vim`

Add plugins for conjure and a few supporting plugins
```
call plug#begin(stdpath('data') . '/plugged')

" Conjure
Plug 'Olical/conjure', {'tag': 'v4.3.1'}

" Conjure support - jack-in with nrepl dependencies
Plug 'tpope/vim-dispatch'
Plug 'clojure-vim/vim-jack-in'
" Only in Neovim:
Plug 'radenling/vim-dispatch-neovim'

call plug#end()
```

The plugins will be saved to the `~/.local/share/nvim/plugged/` directory.

A long list of suggested plugins can be found in the [Conjure authors neovim configuration](https://github.com/Olical/dotfiles/blob/master/stowed/.config/nvim/init.vim)


## Plugins download
Run neovim and run `:PlugInstall` to install all the packages defined in the `~/.config/nvim/init.vim` file.

Use `:PlugUpdate` to update packages managed by vim-plug.

Use `:PlugUpgrade` to update the vim-plug package itself.


## Learning to use Conjure
 `:help conjure` opens the conjure documentation in neovim. Use `j` to scroll down, `k` to scroll up.

 `:ConjureSchool` command will start an interactive tutorial and introduce Conjure's workflow and key mappings

## Start a REPL on the command line
Using [`practicalli/clojure-deps-edn`](http://practicalli.github.io/clojure/clojure-tools/install/install-clojure.html#clojure-cli-tools-common-aliases) aliases, run a REPL with `nrepl` and `cider-nrepl`

`clojure -A:nrepl:cider-clj`

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

## Refactor code
?


## Working Themes

### Gruvbox
Matches the theme used for Spacemacs
https://github.com/morhetz/gruvbox

Add following to vim-plug section
```
" Plug 'morhetz/gruvbox'
```
After vim-plug section, configure the specific Gruvbox theme settings, in this case to use the light theme and use powerline fonts (not sure that makes a difference)
```
let g:airline_solarized_bg='light'
let g:airline_powerline_fonts = 1
```

### Solarized8
https://github.com/lifepillar/vim-solarized8
```
Plug 'lifepillar/vim-solarized8'

set background=light
colorscheme solarized8
```


Themes to try
* https://github.com/rakr/vim-one - has light theme

## Status (powerline) theme

### spaceline.vim
https://github.com/hardcoreplayers/spaceline.vim
```
Plug 'hardcoreplayers/spaceline.vim'
Plug 'ryanoasis/vim-devicons'
```
Config
The one colorscheme seems to render consistently, the space colorscheme does not render  consistently (tested with gruvbox theme)
```
let g:spaceline_colorscheme = 'one'
```

statusline themse to try
* https://github.com/itchyny/lightline.vim



## Spacemacs style keymappings to enhance the neovim experience

Spacemacs like mappings for window interactions using `SPC w` prefix.

https://github.com/Olical/dotfiles/blob/master/stowed/.config/nvim/fnl/dotfiles/module/mapping.fnl#L20
stowed/.config/nvim/fnl/dotfiles/module/mapping.fnl:20

Configured with a combination of:
* https://github.com/Olical/dotfiles/blob/master/stowed/.config/nvim/fnl/dotfiles/module/mapping.fnl
* https://github.com/liuchengxu/vim-better-default

Useful keybinding reference:
https://github.com/liuchengxu/vim-better-default/wiki/a-brief-introduction-to-key-bindings
