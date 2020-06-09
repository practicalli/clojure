# Install Clojure
Establish a Clojure environment by installing the following:

| Tools                 | Required    | Purpose                                                    |
|-----------------------|-------------|------------------------------------------------------------|
| Clojure CLI tools     | Essential   | Run Clojure REPL for development and production            |
| Aliases for CLI tools | Recommended | Additional tools to enhance Clojure development experience |
| clj-kondo             | Recommended | Static analysis of code to find all those little bugs      |
| rlwrap                | Optional    | A simple read line for command history, used by `clj`      |

> #### Hint::clj-kondo provides a permanent paring buddy
> [Configuring clj-kondo with your preferred editor](https://github.com/borkdude/clj-kondo/blob/master/doc/editor-integration.md) will greatly enhance the joy of coding in Clojure by keeping your code idiomatic and free from a wide range of syntax bugs.


## Clojure CLI tools
A command line REPL provides the essential tool for Clojure development.  [Installing a Clojure aware editor](editor-install-guides/) is recommended when developing Clojure projects.

<!-- Operating System specific instructions -->
{% tabs linux="Linux", homebrew="Homebrew", windows="Windows" %}

<!-- Ubuntu install -->
{% content "linux" %}

Use the Linux script installer from [Clojure.org](https://clojure.org/guides/getting_started#_installation_on_linux)

```shell
sudo apt install curl rlwrap

curl -O https://download.clojure.org/install/linux-install-1.10.1.536.sh
chmod +x linux-install-1.10.1.536.sh
sudo ./linux-install-1.10.1.536.sh
```

The installation creates `/usr/local/bin/clj`, `/usr/local/bin/clojure`, and `/usr/local/lib/clojure`

<!-- Homebrew (MacOSX) install -->
{% content "homebrew" %}

Use [Homebrew on Linux or Windows with WSL](https://docs.brew.sh/Homebrew-on-Linux)

Install the command line tools with brew from the clojure/tools tap:

```shell
brew install clojure/tools/clojure
```

<!-- Windows install with scoop.sh -->
{% content "windows" %}
For Windows 10 use [Windows Subsystem for Linux and Windows Terminal are recommended](https://conan.is/blogging/clojure-on-windows.html) if you have administrative privileges and are happy to use a Unix system on the command line.

For earlier versions of Windows use [scoop.sh](https://scoop.sh/) is a command line installer for windows and is the recommended approach.  [Powershell 5](https://aka.ms/wmf5download) or greater is required.

Follow the [scoop-clojure install instructions](https://github.com/littleli/scoop-clojure), summarized here:

```shell
scoop install git
scoop bucket add java
scoop bucket add scoop-clojure https://github.com/littleli/scoop-clojure
scoop install adoptopenjdk-lts-hotspot
scoop install clojure
scoop update clojure
```

To also use scoop to install clj-kondo

```shell
scoop bucket add extras

scoop install clj-kondo
```


{% endtabs %}
<!-- End of Operating System specific instructions -->

## Install Clojure CLI tools - common aliases
Create a fork of the [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn) on GitHub

Clone that fork to `~/.clojure/` and instantly have access to dozens of tools for Clojure software development

```shell
git clone git@github.com:your-fork/clojure-deps-edn.git
```

All tools are provided via libraries and are only installed on first used.

If you choose not to use the [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn) repository or wish to use your own `~/.clojure/deps.edn` then you should add an alias for the `clj-new` tool for creating projects as this is extensively used in this guide.


## Install clj-kondo static analyser
[clj-kondo](https://github.com/borkdude/clj-kondo/blob/master/doc/install.md) performs static analysis on Clojure, ClojureScript and EDN, without the need of a running REPL. It informs you about potential errors while you are typing when used with [supported editors](https://github.com/borkdude/clj-kondo/blob/master/doc/editor-integration.md).

Follow the [clj-kondo install guide](https://github.com/borkdude/clj-kondo/blob/master/doc/install.md) for your operating system.


