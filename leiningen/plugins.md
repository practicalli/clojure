# Common Leiningen Plugins

To do more with the Leiningen build automation tool you can install a wide range of [plugins](https://github.com/technomancy/leiningen/wiki/Plugins)

Some interesting plugins to look at include:

* [lein-ancient](https://github.com/xsc/lein-ancient) - check your project for outdated dependencies
* [lein-annotations](https://github.com/bbatsov/lein-annotations) - display TODO's and other notes added to your code
* [lein-auto](https://github.com/weavejester/lein-auto) - automatically runs a task on file system change
* [lein-checkall](https://github.com/itang/lein-checkall) - runs lint & other code checks
* [lein-heroku-deploy](https://github.com/maxprokopiev/lein-heroku-deploy) - use maintenance mode whilst deploying to [Heroku](https://heroku.com)


## Alembic

Alembic is an easy way to reload your project in the REPL, useful when you need to add a new dependency.  This saves time stopping and starting a REPL and avoids loosing any REPL state (?)

Reload your project.clj with the following expressions in the REPL

```clojure
(use 'alembic.still)
(load-project)
```
Use Alembic to load a library without adding it to your project.clj, if you just want to try a library. In this example wed add the cheshire library by running these expressions in the REPL


```clojure
(use 'alembic.still)
(distill '[cheshire "5.5.0"])
```

### Add Alembic to your Leiningen configuration

Edit `~/.lein/profiles.clj` and add Alembic to the `:repl` `:dependencies`

```
{:repl {:dependencies [[alembic "0.3.2"]]}}
```


## Lein Ancient

Ancient tells you which project dependencies have newer versions and will update them to the latest.  This saves you manually searching for each dependency in [Clojars)[https://clojars.org/] and finding the latest version.

`lein ancient` will produce a report similar to:

[org.webjars/font-awesome "4.6.2"] is available but we use "4.6.1"
[org.webjars.bower/tether "1.3.2"] is available but we use "1.3.1"
[org.clojure/tools.cli "0.3.5"] is available but we use "0.3.4"
[clj-http "3.0.1"] is available but we use "2.1.0"
[lein-figwheel "0.5.3-1"] is available but we use "0.5.2"


> #### Hint::Test dependency updates
> Extensively test dependency changing and check the logs for any messages about conficts of functions and namespaces.

### Add Lein Ancient to every project

Edit `~/.lein/profiles.clj` and include the following plugin in the `:user` `:plugins` configuration

{:user {:plugins [[lein-ancient "0.6.10"]]}}


## Eastwood

Eastwod is a linter that will help you maintain code quality and ensure you are following Clojure style rules

`lein eastwood {:linters [:all]}` produces a list of violations found.

An Eastwood report looks similar to:

```
== Eastwood 0.2.3 Clojure 1.8.0 JVM 1.8.0_77
Directories scanned for source files:
  env/dev/clj test/clj src/clj src/cljc test
Entering directory `/Users/kevingreene/programming/daily-cider'
src/cljc/daily_cider/validation.cljc:1:1: non-clojure-file: Non-Clojure file 'src/cljc/daily_cider/validation.cljc'.  It will not be linted.
test/cljs/daily_cider/core_test.cljs:1:1: non-clojure-file: Non-Clojure file 'test/cljs/daily_cider/core_test.cljs'.  It will not be linted.
test/cljs/daily_cider/doo_runner.cljs:1:1: non-clojure-file: Non-Clojure file 'test/cljs/daily_cider/doo_runner.cljs'.  It will not be linted.
== Linting daily-cider.dev-middleware ==
== Linting daily-cider.env ==
== Linting daily-cider.config ==
== Linting daily-cider.layout ==
src/clj/daily_cider/layout.clj:10:1: non-dynamic-earmuffs: #'daily-cider.layout/*app-context* should be marked dynamic
== Linting daily-cider.middleware ==
== Linting daily-cider.routes.home ==
src/clj/daily_cider/routes/home.clj:1:1: unused-fn-args: Function arg request__16360__auto__ never used
src/clj/daily_cider/routes/home.clj:1:1: unused-fn-args: Function arg request__16360__auto__ never used
== Linting daily-cider.processor ==
src/clj/daily_cider/processor.clj:1:1: unused-namespaces: Namespace clojure.java.shell is never used in daily-cider.processor
src/clj/daily_cider/processor.clj:1:1: unused-namespaces: Namespace luminus.logger is never used in daily-cider.processor
src/clj/daily_cider/processor.clj:1:1: unused-namespaces: Namespace clojure.java.io is never used in daily-cider.processor
== Linting daily-cider.routes.cider ==
src/clj/daily_cider/routes/cider.clj:1:1: unused-namespaces: Namespace clojure.java.io is never used in daily-cider.routes.cider
src/clj/daily_cider/routes/cider.clj:1:1: unused-fn-args: Function arg request__16360__auto__ never used
src/clj/daily_cider/routes/cider.clj:1:1: unused-fn-args: Function arg request__16360__auto__ never used
== Linting daily-cider.handler ==
== Linting daily-cider.figwheel ==
== Linting daily-cider.core ==
src/clj/daily_cider/core.clj:1:1: unused-namespaces: Namespace daily-cider.processor is never used in daily-cider.core
== Linting user ==
env/dev/clj/user.clj:1:1: unused-namespaces: Namespace daily-cider.figwheel is never used in user
== Linting daily-cider.test.handler ==
== Linting daily-cider.test.processor ==
test/daily_cider/test/processor.clj:1:1: unused-namespaces: Namespace clojure.string is never used in daily-cider.test.processor
== Warnings: 15 (not including reflection warnings)  Exceptions thrown: 0
Subprocess failed

```

### Add Eastwood to your Leiningen configuration

Edit `~/.lein/profiles.clj` and add Eastwood to `:user` `:plugins`

{:user {:plugins [[jonase/eastwood "0.2.3"]]}}
