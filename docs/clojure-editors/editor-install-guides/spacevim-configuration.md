# Understanding the SpaceVim configuration
Read the [SpaceVim documentation](https://spacevim.org/documentation/) for a complete guide to the configuration.

## Set the SpaceVim option
SpaceVim now uses toml language as the configuration. All SpaceVim options are configured in a dictionary and the key is removed from the original option `name.g:spacevim_`

```
g:spacevim_enable_guicolors -> enable_guicolors
```

The value of this option can be true or false, so the write configuration is:

```
[options]
    enable_guicolors = false
```

Options values ​can be numbers or strings. The format of string is similar to vim script, either single quotes or double quotes

```
[options]
    enable_guicolors = false
    snippet_engine = "neosnippet"
    statusline_separator = 'arrow'
    sidebar_width = 30
```


## Managing layers
SpaceVim adds functionality via layers consisting of plug-ins and configuration to make those plug-ins work.  SpaceVim has a range of [pre-defined layers](https://spacevim.org/layers/).

Enable layers by including a `[[layers]]` section in the `.Spacevim.d/init.toml` file.

To enable the shell layer

```
[[layers]]
    name = "shell"
    default_position = "top"
    default_height = 30
```

When the `enable` layer variable is set to false, that layer is disabled

```
[[layers]]
    name = "shell"
    enable = false
```


## Custom plug-ins
Custom plug-ins add functionality outside of that provided by SpaceVim layers.

The `name` variable is the name of the vim plug-in.

```
[[custom_plugins]]
    name = "lilydjwg/colorizer"
    merged = 0

[[custom_plugins]]
    name = "tpope/vim-scriptease"
    merged = 0
    on_cmd = "Scriptnames"
```


## Define when configuration is called
In the [options] section of the config `bootstrap_before` and `bootstrap_after` are strings that contain a vim method name.

```
[options]
    enable_guicolors = false
    snippet_engine = "neosnippet"
    statusline_separator = 'arrow'
    sidebar_width = 30
    bootstrap_before = "myspacevim#before"
    bootstrap_after = "myspacevim#after"
```

Create a new `~/.SpaceVim.d/autoload/myspacevim.vim` and define a function

```
function! myspacevim#before() abort
    let g:neomake_enabled_c_makers = ['clang']
    nnoremap jk <esc>
endf
function! myspacevim#after() abort
endf
```

Variables, shortcut and other vim scripts, such as customizing some autocmd, can be included.

```
augroup MySpaceVim
  au!
  autocmd FileType markdown setlocal nowrap
augroup END
```
