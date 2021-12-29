# Specifications for function definitions - `fdef`
Create a `spec/fdef` for the register-account-holder function

`clojure.spec.alpha/fdef` defines a specification for a function definition, `defn`. Specifications can attached to the arguments using `:args`, the return value using `:ret` and the relationship between the two using `fn`.

`:args`, `:ret` and `fn` are optional, although `args` and `ret` are required if you want to use `:fn`


## Add a spec to cover the function arguments.
`:args` is a compound specification that covers all the function arguments. The `:args` spec is invoked with the arguments in a list, so working with them is like using apply.

Using regular expressions we can find the right arguments to give to the specification. Regular expression spec functions include
* `spec/cat`
* `spec/alt`
* `spec/*`

The register-account-holder only takes one argument, so `spec/cat` is used to bind a local key to the specification.

The function is defined in the `practicalli.banking-on-clojure` namespace.  Require that namespace in the current `ns` form.

```clojure
(ns practicalli.banking-specifications
  (:require [clojure.spec.alpha :as spec]
            [clojure.spec.gen.alpha :as spec-gen]
            [clojure.spec.test.alpha :as spec-test]

            [practicalli.banking-on-clojure :as SUT]))
```
The `SUT` alias is used for the banking-on-clojure namespace, as is done with `clojure.test` unit test namespaces.

```clojure
(spec/fdef SUT/register-account-holder
  :args (spec/cat :customer
                  :practicalli.bank-account-spec/customer-details))
```


## Checking function calls against the spec - instrument
`spec/fdef` by itself does not run checks against the specs

```clojure
(register-account-holder {})
;; => {:account-id #uuid "3a6dddb7-dd87-485e-90f8-8c8975302845"}
```

Require the Clojure spec test library

```clojure
(require '[clojure.spec.test.alpha :as spec-test])
```

`spec/instrument` will add a run time check for the specification

```clojure
(spec-test/instrument `SUT/register-account-holder)
```

No the function is instrumented, data used as arguments of a function call will be checked against the specification.

```clojure
(register-account-holder {::bad "data"})
```

This function call throws an exception because of the specification attached to the `:args` section of the `fdef` specification.

The error report provides detailed and quite clear information to help diagnose the issue

```clojure
 1. Unhandled clojure.lang.ExceptionInfo
 Spec assertion failed.

 Spec: #object[clojure.spec.alpha$regex_spec_impl$reify__2509 0x12b66a86 "clojure.spec.alpha$regex_spec_impl$reify__2509@12b66a86"]
 Value: (#:practicalli.bank-account-design-journal{:bad "data"})

 Problems:

 val: #:practicalli.bank-account-design-journal{:bad "data"}
 in: [0]
 failed: (contains? % :practicalli.bank-account-spec/first-name)
 spec: :practicalli.bank-account-spec/customer-details
 at: [:customer]

 val: #:practicalli.bank-account-design-journal{:bad "data"}
 in: [0]
 failed: (contains? % :practicalli.bank-account-spec/last-name)
 spec: :practicalli.bank-account-spec/customer-details
 at: [:customer]

 val: #:practicalli.bank-account-design-journal{:bad "data"}
 in: [0]
 failed: (contains? % :practicalli.bank-account-spec/email-address)
 spec: :practicalli.bank-account-spec/customer-details
 at: [:customer]

 val: #:practicalli.bank-account-design-journal{:bad "data"}
 in: [0]
 failed: (contains? % :practicalli.bank-account-spec/residential-address)
 spec: :practicalli.bank-account-spec/customer-details
 at: [:customer]

 val: #:practicalli.bank-account-design-journal{:bad "data"}
 in: [0]
 failed: (contains? % :practicalli.bank-account-spec/social-security-id)
 spec: :practicalli.bank-account-spec/customer-details
 at: [:customer]
```

Calling the register-account-holder with a value that conforms to the bank-account-spec for customer details returns the new value for account-holder

```clojure
(register-account-holder
  #:practicalli.bank-account-spec
  {:first-name          "Jenny"
   :last-name           "Jetpack"
   :email-address       "jenny@jetpack.org"
   :residential-address "42 meaning of life street, Earth"
   :postal-code         "AB3 0EF"
   :social-security-id  "123456789"})

;; => {:practicalli.bank-account-spec/first-name "Jenny", :practicalli.bank-account-spec/last-name "Jetpack", :practicalli.bank-account-spec/email-address "jenny@jetpack.org", :practicalli.bank-account-spec/residential-address "42 meaning of life street, Earth", :practicalli.bank-account-spec/postal-code "AB3 0EF", :practicalli.bank-account-spec/social-security-id "123456789", :account-id #uuid "e0f327de-4e92-479e-a9de-468e2c7c0e6d"}
```


## Add a specification to the return value,
Attach the account-holder details specification to `:ret`

```clojure
(spec/fdef register-account-holder
  :args (spec/cat :customer
                  :practicalli.bank-account-spec/customer-details)
  :ret :practicalli.bank-account-spec/account-holder)
```

If the `register-account-holder` logic changes to return a different value that the return spec, then an exception is raised

Returns an integer rather than a uuid

```clojure
(defn register-account-holder
  "Register a new customer with the bank
  Arguments:
  - hash-map of customer-details
  Return:
  - hash-map of an account-holder (adds account id)"
  [customer-details]

  (assoc customer-details
         :practicalli.bank-account-spec/account-id
         (rand-int 100000)
         #_(java.util.UUID/randomUUID)))
```

So this should fail
```clojure
(register-account-holder
  #:practicalli.bank-account-spec
  {:first-name          "Jenny"
   :last-name           "Jetpack"
   :email-address       "jenny@jetpack.org"
   :residential-address "42 meaning of life street, Earth"
   :postal-code         "AB3 0EF"
   :social-security-id  "123456789"})
```

It still works as `spec-test/instrument` only checks the args value.

`spec-test/check` will test the return value with generated tests

```clojure
(require '[clojure.spec.gen.alpha :as spec-gen])
```

```clojure
(spec-test/check `SUT/register-account-holder)
```

The result is 100 generated tests that all fail, because the function was changed to return integers, not uuids

```clojure
 1. Caused by clojure.lang.ExceptionInfo
 Couldn't satisfy such-that predicate after 100 tries.
 {:pred      #function[clojure.spec.alpha/gensub/fn--1876],
  :gen       {:gen #function[clojure.test.check.generators/such-that/fn--8322]},
  :max-tries 100}
```

## Change the function back again.

```clojure
(defn register-account-holder
  "Register a new customer with the bank
  Arguments:
  - hash-map of customer-details
  Return:
  - hash-map of an account-holder (adds account id)"
  [customer-details]

  (assoc customer-details
         :practicalli.bank-account-spec/account-id
         (java.util.UUID/randomUUID)))
```

## Instrument the function
Testing function calls against the specification

Requires the spec test namespace

```clojure
(require '[clojure.spec.test.alpha :as spec-test])
```

Instrument the spec to add checking, this only checks the arguments are correct.

```clojure
(spec-test/instrument `practicalli.bank-account/register-account-holder)

```


```clojure
(register-account-holder {:first-name          "Jenny"
                          :last-name           "Jetpack"
                          :email-address       "jenny@jetpack.org"
                          :residential-address "42 meaning of life street"
                          :postal-code         "AB3 0EF"
                          :social-security-id  "123456789"})
```
