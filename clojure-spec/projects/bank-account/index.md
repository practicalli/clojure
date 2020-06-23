# Spec project: Bank Account
A relatively simple bank account application with data and function specifications, including generative testing data and function instrumentation.

## Create deps.edn project
Use Clojure CLI and `clj-new`

```shell
clojure -A:new app practicalli/banking-on-clojure
```

<!-- > #### Hint::practicalli/bancking-on-clojure repository -->
<!-- > practicalli/bancking-on-clojure repository contains a complete example of the code -->

## Outline design of project

Data Specifications are created for
* Customer Details
* Account holder
* Bank account
* Multiple Bank accounts
* Credit Card
* Mortgate

Functions and specifications are created for
* register-account-holder
* open-credit-account
* open-savings-account
* open-credit-card-account
* open-mortgage-account
* Make a payment
* Send account notification
* Check for overdraft


## Development Workflow
* Write a failing test
* write mock data
* write an function definition that returns the argument
* run tests - tests should fail
* write a spec for the functions argument - customer
* write a spec for the return value
* replace the mock data with generated values from specification
* update functions and make tests pass
* run specification checks
