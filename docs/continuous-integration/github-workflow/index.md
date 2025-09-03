# GitHub Workflows

GitHub workflows can run one or more tasks when triggered by specific events, e.g. pushing commits, raising issues or pull requests.

An event triggers a configured workflow which contains one or more jobs. A job contains a one or more steps which defines actions to run.

[:fontawesome-solid-book-open: Practicalli GitHub Workflows](https://practical.li/engineering-playbook/continuous-integration/github/workflows/practicalli/){target=_blank .md-button}

[:globe_with_meridians: Understanding GitHub Actions](https://docs.github.com/en/actions/about-github-actions/understanding-github-actions){target=_blank .md-button}

## Anatomy of a workflow

| Term     | Description                                                                                                                                                                           |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Event    | [Triggers a workflow](https://docs.github.com/en/free-pro-team@latest/actions/reference/events-that-trigger-workflows), e.g. Create pull request, push commit, etc.                   |
| Workflow | Top level configuration containing one or more jobs, [triggered by a specific event](https://docs.github.com/en/free-pro-team@latest/actions/reference/events-that-trigger-workflows) |
| Job      | Set of steps executed in the same runner, multiple jobs execute in parallel within their own instance of a runner                                                                     |
| Step     | Individual task that runs commands (actions), sharing data with other steps                                                                                                           |
| Action   | Standalone commands defined within a step, custom commands or GitHub community                                                                                                        |
| Runner   | A GitHub Actions server, listening for available jobs                                                                                                                                 |

## Example GitHub Action

`.github/workflows/workflow-name.yaml` is a file that contains the workflow definition.

> NOTE: Practicalli recommends including additional configuration in `.github/config/` files where required, rather than the root directory of a project


[Setup Java](https://github.com/actions/setup-java){target=_blank} adds an OpenJDK distribution, i.e. Eclipse Temurin, at a specified version.

[Setup Clojure](https://github.com/DeLaGuardo/setup-clojure){target=_blank} provides Clojure via Clojure CLI or Leiningen.

[Cache](https://github.com/actions/cache){target=_blank} is used to cache Clojure and Java libraries

* The example workflow runs on Ubuntu.
* The project code is checked out from the Git repository.
* Java and Clojure run-times are added to the environment
* Unit tests are run using the `:test/run` alias (this alias should run Kaocha or similar test runner)
* Source code format and idioms are checked with cljstyle and clj-kondo
* The Clojure project is packaged into an Uberjar for deployment

!!! EXAMPLE "Example GitHub workflow for Clojure CLI project"
    ```yaml
    name: Test and Package project
    on:
      pull_request:
      push:
        branches:
          - main
    jobs:
      clojure:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout
            uses: actions/checkout@v5

          - name: Cache Clojure Dependencies
            uses: actions/cache@v3
            with:
              path:
                - ~/.m2
                - ~/.gitlibs
              key: cache-${{ hashFiles('**/deps.edn') }}
              restore-keys: clojure-deps-

          - name: Prepare java
            uses: actions/setup-java@v3
            with:
              distribution: 'temurin'
              java-version: '21'

          - name: Install clojure tools
            uses: DeLaGuardo/setup-clojure@9.5
            with:
              cli: 1.11.1.1165    # Clojure CLI based on tools.deps
              cljstyle: 0.15.0 # cljstyle
              clj-kondo: 2022.10.05 # Clj-kondo

          - name: Run Unit tests
            run: clojure -X:test/run

          - name: "Lint with clj-kondo"
            run: clj-kondo --lint deps.edn src resources test --config .clj-kondo/config-ci.edn

          - name: "Check Clojure Style"
            run: cljstyle check --report

          - name: Package Clojure project
            run: clojure -X:project/uberjar
    ```
