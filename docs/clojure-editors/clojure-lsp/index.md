# Language Server Protocol

[:globe_with_meridians: A Protocol Definition Standard](https://microsoft.github.io/language-server-protocol/) for providing a common set of development features, e.g. code completion, syntax highlighting, refactor and language diagnostics.

Each programming language, script or markup requires a specific server implementation.

An editor or plugin provides an LSP client that uses data from language servers, providing information about source code and enabling development tools to understand the code structure.

Most Clojure aware editors provide an LSP client (Emacs, Neovim, VS Code, etc.).


## Clojure LSP

[:globe_with_meridians: Clojure LSP](https://clojure-lsp.io/){target=_blank} is an implementation of an LSP server for Clojure and ClojureScript languages.

Clojure LSP provides code actions and diagnostic warnings, from static analysis of Clojure and ClojureScript code from [:globe_with_meridians: clj-kondo](https://github.com/clj-kondo/clj-kondo){target=_blank}

![Clojure LSP example screenshot](https://emacs-lsp.github.io/lsp-mode/tutorials/images/clojure-call-hierarchy.png)


## Install

[Clojure LSP installation guide](https://clojure-lsp.io/installation/) covers multiple operating systems.

=== "Linux"

    Install the latest version from the GitHub Release, via [DRA](https://practical.li/engineering-playbook/os/command-line/tui/dra/){target=_blank} or the [Clojure LSP instal script](https://clojure-lsp.io/installation/#script){target=_blank}.

    > Manual approach: download `clojure-lsp-native-linux-amd64` from [GitHub release page](https://github.com/clojure-lsp/clojure-lsp/releases). Extract the `clojure-lsp` binary to `~/.local/bin/clojure-lsp`.

    ??? EXAMPLE "Practicalli Dotfiles Clojure LSP Install Script"
        ```shell
        #!/usr/bin/env bash

        echo
        echo "# ---------------------------------------"
        echo "Clojure LSP install via DRA"
        dra download --automatic --install --output ~/.local/bin/ clojure-lsp/clojure-lsp

        echo
        echo "Install Practicalli Clojure LSP Config in ~/.config/clojure-lsp"
        git clone --depth=1 https://github.com/practicalli/clojure-lsp-config "$HOME"/.config/clojure-lsp
        echo

        # Verify the Clojure LSP version:
        echo "Clojure LSP version: "
        echo "$(clojure-lsp --version)"
        echo "# ---------------------------------------"
        echo
        ```

    ??? EXAMPLE "Clojure LSP official Script"
        ```shell
        #!/usr/bin/env bash

        # INFO: Practicalli prefers DRA install approach in clojure-lsp.sh
        # This file is not used, but should work as it uses the official Clojure LSP script

        echo
        echo "# ---------------------------------------"
        echo "Clojure LSP install via Official Script"

        # Run the Clojure CLI install script for the latest release:
        # https://github.com/Schniz/fnm
        sudo bash < <(curl -s https://raw.githubusercontent.com/clojure-lsp/clojure-lsp/master/install)


        echo
        echo "Install Practicalli Clojure LSP Config in ~/.config/clojure-lsp"
        git clone --depth=1 https://github.com/practicalli/clojure-lsp-config "$HOME"/.config/clojure-lsp
        echo

        # Verify the Clojure LSP version:
        echo "Clojure LSP version: $(clojure-lsp --version)"
        echo "# ---------------------------------------"
        echo
        ```


=== "Homebrew"
    Clojure LSP project provides a custom tap for installing the latest version.

    !!! NOTE ""
        ```shell
        brew install clojure-lsp/brew/clojure-lsp-native
        ```

    ??? WARNING "Homebrew default package deprecated"
        The `clojure-lsp` formula is deprecated and should not be used.

        `brew remove clojure-lsp` if the default clojure-lsp is already installed.

Check Clojure LSP server is working via the command line

!!! NOTE "Print version of Clojure LSP"
    ```shell
    clojure-lsp --version
    ```


??? HINT "Editors may provide install mechanism for Clojure LSP"
    Spacemacs LSP layer prompts to install a language server when first opening a file of a major mode. E.g. when a Clojure related file is opened, the Clojure LSP server is downloaded if not found on the Emacs path.

    The Neovim Mason package manages install of LSP servers (and lint/format tools). Mason can also be configured to use an LSP server installed on the Operating System path.

    VSCode Calva plugin includes the clojure-lsp server, although an external server can be configured.


## Configure

??? "Practicalli Clojure LSP Configuration"
    [config.edn](https://github.com/practicalli/clojure-lsp-config/blob/main/config.edn) is the recommended configuration from Practicalli.
    ```clojure
    ;; ---------------------------------------------------------
    ;; Clojure LSP user level (global) configuration
    ;; https://clojure-lsp.io/settings/
    ;;
    ;; Complete config.edn example with default settings
    ;; https://github.com/clojure-lsp/clojure-lsp/blob/master/docs/all-available-settings.edn
    ;; default key/value are in comments
    ;; ---------------------------------------------------------

    ;; Refact config from all-available-settings example

    {;; ---------------------------------------------------------
     ;; Project analysis

     ;; auto-resolved for deps.edn, project.clj or bb.edn projects
     ;; :source-paths #{"src" "test"}

     ;; Include :extra-paths and :extra-deps from project & user level aliases in LSP classpath
     ;;  :source-aliases #{:dev :test}
     :source-aliases #{:dev :test :dev/env :dev/reloaded}

     ;; Define a custom project classpath command, e.g. Clojure CLI
     ;; :project-specs [{:project-path "deps.edn"
     ;;                  :classpath-cmd ["clojure" "-M:env/dev:env/test" "-Spath"]}]
     ;; Check the default at clojure-lsp.classpath/default-project-specs
     ;; :project-specs []

     ;; ignore analyzing/linting specific paths
     :source-paths-ignore-regex ["target.*" "build.*" "console-log-.*"]

     ;; Additional LSP configurations to load from classpath
     ;; https://clojure-lsp.io/settings/#classpath-config-paths
     ;; :classpath-config-paths []

     ;; :paths-ignore-regex []

     ;; Watch for classpath changes
     ;; :notify-references-on-file-change true
     ;; :compute-external-file-changes true

     ;; Approach for linking dependencies
     ;; :dependency-scheme "zipfile"

     ;; generate and analyze stubs for specific namespaces on the project classpath
     ;; typically for closed source dependencies, e.g. datomic.api
     ;; https://clojure-lsp.io/settings/#stub-generation
     ;; :stubs {:generation {:namespaces #{}
     ;;                      :output-dir ".lsp/.cache/stubs"
     ;;                     :java-command "java"}
     ;;        :extra-dirs []}

     ;; Java Sources from Ubuntu package openjdk-17-source
     ;; jdk-source-uri takes precedence
     ;; :java
     ;; {:jdk-source-uri "https://raw.githubusercontent.com/clojure-lsp/jdk-source/main/openjdk-19/reduced/source.zip"
     ;;  :home-path nil ;; jdk-source-uri takes precedence
     ;;  :download-jdk-source? false
     ;;  :decompile-jar-as-project? true}
     ;; :java
     ;; {:jdk-source-uri "file:///usr/lib/jvm/openjdk-17/lib/src.zip"}
     :java nil

     ;; End of Project analysis
     ;; ---------------------------------------------------------

     ;; ---------------------------------------------------------
     ;; Linter configuration

     ;; clj-kondo Linter rules
     ;; https://github.com/clj-kondo/clj-kondo/blob/master/doc/config.md#enable-optional-linters
     ;; :linters {:clj-kondo {:level :on
     ;;                      :report-duplicates true
     ;;                      :ns-exclude-regex ""}
     ;;          :clj-depend {:level :info}} ;; Only if any clj-depend config is found

     ;; asynchronously lint project files after startup, for features like List project errors
     ;; :lint-project-files-after-startup? true

     ;; copy clj-kondo hooks configs exported by libs on classpath during startup
     ;; :copy-kondo-configs? true

     ;; End of Linter configuration
     ;; ---------------------------------------------------------

     ;; ---------------------------------------------------------
     ;; Refactor code

     ;; Namespace format
     ;; :clean {:automatically-after-ns-refactor true
     ;;         :ns-inner-blocks-indentation :next-line
     ;;         :ns-import-classes-indentation :next-line
     ;;         :sort {:ns true
     ;;                :require true
     ;;                :import true
     ;;                :import-classes {:classes-per-line 3} ;; -1 for all in single line
     ;;                :refer {:max-line-length 80}}}

      ;; Do not sort namespaces
     :clean {sort {:ns      false
                   :require false
                   :import  false}}

     ;; Automatically add ns form to new Clojure/Script files
     ;; :auto-add-ns-to-new-files? true

     ;; use ^private metadata rather than defn-
     ;; :use-metadata-for-privacy? false
     :use-metadata-for-privacy? true

     ;; Keep parens around single argument functions in thread macro
     ;; :keep-parens-when-threading? false
     :keep-parens-when-threading? true

     ;; End of Refactor code
     ;; ---------------------------------------------------------

     ;; ---------------------------------------------------------
     ;; Clojure formatting configuration - cljfmt

     ;; location of cljfmt configuration for formatting
     ;; Path relative to project root or an absolute path
     ;; :cljfmt-config-path ".cljfmt.edn"
     :cljfmt-config-path "cljfmt.edn"

     ;; Specify cljfmt configuration within Clojure LSP configuration file
     ;; :cljfmt {}

     ;; End of Clojure formatting configuration - cljfmt
     ;; ---------------------------------------------------------

     ;; ---------------------------------------------------------
     ;; Visual LSP components

     ;; :hover {:hide-file-location? false
     ;;         :arity-on-same-line? false
     ;;         :clojuredocs true}

     ;; :completion {:additional-edits-warning-text nil
     ;;              :analysis-type :fast-but-stale}

     ;; :code-lens {:segregate-test-references true}

     ;; LSP semantic tokens server support for syntax highlighting
     ;; :semantic-tokens? true

     ;; Documentation artefacts
     ;; :document-formatting?       true
     ;; :document-range-formatting? true

     ;; End of Visual LSP components
     ;; ---------------------------------------------------------

     ;; ---------------------------------------------------------
     ;; LSP general configuration options

     ;; Exit clojure-lsp if any errors found, e.g. classpath scan failure
     ;; :api {:exit-on-errors? true}

     ;; Synchronise whole buffer `:full` or only related changes `:incremental`
     ;; :text-document-sync-kind :full

     ;; End of LSP general configuration options
     ;; ---------------------------------------------------------

     ;; ---------------------------------------------------------
     ;; File locations

     ;; project analysis cache to speed clojure-lsp startup
     ;; relative path to project root or absolute path
     ;; :cache-path ".lsp/.cache"

     ;; Absolute path
     ;; :log-path "/tmp/clojure-lsp.*.out"

     ;; End of file locations
     ;; ---------------------------------------------------------

     ;; ---------------------------------------------------------
     ;; LSP snippets
     ;; https://clojure-lsp.io/features/#snippets

     :additional-snippets
     [;; Documentation / comments

      {:name "comment-heading"
       :detail "Comment Header"
       :snippet
       ";; ---------------------------------------------------------
        ;; ${1:Heading summary title}
        ;;
        ;; ${2:Brief description}\n;; ---------------------------------------------------------\n\n$0"}

      {:name "comment-separator"
       :detail "Comment Separator"
       :snippet
       ";; ---------------------------------------------------------\n;; ${1:Section title}\n\n$0"}

      {:name "comment-section"
       :detail "Comment Section"
       :snippet
       ";; ---------------------------------------------------------\n;; ${1:Section title}\n\n$0\n\n
        ;; End of $1\n;; ---------------------------------------------------------\n\n"}

      {:name "wrap-reader-comment"
       :detail "Wrap current expression with Comment Reader macro"
       :snippet "#_$current-form"}

      {:name "rich-comment"
       :detail "Create rich comment"
       :snippet
       "(comment
          $0
      #_()) ;; End of rich comment"}

      {:name "rich-comment-rdd"
       :detail "Create comment block"
       :snippet
       "#_{:clj-kondo/ignore [:redefined-var]}
       (comment
         $0
       #_()) ; End of rich comment"}

      {:name "rich-comment-hotload"
       :detail "Rich comment library hotload"
       :snippet
       "#_{:clj-kondo/ignore [:redefined-var]}
        (comment
          ;; Add-lib library for hot-loading
          (require '[clojure.tools.deps.alpha.repl :refer [add-libs]])
          (add-libs '{${1:domain/library-name} {:mvn/version \"${2:1.0.0}\"}$3})
          $0
        #_()) ; End of rich comment block"}

      {:name "wrap-rich-comment"
       :detail "Wrap current expression with rich comment form"
       :snippet
       "(comment
          $current-form
          $0
       #_()) ;; End of rich comment"}

      ;; Core functions

      {:name "def"
       :detail "def with docstring"
       :snippet "(def ${1:name}\n  \"${2:doc-string}\"\n  $0)"}

      {:name "def-"
       :detail "def private"
       :snippet "(def ^:private ${1:name}\n  \"${2:doc-string}\"\n $0)"}

      {:name "defn"
       :detail "Create public function"
       :snippet "(defn ${1:name}\n  \"${2:doc-string}\"\n   [${3:args}]\n  $0)"}

      {:name "defn-"
       :detail "Create public function"
       :snippet "(defn ^:private ${1:name}\n  \"${2:docstring}\"\n   [${3:args}]\n  $0)"}

      {:name "ns"
       :detail "Create ns"
       :snippet "(ns ${1:name}\n  \"${2:doc-string}\"\n  ${3:require})"}

      ;; Clojure CLI alias snippets

      {:name "deps-alias"
       :detail "deps.edn alias with extra path & deps"
       :snippet
       ":${1:category/name}
        {:extra-paths [\"${2:path}\"]
         :extra-deps {${3:deps-maven or deps-git}}}$0"}

      {:name "deps-alias-main"
       :detail "deps.edn alias with extra path & deps"
       :snippet
       ":${1:category/name}
        {:extra-paths [\"${2:path}\"]
         :extra-deps {${3:deps-maven or deps-git}}
         :main-opts [\"-m\" \"${4:main namespace}\"]}$0"}

      {:name "deps-alias-exec"
       :detail "deps.edn alias with extra path & deps"
       :snippet
       ":${1:category/name}
        {:extra-paths [\"${2:path}\"]
         :extra-deps {${3:deps-maven or deps-git}}
         :exec-fn ${4:domain/function-name}
         :exec-args {${5:key value}}}$0"}

      {:name "deps-alias-main-exec"
       :detail "deps.edn alias with extra path & deps"
       :snippet
       ":${1:category/name}
        {:extra-paths [\"${2:path}\"]
         :extra-deps {${3:deps-maven or deps-git}}
         :main-opts [\"-m\" \"${4:main namespace}\"]
         :exec-fn ${5:domain/function-name}
         :exec-args {${6:key value}}}$0"}

      {:name "deps-maven"
       :detail "deps.edn Maven dependency"
       :snippet
       "${1:domain/library-name} {:mvn/version \"${2:1.0.0}\"}$0"}

      {:name "deps-git"
       :detail "deps.edn Git dependency"
       :snippet
       "${1:domain/library-name}
           {:git/sha \"${2:git-sha-value}\"}$0"}

      {:name "deps-git-tag"
       :detail "Git dependency"
       :snippet
       "${1:domain/library-name}
          {:git/tag \"${2:git-tag-value}\"
           :git/sha \"${3:git-sha-value}\"}$0"}

      {:name "deps-git-url"
       :detail "Git URL dependency"
       :snippet
       "${1:domain/library-name}
          {:git/url \"https://github.com/$1\"
           :git/sha \"${2:git-sha-value}\"}$0"}

      {:name "deps-local"
       :detail "deps.edn Maven dependency"
       :snippet
       "${1:domain/library-name} {:local/root \"${2:/path/to/project/root}\"}$0"}

       ;; Requiring dependency snippets

      {:name "require-rdd"
       :detail "require for rich comment experiments"
       :snippet "(require '[${1:namespace} :as ${2:alias}]$3)$0"}

      {:name "require"
       :detail "ns require"
       :snippet "(:require [${1:namespace}])$0"}

      {:name "require-refer"
       :detail "ns require with :refer"
       :snippet "(:require [${1:namespace} :refer [$2]]$3)$0"}

      {:name "require-as"
       :detail "ns require with :as alias"
       :snippet "(:require [${1:namespace} :as ${2:alias}]$3)$0"}

      {:name "use"
       :detail "require refer preferred over use"
       :snippet "(:require [${1:namespace} :refer [$2]])$0"}

       ;; Unit Test snippets

      {:name "deftest"
       :detail "deftest clojure.test"
       :snippet
       "(deftest ${1:name}-test
                (testing \"${2:Context of the test assertions}\"
                (is (= ${3:assertion-values}))$4)) $0"}

      {:name "testing"
       :detail "testing asserting group for clojure.test"
       :snippet "(testing \"${1:description-of-assertion-group}\"\n $0)"}

      {:name "is"
       :detail "assertion for clojure.test"
       :snippet "(is (= ${1:function call} ${2:expected result}))$0"}

       ;; ---------------------------------------------------------
       ;; Clojure LSP and Clj-kondo snippets

      {:name "lsp-ignore-redefined"
       :detail "Ignore redefined Vars"
       :snippet
       "#_{:clj-kondo/ignore [:redefined-var]}
                $0"}]}

       ;; End of Clojure LSP and Clj-kondo snippets
       ;; ---------------------------------------------------------

      ;; End of LSP snippets
      ;; ---------------------------------------------------------
    ```

### Extra Paths

Include `:extra-paths` and `:extra-deps` from project & user level aliases in LSP classpath.  e.g. support a custom `user` namespace in `dev/user.clj`

```clojure
 :source-aliases #{:dev :test :env/dev :env/test :lib/reloaded}
```

### Java Sources

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

### Clean Namespace

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


### Meta data syntax

Use `^private` metadata for private function definitions rather than `defn-`

```clojure
 :use-metadata-for-privacy? true
```


### CljFmt config

Location of [cljfmt configuration](cljfmt.edn) for formatting, path relative to project root.

The defaults for cljfmt are used, except `:remove-consecutive-blank-lines?` which is set to false to enable more readable code.

```clojure
 :cljfmt-config-path "cljfmt.edn"
```

> [cljfmt configuration](cljfmt.edn) included example `:indents` rules for clojure.core, compojure, fuzzy rules and examples used by the Clojure LSP maintainer.


## Practicalli snippets

[Practicalli Snippets](practicalli-snippets.md) are defined in the `:additional-snippets` section of the Practicalli Clojure LSP config.

### Docs / comments

- `comment-heading` - describe purpose of the namespace
- `comment-separator` - logically separate code sections, helps identify opportunities to refactor to other name spaces
- `comment-section` - logically separate large code sections with start and end line comments
- `wrap-reader-comment` - insert reader comment macro, `#_` before current form, informing Clojure reader to ignore next form

### Repl Driven Development

- `rich-comment` - comment block
- `rich-comment-rdd` - comment block with ignore :redefined-var for repl experiments
- `rich-comment-hotload` - comment block with add-libs code for hotloading libraries in Clojure CLI repl
- `wrap-rich-comment` - wrap current form with comment reader macro
- `require-rdd` - add a require expression, for adding a require in a rich comment block for RDD

### Standard library functions

- `def` - def with docstring
- `def-` - private def with docstring
- `defn` - defn with docstring
- `defn-` private defn with docstring
- `ns` - namespace form with docstring

### Clojure CLI deps.edn aliases

- `deps-alias` - add Clojure CLI alias
- `deps-maven` - add a maven style dependency
- `deps-git` - add a git style dependency using `:git/sha`
- `deps-git-tag` - as above including `:git/tag`
- `deps-git-url` - add git style dependency using git url (url taken from dependency name as it is typed - mirrored placeholder)
- `deps-local` - add a `:local/root` dependency

### Requiring dependencies

- `require-rdd` - add a require expression, for adding a require in a rich comment block for RDD
- `require` - simple require
- `require-refer` - require with `:refer`
- `require-as` - require with `:as` alias
- `use` - creates a require rather than the more troublesome use

### Unit testing

- `deftest` - creates a deftest with testing directive and one assertion
- `testing` - creates a testing testing directive and one assertion
- `is` - an assertion with placeholders for test function and expected results


## References

[LSP mode - A guide on disabling / enabling features](https://emacs-lsp.github.io/lsp-mode/tutorials/how-to-turn-off/){target=_blank .md-button}

[Configure Emacs as a Clojure IDE](https://emacs-lsp.github.io/lsp-mode/tutorials/clojure-guide/){target=_blank .md-button}

[Language Server Protocol support for Emacs](https://emacs-lsp.github.io/lsp-mode/){target=_blank .md-button}
