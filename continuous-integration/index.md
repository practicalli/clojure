![Continuous Integration banner](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/continuous-integration-banner.png)

Topics to be covered in this section include:
* Continuous Integration servers
  * Circle CI
  * GitLabs
* configuring pipelines
* Managing environment variables
* Github hooks and actions
* Deployment and services on Heroku

[Raise an issue on practicalli/clojure-content](https://github.com/practicalli/clojure-content/issues) if you have suggestions of sample content to contribute


## 12 Factor approach
Following the [12 factor principles](https://12factor.net/), the deployment is driven by source code to multiple environments.

![Heroku multiple environment from one source](https://raw.githubusercontent.com/jr0cket/developer-guides/gh-pages/heroku-multiple-environments-concept.png)


## Heroku pipelines
Using Heroku Pipelines the staging environment is promoted to production rather than being rebuilt

![Heroku Pipeline concept - staging and production](https://raw.githubusercontent.com/jr0cket/developer-guides/master/heroku-pipelines-staging-production.png)

The Heroku dashboard can be used to promote the application into production, once the staging application is signed off.

![Heroku Pipeline banking-on-clojure](https://raw.githubusercontent.com/practicalli/graphic-design/live/continuous-integration/heroku/heroku-pipeline-banking-on-clojure.png)


## Heroku Build process
The build process starts when commits are pushed to Heroku, either directly or via a continuous integration service (eg. CircleCI).

[![Heroku build process](https://raw.githubusercontent.com/jr0cket/developer-guides/gh-pages/heroku-deployment-process-simplified.png)](https://raw.githubusercontent.com/jr0cket/developer-guides/gh-pages/heroku-deployment-process-simplified.png)
