# Customer details specification
Create a new file for the specifications, `src/practicalli/banking_specifications.cljc`, with the namespace `practicalli.banking-specifications`.

Require the `clojure.spec.alpha` library with an alias of `spec`.

```clojure
(ns practicalli.banking-specifications
  (:require [clojure.spec.alpha :as spec]))
```

## Define basic customer details
Define a specification for the customer-details map, composed of all the required keys that define a customer.

The bank legally requires specific information about a customer in order to add them as an account holder

```clojure
(spec/def ::first-name string?)
(spec/def ::last-name string?)
(spec/def ::email-address string?)
```

> #### INFO::A more detailed email specification
> Use a regular expression to define the syntax of an email address, eg. jenny@jetpack.org
```clojure
(spec/def ::email-address
  (spec/and string?
            #(re-matches #"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$"
                         %)))
```
> This specification will require a custom generator

A residential address is made from several pieces of information and is defined as a composite specification, from several specifications.

```clojure
(spec/def ::house-name-number (spec/or :string string?
                                       :number int?))
(spec/def ::street-name string?)
(spec/def ::post-code string?)
(spec/def ::county string?)
(spec/def ::country string?)
```

```clojure
(spec/def ::residential-address (spec/keys :req [::house-name-number ::street-name ::post-code]
                                           :opt [::county ::country]))
```

A social security number specification is also a candidate for a composite specification. Social security numbers may take different forms and even have different names in different countries, eg. the [USA SSN](https://en.wikipedia.org/wiki/Social_Security_number) is a nine-digit number in the format "AAA-GG-SSSS"

In the UK the social security number is called the [National Insurance number](https://en.wikipedia.org/wiki/National_Insurance_number) and is of the form QQ123456C

```clojure
(spec/def ::social-security-id-uk string?)
(spec/def ::social-security-id-usa string?)
```

> #### INFO::Detailed social security numbers would check the different forms
> Predicate functions can be defined to check for the size of the different social security forms.
```clojure
(defn social-security-number-usa? [value] (= 9 (count value)))
(defn social-security-number-uk? [value] (= 11 (count value)))
(spec/def ::social-security-id-usa (spec/and string? social-security-number-usa?))
(spec/def ::social-security-id-uk (spec/and string? social-security-number-uk?))
```
> These specifications required a custom generator in order to produce correct data each time.

A general social security specification can now be defined, with one of any of the country specific specifications

```clojure
(spec/def ::social-security-id (spec/or ::social-security-id-uk
                                        ::social-security-id-usa))
```


## Composing the customer details specification
A customer details specification is a hash-map of key value pairs. The keys are the specifications that have just been defined.

`spec/keys` creates a specification for a hash-map with required and optional keys.  `spec/keys` also includes a check for a map, so no explicit check for a map is required.

```clojure
(spec/def ::customer-details
  (spec/keys
    :req [::first-name ::last-name ::email-address ::residential-address ::social-security-id]))
```
