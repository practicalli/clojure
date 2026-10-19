# Code Analysis

<!-- ![clj-kondo a linter that sparks joy](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/clj-kondo-banner.png) -->

[clj-kondo](https://github.com/borkdude/clj-kondo/) is a lint tool that highlights syntactic errors and suggests idioms for Clojure, ClojureScript and EDN.

[Use clj-kondo with your preferred editor](https://github.com/borkdude/clj-kondo/blob/master/doc/editor-integration.md) to warning about errors as you type so issues can be fixed as soon as they occur, enhancing your joy of Clojure.

clj-kondo can also be used as a command line tool for checking projects in development environments and continuous integration service, such as the [setup-clojure GitHub action](https://github.com/marketplace/actions/setup-clojure).

!!! HINT "Clojure LSP includes clj-kondo"
    [Clojure LSP install](clojure-lsp/) includes clj-kondo, removing the need for a separate install of clj-kondo

## Install

Follow the **[clj-kondo install guide](https://github.com/borkdude/clj-kondo/blob/master/doc/install.md)** for your operating system.

**[Clj-kondo config](https://github.com/clj-kondo/config)** contains additional configuration for using clj-kondo with libraries that extend the Clojure language via macros.

=== "Spacemacs"

    ![clj-kondo in Spacemacs](https://raw.githubusercontent.com/practicalli/graphic-design/live/spacemacs/screenshots/spacemacs-clojure-linting-code-marks-and-flycheck-list-errors.png)

    clj-kondo can be used if `cider` is configured as the clojure layer backend. If LSP is configured as the backend, should not be used as it may duplicate analysis results (e.g. doubling error and warning messgeas).

=== "Doom Emacs"

    Use Clojure LSP with Doom rather than clj-kondo by itself.

    Add the  `+lsp` feature to the Clojure module and enable the `lsp` module
    ```config title=".config/doom/init.el"
    (clojure +lsp)
    lsp
    ```
    [Add the respective LSP server implementation](https://practical.li/doom-emacs/install/#language-servers) to the operating system

=== "Neovim"

    Use [:fontawesome-solid-book-open: Mason](https://practical.li/neovim/using-neovim/mason/){target=_blank} to install clj-kondo as a linter.

    [:fontawesome-brands-github: Practicalli nvim-astro configuration](https://github.com/practicalli/nvim-config){target=_blank} includes Clojure LSP and clj-kondo, integrating these tools with LSP diagnostics.

    [:fontawesome-solid-book-open: Practicalli Neovim](https://practical.li/neovim/){target=_blank} is a guide to configure and use Neovim for Clojure software development.


## Command Line analysis

Run `clj-kondo` with the --lint option and specify a file or path

To analyse a specific file

```shell
clj-kondo --lint ~/.config/deps.edn
```

Analyse a project, running the clj-kondo command from the root of the project

```shell
clj-kondo --lint .
```
