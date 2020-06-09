# Clojure spec
Define flexible specifications around data and function definitions to test for correctness and generate comprehensive test data.

Spec is included in Clojure from [version 1.9](https://clojure.org/news/2017/12/08/clojure19) onward and can be used by requiring the `clojure.spec.alpha` in the REPL or in namespaces of a Clojure project.


<!-- * Robust programs -->
<!-- * communication - human (additional docs) and system to system (over the wire) -->
<!-- * Error reporting (already used for many clojure.core functions) -->
<!-- * Wider scope in testing -->

## Purpose of Clojure spec
A summary highlighting the common purposes that Clojure Spec is used for

| Purpose                         | Description                                                                                   |
|---------------------------------|-----------------------------------------------------------------------------------------------|
| Living documentation            | Use spec to include specifications in Function documentation (`fdef`)                           |
| Data Validation                 | Ensure the data entering and leaving the system or its key functions are of the correct form. |
| Test Data Generation            | Provide extensive test data coverage with minimal code maintenance                            |
| Generative testing of functions | Test functions using their spec defined contract (`fdef`)                                     |
| Generative scenario testing     | Specific correct usage paths for known states                                                 |
| Development time checking       | Instrument functions to ensure correctness                                                    |
| Derive code from specifications | Specify a system of record for data structures, internal and external to the system.          |

* [How do you use clojure.spec - Sean Corfield](https://corfield.org/blog/2019/09/13/using-spec/)

## Example code
* [practicalli/leveraging-spec](https://github.com/practicalli/leveraging-spec) - basic examples of using spec, following the [Practicalli Spec broadcasts](https://www.youtube.com/playlist?list=PLpr9V-R8ZxiBWGAuncfBRYhZtY5-Bp75s)

## Understanding the basics of Clojure Spec
{% youtube %}
https://youtu.be/rj7Wsw4VFI0
{% endyoutube %}


## Trying clojure.spec
Follow the examples in these two excellent videos

{% youtube %}
https://www.youtube.com/watch?v=nqY4nUMfus8
{% endyoutube %}

{% youtube %}
https://www.youtube.com/watch?v=W6crrbF7s2s
{% endyoutube %}


## Why is the spec library called alpha?
The library is called `clojure.spec.alpha` as the design of spec is still evolving and there may be some changes to the design in later versions.  Clojure aims for backwards compatibility, so new versions typically do not break existing use of libraries.

There are some important changes being developed for spec version 2 and a few things may change, however, the large majority of Spec will remain the same and is safe to use.


## References
* [Introducing clojure.spec](https://clojure.org/news/2016/05/23/introducing-clojure-spec)
* [clojure.spec - rational and overview](https://clojure.org/about/spec)
* [spec guide - clojure.org](https://clojure.org/guides/spec)
* [Leveraging clojure.spec - Stuart Halloway - YouTube](https://www.youtube.com/watch?v=nqY4nUMfus8)
* [spec.test - Stuart Halloway - YouTube](https://www.youtube.com/watch?v=W6crrbF7s2s)
