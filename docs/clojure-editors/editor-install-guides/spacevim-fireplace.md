# SpaceVim and vim-fireplace: Install guide

![SpaceVim start screen](/images/spacevim-start-screen.png)

{% tabs automatic="Automatic install", manual="Manual install" %}

{% content "automatic" %}
Run the install script and select dark powered mode.  All the default
```
curl -sLf https://spacevim.org/install.sh | bash
```
> The SpaceVim install script moves an existing `~/.vimrc` to `~/.vimrc_back`.


{% content "manual" %}
Try SpaceVim without over-writing an existing Vim or Neovim configuration by installing manually.

```
git clone https://github.com/SpaceVim/SpaceVim.git ~/.SpaceVim
```

Then create an alias to run spacevim on the command line

```
alias svim='vim -u ~/.SpaceVim/vimrc'
```
{% endtabs %}

Run `nvim` command in a terminal and Spacevim will install the plug-ins from the default layers.

> See the [quick start guide](https://spacevim.org/quick-start-guide/) for other install options


## Make vimproc Library
SpaceVim uses vimproc library and should build the library file during the installation.  If the build failed then the following error is shown when running neovim

```
[vimproc] vimproc's DLL: "~/.SpaceVim/bundle/vimproc.vim/lib/vimproc_linux64.so" is not found.
```
To resolve this issue, change into the `vimproc.vim`  bundle director and run the  `make` command

```
cd ~/.SpaceVim/bundle/vimproc.vim/

make
```

## Configure Spacevim options
Edit the `.Spacevim.d/init.toml` file, or use `SPC f v d` to open this configuration file.

Update the `options` to your own preferences.  Practicalli uses a light theme and rebinds the escape sequence to "fd".

vim-ale is configured to use clj-kondo, disabling the neomake checker

```
[options]
    # Set the Spacevim theme, full colour and status line theme
    colorscheme = "gruvbox"
    colorscheme_bg = "light"
    enable_guicolors = true
    statusline_separator = "arrow"
    statusline_iseparator = "arrow"
    buffer_index_type = 4
    enable_tabline_filetype_icon = true
    enable_statusline_mode = false

    # Alternate Escape key binding, default "jk"
    escape_key_binding = "fd"

    # Code analysis - clj-kondo with ale
    enable_neomake = false
    enable_ale = true
    lint_on_the_fly = true
    ale_linters = ['clojure' ['clj-kondo']]
```

* `:colorscheme TAB` to show a pop-up menu of available themes
* [core#statusline layer](https://spacevim.org/layers/core/statusline/) describes options in detail


## Add Spacemacs Layers
SpaceVim uses [several layers by default](https://spacevim.org/layers/#enable-layers).

Practicalli recommends the following [available layers](https://spacevim.org/layers/#available-layers) for file management, version control, autocompletion, command line shell and Clojure development.

Edit the `~/.Spacevim.d/init.toml` file and add the additional layers.

`SPC q q` to quit SpaceVim and then run `nvim` to start Neovim and install the plug-ins automatically.

```
#########################################
# Layers
#########################################
# Each layer requires its own [[layers]] section

#########################################
# File management
[[layers]]
name = 'fzf'

#########################################
# version control
[[layers]]
name = "VersionControl"
enable-gtm-status = true

[[layers]]
name = 'git'

[[layers]]
name = 'github'

#########################################
# Enable autocomplete layer
[[layers]]
name = 'autocomplete'
auto_completion_return_key_behavior = "complete"
auto_completion_tab_key_behavior = "smart"

#########################################
# Command line
[[layers]]
name = 'shell'
default_position = 'top'
default_height = 30

#########################################
# Clojure development
[[layers]]
name = "lang#clojure"
```
