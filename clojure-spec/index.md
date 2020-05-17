# Clojure spec
Define flexible specifications around data and function definitions to test for correctness and generate comprehensive test data.

Spec is included in Clojure from [version 1.9](https://clojure.org/news/2017/12/08/clojure19) onward and can be used by requiring the `clojure.spec.alpha` in the REPL or in namespaces of a Clojure project.


## Using Spec in the REPL
Run a Clojure REPL and require the `clojure.spec.alpha` to use functions from that namespace.

```shell
clojure -A:rebel
```
```clojure
(require 'clojure.spec.alpha)
```

## Using a project
Create a Clojure project and add `clojure.spec.alpha` to namespaces that will use functions from that namespace.

```clojure
(ns practicalli.app-specs
  (:require [clojure.spec.alpha :as spec]))
```

## Trying clojure.spec
Follow the examples in these two excellent videos

{% youtube %}
https://www.youtube.com/watch?v=nqY4nUMfus8
{% endyoutube %}

{% youtube %}
https://www.youtube.com/watch?v=W6crrbF7s2s
{% endyoutube %}


> #### Hint::Why is the spec library called alpha?
> The library is called clojure.spec.alpha as the design of spec is not guaranteed to be stable and there may be some changes to the design in later versions.  Clojure aims for backwards compatibility, so new versions will not break existing use of spec code.

## References
* [Introducing clojure.spec](https://clojure.org/news/2016/05/23/introducing-clojure-spec)
* [clojure.spec - rational and overview](https://clojure.org/about/spec)
* [spec guide - clojure.org](https://clojure.org/guides/spec)
* [Leveraging clojure.spec - Stuart Halloway - YouTube](https://www.youtube.com/watch?v=nqY4nUMfus8)
* [spec.test - Stuart Halloway - YouTube](https://www.youtube.com/watch?v=W6crrbF7s2s)
