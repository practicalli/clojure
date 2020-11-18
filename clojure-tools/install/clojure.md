# Install Clojure
Establish an effective Clojure development environment by installing the following:

| Tools                                                  | Required    | Purpose                                                    |
|--------------------------------------------------------|-------------|------------------------------------------------------------|
| [Clojure CLI tools](#clojure-cli-tools-common-aliases) | Essential   | Run Clojure REPL for development and production            |
| [Community tools](community-tools.md)                  | Recommended | Additional tools to enhance Clojure development experience |
| [Clojure aware editor](/clojure-editors/)              | Recommended | Complete Clojure development experience                    |
| [Code analysis (clj-kondo)](code-analysis.md)          | Recommended | Static analysis of code to find all those little bugs      |
| rlwrap                                                 | Optional    | A simple read line for command history, only used by `clj` |

> #### Hint::Aliases provided by practicalli/clojure-deps-edn
> [practicalli/clojure-deps-edn](#clojure-cli-tools-common-aliases) provides a user wide configuration of over 30 aliases to support Clojure devlopment.  These aliases use meaningful names to avoid clashes with project specific aliases, ensuring that the user wide aliases remain available in all projects.


## Clojure CLI tools
A command line REPL provides the essential tool for Clojure development.  [Installing a Clojure aware editor](/clojure-editors/) is recommended when developing Clojure projects.

<!-- Operating System specific instructions -->
{% tabs linux="Linux", homebrew="Homebrew", windows="Windows" %}

<!-- Ubuntu install -->
{% content "linux" %}

Use the Linux script installer from [Clojure.org - Getting Started](https://clojure.org/guides/getting_started#_installation_on_linux)

The installation creates `/usr/local/bin/clojure`, `/usr/local/bin/clj` wrapper and `/usr/local/lib/clojure` directory.

<!-- Homebrew (MacOSX) install -->
{% content "homebrew" %}

Use the Homebrew command with the [clojure/tools tap](https://github.com/clojure/homebrew-tools), as defined in the [Clojure.org Getting started guide](https://clojure.org/guides/getting_started#_installation_on_linux)

```shell
brew install clojure/tools/clojure
```

> [Homebrew on Linux or Windows with WSL](https://docs.brew.sh/Homebrew-on-Linux)


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


## Optional: rlwrap readline
Install the `rlwrap` binary to support the `clj` wrapper, which launches a Clojure REPL with command history.

`rlwrap` is available with most Linux systems and install instructions should be discoverable by searching for rlwrap in a web browser.

> [rebel readline](/repl-driven-development/rebel-readline/) provides even more features in the command line REPL.
