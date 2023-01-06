# Function definition specifications
`clojure.spec.alpha/fdef` defines a specification for a function definition, providing specific specification for

* arguments passed when calling a function
* return value expected
* relationships between arguments and return value


## Examples

The `practicalli.database-access/new-account-holder` function takes a customer details specification and returns an `account-holder-id` specification.

```
(spec/fdef practicalli.database-access/new-account-holder
  :args (spec/cat :customer ::customer-details)
  :ret ::account-holder-id)
```
