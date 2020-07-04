# Circle CI continuous integration service
[Circle CI](https://circleci.com/product/) is a service to build, test and deploy projects.  CircleCI uses docker images to run its workflow, either in the cloud or locally.

## Getting Started
Circle CI has a free plan with unlimited projects, so its easy to get started.

[Sign up](https://circleci.com/signup/) using an existing GitHub or GitLab account

## Connecting projects to Circle CI
Login into the dashboard and

## Clojure images
There are a [range of container images](https://circleci.com/docs/2.0/circleci-images/#clojure) available, including [Clojure specific container images](https://circleci.com/docs/2.0/circleci-images/#clojure), on which to run continuous integration worflows with.

Recommended image: `openjdk-11-tools-deps-1.10.1.536`

A image that has OpenJDK 11 and the latest Clojure CLI tools installed, 1.10.1.536.  Pre-installed image will be slightly faster than installing software on top a more generic image.

> #### Hint::Checking local versions of Clojure CLI tool and Java
> `clojure -Sdescribe` shows configuration information for the Clojure CLI tool as a hash-map, with the :version key associated with the exact install version.
>
> `java -version` shows the current version of the Java installation.

Usage: Add the following under docker: in your `config.yml`

```yml
- image: circleci/clojure:openjdk-11-tools-deps-1.10.1.536
```

* [Dockerhub: CircleCI Clojure images](https://hub.docker.com/r/circleci/clojure)
* [GitHub: CircleCI-Public/cicleci-dockerfiles repository](https://hub.docker.com/r/circleci/clojure)
* [CircleCI Clojure image tags - json](https://circleci.com/docs/2.0/docker-image-tags.json)
