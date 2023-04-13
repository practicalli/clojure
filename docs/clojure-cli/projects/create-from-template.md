# Creating Clojure projects

Creating projects using a template is a quick way to get started.  A template will create the project structure, add libraries and even include example code.

deps-new provides Clojure CLI specific templates. clj-new uses Leinginen templates which may required additional configuration to work with Clojure CLI.

The deps-new built-in templates for creating a project

* `app` - simple project for a running application (uberjar)
* `lib` - simple project for a library (jar)
* `scratch` - a `deps.edn` file and `src/scratch.clj`
* `template` - project for defining a custom template

!!! INFO "Practicalli Project Templates"
    Additional templates are under construction at [:fontawesome-brands-github: practicalli/project-templates](https://github.com/practicalli/project-templates)

    * `practicalli/service` - production level project template with Integrant, Http-kit, Reitit, Mulog, Docker, Make, MegaLinter, etc.
    * `practicalli/application` - production level project template with Mulog, Docker, Make, MegaLinter, etc.

    Practicalli Project templates will be added to the `:project/create` alias once they are ready


## Add project tools

Add one or both of the tools as aliases to the Clojure CLI user configuration

=== ":fontawesome-solid-book-open: Practicalli Clojure CLI Config"
    [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) provides the following aliases

    `:project/create` for [seancorfield/deps-new](https://github.com/seancorfield/deps-new), to create Clojure CLI specific projects and a simple way to define custom templates

    `:project/new` for [seancorfield/clj-new](https://github.com/seancorfield/clj-new) which can use a wide range of templates (although some may only create Leinginen projects)

=== "Alias Definitions"
    Create the following alias definitions in the Clojure CLI user configuration, e.g. `$XDG_CONFIG_HOME/clojure/deps.edn` or `$HOME/.clojure/deps.edn`
    ```clojure title="Clojure CLI user deps.edn configuration - :aliases {}"
    :project/create
    {:replace-deps {io.github.seancorfield/deps-new {:git/tag "v0.4.13" :git/sha "879c4eb"}}
     :exec-fn      org.corfield.new/create
     :exec-args    {:template app :name practicalli/playground}}

    :project/new
    {:replace-deps {com.github.seancorfield/clj-new {:mvn/version "1.2.399"}}
     :exec-fn      clj-new/create
     :exec-args    {:template app :name practicalli/playground}
     :main-opts    ["-m" "clj-new.create"]}
    ```
    <!-- TODO: add practicalli/project-templated dependency -->

<p style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/7muHVkxzZcE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>


## Create a project

Use deps-new or clj-new to create a project, specifying a template and a name for the project.

> Practicalli recommends deps-new unless there is a specific template only available via clj-new


=== "deps-new"
    Open a terminal window and change to a suitable folder and create a project.  Use the `app` template to create a runnable application or `lib` template if writing a library to be used by other applications.  Both can run code in the REPL during development.

    The name of the project is of the form `domain/app-lib-name`. Use a company name or Git Service account name as the `domain`.
    ```bash
    clojure -T:project/create :template app :name practicalli/playground
    ```
    The `-T` execution option runs the tool with Clojure.exec which uses keywords to specify the options for creating the project.


=== "clj-new"
    Open a terminal window and change to a suitable folder and create a project.  Use the `app` template to create a runnable application or `lib` template if writing a library to be used by other applications.  Both can run code in the REPL during development.

    The name of the project is of the form `domain/app-lib-name`. Use a company name or Git Service account name as the `domain`.

    === "Clojure.exec"
        The `-X` flag runs the tool with Clojure.exec which uses keywords to specify the options for creating the project.
        ```bash
        clojure -X:project/new :template app :name practicalli/playground
        ```

    === "Clojure.main"
        The `-M` execution option calls Clojure.main which takes string options of the form:

        `clojure -M:project/new template-name domain/app-lib-name`
        ```bash
        clojure -M:project/new app practicalli/playground
        ```


## Run Project in a REPL

Change into the directory and test the project runs by starting a REPL with [Terminal REPL](/clojure/clojure-cli/repl/)

```bash
cd playground && clojure -M:repl/rebel
```

A repl prompt should appear.

<!-- ![Clojure REPL rebel readline](/images/clojure-repl-rebel-readline.png) -->

Type code expressions at the repl prompt and press RETURN to evaluate them.

```clojure
(+ 1 2 3 4 5)
```

??? HINT "Try the project with your preferred editor"
    Using a [Clojure aware editor](/clojure/clojure-editors/editor-user-guides/), open the playground project and run the REPL.  Then write code expressions in the editor and evaluate them to see the result instantly.


## Running the project

Run project with or without an alias:

```bash
clojure -M:alias -m domain.app-name
clojure -M -m domain.app-name
```

In the project `deps.edn` file it can be useful to define an alias to run the project, specifying the main namespace, the function to run and optionally any default arguments that are passed to that function.

```clojure
:project/run
{:ns-default domain.main-namespace
 :exec-fn -main
 :exec-args {:port 8888}}
```
Then the project can be run using `clojure -X:project/run` and arguments can optionally be included in this command line, to complement or replace any default arguments in `exec-args`.


## Other templates

`deps-new` and `clj-new` have 3 templates that create `deps.edn` based projects

* `app` - a project that will run on the command line
* `lib` - a project that will be used as a library (added to other projects as a dependency)
* `template` - a project for creating your own custom templates.

`clj-new` can create projects from `deps.edn` and Leiningen templates. A wide range of templates have been created by the Clojure community which can be found by searching on Clojars.org:

* [clj-templates website](https://clj-templates.com/) - leiningen and boot templates
* [deps.edn projects](https://clojars.org/search?q=artifact-id:clj-template)
* [Leiningen projects](https://clojars.org/search?q=artifact-id:lein-template)

`clj-new` does not change Leiningen or Boot templates into deps.edn projects.

[Migrate to a Clojure CLI project](migrate-project.md) if the template does not include a `deps.edn` file
