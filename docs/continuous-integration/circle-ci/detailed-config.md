# Circle CI detailed configuration

## Orbs

CircleCI Orbs are pre-packaged configurations for specific tasks, reducing the amount of configuration to maintain.

| Orbs                          | Description                                                                           |
|-------------------------------|---------------------------------------------------------------------------------------|
| h-matsuo/github-release@0.1.3 | GitHub release - package up releases ?                                                |
|                               | Deploy to Heroku                                                                      |
|                               | Kaocha test runner - unit and generative testing, junit-xml reports and test coverage |


## Executors

Define an executor for the environment used to run the CircleCI jobs.

| Executor environment | Description           |
|----------------------|-----------------------|
| machine              | Linux virtual machine |
| docker               |                       |
|                      |                       |
|                      |                       |


!!! EXAMPLE "Configuration for a Clojure CLI project"
    ```yaml
    ---
    version: 2.1

    orbs:
      github-release: h-matsuo/github-release@0.1.3

    executors:
      tools-deps-executor:
        docker:
          - image: circleci/clojure:openjdk-11-tools-deps-1.10.1.697
        working_directory: ~/repo
        environment:
          JVM_OPTS: -Xmx3200m

    commands:
      setup:
        steps:
          - checkout
          - restore_cache:
              keys:
                - v1-dependencies-{{ checksum "deps.edn" }}
                - v1-dependencies-
          - save_cache:
              paths:
                - ~/.m2
              key: v1-dependencies-{{ checksum "deps.edn" }}

      acceptance-tests:
        steps:
          - run:
              name: check coverage
              command: clojure -M:test:coverage

      deploy-version:
        steps:
          - run:
              name: Update pom.xml
              command: clojure -Spom
          - run:
              name: Build
              command: clojure -M:jar
          - run:
              name: Deploy
              command: clojure -M:deploy

      store-artifact:
        steps:
          - run:
              name: Create jar
              command: clojure -M:jar
          - run:
              name: Zip up jar file
              command: zip --junk-paths github-api-lib github-api-lib.jar
          - run:
              name: install mvn
              command: |
                sudo apt-get update
                sudo apt-get -y install maven
          - run:
              name: extract version from pom
              command: |
                mvn help:evaluate -Dexpression=project.version -q -DforceStdout > current_version
          - persist_to_workspace:
              root: ~/repo
              paths:
                - github-api-lib.zip
                - current_version

      create-release:
        steps:
          - attach_workspace:
              at: ~/repo
          - github-release/create:
              tag: "v$(cat ~/repo/current_version)"
              title: "Version v$(cat ~/repo/current_version)"
              description: "Github-related API calls."
              file-path: ~/repo/github-api-lib.zip



    jobs:
      test:
        executor: tools-deps-executor
        steps:
          - setup
          - acceptance-tests
      deploy:
        executor: tools-deps-executor
        steps:
          - setup
          - acceptance-tests
          - deploy-version
      artifact:
        executor: tools-deps-executor
        steps:
          - setup
          - store-artifact
      release:
        executor: github-release/default
        steps:
          - setup
          - create-release


    workflows:
      build-test-release:
        jobs:
          - test
          - deploy:
              context: clojars
              requires:
                - test
              filters:
                branches:
                  only: main
          - artifact:
              requires:
                - test
              filters:
                branches:
                  only: main
          - release:
              context: github
              requires:
                - test
                - deploy
                - artifact
              filters:
                branches:
                  only: main
    ```
