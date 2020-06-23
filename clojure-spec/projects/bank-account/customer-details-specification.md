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
```
Use a regular expression to define the syntax of an email address, eg. jenny@jetpack.org

```clojure
(spec/def ::email-address
  (spec/and string?
            #(re-matches #"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$"
                         %)))
```
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

```clojure
(spec/def ::social-security-id-usa
  (spec/and string?
            #(= 11 (count %))))
```

> #### Hint::SSN specification library
> [nikortel/ssn](https://github.com/nikortel/ssn) is a library for USA specific social-security number validation and generation via spec
> Unfortunately the project is not on [clojars](https://clojars.org/), but could be copied into project as a separate namespace.

In the UK the social security number is called the [National Insurance number](https://en.wikipedia.org/wiki/National_Insurance_number) and is of the form QQ123456C

```clojure
(spec/def ::social-security-id-uk (spec/or :string string?
                                           :count #(= 9 (count %))))
```

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

## Validating the customer details specifications
Check an example hash-map from our test conforms to the specification

```clojure
(spec/conform ::customer-details
              {:first-name          "Jenny"
               :last-name           "Jetpack"
               :email-address       "jenny@jetpack.org"
               :residential-address "42 meaning of life street"
               :postal-code         "AB3 0EF"
               :social-security-id  "123456789"})
;; => :clojure.spec.alpha/invalid
```

The mock test data does not confirm to the specification, even though it has all the same keys as the map in the specification

```clojure
(spec/valid? ::customer-details
             {:first-name          "Jenny"
              :last-name           "Jetpack"
              :email-address       "jenny@jetpack.org"
              :residential-address "42 meaning of life street"
              :postal-code         "AB3 0EF"
              :social-security-id  "123456789"})
;; => false
```

`spec/explain` will provide more information to help diagnose the issue

```clojure
(spec/explain ::customer-details
              {:first-name          "Jenny"
               :last-name           "Jetpack"
               :email-address       "jenny@jetpack.org"
               :residential-address "42 meaning of life street"
               :postal-code         "AB3 0EF"
               :social-security-id  "123456789"})

;; {:first-name "Jenny", :last-name "Jetpack", :email-address "jenny@jetpack.org", :residential-address "42 meaning of life street", :postal-code "AB3 0EF", :social-security-id "123456789"}
;; - failed: (contains? % :practicalli.bank-account-design-journal/first-name) spec: :practicalli.bank-account-design-journal/customer-details
;; {:first-name "Jenny", :last-name "Jetpack", :email-address "jenny@jetpack.org", :residential-address "42 meaning of life street", :postal-code "AB3 0EF", :social-security-id "123456789"}
;; - failed: (contains? % :practicalli.bank-account-design-journal/last-name) spec: :practicalli.bank-account-design-journal/customer-details
;; {:first-name "Jenny", :last-name "Jetpack", :email-address "jenny@jetpack.org", :residential-address "42 meaning of life street", :postal-code "AB3 0EF", :social-security-id "123456789"}
;; - failed: (contains? % :practicalli.bank-account-design-journal/email-address) spec: :practicalli.bank-account-design-journal/customer-details
;; {:first-name "Jenny", :last-name "Jetpack", :email-address "jenny@jetpack.org", :residential-address "42 meaning of life street", :postal-code "AB3 0EF", :social-security-id "123456789"}
;; - failed: (contains? % :practicalli.bank-account-design-journal/residential-address) spec: :practicalli.bank-account-design-journal/customer-details
;; {:first-name "Jenny", :last-name "Jetpack", :email-address "jenny@jetpack.org", :residential-address "42 meaning of life street", :postal-code "AB3 0EF", :social-security-id "123456789"}
;; - failed: (contains? % :practicalli.bank-account-design-journal/social-security-id) spec: :practicalli.bank-account-design-journal/customer-details
```

The `::customer-details` spec is given a map with unqualified keys and is failing the `:req` part of the `spec/keys` part of the specification


## Qualifying keys with auto-resolve macro
The auto-resolve macro, `#::` will add the current namespace to all the keys in a hash-map

Change the test data to use qualified keys by adding the

```clojure
(spec/conform ::customer-details
              #::{:first-name          "Jenny"
                  :last-name           "Jetpack"
                  :email-address       "jenny@jetpack.org"
                  :residential-address "42 meaning of life street"
                  :postal-code         "AB3 0EF"
                  :social-security-id  "123456789"}  )
;; => #:practicalli.bank-account-design-journal{:first-name "Jenny", :last-name "Jetpack", :email-address "jenny@jetpack.org", :residential-address "42 meaning of life street", :postal-code "AB3 0EF", :social-security-id "123456789"}
```
