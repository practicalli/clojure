# Leiningen build automation tool

Leiningen will help you create, build and deploy your Clojure projects.

!!! HINT "Practicalli recommends using Clojure CLI"
    For new project, [Clojure CLI](/clojure/clojure-cli/) is recommended as it requires fewer resources and enables a more customisable approach to configuring project and running tools to support Clojure development.


## Install Leiningen

Install the Leiningen tool using the specific instructions for your Operating System

<!-- Operating System specific instructions -->
{% tabs first="Linux", second="Homebrew", third="GitBash", forth="Chocolatey", fifth="Windows Manual" %}


=== "Linux"
    [Download the lein script](https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein) to your local `bin` directory.  Then make the `lein` script executable and run `lein` to download the full version.

    ```shell
    mkdir ~/bin
    curl https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein > ~/bin/lein
    chmod u+x ~/bin/lein
    lein
    ```
    If the command `lein` is not found, run `source ~/.bashrc` to ensure your `bin` directory is on the path.


=== "Homebrew"
    If you have [Homebrew](https://brew.sh/) installed, run the following command in a terminal window.

    ```shell
    brew install leiningen
    ```

=== "GitBash"
    [GitBash](https://gitforwindows.org/) allows you to use the Linux `lein` script, which may have less issues when installing.

    Create a directory called `C:\Users\your-user-name\AppData\Local\Programs\Leiningen`

    Download the `lein` file and save it to the above directory

    Open `Environment variables for your account` and add the directory to your path

    Open a command window and run the command: `lein`

    The full version of Leiningen will be downloaded and Leiningen is ready to use.


=== "Chocolatey"

    If you have [Chocolatey](https://chocolatey.org/) installed, add the [Leiningen package](https://chocolatey.org/packages/Lein) by running the following command in a terminal window.

    ```shell
    choco install lein
    ```

=== "Windows"
    Create a directory called `C:\Users\your-user-name\AppData\Local\Programs\Leiningen`

    Download the `lein.bat` file and save it to the above directory

    Open `Environment variables for your account` and add the directory to your path

    Open a command window and run the command: `lein.bat`

    The full version of Leiningen will be downloaded and Leiningen is ready to use.


## Run Leiningen

Check Leiningen is working by running `lein` command in a terminal

```shell
lein help
```

If a list of Leiningen commands is shown then it is working correctly.

<!-- ![Leiningen help](/images/leiningen-help.png) -->


## Create project

Create a new Clojure project with Leiningen using the `new` task

```shell
lein new template-name domain/project-name
```

Built-in templates include `app` and `lib`

!!! EXAMPLE "Create a new project called playground"
    Open a terminal window and in a directory where you usually keep your projects, run the following command
    ```shell
    lein new app practicalli/playground
    ```
    A new directory will be created called `playground` with a `src/practicalli/playground.clj`


## Unit Testing

Leiningen automatically includes the `test` directory when running, so no additional configuration is required if all tests reside inside the `test` directory.

Run all the tests saved to file:

```shell
lein test
```

Run just the unit tests in a specific namepsace.

```shell
lein test :only domain.namespace-test
```

## Test Plugins

The following Leiningen plugins watch the file system and will run tests when a file change is detected in the project files.

* [lein-test-refresh](https://github.com/jakemcc/lein-test-refresh)
* [lein-auto](https://github.com/weavejester/lein-auto)


## Configure test paths

`:test-paths` added as a top level key to the `defproject` configuration in the `project.clj` file will configure specific paths for tests

For example, if the tests are defined under `project-name/clj/tests` then the project.clj file would look as follows:

```clojure
(defproject my-project "0.5.0-SNAPSHOT"
  :description "A project for doing things."
  :license "Creative Commons Zero"
  :url "http://github.com/practicalli/my-project"

  :dependencies [[org.clojure/clojure "1.10.1"]]
  :test-paths   ["clj/test" "src/test/clojure"]
  :plugins      [[lein-auto "0.1.3"]])
```

> `:source-paths` can also be used to define the location of the source code files in the same manner.
