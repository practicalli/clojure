[![Neovim and Conjure](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/neovim-conjure-banner.png)](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/neovim-conjure-banner.png)

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

### Install neovim package
Use the apt command to install the neovim package

```shell
sudo apt install neovim
```

Set nvim as the default vim command

```shell
sudo update-alternatives --config vim
```

{% endtabs %}

## Install plug.vim package manager
[Plug.vim](https://github.com/junegunn/vim-plug) provides a simple to use packages manager for neovim.

{% tabs unix="Unix", powershell="Windows Powershell" %}

{% content "unix" %}
```
sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs \
       https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
```

{% content "powershell" %}
```
iwr -useb https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim |`
    ni "$env:LOCALAPPDATA/nvim-data/site/autoload/plug.vim" -Force
```
{% endtabs %}

This created the following tree structure under `~/.local/share/nvim`
```
├── shada
│   └── main.shada
├── site
│   └── autoload
│       └── plug.vim
└── swap
```

## Create a neovim init file with essential configuration
Create a directory for the neovim init file

```shell
mkdir ~/.config/nvim
```
Create a new init.vim file
```shell
nvim ~/.config/nvim/init.vim
```

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


## Code analysis - ALE and clj-kondo
Add the [dense-analysis/ale](https://github.com/dense-analysis/ale) plugin to provide Linting with clj-kondo

```
Plug 'dense-analysis/ale'
```

Add the following configuration to specify the binary for Clojure linting with ALE.

```
" Lint configuration - clj-kondo
" clj-kondo should be installed on operating system path
let g:ale_linters = {
      \ 'clojure': ['clj-kondo']
      \}
```

---

## Neovim Themes and Powerline themes

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


## Practicalli complete configuration
The `~/.config/nvim/init.vim` configuration file used by Practicalli

```vimscript
" Set leader key
let maplocalleader = ","

" Remap keys
" Use Esc to exit terminal state (used by vim-jack-in)
:tnoremap <Esc> <C-\><C-n>

" Use fd as escape, Spacemacs style
:inoremap fd <esc>

" Current line number and Relative line numbers
set number
set relativenumber

" Full color theme support for neovim
set termguicolors


"""""""""""""""""""""""""""""""""""""""""
" vim-plug - manage plugins
"""""""""""""""""""""""""""""""""""""""""
" Saves plugins to ~/.local/share/nvim/plugged
call plug#begin(stdpath('data') . '/plugged')

" Starup page
Plug 'mhinz/vim-startify'

"" Version control plugins
" https://github.com/airblade/vim-gitgutter
Plug 'airblade/vim-gitgutter'

" File management
" https://github.com/preservim/nerdtree
Plug 'preservim/nerdtree'

" Navigation
" https://github.com/easymotion/vim-easymotion
Plug 'easymotion/vim-easymotion'

" Searching in projects - ripgrep
Plug 'liuchengxu/vim-clap'

" Conjure
Plug 'Olical/conjure', {'tag': 'v4.3.1'}


"""""""""
" Conjure support - jack-in with nrepl dependencies

" Start a REPL from within Vim
Plug 'tpope/vim-dispatch'
Plug 'clojure-vim/vim-jack-in'
Plug 'radenling/vim-dispatch-neovim'

" Structural editing for lisp languages
Plug 'guns/vim-sexp'
Plug 'tpope/vim-sexp-mappings-for-regular-people'

" Auto-close parens
Plug 'jiangmiao/auto-pairs', { 'tag': 'v2.0.0' }

" Completion support
Plug 'Shougo/deoplete.nvim'
Plug 'ncm2/float-preview.nvim'

" Linting with clj-kondo
Plug 'w0rp/ale'

"""""""""
" Themes

" Gruvbox theme
" https://github.com/morhetz/gruvbox/
Plug 'morhetz/gruvbox'

" Spaceline.vim - Status line themes
Plug 'hardcoreplayers/spaceline.vim'
Plug 'ryanoasis/vim-devicons'


call plug#end()

"""""""""""""""""""""""""""""""""""""""""
" The end of plugins for vim-plug
"""""""""""""""""""""""""""""""""""""""""

"""""""""""""""""""""""""""""""""""""""""
" Plugin configuration
"""""""""""""""""""""""""""""""""""""""""

" Enable startify startup screen
let g:webdevicons_enable_startify = 1

" Search in project configuration
let g:clap_provider_grep_delay = 50
let g:clap_provider_grep_opts = '-H --no-heading --vimgrep --smart-case --hidden -g "!.git/"'

nnoremap <leader>*  :Clap grep ++query=<cword><cr>
nnoremap <leader>fg :Clap grep<cr>
nnoremap <leader>ff :Clap files --hidden<cr>
nnoremap <leader>fb :Clap buffers<cr>
nnoremap <leader>fw :Clap windows<cr>
nnoremap <leader>fr :Clap history<cr>
nnoremap <leader>fh :Clap command_history<cr>
nnoremap <leader>fj :Clap jumps<cr>
nnoremap <leader>fl :Clap blines<cr>
nnoremap <leader>fL :Clap lines<cr>
nnoremap <leader>ft :Clap filetypes<cr>
nnoremap <leader>fm :Clap marks<cr>


" Completion configuration
let g:deoplete#enable_at_startup = 1
call deoplete#custom#option('keyword_patterns', {'clojure': '[\w!$%&*+/:<=>?@\^_~\-\.#]*'})
set completeopt-=preview

let g:float_preview#docked = 0
let g:float_preview#max_width = 80
let g:float_preview#max_height = 40

" Lint configuration - clj-kondo
" clj-kondo should be installed on operating system path
let g:ale_linters = {
      \ 'clojure': ['clj-kondo']
      \}


" Set Gruvbox theme
set background=light
autocmd vimenter * colorscheme gruvbox

" Spaceline.vim configuration
let g:spaceline_colorscheme = 'one'

```


---

> #### TODO::work in progress, sorry

## Spacemacs style keymappings to enhance the neovim experience

Spacemacs like mappings for window interactions using `SPC w` prefix.

https://github.com/Olical/dotfiles/blob/master/stowed/.config/nvim/fnl/dotfiles/module/mapping.fnl#L20
stowed/.config/nvim/fnl/dotfiles/module/mapping.fnl:20

Configured with a combination of:
* https://github.com/Olical/dotfiles/blob/master/stowed/.config/nvim/fnl/dotfiles/module/mapping.fnl
* https://github.com/liuchengxu/vim-better-default

Useful keybinding reference:
https://github.com/liuchengxu/vim-better-default/wiki/a-brief-introduction-to-key-bindings
