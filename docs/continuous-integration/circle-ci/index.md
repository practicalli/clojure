# Circle CI continuous integration service

[Circle CI](https://circleci.com/product/){target=_blank} is a service to build, test and deploy projects.  CircleCI uses docker images to run its workflow, either in the cloud or locally.

Projects can be build, tests run, artifacts (uberjars) created and applications deployed to services such as AWS, Render.com, etc.

Integration will be supported by Git version control, a continuous integration service (CircleCI, GitLabs, GitHub Actions) and a deployment platform (Heroku).

<!-- ![Continuous integration workflow - simple concept](https://raw.githubusercontent.com/practicalli/graphic-design/live/continuous-integration/circleci-workflow-sequential-git-heroku.png) -->

## Getting Started

[Sign up](https://circleci.com/signup/){target=_blank} using a GitHub or Bitbucket account and login to the CircleCI dashboard.

**Add Project** in the CircleCI dashboard to configure a shared Git repository and run build pipelines using a `.circleci/config.yml` file in the root of the Clojure project.

Every time changes are pushed to the shared code repository (GitHub, Bitbucket), CirceCI will run the pipeline for the project and show the results.

## Clojure images

[Clojure specific container images](https://circleci.com/docs/2.0/circleci-images/#clojure){target=_blank} are available for several versions of Java and Clojure.  Pre-configured images are typically faster than installing software on top a more generic image.

 `cimg/clojure:1.10` is the recommended image for Clojure projects. The image contains OpenJDK 17 and the latest version of Clojure CLI, Leiningen and Babashka

Add the following under the `docker:` key in the `config.yml`

```yaml
- image: cimg/clojure:1.10
```

The [CircleCI Clojure Language guide](https://circleci.com/docs/2.0/language-clojure/){target=_blank} walks through the sections of the yaml configuration in detail.

??? INFO "Check Clojure version"
    `clojure -Sdescribe` shows configuration information for the Clojure CLI tool as a hash-map, with the :version key associated with the exact install version.

    `lein version` shows the current version of Leiningen install on your development environment.

    `java -version` shows the current version of the Java installation.

## References

[CircleCI Clojure Language guide](https://circleci.com/docs/2.0/language-clojure/){target=_blank .md-button}
[CircleCI Clojure image tags - json](https://circleci.com/docs/2.0/docker-image-tags.json){target=_blank .md-button}
[:fontawesome-brands-docker:  CircleCI Clojure images](https://hub.docker.com/r/circleci/clojure){target=_blank .md-button}
[:fontawesome-brands-github: CircleCI dockerfiles repository](https://hub.docker.com/r/circleci/clojure){target=_blank .md-button}
