# Language Server Protocol

[:globe_with_meridians: Language Server Protocol](https://microsoft.github.io/language-server-protocol/) provides a standard to provide a common set of development tools, e.g.  code completion, syntax highlighting, refactor and language diagnostics.

Each language requires a specific LSP server implementation.

An editor or plugin provides an LSP client that uses data from language servers, providing information about source code and enabling development tools to understand the code structure.


## Clojure LSP

[:globe_with_meridians: clojure-lsp](https://clojure-lsp.io/) is an implementation of an LSP server for Clojure and ClojureScript languages.  Clojure LSP is built on top of [clj-kondo]() which provides the static analysis of Clojure and ClojureScript code.

Most Clojure aware editors provide an LSP client.

![Clojure LSP example screenshot](https://emacs-lsp.github.io/lsp-mode/tutorials/images/clojure-call-hierarchy.png)


## Install

[Clojure LSP installation guide](https://clojure-lsp.io/installation/) covers multiple operating systems.

=== "Linux"

    Practicalli recommends downloading the `clojure-lsp-native-linux-amd64` from [GitHub release page](https://github.com/clojure-lsp/clojure-lsp/releases)

    Extracts the `clojure-lsp` binary to `~/.local/bin/clojure-lsp`

=== "Homebrew"
    Clojure LSP project provides a custom tap for installing the latest version.

    !!! NOTE ""
        ```shell
        brew install clojure-lsp/brew/clojure-lsp-native
        ```

    ??? WARNING "Homebrew default package deprecated"
        The `clojure-lsp` formula is deprecated and should not be used.

        `brew remove clojure-lsp` if the default clojure-lsp was installed

Check Clojure LSP server is working via the command line

!!! NOTE ""
    ```shell
    clojure-lsp --version
    ```


??? HINT "Editors may install Clojure LSP"
    Spacemacs LSP layer will prompt to install a language server when first opening a file of a major mode where LSP is enabled.  E.g. when a Clojure related file is opened, the Clojure LSP server is downloaded if not installed (or not found on the Emacs path).

    Neovim package called mason manages the install of lint & format tools as well as LSP servers.

    VSCode Calva plugin includes the clojure-lsp server, although an external server can be configured.


## Configure



??? "Practicalli Clojure LSP Configuration"



## References

* [LSP mode - A guide on disabling / enabling features](https://emacs-lsp.github.io/lsp-mode/tutorials/how-to-turn-off/) - if the Emacs UI is too cluttered or missing visual features
* [Configure Emacs as a Clojure IDE](https://emacs-lsp.github.io/lsp-mode/tutorials/clojure-guide/)
* [Language Server Protocol support for Emacs](https://emacs-lsp.github.io/lsp-mode/)
