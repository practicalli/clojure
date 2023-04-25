# Continuous Integration

![Continuous Integration banner](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/continuous-integration-banner.png)

Topics to be covered in this section include:

- [ ] Continuous Integration services
  - [X] [Circle CI](circle-ci/)
  - [X] [GitHub Workflow](github-workflow/)
  - [ ] GitLab CI
- [ ] Configure deployment pipelines
- [ ] Manage environment variables
- [ ] Security & Secrets
- [ ] Deployment
  - [X] Amazon AWS
  - [X] Render.com

!!! Hint "CircleCI example in Practicalli Clojure Web Services"
    [Banking on Clojure](https://practical.li/clojure-web-services/projects/banking-on-clojure/continuous-integration/){target=_blank} is an example of Continuous Integration using CircleCI, with LambdaIsland/Kaocha as the test runner and Heroku as the deployment pipeline.

## 12 Factor approach

Following the [12 factor principles](https://12factor.net/){target=_blank}, the deployment is driven by source code to multiple environments.

## CircleCI service

Use Yaml language to write CI workflows and tasks, using Docker images as a consistent run-time environment

A commercial service with [a generous free Cloud plan](https://circleci.com/pricing/){target=_blank} - (6,000 minutes), providing highly optomises container images to run tasks efficiently.  The CircleCI Clojure images contain Clojure CLI, Leiningen and Babashka pre-installed.

[CircleCI Orbs](https://circleci.com/orbs/){target=_blank} package up common configuration and tools, greatly simplifying the configuration and maintenance required.

[CircleCI Clojure language guide](https://circleci.com/docs/2.0/language-clojure/){target=_blank .md-button}

## GitHub Workflow

Use Yaml language to write CI workflows and tasks.

A commercial service with a modest free plan (2,000 minutes) for open source projects.  GitHub Marketplace contains a wide range of Actions, including [Clojure related actions](https://github.com/marketplace?type=actions&query=clojure+){target=_blank}, simplifying the configuration of CI.

[Setup Clojure](https://github.com/marketplace/actions/setup-clojure){target=_blank} provides Clojure CLI, Leinigen and boot tools for use within the CI workflow

[GitHub Actions overview](https://github.com/features/actions){target=_blank .md-button}
