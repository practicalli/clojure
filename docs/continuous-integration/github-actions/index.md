![GitHub Actions banner](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/github-actions-banner.png)

Automate tasks, such as running unit tests or lint code, whenever code is committed to a  GitHub repository.

GitHub Actions can run one or more tasks after specific events, such as commits, raising issues or pull requests.

An event triggers a configured workflow which contains one or more jobs. A job contains a one or more steps which defines actions to run.

* [Introduction to GitHub Actions](https://docs.github.com/en/free-pro-team@latest/actions/learn-github-actions/introduction-to-github-actions)
* [Understanding the workflow file](https://docs.github.com/en/free-pro-team@latest/actions/learn-github-actions/introduction-to-github-actions#understanding-the-workflow-file)

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

[Setup Java](https://github.com/actions/setup-java) adds an OpenJDK distribution, i.e. Eclipse Temurin, at a specified version (Java 17 recommended).

[Setup Clojure](https://github.com/DeLaGuardo/setup-clojure) provides Clojure via Clojure CLI, Leiningen or Boot.  Clojure CLI is recommended.

[Cache](https://github.com/actions/cache) is used to cache Clojure and Java libraries (dependencies or 'deps').

The example workflow runs on Ubuntu.

The project code is checked out from the Git repository.

Java and Clojure are added to the environment

Unit tests are run using the `:test/run` alias (this alias should run Kaocha or similar test runner)

The Clojure project is packaged into an Uberjar for deployment

```yaml
name: Test and Package project
on: [push]
jobs:
  clojure:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Cache Clojure Dependencies
        uses: actions/cache@v3
        with:
          path:
            - ~/.m2
            - ~/.gitlibs
          key: cache-${{ hashFiles('**/deps.edn') }}

      - name: Prepare java
        uses: actions/setup-java@v3.5.1
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: Install clojure tools
        uses: DeLaGuardo/setup-clojure@9.5
        with:
          cli: 1.11.1.1165    # Clojure CLI based on tools.deps

      - name: Run Unit tests
        run: clojure -X:test/run

      - name: Package Clojure project
        run: clojure -X:project/uberjar
```

## References

* [Practicalli Blog](https://github.com/practicalli/blog/blob/live/.github/workflows/publish-blog.yml) - build publish a Cryogen project with Clojure CLI and publish the generated website with GitHub pages (also [a Staging workflow that runs on pull requests](https://github.com/practicalli/blog/blob/live/.github/workflows/publish-blog-staging.yml))
* [Practicalli Landing Page](https://github.com/practicalli/practicalli.github.io/blob/live/.github/workflows/deploy.yml) - build a ClojureScript & Figwheel project with Clojure CLI and publish the generated site to GitHub pages
* [Practicalli Clojure CLI user level configuration](https://github.com/practicalli/clojure-deps-edn/blob/live/.github/workflows/lint-with-clj-kondo.yml) - lint the `deps.edn` file with clj-kondo
