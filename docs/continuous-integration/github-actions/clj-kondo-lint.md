![Linting: Github Actions](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/github-actions-linting-banner.png)

[clj-kondo](https://github.com/borkdude/clj-kondo) provides static analysis of Clojure, ClojureScript and EDN code, which can be run on the command line to analyze a specific file or directory tree of files.


* [GitHub Action: setup-clj-kondo](https://github.com/marketplace/actions/setup-clj-kondo)
* [GitHub Action: checkout](https://github.com/marketplace/actions/checkout)


## Lint a specific file on push or pr

The [practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdn }}) contains [`.github/workflows/lint-with-clj-kondo.yaml`](https://github.com/practicalli/clojure-deps-edn/blob/live/.github/workflows/lint-with-clj-kondo.yml) action which checks the `deps.edn` file when ever there is a push to the `live` branch or a pull request is created.

The configuration runs clj-kondo lint command using the [DeLaGuardo/setup-clj-kondo@v1](https://github.com/marketplace/actions/setup-clj-kondo) GitHub action.

The jobs run on the Ubuntu operating system.  The first step installs clj-kondo on the runner.  Then next step checks out the practicalli/clojure-deps-edn repository.  The final step runs the lint command.

```yml
name: "Lint with clj-kondo"
on:
  pull_request:
    paths:
      - 'deps.edn'
  push:
    paths:
      - 'deps.edn'
    branches:
      - live

jobs:
  lint:
    runs-on: ubuntu-20.04
    steps:
      - uses: DeLaGuardo/setup-clj-kondo@master
        with:
          version: '2021.12.16'

      - uses: actions/checkout@v3

      - name: Run on Ubuntu
        run: clj-kondo --lint deps.edn --config '{:output {:pattern "::{{level}} file={{filename}},line={{row}},col={{col}}::{{message}}"}}'
```


## Example run of GitHub Actions

Pushing a commit will automatically trigger the workflow and lint the `deps.edn` file.

![GitHub Actions: Linting run passing](/images/github-actions-linting-run-pass.png)


When a pull request is created, the workflow is triggered and the results shown in the pull request page.

<!-- TODO: screenshot of a pull request -->


* [Practicalli Clojure CLI user level configuration] - lint the `deps.edn` file with clj-kondo
