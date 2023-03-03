# Add Spec to Clojure Projects

Add the `clojure.spec.alpha` to namespaces in the project that should directly use functions from that library.  It is recommended to use the `spec` alias to clearly indicate where those functions are defined.

```clojure
(ns practicalli.leveraging-spec
  (:require [clojure.spec.alpha :as spec]))
```

All functions from `clojure.spec.alpha` are accessible using the `spec` alias, e.g. `spec/conform`, `spec/valid?`, `spec/def`.

Evaluate the namespace definition to start using the functions from the namespace.

![Clojure project - require namespace and evaluate](https://raw.githubusercontent.com/practicalli/graphic-design/live/editors/clojure-project-spec-require-evaluated.png)


## Testing specifications

Add the `clojure.spec.test.alpha` to any namespaces in the project that will directly use the functions from that library.  `spec-test` alias is recommended to clearly indicate where functions are defined.

```clojure title="src/practicalli/leveraging_spec.clj"
(ns practicalli.leveraging-spec
  (:require
    [clojure.spec.alpha :as spec]
    [clojure.spec.test.alpha :as spec-test]))
```


## Creating new projects

Create a new Clojure project using the `clj-new` tool or open an existing `deps.edn` based project.

```bash title="Create new project"
clojure -T:project/create :template lib :name practicalli/leveraging-spec
```

The project is created with Clojure as a dependency, which in turn includes the `clojure.spec.alpha` library.

> Clojure 1.9.0 or higher versions include Clojure Spec.  Clojure 1.11.1 is recommended.

The [practicalli/leveraging-spec](https://github.com/practicalli/leveraging-spec) project is a working example that includes `clojure.spec.alpha`.

??? HINT "Practicalli Clojure CLI Config - :project/create alias"
    [Practicalli Clojure CLI Config](https://github.com/practicalli/clojure-deps-edn#clojure-projects) repository includes the `:project/create` alias for creating new Clojure projects from a template using [`deps-new`](https://github.com/seancorfield/deps-new).
