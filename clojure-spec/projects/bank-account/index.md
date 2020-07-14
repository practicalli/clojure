# Spec project: Bank Account
A relatively simple bank account application with data and function specifications, including generative testing data and function instrumentation.

> #### Hint::Under active development
> Developed as part of the [Practicalli study guide live broadcasts](https://www.youtube.com/playlist?list=PLpr9V-R8ZxiBWGAuncfBRYhZtY5-Bp75s)

## Create deps.edn project
Use Clojure CLI and `clj-new`

```shell
clojure -A:new app practicalli/banking-on-clojure
```

> #### Hint::practicalli/bancking-on-clojure repository
> [practicalli/bancking-on-clojure repository](https://github.com/practicalli/banking-on-clojure) contains the latest code to date for this project.

## Outline design of project

Data Specifications are created for
* Customer Details &#10004;
* Account holder &#10004;
* Bank account
* Multiple Bank accounts
* Credit Card
* Mortgate

Functions and specifications are created for
* register-account-holder &#10004;
* open-credit-account
* open-savings-account
* open-credit-card-account
* open-mortgage-account
* Make a payment
* Send account notification
* Check for overdraft


## Development Workflow
* Write a failing test &#10004;
* write mock data &#10004;
* write an function definition that returns the argument &#10004;
* run tests - tests should fail &#10004;
* write a spec for the functions argument - customer &#10004;
* write a spec for the return value &#10004;
* write a spec for relationship between args and return value
* replace the mock data with generated values from specification &#10004;
* update functions and make tests pass &#10004;
* instrument functions
* run specification checks

&#10004;


Images to add

Running tests that fail on a spec in CIDER
spacemacs-cider-test-spec-fail-banking-on-clojure-project.png

Running tests that fail on a spec on CircleCI
circle-ci-banking-on-clojure-spec-test-runner-fail-register-account-holder-did-not-conform-to-spec.png
