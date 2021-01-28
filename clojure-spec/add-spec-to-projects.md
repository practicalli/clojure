# Add Spec to Clojure Projects
Add the `clojure.spec.alpha` to any namespaces in the project that will directly use the functions from that library.  It is recommended to use the `spec` alias to clearly indicate where those functions are defined.

```clojure
(ns practicalli.leveraging-spec
  (:require [clojure.spec.alpha :as spec]))
```

Evaluate the namespace definition to start using the functions from the namespace.

![Clojure project - require namespace and evaluate](/images/clojure-editor-spec-require-evaluated.png)


## Using Spec functions
All functions from `clojure.spec.alpha` are accessible using the `spec` alias, e.g. `spec/conform`, `spec/valid?`, `spec/def`.


## Testing specifications
Add the `clojure.spec.test.alpha` to any namespaces in the project that will directly use the functions from that library.  It is recommended to use the `spec-test` alias to clearly indicate where those functions are defined.

```clojure
(ns practicalli.leveraging-spec
  (:require [clojure.spec.alpha :as spec]
            [clojure.spec.test.alpha :as spec-test]))
```

## Using Spec functions
All functions from `clojure.spec.alpha` are accessible using the `spec` alias, e.g. `spec/conform`, `spec/valid?`, `spec/def`.




## Creating new projects
Create a new Clojure project using the `clj-new` tool or open an existing `deps.edn` based project.

```shell
clojure -M:new lib practicalli/leveraging-spec
```
The `clj-new` tool will include Clojure 1.10.x as a project dependency, which in turn includes the `clojure.spec.alpha` library.

The [practicalli/leveraging-spec](https://github.com/practicalli/leveraging-spec) project is a working example that includes `clojure.spec.alpha`.

> #### Hint::new alias in practicalli/clojure-deps
> Review or clone the [practicalli/clojure-deps](https://github.com/practicalli/clojure-deps-edn#creating-projects-from-templates) repository to include the alias to create a new Clojure project from a template using `clj-new`.
