# Install Clojure
Establish a Clojure environment by installing the following:

| Tools                 | Required    | Purpose                                                    |
|-----------------------|-------------|------------------------------------------------------------|
| Clojure CLI tools     | Essential   | Run Clojure REPL for development and production            |
| Aliases for CLI tools | Recommended | Additional tools to enhance Clojure development experience |
| clj-kondo             | Recommended | Static analysis of code to find all those little bugs      |
| rlwrap                | Optional    | A simple read line for command history, only used by `clj` |

> #### Hint::Aliases provided by practicalli/clojure-deps-edn
> [practicalli/clojure-deps-edn](#clojure-cli-tools-common-aliases) provides a user wide configuration of over 30 aliases to support Clojure devlopment.  These aliases use meaningful names to avoid clashes with project specific aliases, ensuring that the user wide aliases remain available in all projects.


## Clojure CLI tools
A command line REPL provides the essential tool for Clojure development.  [Installing a Clojure aware editor](/clojure-editors/) is recommended when developing Clojure projects.

<!-- Operating System specific instructions -->
{% tabs linux="Linux", homebrew="Homebrew", windows="Windows" %}

<!-- Ubuntu install -->
{% content "linux" %}

Use the Linux script installer from [Clojure.org](https://clojure.org/guides/getting_started#_installation_on_linux)

```shell
curl -O https://download.clojure.org/install/linux-install-1.10.1.536.sh
chmod +x linux-install-1.10.1.536.sh
sudo ./linux-install-1.10.1.536.sh
```

The installation creates `/usr/local/bin/clojure`, `/usr/local/bin/clj` wrapper and `/usr/local/lib/clojure` directory.

<!-- Homebrew (MacOSX) install -->
{% content "homebrew" %}

Install the command line tools with brew from the clojure/tools tap:

```shell
brew install clojure/tools/clojure
```

Use [Homebrew on Linux or Windows with WSL](https://docs.brew.sh/Homebrew-on-Linux)


<!-- Windows install with scoop.sh -->
{% content "windows" %}
For Windows 10 use [Windows Subsystem for Linux and Windows Terminal are recommended](https://conan.is/blogging/clojure-on-windows.html) if you have administrative privileges and are happy to use a Unix system on the command line.

Alternatively install [scoop.sh](https://scoop.sh/), a command line installer for windows.  [Powershell 5](https://aka.ms/wmf5download) or greater is required. Follow the [scoop-clojure getting started guide](https://github.com/littleli/scoop-clojure/wiki/Getting-started), summarized here:

Open "Windows PowerShell" and enter the following commands to configure the shell:

```shell
iwr -useb get.scoop.sh | iex
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```
Then in the same PowerShell window, install the Clojure related tools using the following commands:
```shell
scoop bucket add extras
scoop bucket add java
scoop bucket add scoop-clojure https://github.com/littleli/scoop-clojure
scoop install git 7zip pshazz adoptopenjdk-lts-hotspot clojure leiningen clj-kondo vscode coreutils windows-terminal
```


{% endtabs %}
<!-- End of Operating System specific instructions -->

## Clojure CLI tools common aliases
Create a fork of the [practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdn }}) on GitHub

Clone that fork to `~/.clojure/` and instantly have access to dozens of tools for Clojure software development across all projects.

```shell
git clone git@github.com:your-fork/clojure-deps-edn.git ~/.clojure/
```

All tools are provided via libraries and are only installed on first use.

If you choose to use your own `~/.clojure/deps.edn` then add an alias for the clj-new tool and rebel readline as this is extensively used in this guide.


## clj-kondo static analyser / linter
[clj-kondo](https://github.com/borkdude/clj-kondo/blob/master/doc/install.md) performs static analysis on Clojure, ClojureScript and EDN, without the need of a running REPL. It informs you about potential errors while you are typing when used with [supported editors](https://github.com/borkdude/clj-kondo/blob/master/doc/editor-integration.md).

Follow the [clj-kondo install guide](https://github.com/borkdude/clj-kondo/blob/master/doc/install.md) for your operating system.

> #### Hint::clj-kondo provides a paring buddy
> [Configuring clj-kondo with your preferred editor](https://github.com/borkdude/clj-kondo/blob/master/doc/editor-integration.md) will greatly enhance the joy of coding in Clojure by keeping your code idiomatic and free from a wide range of syntax bugs.


## Optional: rlwrap readline
Install the `rlwrap` binary to support the `clj` wrapper, which launches a Clojure REPL with command history.

`rlwrap` is available with most Linux systems and install instructions should be discoverable by searching for rlwrap in a web browser.

> [rebel readline](/repl-driven-development/rebel-readline/) provides even more features in the command line REPL.
