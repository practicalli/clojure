# Example projects

* [TDD Kata: Recent Song-list](/simple-projects/tdd-kata/recent-song-list.md) - simple tests examples
* [Codewars: Rock Paper Scissors (lizard spock) solution](https://github.com/practicalli/codewars-guides/tree/develop/rock-paper-scissors) - `and` examples
* [practicalli/numbers-to-words](https://github.com/practicalli/numbers-to-words) - overly verbose example, ripe for refactor
* [practicalli/codewars-guides](https://github.com/practicalli/codewars-guides) - deps.edn projects
* [practicalli/exercism-clojure-guides](https://github.com/practicalli/exercism-clojure-guides) - Leiningen projects


## Sean Corfield - user manager

[User manager](https://github.com/seancorfield/usermanager-example) has unit tests that also include an embedded database.  Tests can run with the Cognitect Labs test runner.

`:test` alias includes the test path and a dependency for the H2 database

Cognitect Labs test runner included in the project `deps.edn` file as `:runner`

`clojure -M:test:runner` will run the Cognitect Labs runner and include the dependency to run the in-memory database used for the tests.


### Using koacha with Sean Corfield user manager
Adding a `test.edn` file is not sufficient for testing this project with lambdaisland/kaocha, as the H2 dependency is also needed.

Create a `bin/koacha` script and add the extra alias

```bash
#!/usr/bin/env bash
clojure -M:test:test-runner-kaocha "$@"
```

<!-- This is failing when using the profiler cli argument, try with profiler added to the test.edn file - same results, one failing test. -->
<!-- Perhaps this is a time sensitive test and profiler trips it up. -->


## Status Monitor
[Status monitor](https://github.com/jr0cket/webapp-status-monitor) is a Leiningen project.

Include a `:kaocha` profile in the `project.clj` file, adding the koacha dependency.  The `:kaocha` alias sets the main namespace and uses the kaocha profile.

```clojure
  {:dev    {:dependencies [[javax.servlet/servlet-api "2.5"]
                           [ring/ring-mock "0.3.2"]]}
   :kaocha {:dependencies [[lambdaisland/kaocha "1.0.632"]]}}
  :aliases {"kaocha" ["with-profile" "+kaocha" "run" "-m" "kaocha.runner"]}
```

`lein kaocha` will run all the tests

<!-- ### Adding deps.edn to status monitor project -->
<!-- Need to add a -main function to the project for deps.edn as the project was using Leiningen ring plugin to run -->
