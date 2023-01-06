# Polymorphic function definitions

Polymorphic means many forms.

The simplest example of polymorphism in Clojure is a function definition that acts differently based on the number of arguments passed.

Usually you define a function with one set of arguments, either none `[]`, one `[one]` or many `[any number of args]`, using the basic syntax

```clojure
(defn name
"I am the doc string to describe the function"
  [args]
  (str "define your behaviour here"))
```

Instead of writing multiple functions with the same name that each take different numbers of arguments, you can use the following polymorphic syntax in Clojure

```clojure
(defn name
  "I am the doc string to describe the function"
  ([]
    (str "behaviour with no args"))
  ([one]
    (str "behaviour with one arg"))
  ([one two & args]
    (str "behaviour with multiple args")))
```

> **Note** Write a simple function called `i-am-polly` that returns a default message when given no arguments and a custom message when given a custom string as an argument

<!--sec data-title="Reveal answer" data-id="answer001" data-collapse=true ces-->

```clojure
(defn i-am-polly
  ([] (i-am-polly "My name is polly"))
  ([message] (str message)))

(i-am-polly)
(i-am-polly "I call different behaviour depending on arguments sent")
```

<!--endsec-->
