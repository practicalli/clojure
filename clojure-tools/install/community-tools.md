![Practicalli Clojure deps.edn banner](https://raw.githubusercontent.com/practicalli/graphic-design/live/practicalli-clojure-deps.png)

[practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdn }}) provides a user wide configuration for Clojure CLI tools, providing a range of community tools to support Clojure and ClojureScript development.

Alias names are designed with qualified keywords which provides context for the use of an alias (project, repl, env, test, inspect). These keywords help with discovery and reduce cognitive load required to remember their purpose.

This configuration supports all your local development projects.  For remote environments or [Continuous Integration services](/continuous-integration/), include practicalli/clojure-deps-edn in the environment build or copy specific aliases to the project `deps.edn` configuration of a project.



## Install
Clojure CLI tools creates a configuration directory called `.clojure`, which [by default](https://clojure.org/reference/deps_and_cli#_deps_edn_sources) is placed in the root of the operating system user account directory, e.g. `$HOME/.clojure`.

`XDG_CONFIG_HOME` may be set by your operating system and over-rides the default location, e.g. `$HOME/.config/.clojure`

`CLJ_CONFIG` can be used to over-ride all other location settings

> Check the location of your Clojure configuration directory by running `clojure -Sdescribe` and checking the `:user-config` value.

Practicalli recommends creating a fork of the [practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdn }}) on GitHub, or you can simply clone the original repository.

Clone the repository to the configuration directory, e.g `~/.clojure/`.  If you have run the `clojure` or `clj` commands, then a default `deps.edn` file was created and should be moved or deleted first.

```shell
git clone git@github.com:your-fork/clojure-deps-edn.git ~/.clojure/
```

All tools are provided via libraries and are only installed on first use.

If you choose to use your own `~/.clojure/deps.edn` then add an alias for the clj-new tool and rebel readline as this is extensively used in this guide.
