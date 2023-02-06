# Creating Clojure projects

Creating Clojure projects save code as you are learning or developing applications.  Using a project is the quickest way to test development tools are configured correctly.

Creating projects using a template is the quickest way to get started, as the template will create the project structure and add libraries the project.  Practicalli recommends the Clojure CLI tools and `clj-new` to create projects.

??? HINT "Clojure Aliases for creating projects from templates"
    [Practicalli Clojure CLI Config](clojure/clojure-cli/practicalli-config.md) to provide aliases `:project/create` for [seancorfield/deps-new](https://github.com/seancorfield/deps-new) project and `:project/new` for [seancorfield/clj-new](https://github.com/seancorfield/clj-new)

    ```clojure title="deps.edn"
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

<p style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/7muHVkxzZcE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>


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

Change into the directory and test the project runs by starting a REPL with [rebel readline](/repl-driven-development/rebel-readline/)

```bash
cd playground && clojure -M:repl/rebel
```

A repl prompt should appear.

![Clojure REPL rebel readline](/images/clojure-repl-rebel-readline.png)

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

`clj-new` can create projects from `deps.edn`, Leiningen and Boot templates. A wide range of templates have been created by the Clojure community which can be found by searching on Clojars.org:

* [clj-templates website](https://clj-templates.com/) - leiningen and boot templates
* [deps.edn projects](https://clojars.org/search?q=artifact-id:clj-template)
* [Leiningen projects](https://clojars.org/search?q=artifact-id:lein-template)
* [Boot projects](https://clojars.org/search?q=artifact-id:boot-template).

`clj-deps` does not change Leiningen or Boot templates into deps.edn projects.

[Migrate to a Clojure CLI project](migrate-project.md) if the template does not include a `deps.edn` file
