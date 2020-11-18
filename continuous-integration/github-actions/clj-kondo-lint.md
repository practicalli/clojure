![Linting: Github Actions](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/github-actions-linting-banner.png)

[clj-kondo](https://github.com/borkdude/clj-kondo) provides static analysis of Clojure, ClojureScript and EDN code, which can be run on the command line to analyze a specific file or directory tree of files.


* [GitHub Action: setup-clj-kondo](https://github.com/marketplace/actions/setup-clj-kondo)
* [GitHub Action: checkout](https://github.com/marketplace/actions/checkout)


## Lint a specific file on push or pr
The practicalli/clojure-deps-edn contains a  `deps.edn` file that should be checked when ever there is a push to the `live` branch or a pull request is raised.

The configuration runs clj-kondo lint command using the [DeLaGuardo/setup-clj-kondo@v1](https://github.com/marketplace/actions/setup-clj-kondo) GitHub action.

The jobs run on a GitHub Actions Ubuntu server.  The first step installs clj-kondo on the runner.  Then next step checks out the practicalli/clojure-deps-edn repository.  The final step runs the lint command.

```yml
name: "Lint with clj-kondo"
on:
  pull_request:
  push:
    branches:
      - live

jobs:
  lint:
    runs-on: ubuntu-20.04
    steps:
    - uses: DeLaGuardo/setup-clj-kondo@v1
      with:
        version: '2020.04.05'

    - uses: actions/checkout@v2.3.3

    - name: Run clj-kondo on ubuntu
      run: clj-kondo --lint deps.edn
```


## Example run of GitHub Actions
Pushing a commit will automatically trigger the workflow and lint the `deps.edn` file.

![GitHub Actions: Linting run passing](/images/github-actions-linting-run-pass.png)


When a pull request is created, the workflow is triggered and the results shown in the pull request page.

<!-- TODO: screenshot of a pull request -->
