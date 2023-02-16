# Clojure Style

Code is easier to read and work with when it is consistent format that follows common rules.

[Clojure community style guide](https://github.com/bbatsov/clojure-style-guide) provides a common style for Clojure code.  While most style recommendations are widely used, others are more contentious.  Ultimately the development team for the project should define a workable set of style rules that makes them productions, ideally using much of those rules from the style guide.

A consistent format between editors also minimises version control changes not related to code design.  The following format tools for clojure can all be configured to be consistent with each other (although zprint defaults will require more customisation):

* [cljfmt](https://github.com/weavejester/cljfmt) - library, also included in Clojure LSP
* [cljstyle](https://github.com/greglook/cljstyle) - binary and library (re-write of cljfmt)
* [zprint](https://github.com/kkinnear/zprint) - binary & library


??? INFO "Tooling that uses the Clojure Style Guide"
    Emacs `clojure-mode` and Clojure LSP (via cljfmt) format code following the most common Clojure style guide rules, although cljfmt rules are quite strick so Practicalli disables many of them.

    cljstyle default configuration follows the majority of styles and has the same defaults as cljfmt. Practicalli Clojure CLI Config tweaks a few rules to make code more readable and allow for repl design experiments.


## cljstyle

Cljstyle is a rewrite of cljfmt, designed to be easier to configure. The default rules implement many of the style rules from the Clojure community style guide and is compatible with cljfmt.

Call with the `check` option to report formatting issues, providing a coloured diff view of the format changes

![Clojure cljstyle format tool - check format diff example](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-cljstyle-check-diff-example-light.png#only-light)
![Clojure cljstyle format tool - check format diff example](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-cljstyle-check-diff-example-dark.png#only-dark)


Call with `fix` option to automatically update all Clojure files with fixes, indicating which files have changed.

Cljstyle will examine all files in the current directory and any sub-directories.

`.cljstyle` configuration file in the root of the project can override the default customisation, including indentation rules.


=== "Binary"
    Install the [latest binary release from the cljstyle GitHub repository](https://github.com/greglook/cljstyle/releases) onto the operating system path, e.g. `$HOME/.local/bin`

    ```shell
    cljstyle check
    ```

    `fix` option automatically updates all source code files that have format issues.

    ```shell
    cljstyle fix
    ```


=== "Practicalli Clojure CLI Config"
    cljstyle can be used as a library without installing the cljstyle binary.  [Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) defines the `:format/cljstyle` alias which should be passed wither the `check` or `format` option

    Check all the Clojure files (.clj .cljc .edn .cljs) in the current project
    ```shell
    clojure -M:format/cljstyle
    ```

    ```shell
    clojure -M:format/cljstyle!
    ```

    !!! EXAMPLE "Clojure Alias for cljstyle"
    ```clojure
    :format/cljstyle
    {:extra-deps
     {mvxcvi/cljstyle {:git/url "https://github.com/greglook/cljstyle.git"
                       :git/sha "14c18e5b593c39bc59f10df1b894c31a0020dc49"}}
     :main-opts ["-m" "cljstyle.main" "check"]}
     
    :format/cljstyle!
    {:extra-deps
     {mvxcvi/cljstyle {:git/url "https://github.com/greglook/cljstyle.git"
                       :git/sha "14c18e5b593c39bc59f10df1b894c31a0020dc49"}}
     :main-opts ["-m" "cljstyle.main" "fix"]}
    ```

=== "Makefile"
    Use a Makefile to run common commands such as checking style, running tests, building uberjars, etc.

    [Practicalli Clojure App template repository](https://github.com/practicalli/clojure-app-template) contains an [example Makefile](https://github.com/practicalli/clojure-app-template/blob/main/Makefile) that contains common tasks for Clojure development

    This example calls the cljstyle binary, but could be changed to call the `clojure -M:format/cljstyle check` and `clojure -M:format/cljstyle fix` aliases instead.

    ```make
    # ------- Code Quality --------------- #
    format-check: ## Run cljstyle to check the formatting of Clojure code
    	$(info --------- cljstyle Runner ---------)
    	cljstyle check

    format-fix:  ## Run cljstyle and fix the formatting of Clojure code
    	$(info --------- cljstyle Runner ---------)
    	cljstyle fix
    # ------------------------------------ #
    ```

!!! HINT "Stage changes before automatically fixing format"
    Practicalli suggests staging (or committing) changes before running `cljstyle fix` to easily undo undesired changes or simply confirm what changes have been made


### Recommended configuration

Practicalli updated the default cljstyle configuration with the following changes

Configure list indent to one character

```clojure title=""
  :indentation
  {:enabled? true,
   :list-indent 1,

  }
```

Do not warn about duplicate var names (def, defn names) - excluded to stop warning about REPL experiments and design journal rich comments that contain alternative designs.

```clojure
  :vars
  {:enabled? false}
```


## cljfmt

cljfmt is not available as a separate binary, although it a fixed part of the Clojure LSP server implementation.

whist typing Clojure code, Clojure LSP will format using cljfmt rules

Define a cljfmt configuration via Clojure LSP to define rules and indentation settings for all projects.

```clojure title=".config/clojure-lsp/config.edn"
 :cljfmt-config-path "cljfmt.edn"
```

Or specify cljfmt configuration within the Clojure LSP configuration file

```clojure title=".config/clojure-lsp/config.edn"
 :cljfmt {}
```

??? INFO "Practicalli Clojure LSP config - LSP and cljfmt"
    [Practicalli Clojure LSP config](https://github.com/practicalli/clojure-lsp-config) provides an example config.edn configuration file for Clojure LSP that uses a cljfmt.edn configuration file for a minimum set of Clojure format rules

    The default cljfmt rules feel overly strict and Practicalli configuration disables the more draconian rules to make code far more readable


## zprint

zprint is a highly configurable format tool for both Clojure code and Clojure/EDN structures, available as a library and command line tool

zprint has advanced features over cljstyle and cljfmt, although may require some additional configuration work especially to format consistently with these tools.

[Various styles](https://github.com/kkinnear/zprint/blob/main/doc/reference.md#style-and-style-map)

!!! WARNING "No built-in diff option"
    zprint requires an external diff tool to see the formating changes it makes.  Changes can be written to another file and a file diff comparison made.  Or files can be staged / committed in a local Git repository and a Git client used to see the diff.

    Once the desirable styles and configuration are established there is less need for an external diff tool, although its always useful to have a quick way to check what format tools are doing.

=== "Binary"
    Download zprint for Linux or MacOSX using the [latest binary released on the GitHub repository](https://github.com/kkinnear/zprint/releases/latest)

    Move the binary to the executable path for the operating system, updating the name to `zprint` (or use a symbolic link)

    ```shell
    mv ~/Downloads/zprintl-1.2.5 ~/.local/bin/zprint
    ```
    Make the binary executable
    ```shell
    chmod a+x ~/.local/bin/zprint
    ```
    Ensure the zprint binary is working and examine the default configuration for zprint, including all default values and highlighting where non-default values are set
    ```shell
    zprint --explain-all
    ```
    Using zprint to check the Clojure files in the current directory and list which files require formatting
    ```shell
    zprint --formatted-check *.clj
    ```

    A more detailed zprint report checking all the Clojure files a project, including files in the route directory and all sub-directories (i.e. `**/*.cjl` pattern)
    ```shell
    zprint --list-formatted-summary-check **/*.clj *.edn *.clj
    ```
    Or using short form flags
    ```shell
    zprint -lfsc **/*.clj *.edn *.clj
    ```

    Update formatting for all the files in a projects, showing details of the files processed and changed
    ```shell
    zprint -lfsw **/*.clj *.edn *.clj
    ```


=== "Practicalli Clojure CLI Config"
    zprint can be used as a library without installing the binary.  [Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) defines the `:format/zprint` alias which checks the format of a file and reports which files required

    ```shell
    clojure -M:format/zprint deps.edn
    ```

    ```shell
    clojure -M:format/zprint filename
    ```

    ??? EXAMPLE "Clojure Alias for zprint"
    Add `:format/zprint` alias to check format and `:format/zprint!` to write format changes to a given file or filename pattern
    ```clojure title="User or project deps.edn file"
    :format/zprint
    {:extra-deps {zprint/zprint {:mvn/version "1.2.4"}}
     :main-opts  ["-m" "zprint.main"
                  "{:style :indent-only}"
                  "--list-formatted-summary-check"]}

    :format/zprint!
    {:extra-deps {zprint/zprint {:mvn/version "1.2.4"}}
     :main-opts  ["-m" "zprint.main"
                  "{:style :indent-only}"
                  "--list-formatted-summary-write"]}
    ```
    Use the alise

=== "Node.js"
    zprint is available as an NPM package
    ```shell
    sudo --install --global zprint-clj
    ```
    Run zprint-clj over all Clojure files
    ```shell
    zprint-clj **/*.{clj,cljs,cljc,edn}
    ```

### Configure zprint

It is assumed that the majority of format needs are met by one of the following style rule sets

* `{:style :indent-only}` only formats indentation, less likely to change the general style of code
* `{:style :community}` a quite strict adhearence to the Clojure Community Guide (which Practicalli finds a little to strict)

Unless the code is really messy (e.g. not written in a clojure aware editor with live linting) then `{:style :indent-only}` is a simple starting point.

If the team have adopted most if not all community styles, then `{:style :community}` may be a more appropriate start point.  Use --explain-all flag with the zprint command to see all the rules that are applied with a partiular style and modify as appropriate

`$HOME/.zprintrc` is used for the configuration applied to all files, although this can be overridden in each project (or even as zprint comments in particular files)

[zprint - GitHub repo](https://github.com/kkinnear/zprint){target=_blank .md-button}
[zprint - clojars](https://clojars.org/zprint){target=_blank .md-button}
[zprint - cljdoc](https://cljdoc.org/d/zprint/zprint/1.2.5/doc/introduction){target=_blank .md-button}
