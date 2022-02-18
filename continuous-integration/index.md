![Continuous Integration banner](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/continuous-integration-banner.png)

Topics to be covered in this section include:
* Continuous Integration servers
  * Circle CI
  * GitLabs
* configuring pipelines
* Managing environment variables
* Github hooks and actions
* Deployment and services on Heroku

> #### Hint::CircleCI example in Practicalli Clojure Web Services
> [Banking on Clojure](https://practical.li/clojure-web-services/projects/banking-on-clojure/continuous-integration.html) is an example of Continuous Integration using CircleCI, with LambdaIsland/Kaocha as the test runner and Heroku as the deployment pipeline.


## 12 Factor approach

Following the [12 factor principles](https://12factor.net/), the deployment is driven by source code to multiple environments.

![Heroku multiple environment from one source](https://raw.githubusercontent.com/jr0cket/developer-guides/gh-pages/heroku-multiple-environments-concept.png)

## CircleCI service

Use Yaml language to write CI workflows and tasks, using Docker images as a consistent run-time environment

A commercial service with [a generous free Cloud plan](https://circleci.com/pricing/) - (6,000 minutes), providing highly optomises container images to run tasks efficiently.  The CircleCI Clojure images contain Clojure CLI, Leiningen and Babashka pre-installed.

[CircleCI Orbs](https://circleci.com/orbs/) package up common configuration and tools, greatly simplifying the configuration and maintenance required.

* [CircleCI Clojure language guide](https://circleci.com/docs/2.0/language-clojure/)


## GitHub Actions

Use Yaml language to write CI workflows and tasks.

A commercial service with a modest free plan (2,000 minutes) for open source projects.  GitHub Marketplace contains a wide range of Actions, including [Clojure related actions](https://github.com/marketplace?type=actions&query=clojure+), simplifying the configuration of CI.

[Setup Clojure](https://github.com/marketplace/actions/setup-clojure) provides Clojure CLI, Leinigen and boot tools for use within the CI workflow

* [GitHub Actions overview](https://github.com/features/actions)


## Heroku pipelines

Using Heroku Pipelines the staging environment is promoted to production rather than being rebuilt

![Heroku Pipeline concept - staging and production](https://raw.githubusercontent.com/jr0cket/developer-guides/master/heroku-pipelines-staging-production.png)

The Heroku dashboard can be used to promote the application into production, once the staging application is signed off.

![Heroku Pipeline banking-on-clojure](https://raw.githubusercontent.com/practicalli/graphic-design/live/continuous-integration/heroku/heroku-pipeline-banking-on-clojure.png)


## Heroku Build process

The build process starts when commits are pushed to Heroku, either directly or via a continuous integration service (eg. CircleCI).

[![Heroku build process](https://raw.githubusercontent.com/jr0cket/developer-guides/gh-pages/heroku-deployment-process-simplified.png)](https://raw.githubusercontent.com/jr0cket/developer-guides/gh-pages/heroku-deployment-process-simplified.png)
