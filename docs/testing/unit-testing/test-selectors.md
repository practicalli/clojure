# Test Selectors
As a project grows in scope its important that unit tests are quick to run.  Test that take a noticeable time to run diminish the motivation to run tests frequently.

Dividing tests into categories means selective tests can be run, continuing to provide fast feedback.  Longer running tests or very large test suites can be run less often without loosing quality in the feedback from tests.

Test selectors can be included, so only that category of tests run.  Or exclude test selectors so all tests except that category runs.

> #### Hint::lambdaisland/kaocha focus and skipping
> kaocha can be used to [group tests into categories](https://cljdoc.org/d/lambdaisland/kaocha/1.0.700/doc/3-configuration#test-suites) in the `tests.edn` configuration, making it easy to [focus or exclude different types of tests](https://cljdoc.org/d/lambdaisland/kaocha/CURRENT/doc/6-focusing-and-skipping) (e.g. `:unit` and `:spec`)

## Defining test catagories with metadata
Add metadata to `deftest` functions to provide categories of tests

```clojure
(deftest ^:integration register-customer
  (is ,,,))
```

Example from Banking on Clojure

```clojure
(deftest ^:database new-customer-test
  (testing "New customer generative testing")
  (is (spec/valid?
        :customer/id
        (:customer/id (SUT/new-customer
                        (spec-gen/generate (spec/gen :customer/unregistered)))))))
```


## Running selective tests
Start a test running by specifying test selectors to include and/or exclude.

{% tabs kaocha="kaocha", spacemacs="Spacemacs", cider="CIDER", cognitect="Cognitect Labs"  %}

{% content "kaocha" %}
kaocha supports meta data on `deftest` expressions and has its own metadata tag for skipping tests, `^:koacha/skip`

Examples of tests with and without test selectors

```clojure
(deftest simple-test
  (is (= 1 1)))

(deftest ^:integration system-update-test
  (is (spec/valid? :system/update (long-running-function))))

(deftest ^:kaocha/skip under-development-test
  (is (= 3 21/7)))
```

Tests with test selector metadata can be skipped using a `tests.edn` configuration

```clojure
#kaocha/v1
{:tests [{:kaocha.filter/skip-meta [:integration]}]}
```

Running kaocha will only run the `simple-test`, skipping the other two tests.

Specifying `--skip-meta` on the command line gives the same results

```bash
bin/kaocha --skip-meta :metadata-name
```


{% content "spacemacs" %}
Running tests with the universal argument will prompt for test selector filters and only Run those tests that match the selector inclusions/exclusions.

`SPC u , t a` runs all tests, prompting for tests selector names to include (space separated)

![Spacemacs Clojure Cider Test Runner test selector prompt - include](/images/spacemacs-clojure-test-selectors-prompt.png)

Then prompting for the test selectors to exclude.  A warning displays if CIDER does not find the test selector name.

![Spacemacs Clojure Cider Test Runner test selector prompt - include](/images/spacemacs-clojure-test-selectors-integration-not-found.png)


{% content "cider" %}
Invoke the CIDER test runner commands with the universal argument and CIDER will prompt for test selector filters, running only those tests that match the selector inclusions/exclusions.

`C-c C-t p` runs all the tests in a project.

`C-u C-c C-t p` prompts for test selectors and runs the matching tests in a project.

`C-c C-t l` runs all tests currently evaluated in the REPL.

`C-u C-c C-t l` prompts for test selectors and runs the matching tests currently evaluated in the REPL.

CIDER first prompts for the test selectors to include:

![Spacemacs Clojure Cider Test Runner test selector prompt - include](/images/spacemacs-clojure-test-selectors-prompt.png)

Then prompts for the test selectors to exclude.  A warning displays if CIDER does not find the test selector name.

![Spacemacs Clojure Cider Test Runner test selector prompt - include](/images/spacemacs-clojure-test-selectors-integration-not-found.png)


{% content "cognitect" %}

The Cognitect Labs test runner uses command line options to specify test selectors, `--include` and `--exclude`.

> [Practicalli Clojure CLI Config]({{ P9IClojureDepsEdnInstall }}) configuration provides the `:test/congnitect` alias.

`clojure -M:test/cognitect --include :database` only runs tests with the `^:database` test selector

`clojure -M:test/cognitect --exclude :integration` runs all tests except those with the `^:integration` test selector

{% endtabs %}


## References
* [Kaocha - Focus and skipping tests with test selectors](https://cljdoc.org/d/lambdaisland/kaocha/1.0.700/doc/6-focusing-and-skipping)
* [Convoluted Magic of Leiningen Test Selectors](https://medium.com/helpshift-engineering/the-convoluted-magic-of-leiningen-test-selectors-2eb6c452dfcf)
* [How to use Leiningen test selectors to filter by test name](https://jakemccrary.com/blog/2019/01/28/how-to-use-leiningen-test-selectors-to-filter-by-test-name/)
* [Stack overflow - Lein test with Selectors - how to specify a test for multiple conditions](https://stackoverflow.com/questions/53839076/lein-test-with-selectors-how-to-specify-a-test-for-multiple-conditions)
