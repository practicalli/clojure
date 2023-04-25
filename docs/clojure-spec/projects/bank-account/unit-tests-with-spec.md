# Unit tests with specs

Now that customer data and account-holder data has a specification, we can use the `clojure.spec.alpha/valid?` in the unity test code, as that function returns true or false.

In this example the result of a call to `register-account-holder` is checked to see if it is valid against the `::account-holder` specification.  This simplifies the code needed in unit test assertions, as Clojure spec is doing the work.

```clojure
(deftest register-account-holder-test
  (testing "Basic registration - happy path"
    (is (= (set (keys (SUT/register-account-holder customer-mock)))
           (set (keys account-holder))))

    (is (spec/valid? :practicalli.bank-account-spec/account-holder
                     (SUT/register-account-holder customer-mock) ) )
    ))
```
