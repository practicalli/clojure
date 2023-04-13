# Configure Unit Testing for deps.edn projects

[`clojure.test` namespace](https://clojure.github.io/clojure/clojure.test-api.html) is part of the Clojure standard library, so the Clojure library is the only dependency required in the project.

```clojure
{:deps {org.clojure/clojure {:mvn/version "1.10.3"}}}
```

Unit tests code should reside under the `test` directory of a project.  The `test` directory should not be part of the main classpath, otherwise test classes would be included in the project packaging and deployed to production.

Use an alias to add the `test` directory, either from a user level configuration or the Clojure project `deps.edn` configuration file.

{% tabs practicalli="practicalli/clojure-deps-edn", deps="Manual deps.edn projects" %}

{% content "practicalli" %}

## Adding test path

[:fontawesome-solid-book-open:  Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) user-level configuration contains several aliases for Clojure and ClojureScript test runners, each alias includes the `test` directory as an `:extra-path`.

`:env/test` alias is also provided, which simply adds the `test` directory to the class path. The `:env/test` alias is useful in concert with other aliases or for editors that have their own built in test runners (e.g. CIDER).

### Using kaocha test runner

[lambdaisland/kaocha](https://github.com/lambdaisland/kaocha) is a fast and comprehensive test runner for Clojure and ClojureScript.

`:test/run` alias runs all tests from the source code files, called with the `clojure` command in the root of the Clojure project.  The alias includes `test` as an extra path and calls the Kaocha test runner.

```bash
clojure -X:test/run
```

Kaocha can also watch for changes saved to file and re-run the tests.

```bash
clojure -X:test/watch
```

Both kaocha aliases are configured to stop if a test fails.  When re-running kaocha, only failed tests and tests that have changed are run (including tests where the code they are testing has changed).



## Alias to include the test directory

Add the following aliases to the Clojure CLI tools user wide configuration, (e.g. `~/.clojure/deps.edn`), or to the project `deps.edn` file.

To use a test runners with a `deps.edn` projects, the `test` directory should be on the classpath.


practicalli/clojure-deps-edn defines an environment alias to include the test path.

```clojure
:aliases
{
  :env/test
  {:extra-paths ["test"]}
}
```


## Cognitect labs Clojure test runner

`:test/cognitect` is a simple to use test runner for Clojure projects.

```clojure
clojure -X:test/cognitect
```

## Kaocha unit test and clojure spec runner

`:test/kaocha` alias unit test runner that also supports Clojure Spec functional tests.  the kaocha test runner on the current project.  Add a `test.edn` file to configure which tests are run by kaocha.
```bash
clojure -X:test/kaocha
```


## References

* [Practicalli Spacemacs - Unit testing with Cider and Kaocha in Emacs](https://practical.li/spacemacs/testing/unit-testing)
* [lambdaisland/kaocha](/testing/test-runners/kaocha-test-runner.md) is a test runner that supports Clojure CLI, Leiningen and Boot project configuration.
* [Leiningen project configuration for unit testing](/alternative-tools/leiningen/testing/configure-project.md)
