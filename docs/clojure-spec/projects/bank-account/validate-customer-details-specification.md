# Testing data Specifications

The specifications defined so far can be tested with specific data, using the `conform` or `valid?` functions.

Generating sample data from the specifications also provides useful feedback on how well the specifications are defined.

## Generating data from specifications

Test data specifications by generating sample data from those specifications.

Evaluating these functions several times is a quick way to identifies specifications that may require custom generators. If individual specifications do not generate consistent data, then incorrect results may occur during composite data specifications or function specifications.

```clojure
(spec-gen/sample (spec/gen ::first-name))
(spec-gen/sample (spec/gen ::last-name))
(spec-gen/sample (spec/gen ::email-address))
(spec-gen/sample (spec/gen ::house-name-number))
(spec-gen/sample (spec/gen ::street-name))
(spec-gen/sample (spec/gen ::post-code))
(spec-gen/sample (spec/gen ::county))
(spec-gen/sample (spec/gen ::country))
(spec-gen/sample (spec/gen ::residential-address))
(spec-gen/sample (spec/gen ::social-security-id-uk))
(spec-gen/sample (spec/gen ::social-security-id-usa))
(spec-gen/sample (spec/gen ::social-security-id))
(spec-gen/sample (spec/gen ::customer-details))
(spec-gen/sample (spec/gen ::account-holder))
```

## Validating the customer details specifications

The specifications can be checked using the conform or valid? functions with example data.

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
