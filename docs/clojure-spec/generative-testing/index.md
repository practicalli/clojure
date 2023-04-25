# Generative testing with Spec and Spec Test

Clojure spec has been used so far to create specifications for both data and functions.

Now spec and spec test libraries are used not just validity checking, but also to generate random samples of the data that can be used for extensive testing.

Generative testing provides a far more effective alternative to unit testing.

`clojure.spec.test/check/instrument` verifies that calls to a function satisfy the function's specification, the `:arg` in `fdef`.

`clojure.spec.test/check` function generates 1000 data values to be used as the inputs to a function, checks that the invocation of the function satisfies its specification, the `:ret` and `:fn` in `fdef`.  The argument specification, `:arg` in `fdef` is used to generate a wide range of results, which are more capable of finding edge cases that fail.

<p style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/W6crrbF7s2s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>


## Example: card game

[practicalli/spec-generative-testing](https://github.com/practicalli/spec-generative-testing) is a simple card game with specifications that are used for basic generative testing.

<p style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/xZQ7p-YBHtE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>


## References

* [Clojure.org guides: Spec - Generators](https://clojure.org/guides/spec#_generators)
* [API reference: clojure.spec.gen.alpha](https://clojure.github.io/spec.alpha/clojure.spec.gen.alpha-api.html)
* [API reference: clojure.spec.test.alpha](https://clojure.github.io/spec.alpha/clojure.spec.test.alpha-api.html)
* [Video: How to do Stateful Property Testing in Clojure?](https://www.youtube.com/watch?v=xw8ZFU8CGdA)

<!--
  TODO: Hand rolling spec test

  (->>
    (spec-test/check `function-with-a-spec)
    ,,, ;; test more functions ??
    (spec-test/summarize-results))

(spec/exercise-fn ..

  -->
