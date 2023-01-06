# Circle CI continuous integration service

[Circle CI](https://circleci.com/product/) is a service to build, test and deploy projects.  CircleCI uses docker images to run its workflow, either in the cloud or locally.

Projects can be build, tests run, artifacts (uberjars) created and applications deployed to services such as Heroku.

Integration will be supported by Git version control, a continuous integration service (CircleCI, GitLabs, GitHub Actions) and a deployment platform (Heroku).

![Continuous integration workflow - simple concept](https://raw.githubusercontent.com/practicalli/graphic-design/live/continuous-integration/circleci-workflow-sequential-git-heroku.png)


## Getting Started

Circle CI has a free plan with unlimited projects, so its easy to get started.

[Sign up](https://circleci.com/signup/) using an existing GitHub or Bitbucket account and login to the CircleCI dashboard.

In the CircleCI dashboard use **Add Project** to configure any of your shared Git repositories to run build pipelines using a `.circleci/config.yml` file in the root of the Clojure.

Every time changes are pushed to the shared code repository (GitHub, Bitbucket), CirceCI will run the pipeline for the project and show the results.


## Clojure images

[Clojure specific container images](https://circleci.com/docs/2.0/circleci-images/#clojure) are available for several versions of Java and Clojure.  Pre-configured images are typically faster than installing software on top a more generic image.

 `cimg/clojure:1.10` is the recommended image for Clojure projects. The image contains OpenJDK 17 and the latest version of Clojure CLI, Leiningen and Babashka

Add the following under the `docker:` key in the `config.yml`

```yaml
- image: cimg/clojure:1.10
```

The [CircleCI Clojure Language guide](https://circleci.com/docs/2.0/language-clojure/) walks through the sections of the yaml configuration in detail.


> #### Hint::Check Clojure version
> `clojure -Sdescribe` shows configuration information for the Clojure CLI tool as a hash-map, with the :version key associated with the exact install version.
>
> `lein version` shows the current version of Leiningen install on your development environment.
>
> `java -version` shows the current version of the Java installation.



## References

* [CircleCI Clojure Language guide](https://circleci.com/docs/2.0/language-clojure/)
* [CircleCI Clojure image tags - json](https://circleci.com/docs/2.0/docker-image-tags.json) - programmatically process names of Clojure docker images
* [Dockerhub: CircleCI Clojure images](https://hub.docker.com/r/circleci/clojure)
* [GitHub: CircleCI-Public/cicleci-dockerfiles repository](https://hub.docker.com/r/circleci/clojure) - review how docker images are constructed
