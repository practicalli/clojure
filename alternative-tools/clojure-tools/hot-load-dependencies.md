# Hot-loading of Library Dependencies

> #### WARNING::WARNING: Not an official or at all supported approach
> Hot loading is not part of any official Clojure development approach and the code is currently in an alpha state and the design is currently changing.
>
> Please expect this to break at a certain point and this approach should be used with caution and not relied upon in your workflow.

During development of Clojure applications, its common to add libraries to use functions already created for specific purposes.  To use a library typically requires the Clojure REPL to be restarted although there are several alternatives.

For Clojure deps.edn project libraries can be hot-loaded into a running REPL, removing the need to restart the REPL.

`clojure.tools.deps.alpha.repl/add-lib` is a function that provides hot-loading of library dependencies, although as mentioned this is likely to change soon as the design .



## Add alias for tools.deps.alpha
Use the `deps.edn` configuration from [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn/) which included a [`:hot-load-deps`](https://github.com/practicalli/clojure-deps-edn/blob/master/deps.edn#L324-L330) alias for the `clojure.tools.deps.alpha.repl` library.

Start a REPL session using the Clojure CLI tools, optionally including rebel readline for an enhance REPL UI.

```shell
clojure -A:hot-load-deps:rebel
```

A REPL will start an will download the required libraries for the `:hot-load-deps` alias (added to the local `~/.m2` maven cache on first run).

![Clojure REPL - hot load library dependencies](/images/clojure-repl-hot-load-deps-rebel.png)



## Hot-loading library dependencies
In the running REPL, require the `clojure.tools.deps.alpha` library.

```clojure
(require '[clojure.tools.deps.alpha.repl :refer [add-lib]])
```

Hot-load a library into the REPL using the `add-lib` function in the following form

```clojure
(add-lib 'domain/library {:mvn/version "RELEASE"})
```

![Clojure REPL hot load dependencies ](/images/clojure-repl-tools-deps-hot-reload-add-lib-require.png)


## Hot-loading Git dependencies
```clojure
(require '[clojure.tools.gitlibs :as gitlibs])
```
