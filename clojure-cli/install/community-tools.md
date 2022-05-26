![Practicalli Clojure deps.edn banner](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/practicalli-clojure-deps-edn-banner.png)

[practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdn }}) is a user wide configuration for Clojure CLI tools, providing a range of community tools via meaningful aliases to support Clojure and ClojureScript development.

Alias names are designed with qualified keywords that provide context for the use of an alias (`project`, `repl`, `env`, `test`, `inspect`). These keywords help with discovery and reduce cognitive load required to remember their purpose.

Commonly used arguments are included in many alias via `:main-opts` or `:exec-args`, to minimise the cognitive load required to use aliases.

This user wide configuration supports all your local development projects.  For remote environments or [Continuous Integration services](/continuous-integration/), include practicalli/clojure-deps-edn in the environment build or copy specific aliases to the project `deps.edn` configuration of a project.


## Requirements

Clojure CLI version 1.10.3.1040 is the minimum version, although the latest available version is recommended.

Check the version of Clojure CLI currently installed via `clojure --version` or `clojure -Sdescribe`


## Install

Practicalli recommends creating a fork of the [practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdn }}) on GitHub, or you can simply clone the original repository.

Add [practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdn }}) as your [user wide Clojure CLI configuration](https://clojure.org/reference/deps_and_cli#_deps_edn_sources). If you have run the `clojure` or `clj` commands, then a default configuration directory has already been created and should be moved or deleted first.

If `XDG_CONFIG_HOME` environment variable is set, clone the repository to `$XDG_CONFIG_HOME/clojure`

```
https://github.com/practicalli/clojure-deps-edn.git $XDG_CONFIG_HOME/clojure
```

Otherwise use the `$HOME/.clojure` directory

```
https://github.com/practicalli/clojure-deps-edn.git $HOME/.clojure
```

`CLJ_CONFIG` environment variable can be used to over-ride all other location settings

> Check the location of your Clojure configuration directory by running `clojure -Sdescribe` and checking the `:user-config` value.


## What is installed?

The Clojure configuration directory contains a `deps.edn` file containing a substantial `:aliases` section with a long list of aliases.  These aliases are described in the [README of the project](https://github.com/practicalli/clojure-deps-edn/blob/live/README.md).

All tools are provided via libraries and are only installed on first use.  Unused aliases will therefore not install their libraries.

> A `tools/tools.edn` configuration may be included in the future, along with specific tool configurations that will automatically install a tool the first time it is used.
