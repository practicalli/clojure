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

<!-- Windows install -->
{% content "windows" %}

An early release version of [clj on Windows is available](https://github.com/clojure/tools.deps.alpha/wiki/clj-on-Windows).


{% endtabs %}
<!-- End of Operating System specific instructions -->


## Install clj-new

Save the [practicalli/deps-edn-examples deps.edn file](https://github.com/practicalli/clojure-deps-edn/blob/master/deps.edn) to `~/.clojure/deps.edn`

Or edit `~/.clojure/deps.edn` and add an alias called new that runs the `clj-new` project.

```clojure
  :new
  {:extra-deps {seancorfield/clj-new {:mvn/version "0.8.6"}}
   :main-opts  ["-m" "clj-new.create"]}
```
