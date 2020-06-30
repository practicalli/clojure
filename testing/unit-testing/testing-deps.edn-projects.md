## Configuration for Unit Testing deps.edn projects
To use the test runners with `deps.edn` projects, the `test` should be on the classpath.  Tests should not be included when Clojure is deployed, so the `test` path is not included in the main `paths` configuration.

The recommended approach is to include the test path as an alias, either by itself or with a test runner.

```clojure
{:paths ["src" "resource"]

:aliases
{:test-path
  {:extra-paths ["test"]}}
}
```


> #### Hint::Use practicalli/clojure-deps-edn to add common tools and aliases
> Create a fork of the [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn) on GitHub. Clone that fork to `~/.clojure/` and instantly have access to dozens of tools for Clojure software development

---

> #### Hint::Emacs CIDER test runner configuration
> Use a [`.dir-locals.el` file to configure default aliases](https://practicalli.github.io/spacemacs/testing/unit-testing/cider-test-deps-edn-projects.html) when running deps.edn projects from Emacs CIDER / Spacemacs.
