# Creating projects from templates

Creating projects using a template is a quick way to get started or create a common .  A template will create the project structure, add libraries and even include example code.

deps-new provides Clojure CLI specific templates and [:fontawesome-solid-book-open: Practicalli Project Templates]() provides production level templates with a REPL Reloaded workflow

??? INFO "deps-new built-in templates"
    The deps-new built-in templates for creating a project
    - `app` - simple project for a running application (uberjar)
    - `lib` - simple project for a library (jar)
    - `scratch` - a `deps.edn` file and `src/scratch.clj`
    - `template` - project for defining a custom template

??? INFO "Practicalli Project Templates"
    [:fontawesome-solid-book-open: Practicalli Project Templates](practicalli/) provide production level templates that include Practicalli [REPL Reloaded Workflow](/clojure/clojure-cli/repl-reloaded/) tools, Docker & Compose configurations, Makefile tasks for a consistent command line UI and GitHub workflows to manage quality of code and configuration.

    - `practicalli/minimal` - essential tools, libraries and example code
    - `practicalli/application` - general Clojure production level project template 
    - `practicalli/service` - production level web services template with component management, Http-kit, Reitit and Swagger
    - `pracicalli/landing-page` - simple clojurescript website with bulma.io CSS and Figheel-main build tool. 


??? INFO "clj-new provides Leiningen format templates"
    The Practicalli `:project/new` alias provides the [seancorfield/clj-new](https://github.com/seancorfield/clj-new) tool which can use a wide range of templates (although some may only create Leinginen projects).  This project has been archived and deps-new is the recommended approach.

    [Migrate to a Clojure CLI project](/clojure/clojure-cli/projects/migrate-project/) if the template does not include a `deps.edn` file

    [:fontawesome-brands-youtube: Clojure Projects with the REPL video](https://www.youtube.com/embed/7muHVkxzZcE) demonstrates shows how to use clj-new

    `clj-new` can create projects from `deps.edn` and Leiningen templates. A wide range of templates have been created by the Clojure community which can be found by searching on Clojars.org:

    - [clj-templates website](https://clj-templates.com/) - leiningen and boot templates
    - [deps.edn projects](https://clojars.org/search?q=artifact-id:clj-template)
    - [Leiningen projects](https://clojars.org/search?q=artifact-id:lein-template)


## Add deps-new

Add deps-new via a Clojure CLI user alias or [:globe_with_meridians: install as a tool](https://github.com/seancorfield/deps-new/blob/develop/src/org/corfield/new.clj).

=== ":fontawesome-solid-book-open: Practicalli Clojure CLI Config"
    `:project/create` alias provided by [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) runs the [:fontawesome-brands-github: seancorfield/deps-new](https://github.com/seancorfield/deps-new) tool to create Clojure CLI specific projects. 

    `:project/create` alias includes the [:fontawesome-solid-book-open: Practicall Project templates ](practicalli/), extending the range of available templates

=== "Alias Definitions"
    Create the following alias definitions in the Clojure CLI user configuration, e.g. `$XDG_CONFIG_HOME/clojure/deps.edn` or `$HOME/.clojure/deps.edn`
    ```clojure title="Clojure CLI user deps.edn configuration - :aliases {}"
    :project/create
    {:replace-deps {io.github.seancorfield/deps-new
                    {:git/tag "v0.5.2" :git/sha "253f32a"}
                    io.github.practicalli/project-templates
                    {:git/tag "2023-08-02" :git/sha "eaa11fa"}}
     :exec-fn      org.corfield.new/create
     :exec-args    {:template practicalli/minimal
                    :name practicalli/playground}}
    ```


## Create a project

Open a terminal window and change to a suitable folder and create a project.  

Create a project using the `:project/create` alias.

The `practicalli/minimal` template and `practicalli/playground` name are used if `:template` and `:name` arguments are not specified.

```bash
clojure -T:project/create
```

> The `-T` execution option runs the tool with Clojure.exec which uses keywords to specify the options for creating the project.


Use the form `domain/app-or-lib-name` to specify a project name, typically with a company name or Git Service account name as the `domain`.

`:template` can be one of the deps-new built-in templates (`app`, `lib`) or one of the [:fontawesome-solid-book-open: Practicalli Project Templates](practicalli/).

Create a project using the `practicalli/application` template and random-function name. 

```bash
clojure -T:project/create :template practicalli/application :name practicalli/random-function
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
