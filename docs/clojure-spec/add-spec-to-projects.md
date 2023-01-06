# Add Spec to Clojure Projects

Add the `clojure.spec.alpha` to namespaces in the project that should directly use functions from that library.  It is recommended to use the `spec` alias to clearly indicate where those functions are defined.

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

```bash
clojure -T:project/new :template lib :name practicalli/leveraging-spec
```

The project is created with Clojure as a dependency, which in turn includes the `clojure.spec.alpha` library.

> Clojure 1.9.0 or higher versions include Clojure Spec.  Clojure 1.11.1 is recommended.

The [practicalli/leveraging-spec](https://github.com/practicalli/leveraging-spec) project is a working example that includes `clojure.spec.alpha`.

> #### Hint:: :project/new is an alias from practicalli/clojure-deps-edn
> [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn#clojure-projects) repository includes the `:project/new` alias for creating new Clojure projects from a template using [`clj-new`](https://github.com/seancorfield/clj-new).
