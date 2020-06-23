# Account holder specification
The account holder has the same information as custom details with the addition of an account-id

In the register-account-holder a uuid is generated for the account id, So a spec can be defined for this type

```clojure
(spec/def ::account-id uuid?)
```

## Design decision: hierachical or composite
There are several approaches to combining, depending on the shape of the data used

The account holder is a hash-map, so `spec/keys` will create the map from specification keys

Including the customer-details specification in `spec/keys` would include the customer details as a nested hash-map

```clojure
(spec/def ::account-holder-hierachy
  (spec/keys
    :req [::account-id ::customer-details]))
```

A valid data structure for this specification is a map with two keys, `account-id` and `customer-details`. `account-id` is a uuid value, customer-details is a hash-map of values that conform to the customer-details specification

```clojure
(spec/valid? ::account-holder-hierachy
             #::{:account-id       (java.util.UUID/randomUUID)
                 :customer-details #:: {:first-name          "Jenny"
                                        :last-name           "Jetpack"
                                        :email-address       "jenny@jetpack.org"
                                        :residential-address "42 meaning of life street, Earth"
                                        :postal-code         "AB3 0EF"
                                        :social-security-id  "123456789"}})
;; => true
```

Flat data structures are usually preferred in Clojure over a nested hierarchy. Rather than use the ::customer-details specification as a key in the `spec/keys` expression. The individual specifications that make up ::customer-details can be used.

```clojure
(spec/def ::account-holder-composition
  (spec/keys
    :req [::account-id ::first-name ::last-name ::email-address ::residential-address ::social-security-id]))
```

```clojure
(spec/valid? ::account-holder-composition
             #::{:account-id          (java.util.UUID/randomUUID)
                 :first-name          "Jenny"
                 :last-name           "Jetpack"
                 :email-address       "jenny@jetpack.org"
                 :residential-address "42 meaning of life street, Earth"
                 :postal-code         "AB3 0EF"
                 :social-security-id  "123456789"})
```
