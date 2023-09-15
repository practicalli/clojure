# Install Clojure CLI

![Clojure CLI Logo](https://raw.githubusercontent.com/practicalli/graphic-design/live/logos/practicalli-clojure-cli-logo.png){align=right loading=lazy style="height:150px;width:150px"}

Install the Clojure CLI which provides the essential tools for Clojure development.

The Clojure CLI automatically downloads all library dependencies, including the Clojure Standard library. As Clojure itself is packages as a library (`.jar` Java ARchive), any version of Clojure can be used with a project.

[:fontawesome-solid-book-open: Practicalli Clojure CLI Config](#practicalli-clojure-cli-config) extends the Clojure CLI with a range of development tools as well as configuration for Clojure LSP and cljstyle code format tool.

=== "Linux"

    Use the Linux script installer from [Clojure.org - Getting Started](https://clojure.org/guides/getting_started#_installation_on_linux) to install or update to the latest stable release

    ```shell
    curl -L -O https://github.com/clojure/brew-install/releases/latest/download/linux-install.sh && \
    chmod +x linux-install.sh && \
    sudo ./linux-install.sh
    ```

    The installation creates `/usr/local/bin/clojure`, `/usr/local/bin/clj` wrapper and `/usr/local/lib/clojure` directory.

    ??? HINT "Use alternative location - unattended install"
        `--prefix` option specifies an alternative lolcation for the Clojure CLI install.

        When permissions are not available or for automating the install without password prompt, use a local user specific install, e.g.
        ```shell
        curl -L -O https://github.com/clojure/brew-install/releases/latest/download/linux-install.sh && \
        chmod +x linux-install.sh && \
        ./linux-install.sh --prefix $HOME/.local/
        ```
    
    ??? INFO "Include version number for specific release"
        Each Clojure CLI version is a number that represents the version of Clojure used and the build version of the Clojure CLI tool, e.g. `1.11.1.1413`.

        [Clojure CLI Releases page](https://clojure.org/releases/tools){target=_blank .md-button} 

        Include the version in the script name for repeatable environments, e.g. in Dockerfile configuration and Continuous Integraion workflows.
        ```shell title="Clojure CLI install specific version"
        curl -L -O https://github.com/clojure/brew-install/releases/1.11.1.1413/download/linux-install.sh && \
        chmod +x linux-install-1.11.1.1413.sh
        sudo ./linux-install-1.11.1.1413.sh
        ```

=== "Homebrew"

    Practically recommends setting `XDG_CONFIG_HOME` to the `.config` directory, to avoid creating another dot directory in the root of the user account.  Add the following to `~/.bashrc` for the bash shell or `~/.zshenv` for Zsh.
    ```
    export XDG_CONFIG_HOME="$HOME/.config"
    ```

    Use the Homebrew command with the [clojure/tools tap](https://github.com/clojure/homebrew-tools), as defined in the [Clojure.org Getting started guide](https://clojure.org/guides/getting_started#_installation_on_linux)

    ```bash
    brew install clojure/tools/clojure
    ```

    Use Homebrew to update an install of Clojure CLI to the latest release
    ```bash
    brew upgrade clojure/tools/clojure
    ```

    > [Homebrew on Linux or Windows with WSL](https://docs.brew.sh/Homebrew-on-Linux)

=== "Windows"

    For Windows 10 use [Windows Subsystem for Linux and Windows Terminal are recommended](https://conan.is/blogging/clojure-on-windows.html) if you have administrative privileges and are comfortable using a Unix system on the command line.

    Alternatively install [scoop.sh](https://scoop.sh/), a command line installer for windows.  [Powershell 5](https://aka.ms/wmf5download) or greater is required. Follow the [scoop-clojure getting started guide](https://github.com/littleli/scoop-clojure/wiki/Getting-started), summarized here:

    Open "Windows PowerShell" and enter the following commands to configure the shell:

    ```bash
    iwr -useb get.scoop.sh | iex
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
    ```
    Then in the same PowerShell window, install the Clojure related tools using the following commands:

    ```bash
    scoop bucket add extras
    scoop bucket add java
    scoop bucket add scoop-clojure https://github.com/littleli/scoop-clojure
    scoop install git 7zip pshazz temurin-lts-jdk clj-deps leiningen clj-kondo vscode coreutils windows-terminal
    ```

> Reference: [Clojure CLI Install - Clojure.org Getting Started](https://clojure.org/guides/install_clojure){target=_blank} - official guide

## Practicalli Clojure CLI Config

Add a wide range of community tools to extend the capabilities of Clojure CLI via the aliases contained within Practicalli Clojure CLI configuration.

Fork or clone [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](https://github.com/practicalli/clojure-cli-config){target=_blank} GitHub repository, first removing the `$XDG_CONFIG_HOME/clojure` and `$HOME/.clojure` directory if they exist.

!!! INFO "Practicalli recommends using FreeDesktop XDG configuration locations"
    Practically recommends setting `XDG_CONFIG_HOME` to the `.config` directory, to avoid creating another dot directory in the root of the user account.  

    Configure `~/.bashrc` for the bash shell 
    ```shell title="Bash .bashrc file"
    export XDG_CONFIG_HOME="$HOME/.config"
    ```

    Configure `~/.zshenv` for Zsh
    ```shell
    # Set XDG_CONFIG_HOME for clean management of configuration files
    export XDG_CONFIG_HOME="${XDG_CONFIG_HOME:=$HOME/.config}"
    export XDG_DATA_HOME="${XDG_DATA_HOME:=$HOME/.local/share}"
    export XDG_CACHE_HOME="${XDG_CACHE_HOME:=$HOME/.cache}"
    export ZDOTDIR="${ZDOTDIR:=$XDG_CONFIG_HOME/zsh}"
    ```

=== "Free Desktop XDG CONFIG"
    If `XDG_CONFIG_HOME` environment variable is set, clone the repository to `$XDG_CONFIG_HOME/clojure`

    Via SSH
    ```shell
    git clone git@github.com:practicalli/clojure-cli-config.git $XDG_CONFIG_HOME/clojure
    ```

    Via HTTPS:
    ```shell
    git clone https://github.com/practicalli/clojure-cli-config.git $XDG_CONFIG_HOME/clojure
    ```

=== "Classic Config"
    Clojure CLI will look for its configuration in `$HOME/.clojure` directory if `$XDG_CONFIG_HOME` and `CLJ_CONFIG` environment variables not set.
    Via SSH
    ```shell
    git clone git@github.com:practicalli/clojure-cli-config.git $HOME/.clojure

```

    Via HTTPS
    ```shell
    git clone https://github.com/practicalli/clojure-cli-config.git $HOME/.clojure
    ```

## Check Configuration

`clojure -Sdescribe` shows the version of Clojure CLI installed and configuration locations used.

```bash
clojure -Sdescribe
```

The output of the command includes the version of Clojure CLI in the `:version` key

```bash
{:version "1.11.1.1386"
 :config-files ["/usr/local/lib/clojure/deps.edn" "/home/practicalli/.config/clojure/deps.edn" ]
 :config-user "/home/practicalli/.config/clojure/deps.edn"
 :config-project "deps.edn"
 :install-dir "/usr/local/lib/clojure"
 :config-dir "/home/practicalli/.config/clojure"
 :cache-dir "/home/practicalli/.cache/clojure"
 :force false
 :repro false
 :main-aliases ""
 :repl-aliases ""}
```

> `clojure -Sversion` will shows the version of Clojure CLI being when the `clojure` command is used to run a REPL or other Clojure command.

## Optional rlwrap readline

The `rlwrap` binary is a basic readline tool that provides a history of commands entered into a terminal UI when running a Clojure REPL with the `clj` wrapper script.

Pressing the ++arrow-up++ and ++arrow-down++ keys will scroll through the code previously entered in the REPL.

`rlwrap` is available with most Linux systems. Look for  install instructions by searching for rlwrap in a web browser or build from source from the [rlwrap GitHub repository](https://github.com/hanslub42/rlwrap).

!!! HINT "Use Rebel Readline for a rich terminal UI experience"
    [rebel readline](/clojure/clojure-cli/repl/) provides a auto-completion, documentation, signature help and multi-line editing all within a terminal UI, providing a much richer experience than the `clj` wrapper and `rlwrap`.

    Rebel Readline is part of the [Practicalli Clojure CLI config](#practicalli-clojure-cli-config).
