# Language Server Protocol

[:globe_with_meridians: Language Server Protocol](https://microsoft.github.io/language-server-protocol/) provides a standard to provide a common set of development tools, e.g.  code completion, syntax highlighting, refactor and language diagnostics.

Each language requires a specific LSP server implementation.

An editor or plugin provides an LSP client that uses data from language servers, providing information about source code and enabling development tools to understand the code structure.


## Clojure LSP

[:globe_with_meridians: clojure-lsp](https://clojure-lsp.io/){target=_blank} is an implementation of an LSP server for Clojure and ClojureScript languages.  Clojure LSP is built on top of [:globe_with_meridians: clj-kondo](https://github.com/clj-kondo/clj-kondo){target=_blank} which provides the static analysis of Clojure and ClojureScript code.

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


??? HINT "Editors may provide install mechanism for Clojure LSP"
    Spacemacs LSP layer will prompt to install a language server when first opening a file of a major mode where LSP is enabled.  E.g. when a Clojure related file is opened, the Clojure LSP server is downloaded if not installed (or not found on the Emacs path).

    Neovim package called mason manages the install of lint & format tools as well as LSP servers, or an externally installed LSP server can also be used.

    VSCode Calva plugin includes the clojure-lsp server, although an external server can be configured.


## Configure

??? "Practicalli Clojure LSP Configuration"
    [config.edn](https://github.com/practicalli/clojure-lsp-config/blob/main/config.edn) is the recommended configuration from Practicalli.
    ```clojure
    --8<-- "https://raw.githubusercontent.com/practicalli/clojure-lsp-config/main/config.edn"
    ```

Include `:extra-paths` and `:extra-deps` from project & user level aliases in LSP classpath.  e.g. support a custom `user` namespace in `dev/user.clj`

```clojure
 :source-aliases #{:dev :test :env/dev :env/test :lib/reloaded}
```

Include Java Sources installed via Debian / Ubuntu package `openjdk-21-source` to support calls to Java Objects and Methods.

```clojure
 :java
 {:jdk-source-uri       "file:///usr/lib/jvm/openjdk-21/lib/src.zip" ;;
  :home-path            nil ;; jdk-source-uri takes precedence
  :download-jdk-source? false}
```

!!! HINT "Disable Java analysis"
    If not using Java Interop with Clojure, it can be an advantage to disable the Java analysis.  This should remove Java functions from autocomplete.

    ```clojure
    :java nil
    ```

Clean namespace `ns` forms but do not sort require names

```clojure
 :clean {:automatically-after-ns-refactor true
         :ns-inner-blocks-indentation     :next-line
         :ns-import-classes-indentation   :next-line
         :sort {:ns      false
                :require false
                :import  false
                :import-classes {:classes-per-line 3} ;; -1 for all in single line
                :refer {:max-line-length 80}}}
```


Use `^private` metadata for private function definitions rather than `defn-`

```clojure
 :use-metadata-for-privacy? true
```

Location of [cljfmt configuration](cljfmt.edn) for formatting, path relative to project root.  The defaults for cljfmt are used, except `:remove-consecutive-blank-lines?` which is set to false to enable more readable code.

```clojure
 :cljfmt-config-path "cljfmt.edn"
```

> [cljfmt configuration](cljfmt.edn) included example `:indents` rules for clojure.core, compojure, fuzzy rules and examples used by the Clojure LSP maintainer.


## Practicalli snippets

[Practicalli Snippets](practicalli-snippets.md) are defined in the `:additional-snippets` section of the Practicalli Clojure LSP config.

### Docs / comments
* `comment-heading` - describe purpose of the namespace
* `comment-separator` - logically separate code sections, helps identify opportunities to refactor to other name spaces
* `comment-section` - logically separate large code sections with start and end line comments
* `wrap-reader-comment` - insert reader comment macro, `#_` before current form, informing Clojure reader to ignore next form

### Repl Driven Development
* `rich-comment` - comment block
* `rich-comment-rdd` - comment block with ignore :redefined-var for repl experiments
* `rich-comment-hotload` - comment block with add-libs code for hotloading libraries in Clojure CLI repl
* `wrap-rich-comment` - wrap current form with comment reader macro
* `require-rdd` - add a require expression, for adding a require in a rich comment block for RDD

### Standard library functions
* `def` - def with docstring
* `def-` - private def with docstring
* `defn` - defn with docstring
* `defn-` private defn with docstring
* `ns` - namespace form with docstring

### Clojure CLI deps.edn aliases
* `deps-alias` - add Clojure CLI alias
* `deps-maven` - add a maven style dependency
* `deps-git` - add a git style dependency using `:git/sha`
* `deps-git-tag` - as above including `:git/tag`
* `deps-git-url` - add git style dependency using git url (url taken from dependency name as it is typed - mirrored placeholder)
* `deps-local` - add a `:local/root` dependency

### Requiring dependencies
* `require-rdd` - add a require expression, for adding a require in a rich comment block for RDD
* `require` - simple require
* `require-refer` - require with `:refer`
* `require-as` - require with `:as` alias
* `use` - creates a require rather than the more troublesome use

### Unit testing
* `deftest` - creates a deftest with testing directive and one assertion
* `testing` - creates a testing testing directive and one assertion
* `is` - an assertion with placeholders for test function and expected results


## References

* [LSP mode - A guide on disabling / enabling features](https://emacs-lsp.github.io/lsp-mode/tutorials/how-to-turn-off/) - if the Emacs UI is too cluttered or missing visual features
* [Configure Emacs as a Clojure IDE](https://emacs-lsp.github.io/lsp-mode/tutorials/clojure-guide/)
* [Language Server Protocol support for Emacs](https://emacs-lsp.github.io/lsp-mode/)
