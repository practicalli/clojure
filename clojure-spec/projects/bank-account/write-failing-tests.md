# Write failing tests
In Test Driven Development style, first write unit tests for the banking functions.

Edit the `src/practicalli/banking_on_clojure_test.clj` and add `deftest` tests

```clojure
(deftest register-account-holder-test
  (testing "Basic registration - happy path"
    (is (= (set (keys (register-account-holder {})))
           (set (keys {:account-id "123" :customer-name "Jenny Jetpack"}))))))
```


## Write a function stub to run the tests
The tests cannot run unless they call the function to be tested.  A common approach it to write a function that returns the argument.

```clojure
(defn register-account-holder
  "Register a new customer with the bank
  Arguments:
  - hash-map of customer-details
  Return:
  - hash-map of an account-holder (adds account id)"

  [customer-details]

  customer-details)
```


## Add mock data
Define some initial mock data to use with the unit tests

```clojure
(def customer-mock
  {:first-name          "Jenny"
   :last-name           "Jetpack"
   :email-address       "jenny@jetpack.org"
   :residential-address "42 meaning of life street, Earth"
   :postal-code         "AB3 0EF"
   :social-security-id  "123456789"})
```


```clojure
account is a customer with a bank account id added

(def account-holder-mock
  {:account-id           #uuid "97bda55b-6175-4c39-9e04-7c0205c709dc"
   :first-name          "Jenny"
   :last-name           "Jetpack"
   :email-address       "jenny@jetpack.org"
   :residential-address "42 meaning of life street, Earth"
   :postal-code         "AB3 0EF"
   :social-security-id  "123456789"})
```


Update the test to use the mock data.

```clojure
(deftest register-account-holder-test
  (testing "Basic registration - happy path"
    (is (= (set (keys (register-account-holder customer-mock)))
           (set (keys account-holder-mock))))))
```
