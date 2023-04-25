# Clojure LSP

The Language Server Protocol provides a standard set of tools that are used to developer any programming language.  These tools are typically provides with a language specific server.

clojure-lsp is an implementation of an LSP server, for Clojure and ClojureScript languages.

![Clojure LSP example screenshot](https://emacs-lsp.github.io/lsp-mode/tutorials/images/clojure-call-hierarchy.png)


## Install

Follow your preferred option on the [Clojure LSP installation guide](https://clojure-lsp.io/installation/)

Practicalli downloads the clojure-lsp-native-linux-amd64.zip file from [GitHub release page](https://github.com/clojure-lsp/clojure-lsp/releases)and extracts the `clojure-lsp` binary to `~/.local/bin/clojure-lsp`.

`clojure-lsp -v` in a terminal will test if the the install is working.

??? HINT "Editors may install Clojure LSP for you"
    Spacemacs LSP layer will prompt to install a language server when first opening a file of a major mode where LSP is enabled.  E.g. when a Clojure related file is opened, the Clojure LSP server is downloaded if not installed (or not found on the Emacs path).

    VSCode Calva plugin includes the clojure-lsp server, although an external server can be configured.


## References

* [LSP mode - A guide on disabling / enabling features](https://emacs-lsp.github.io/lsp-mode/tutorials/how-to-turn-off/) - if the Emacs UI is too cluttered or missing visual features
* [Configure Emacs as a Clojure IDE](https://emacs-lsp.github.io/lsp-mode/tutorials/clojure-guide/)
* [Language Server Protocol support for Emacs](https://emacs-lsp.github.io/lsp-mode/)
