## Generate test data from Specifications
Now there are specifications for the customer-details and account-details, spec can generate random data for use with tests.

## Add requires to the test namespace
Edit the `src/test/practicalli/banking_on_clojure.clj` and add requires for the `banking-specifications`, `clojure.spec.alpha` and `clojure.spec.test.alpha`.

```clojure
(ns practicalli.banking-on-clojure-test
  (:require [clojure.test :refer [deftest is testing]]
            [clojure.spec.alpha :as spec]
            [clojure.spec.test.alpha :as spec-test]
            [clojure.spec.gen.alpha :as spec-gen]
            [practicalli.banking-on-clojure :as SUT]
            [practicalli.banking-specifications]))
```


## Using Generators to generate data
Test data can now be generated from this specification, creating values for each key in the hash-map.

The ::email-address specification has been simplified, as the regular expression version requires a custom generator (no built in generator to support this specification).  The simplified email specification is:

```
(spec/def ::email-address string?)
```

> #### Hint::Libraries for custom generators
> [gfredericks/test.chuck](https://github.com/gfredericks/test.chuck) is a utility library for test.check and will work with clojure spec as its a wrapper around test.check.
>
> [lambdaisland/regal](https://github.com/lambdaisland/regal) also has test.check generators that can be used for regular expressions defined with the regal (hiccup style) syntax.


With the simplified email specification, the customer-details specification can be used to generate all the data using the built in clojure.spec.alpha generators.

```clojure
(spec-gen/generate (spec/gen :practicalli.banking-specifications/customer-details))

;; => #:practicalli.banking-specifications
{:first-name "r7q9RFB202v7a69z",
 :last-name "6N5",
 :email-address "L6dd946p680P0pIYZ33CGZd0",
 :residential-address
   #:practicalli.banking-specifications{
      :house-name-number "gCuRMe0C8",
      :street-name "5",
      :post-code "VN"},
      :social-security-id "a7P0xfBNPv6"}
```


Bind the result of this function to a name and it can be used as mock data throughout the unit tests defined.


```clojure
(defn customer-details-mock-data
  (spec-gen/generate (spec/gen :practicalli.banking-specifications/customer-details)))
```

The generated data can also be used with function definitions and `clojure.spec.test.alpha/check` function.


## Generating more than one value for a specification
`clojure.spec.gen.alpha/sample` will generate 10 random values from the specification

```clojure
(spec-gen/sample (spec/gen :practicalli.banking-specifications/customer-details))

;; => (#:practicalli.banking-specifications{:first-name "", :last-name "", :email-address "", :residential-address #:practicalli.banking-specifications{:country "", :county "", :house-name-number "", :street-name "", :post-code ""}, :social-security-id "2P902qTJCP6"}

#:practicalli.banking-specifications{:first-name "", :last-name "z", :email-address "", :residential-address #:practicalli.banking-specifications{:house-name-number 0, :street-name "", :post-code "R"}, :social-security-id "3dDBA7pa98r"}

#:practicalli.banking-specifications{:first-name "nQ", :last-name "w", :email-address "h6", :residential-address #:practicalli.banking-specifications{:country "", :county "7u", :house-name-number "", :street-name "87", :post-code ""}, :social-security-id "x57pf2H2i16"}

#:practicalli.banking-specifications{:first-name "ac", :last-name "L0x", :email-address "S", :residential-address #:practicalli.banking-specifications{:country "Xd", :county "", :house-name-number "P", :street-name "", :post-code ""}, :social-security-id "j5iTA70j9FW"}

#:practicalli.banking-specifications{:first-name "e", :last-name "ic", :email-address "15G", :residential-address #:practicalli.banking-specifications{:house-name-number "", :street-name "Nj", :post-code "f"}, :social-security-id "I83rx1wUj07"}

#:practicalli.banking-specifications{:first-name "zPr", :last-name "r", :email-address "hsVz", :residential-address #:practicalli.banking-specifications{:country "W", :house-name-number "S", :street-name "64", :post-code "85s25"}, :social-security-id "8EEDiy28SX7"}

#:practicalli.banking-specifications{:first-name "QzoV", :last-name "", :email-address "iS", :residential-address #:practicalli.banking-specifications{:county "OaMj9", :house-name-number 1, :street-name "pzc0ji", :post-code "tv1"}, :social-security-id "9z88KM5TLKK"}

#:practicalli.banking-specifications{:first-name "w73AA", :last-name "", :email-address "", :residential-address #:practicalli.banking-specifications{:county "sUj", :house-name-number 4, :street-name "jw", :post-code "652Z"}, :social-security-id "rZMUTPK72N6"}

#:practicalli.banking-specifications{:first-name "j09f", :last-name "EoU", :email-address "sA82q", :residential-address #:practicalli.banking-specifications{:country "28nyq3", :county "5PURE", :house-name-number "1NzKwe", :street-name "28Y", :post-code "t"}, :social-security-id "yNBdc7M29Io"}

#:practicalli.banking-specifications{:first-name "Xa38iX8FP", :last-name "u4G", :email-address "Ne1w25nJ", :residential-address #:practicalli.banking-specifications{:country "H07", :house-name-number -17, :street-name "jWRhfrrz9", :post-code "sF9"}, :social-security-id "IX2w8Xx8u0n"})
```

Generating multiple result is useful if a collection of customer details is required for testing purposes.



## Exercising a specification
`clojure.spec.test.alpha/exercise` returns pairs of generated and conformed values for a spec. exercise by default produces 10 samples (like sample) but you can pass both functions a number indicating the number of samples to produce.


```clojure
(spec/exercise (spec/cat :practicalli.banking-specifications/first-name :practicalli.banking-specifications/last-name))

;; => ([("") #:practicalli.banking-specifications{:first-name ""}]
       [("6") #:practicalli.banking-specifications{:first-name "6"}]
       [("") #:practicalli.banking-specifications{:first-name ""}]
       [("6") #:practicalli.banking-specifications{:first-name "6"}]
       [("W") #:practicalli.banking-specifications{:first-name "W"}]
       [("ljooD") #:practicalli.banking-specifications{:first-name "ljooD"}]
       [("704d5x") #:practicalli.banking-specifications{:first-name "704d5x"}]
       [("EZyBT") #:practicalli.banking-specifications{:first-name "EZyBT"}]
       [("1e6") #:practicalli.banking-specifications{:first-name "1e6"}]
       [("v") #:practicalli.banking-specifications{:first-name "v"}])
```

`clojure.spec.test.alpha/exercise-fn` provides the same service but for function specifications (`fdef`).
