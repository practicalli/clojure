# Add Spec to a project

Create a new project or clone [:fontawesome-brands-github: practicalli/leveraging-spec](https://github.com/practicalli/leveraging-spec){target=_blank} which includes several examples of using Clojure Spec.

=== "Create new project"

    Create a new Clojure CLI project using the [:fontawesome-solid-book-open: Practicalli project templates](/clojure/clojure-cli/projects/templates/) 

    !!! NOTE ""
        ```shell title="Create new project"
        clojure -T:project/create :template practicalli/minimal :name practicalli/leveraging-spec
        ```

    ??? HINT ":fontawesome-solid-book-open: Practicalli Clojure CLI Config - :project/create alias"
        [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](https://github.com/practicalli/clojure-deps-edn#clojure-projects) repository includes the `:project/create` alias for creating new Clojure projects from a template using [`deps-new`](https://github.com/seancorfield/deps-new).

    The project is created with Clojure as a dependency, which includes the `clojure.spec.alpha` library.

    > Clojure 1.9.0 or higher versions include Clojure Spec.  Clojure 1.11.1 is recommended.

=== "Clone Practicalli Leveraging Spec project"

    [:fontawesome-brands-github: practicalli/leveraging-spec](https://github.com/practicalli/leveraging-spec){target=_blank} project includes Clojure Spec examples for values and functional arguments, along with unit tests using clojure spect-test.

    !!! NOTE ""
        ```shell
        https://github.com/practicalli/leveraging-spec.git
        ```


## Project Dependencies

Clojure Spec is included in Clojure so only `org.clojure/clojure` dependency is required in the `deps.edn` file for the project.

!!! EXAMPLE "Clojure project dependency"
    ```clojure title="deps.edn"
    {:paths ["src" "resources"]
     :deps {org.clojure/clojure {:mvn/version "1.11.1"}}}
    ```

## Use spec in namespace

Require the `clojure.spec.alpha` namespace in the `ns` definition using the `spec` alias name.  Practicalli recommends using `spec` (rather than `s` as it is much clearer as to where the functions are defined)

!!! EXAMPLE "Clojure project dependency"
    ```clojure
    (ns practicalli.leveraging-spec
      (:require [clojure.spec.alpha :as spec]))
    ```

Evaluate the namespace definition to start using the functions from the namespace.

![Clojure project - require namespace and evaluate](https://raw.githubusercontent.com/practicalli/graphic-design/live/editors/clojure-project-spec-require-evaluated.png)

All functions from `clojure.spec.alpha` are now accessible using the `spec` alias, e.g. `spec/conform`, `spec/valid?`, `spec/def`.

## Testing with spec

Add the `clojure.spec.test.alpha` using the `spec-test` alias, along with `clojure.spec.test.alpha` as `spec` alias

!!! EXAMPLE "Clojure project dependency"
    ```clojure title="src/practicalli/leveraging_spec.clj"
    (ns practicalli.leveraging-spec
      (:require
        [clojure.spec.alpha :as spec]
        [clojure.spec.test.alpha :as spec-test]))
    ```

<!-- TODO: add basic spec test examples -->
