# Using the project in rebel readline

> #### Hint::TODO: add screenshots using Rebel readline REPL

Start the rebel REPL

```shell
clojure -A:rebel
```

Once rebel has started a prompt will be displayed.


First required the main namespace, containing the functions of the application.  This loads the code in that namespace into the REPL.


```clojure
(require 'practicalli.banking-on-clojure)
```

Now add the specifications for the project

```clojure
(require 'practicalli.banking-on-clojure)
```


? When does the TAB completion start to work ?


Testing the specifications

First change into the specifications namepace so the fully qualified names of the specs are not required.

```clojure
(in-ns 'practicalli.banking-specifications)
```

Generate sample data from the specifications

```
(spec-gen/sample (spec/gen ::account-id))
```


The function specifications and the instrument functions are loaded from the requires, so test by calling the instrumented functions, first with bad data and then with correct data.

```clojure
(register-account-holder {})
```

Use the specifications to generate good data


```clojure
(register-account-holder ::customer-details)
```


Run generative tests on functions to check the return and fn values


```clojure
(spec-test/check `register-account-holder)
```
