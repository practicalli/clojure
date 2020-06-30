# Example projects

> #### TODO::work in progress, sorry
> Very much a work in progress section, published to help with the live broadcast on 27th June 2020

## Kata - recent song list
https://github.com/practicalli/kata-recent-song-list


## numbers-to-words
https://github.com/jr0cket/numbers-to-words
Leiningen project - runs tests using Clojure CLI tool


> Note: Even if the project is managed by Leiningen, if the tests are organised in a standard way, then it seems possible to run the tests using Clojure CLI.  So running the command `kaocha` in the Leiningen project will run the tests okay.  However, if you are using Leiningen to run the tests, you do need to included the dependencies in project.clj.


## codewars challenges
rock paper scissors
https://github.com/practicalli/codewars-guides/tree/develop/rock-paper-scissors

deps.edn projects



## Sean Corfield - user manager
https://github.com/seancorfield/usermanager-example
User manager has some tests we can run with the test runner.

`:test` alias includes the test path and a dependency for the h2database

cognitect labs test runner included in the project deps.edn file as `:runner`

`clojure -A:test:runner` will run the Cogitect Labs runner and include the dependecy to run the in-menory database used for the tests.


### Using koacha
just adding a test.edn is not sufficient for this project, as the h2dependency is also needed.

Create a bin/koacha script and add the extra alias

```shelll
#!/usr/bin/env bash
clojure -A:test:test-runner-kaocha "$@"
```

This is failing when using the profiler cli argument, try with profiler added to the test.edn file - same results, one failing test.
Perhaps this is a time sensitive test and profiler trips it up.


## status monitor
https://github.com/jr0cket/webapp-status-monitor

Status monitor is a Leiningen project. Include a :kaocha profile in the project.clj file, adding the koacha dependency.  a :kaocha alias sets the main namespace and uses the kaocha profile.

```clojure
  {:dev    {:dependencies [[javax.servlet/servlet-api "2.5"]
                           [ring/ring-mock "0.3.2"]]}
   :kaocha {:dependencies [[lambdaisland/kaocha "1.0.632"]]}}
  :aliases {"kaocha" ["with-profile" "+kaocha" "run" "-m" "kaocha.runner"]}
```

`lein kaocha` will run all the tests

### Adding deps.edn to status monitor project

Need to add a -main function to the project for deps.edn as the project was using Leiningen ring plugin to run


## Exercism
Leiningen projects
https://github.com/practicalli/exercism-clojure-guides
