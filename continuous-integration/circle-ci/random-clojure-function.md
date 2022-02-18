# Random Clojure Function
A Clojure command line application that shows a random function from the namespaces available in the Clojure Standard library, or a specific namespace from that library.

This guide shows how to develop this project alongside CircleCI as the continuous integration service.

1. Create a new project - using the [Random Clojure Function guide](/simple-projects/random-clojure-function.md)
2. Create a repository on GitHub
3. Commit the project early and push changes to GitHub
4. Add a .circleci/config.yml file and push to GitHub, choosing the relevant image
5. Login to CircleCI dashboard and add project, choosing manual configuration
6. Continue developing the random clojure function project, including tests
7. After each push to GitHub, check the build status
8. Add a CircleCI badge to the project readme

{% youtube %}
https://youtu.be/sXZKrD4cAFk
{% endyoutube %}

> #### Hint::Use the -T execution flag rather than -M or -A
> `:project/new` runs the clj-new tool which does not require paths or dependencies from a project (no Clojure project exists yet anyway).  The recommended approach is to use the `-T` execution option, i.e. `clojure -T:project/new`.

## Create a new project

Start following the guide to create the random clojure function project, using a deps.edn for the Clojure project configuration

```bash
clojure -T:project/new :template app :name practicalli/random-clojure-function
```

Version control the Clojure project using Git (or [magit in Spacemacs](https://practical.li/spacemacs/source-control/))


## Add a test run alias

Edit the `deps.edn` file in the root of the project and add a `:test/run` alias, to run the kaocha test runner which will stop if a failing test is detected.  Stopping on a failed test saves running the full test suite and make the CI workflow more effective.

```clojure
:test/run
{:extra-paths ["test"]
 :extra-deps {lambdaisland/kaocha {:mvn/version "1.60.977"}}
 :exec-fn kaocha.runner/exec-fn
 :exec-args {:randomize? false
             :fail-fast? true}}
```

## Create a remote repository

![GitHub new repository](/images/github-repository-create-new.png)

Add the remote repository URL to the local Git repository.

```bash
git remote add practicalli git@github.com:practicalli/random-clojure-function.git
```


## Add CircleCI configuration

Adding CircleCI early in the project development cycle ensures testing from the saved source code is successful and testing is consistently repeatable.

Create a new file called `.circleci/config.yml` in the root of the project.

Edit the file and add the following configuration.

```yml
version: 2.1
jobs:                                               # basic units of work in a run
  build:                                            # runs without Workflows must have a `build` job as entry point
    working_directory: ~/random-clojure-function    # directory where steps will run
    docker:                                         # run the steps with Docker
      - image:  cimg/clojure:1.10                   # image is primary container where `steps` are run
    environment:                                    # environment variables for primary container
      JVM_OPTS: -Xmx3200m                           # limit maximum JVM heap size to prevent out of memory errors
    steps:                                          # commands that comprise the `build` job
      - checkout                                    # check out source code to working directory
      - restore_cache:                              # restores cache if checksum unchanged from last run
          key: random-clojure-function-{{ checksum "deps.edn" }}
      - run: clojure -P
      - save_cache:                                 # generate / update cache in the .m2 directory using a key template
          paths:
            - ~/.m2
            - ~/.gitlibs
          key: random-clojure-function-{{ checksum "deps.edn" }}
      - run: clojure -X:test/run
```


The `run: clojure -P` step downloads dependencies for the project, including the `:extra-deps` if aliases are also included.

The `run: clojure -X:test/run` adds the test directory to the class path and runs the Kaocha runner defined in the alias.


## Connect Circle CI to the project

Commit and push the `.circleci/config.yml` file to the GitHub repository.

Open the CircleCI dashboard and select **Add Project**.  If your GitHub account has multiple organizations, choose the appropriate organization first.

Search the repository list for the GitHub repository and select ,,,

![Circle CI dashboard add project](/images/circle-ci-dashboard-projecs-random-clojure-function-setup.png)

Select the **Manual** configuration as a `.circleci/config.yml` file has already been added to the Git repository.


![Circle CI dashboard add Clojure project configuration](/images/circle-ci-dashboard-projects-random-clojure-function-configuration.png)

Press **Start Building** button to confirm that a `config.yml` file has already been added and the build should start.


![Circle CI dashboard - confirm config.yml configuration added and start build](/images/circle-ci-dashboard-projects-random-clojure-function-config-yml-added.png)

Now the first build runs with the `config.yml` file.


![Circle CI dashboard - build running the Clojure project](/images/circle-ci-dashboard-pipelines-random-clojure-function-running.png)

Its failed.  Okay lets investigate...


![Circle CI dashboard - build running the Clojure project and failed on unit tests as the test does not pass](/images/circle-ci-dashboard-pipelines-random-clojure-function-build-failed-test-runner.png)


Thats okay, we have failing tests locally, so we know that the CircleCI build is working the same as on our local development environment.

The continuous integration is now working and tests are automatically run as soon as you push changes to the remote repository.

So the development of the project can continue with greater confidence

## Adding a Build Status badge

[Generating a status badge documentation](https://circleci.com/docs/2.0/status-badges/#generating-a-status-badge) describes how to add a build status badge for your project, usually at the top of the README.md file in the project

```markdown
[![CircleCI](https://circleci.com/gh/circleci/circleci-docs.svg?style=svg)](https://circleci.com/gh/practicalli/random-clojure-function)
```

Add this markdown to the top of the README.md file, underneath the title.  Then commit and push the change to the GitHub repository.

> NOTE: you might want to fix the unit tests first :)
