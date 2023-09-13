# Design templates

Create a custom template project for yourself, your team / organisation or an open source project

Either copy one of the Practicalli Project Templates or create a base template project

```shell
clojure -T:project/create :template template :name domain/template-name
```

??? INFO "Local only template"
    If a template is only used by yourself locally, then all that is needed is a `deps.edn` config with deps-new, `resources/domain/template-name/` directory containing a `template.edn` and files to make up the new project and optionally a `src/domain/template-name.clj` for programmatic transform


## Add project files

`resources/domain/project_name/` directory contains files that are used to create a new project when using the template.

`resources/domain/project_name/template.edn` defines the declarative copy rules that manage where files are copied too, allowing for renaming of files and directories.


## deps-new template project


deps-new specification defined with clojure.spec

```clojure
(s/def ::root string?)
(s/def ::description string?)
(s/def ::data-fn symbol?)
(s/def ::template-fn symbol?)
(s/def ::files (s/map-of string? string?))
(s/def ::open-close (s/tuple string? string?))
(s/def ::opts #{:only :raw})
(s/def ::dir-spec (s/cat :src string?
                         :target (s/? string?)
                         :files (s/? ::files)
                         :delims (s/? ::open-close)
                         :opts (s/* ::opts)))
(s/def ::transform (s/coll-of ::dir-spec :min-count 1))
(s/def ::template (s/keys :opt-un [::data-fn ::description ::root ::template-fn ::transform]))
```

## Use template locally

Create projects from the new template locally by defining a Clojure CLI user alias using :local/root that points to the root directory of the template project.

```clojure
  :project/create-local
  {:replace-deps {io.github.seancorfield/deps-new
                  {:git/tag "v0.5.2" :git/sha "253f32a"}
                  practicalli/project-templates
                  {:local/root "/home/practicalli/projects/practicalli/project-templates/"}}
   :exec-fn      org.corfield.new/create
   :exec-args    {:template practicalli/minimal
                  :name practicalli/playground}}
```

Create a new project with the `project/create-local` alias

```shell
clojure -T:project/create-local :template domain/template-name
```


## Unit tests

Each template should have a unit test that checks against the deps-new template specification (written in clojure.spec)

Once the unit test pass, create a new project from the template just created

Checks should be made of the following aspects of a new project created with the new template.

* check library dependency versions
* run main and exec functions
* run test runner
* test buld task clean and jar | uberjar

template.edn contains a declarative configuration of the project a template will generate

`src/domain/template-name.clj`

`test/domain/template_name_test.clj` defines a unit test with `clojure.test` and `clojure.spec` which test the `practicalli/template/service/template.edn` configuration.


### Template specification

The template configuration is tested against the [`org.corfield.new/template` specification](https://github.com/seancorfield/deps-new/blob/develop/src/org/corfield/new.clj)

Specification defined with clojure.spec

```clojure
(s/def ::root string?)
(s/def ::description string?)
(s/def ::data-fn symbol?)
(s/def ::template-fn symbol?)
(s/def ::files (s/map-of string? string?))
(s/def ::open-close (s/tuple string? string?))
(s/def ::opts #{:only :raw})
(s/def ::dir-spec (s/cat :src string?
                         :target (s/? string?)
                         :files (s/? ::files)
                         :delims (s/? ::open-close)
                         :opts (s/* ::opts)))
(s/def ::transform (s/coll-of ::dir-spec :min-count 1))
(s/def ::template (s/keys :opt-un [::data-fn ::description ::root ::template-fn ::transform]))
```

## Publish template

Templates are a shared Git repository, so push the template project to GitHub

Include the shared repository within an alias definition within the Clojure CLI user deps.edn configuration, e.g. Practicalli Clojure CLI Config.

Create a new project with the template using the alias.

```shell
clojure -T:project/create :template domain/template-name :name domain/project-name
```

!!! HINT ":project/crate includes Practicalli Project Templates"
    [Practicalli Clojure CLI Config](https://practical.li/clojure/clojure-cli/practicalli-config/) has been updated to include the [practicalli/project-templates](https://github.com/practicalli/project-templates) dependency, making available all the Practicalli templates.

    Default values for template.edn keys can also be defined in the `:exec-args {}` of an alias for the project template
    ```clojure
      :exec-args {:template practicalli/service
                  :name practicalli.gameboard/service}
    ```
