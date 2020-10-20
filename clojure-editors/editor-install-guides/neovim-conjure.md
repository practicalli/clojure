# Install Neovim and Conjure
[![Neovim and Conjure](https://raw.githubusercontent.com/practicalli/graphic-design/master/banners/neovim-conjure-banner.png)](https://raw.githubusercontent.com/practicalli/graphic-design/master/banners/neovim-conjure-banner.png)

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
