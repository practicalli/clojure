# Creating Clojure projects
Creating Clojure projects save code as you are learning or developing applications.  Using a project is the quickest way to test development tools are configured correctly.

Creating projects using a template is the quickest way to get started, as the template will create the project structure and add libraries the project.  Practicalli recommends the Clojure CLI tools and `clj-new` to create projects.

> #### Hint::Install community tools`clj-new` and other aliases
> [Install practicalli/clojure-deps-edn](install/community-tools.html) to provide aliases for the community tools used in this guide

{% youtube %}
https://youtu.be/7muHVkxzZcE
{% endyoutube %}


## Create a project with `clj-new` and the app template
Open a terminal window and change to a suitable folder

```shell
cd projects/clojure
```

Create a new project using `clj-new` and the `app` template.  If you prefer, use your company name or GitHub/GitLab/Bitbucket account name instead of `practicalli`  and change `playground` to the name of the application.

```shell
clojure -M:project/new app practicalli/playground
```

> #### Hint::New Clojure Exec approach
> clj-new also supports Clojure exec and the -X flag, using keywords to specify the options for creating the project.  This produces exactly the same project as the command above.
>
```shell
clojure -X:project/new :template app :name practicalli/playground
```


## Running a REPL for the project
Change into the directory and test the project runs by starting a REPL with [rebel readline](/repl-driven-development/rebel-readline/)

```shell
cd playground && clojure -M:repl/rebel
```

A repl prompt should appear.

![Clojure REPL rebel readline](/images/clojure-repl-rebel-readline.png)

Type code expressions at the repl prompt and press RETURN to evaluate them.

```clojure
(+ 1 2 3 4 5)
```

> ####HINT::Try the project with your preferred editor
> Using a [Clojure aware editor](/clojure-editors/editor-user-guides/), open the playground project and run the REPL.  Then write code expressions in the editor and evaluate them to see the result instantly.


## Running the project
Run project with or without an alias:

```shell
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
`clj-new` has 3 templates that create `deps.edn` based projects

* `app` - a project that will run on the command line
* `lib` - a project that will be used as a library (added to other projects as a dependency)
* `template` - a project for creating your own custom templates.

`clj-new` can create projects from `deps.edn`, Leiningen and Boot templates. A wide range of templates have been created by the Clojure community which can be found by searching on Clojars.org:

* [clj-templates website](https://clj-templates.com/) - leiningen and boot templates
* [deps.edn projects](https://clojars.org/search?q=artifact-id:clj-template)
* [Leiningen projects](https://clojars.org/search?q=artifact-id:lein-template)
* [Boot projects](https://clojars.org/search?q=artifact-id:boot-template).

`clj-deps` does not change Leiningen or Boot templates into deps.edn projects.  If a `deps.edn` file is not part of the project it can be manually created.
