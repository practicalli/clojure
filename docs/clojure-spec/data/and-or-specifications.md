# Combining specifications with and and or

`clojure.core/and` function and `clojure.core/or` function can be used to define a specification with multiple parts.

## Conform to One or more specifications

A specification for residential address included either a house number or name.  The `clojure.core/or` function allows either type of value to be used and conform to the specification.

```clojure
(spec/def ::house-name-number (or string? int?))
```

Using `spec/or` then unique keys are required for each possible type of value.  Keys are used to explain where a failure occurred if values do not conform to the specification.

```clojure
(spec/def ::house-name-number (spec/or :string string?
                                       :number int?))
```

If specifications are uses as the options in the `clojure.spec.alpha/or` then those specification names are used as the keys to explain where failure to conform to the specification happened.

```clojure

(spec/def ::social-security-id (spec/or ::social-security-id-uk
                                        ::social-security-id-usa))
```


## Conform to all specifications

Create a composite specification using `clojure.spec.alpha/and` when all specifications should be conformed by the values


For an arranged banking overdraft limit, the value should be a positive number, that is an integer type and is less than 1000.

```clojure
(spec/def ::arranged-overdraft-limit (spec/and pos? int? #(> 1000 %)))
```

If a value does not conform to any of the three specifications then the value fails the `::arranged-overdraft-limit` specification.
