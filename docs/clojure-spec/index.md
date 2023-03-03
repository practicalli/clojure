# Clojure Specifications

![Clojure specifications banner](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/spec/clojure-spec-blueprints-industrial.png)

Clojure Spec is a library for defining specifications around data and functions to test for correctness.

A spec defines the expected shape of specific values in Clojure and specs are intended to be used across multiple projects.  Specifications for more complex values are composed of specific value specifications, providing a flexible way to define what key parts of the system should look like.

Clojure specs are used to generate comprehensive test data, identifying more scenarios and edge cases with less code.

Spec is included in Clojure [version 1.9](https://clojure.org/news/2017/12/08/clojure19){target=_blank} onward and can be used by requiring the `clojure.spec.alpha` in the REPL or in namespaces of a Clojure project.

## Recommended Reading

[What is Clojure spec - an illustrated guide](https://www.pixelated-noise.com/blog/2020/09/10/what-spec-is/){target=_blank .md-button}


## Purpose of Clojure spec

A summary highlighting the common purposes that Clojure Spec is used for

| Purpose                         | Description                                                                                  |
|---------------------------------|----------------------------------------------------------------------------------------------|
| Living documentation            | Use spec to include specifications in Function documentation (`fdef`)                        |
| Data Validation                 | Ensure the data entering and leaving the system or its key functions are of the correct form |
| Test Data Generation            | Provide extensive test data coverage with minimal code maintenance                           |
| Generative testing of functions | Test functions using their spec defined contract (`fdef`)                                    |
| Generative scenario testing     | Specific correct usage paths for known states                                                |
| Development time checking       | Instrument functions to ensure correctness                                                   |
| Derive code from specifications | Specify a system of record for data structures, internal and external to the system.         |



## Example use cases

* API requests (schema is often used here, but so can spec)
* Checking data pulled from / pushed to message systems (e.g. Kafka, TIBCO)
* Data specifications (eg. Vega-lite)


## Example code

[:fontawesome-brands-github: practicalli/leveraging-spec](https://github.com/practicalli/leveraging-spec){target=_blank .md-button}

[practicalli/leveraging-spec](https://github.com/practicalli/leveraging-spec){target=_blank} - basic examples of using spec, following the [Practicalli Spec broadcasts](https://www.youtube.com/playlist?list=PLpr9V-R8ZxiBWGAuncfBRYhZtY5-Bp75s){target=_blank}


## Understanding the basics of Clojure Spec

<p style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/rj7Wsw4VFI0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>


## Trying clojure.spec

Follow the examples in these two excellent videos

<p style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/nqY4nUMfus8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>


<p style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/W6crrbF7s2s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>


## Why is the spec library called alpha?

The library is called `clojure.spec.alpha` as the design of spec is still evolving and there may be some changes to the design in later versions.  Clojure aims for backwards compatibility, so new versions typically do not break existing use of libraries.

There are some important changes being developed for spec version 2 and a few things may change, however, the large majority of Spec will remain the same and is safe to use.


## References

[spec guide - clojure.org](https://clojure.org/guides/spec){target=_blank .md-button}
[Introducing clojure.spec](https://clojure.org/news/2016/05/23/introducing-clojure-spec){target=_blank .md-button}
[clojure.spec - rational and overview](https://clojure.org/about/spec){target=_blank .md-button}

[spec.alpha API reference](https://clojure.github.io/spec.alpha/){target=_blank .md-button}

[How do you use clojure.spec - Sean Corfield](https://corfield.org/blog/2019/09/13/using-spec/){target=_blank .md-button}

[:fontawesome-brands-github: Specifications for `clojure.core`](https://github.com/clojure/core.specs.alpha){target=_blank .md-button}

[:fontawesome-brands-youtube: Leveraging clojure.spec - Stuart Halloway](https://www.youtube.com/watch?v=nqY4nUMfus8){target=_blank .md-button}
[:fontawesome-brands-youtube: spec.test - Stuart Halloway](https://www.youtube.com/watch?v=W6crrbF7s2s){target=_blank .md-button}

[Clojure Spec: Expressing Data Constraints without Types](https://www.infoq.com/presentations/clojure-spec/){target=_blank .md-button}
