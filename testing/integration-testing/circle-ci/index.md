# Circle CI continuous integration service
[Circle CI](https://circleci.com/product/) is a service to build, test and deploy projects.  CircleCI uses docker images to run its workflow, either in the cloud or locally.

Projects can be build, tests run, artifacts (uberjars) created and applications deployed to services such as Heroku.


## Getting Started
Circle CI has a free plan with unlimited projects, so its easy to get started.

[Sign up](https://circleci.com/signup/) using an existing GitHub or Bitbucket account and login to the CircleCI dashboard.

In the CircleCI dashboard use **Add Project** to configure any of your shared Git repositories to run build pipelines using a `.circleci/config.yml` file in the root of the Clojure.

Every time changes are pushed to the shared code repository (GitHub, Bitbucket), CirceCI will run the pipeline for the project and show the results.

## Clojure images
There are a [range of container images](https://circleci.com/docs/2.0/circleci-images/#clojure) available, including [Clojure specific container images](https://circleci.com/docs/2.0/circleci-images/#clojure), on which to run continuous integration worflows with.

Pre-configured images are typically faster than installing software on top a more generic image.

{% tabs deps="deps.edn projects", lein="Leiningnen projects" %}

{% content "deps" %}

Recommended image for Clojure deps.edn projects is `openjdk-11-tools-deps-1.10.1.536`

The image contains OpenJDK 11 and the latest Clojure CLI tools installed, 1.10.1.536.

Add the following under docker: in your `config.yml`

```yaml
- image: circleci/clojure:openjdk-11-tools-deps-1.10.1.536
```

> #### Hint::Check Clojure version
> `clojure -Sdescribe` shows configuration information for the Clojure CLI tool as a hash-map, with the :version key associated with the exact install version.


{% content "lein" %}
Recommended image for [Leinginen](https://leiningen.org/) projects is `openjdk-11-lein-2.9.3`

The image contains OpenJDK 11 and the latest [Leiningen](https://leiningen.org/) installed, 2.9.3.

Add the following under docker: in your `config.yml`

```yaml
- image: circleci/clojure:openjdk-11-lein-2.9.3
```

> #### Hint::Match Build tool version
> `lein version` shows the current version of Leiningen install on your development environment.
>
> `java -version` shows the current version of the Java installation.

{% endtabs %}


## References
* [Dockerhub: CircleCI Clojure images](https://hub.docker.com/r/circleci/clojure)
* [GitHub: CircleCI-Public/cicleci-dockerfiles repository](https://hub.docker.com/r/circleci/clojure) - review how docker images are constructed
* [CircleCI Clojure image tags - json](https://circleci.com/docs/2.0/docker-image-tags.json) - programmatically process names of Clojure docker images
