# Strings

  Strings in Clojure are actually Java Strings.

> **Hint**  Why do you think this design decision was taken for Clojure?

> If you think about the state property of String objects, then you realise that String Objects are immutable and cannot be changed.  As this is the default approach for other data structures and values in Clojure it makes sense to use Java Strings instead of writing a Clojure implementation.

  As Clojure strings are Java strings, then you can use all the same functions you can in Java.

> **Note** Use the Java function `println` to output a string

```clojure
(println "Hello, whats different with me?  What value do I return")
```

![Using the println function](../images/clojure-playground-println.png)

 Something different happens when you evaluate this expression.  The actual value returned is `nil`, not the string.  You see the string because println is writing to the console (i.e the REPL).

> **Hint** Avoid code that creates side-effects where possible to keep your software less complex to understand.

> You may be used to using println statements to help you debug your code, however, with the fast feedback you get from developing in the REPL then there is usually no need for them.

## Strings the Clojure way

  Its more common to use the `str` function when working with strings, as this function returns the string as its. value when evaluated.

(str "Hello, I am returned as a value of this expression")

> **Note** Join strings together with the function str

```clojure
(str "I" "like" "to" "be" "close" "together"
(str "Hello" ", " "Devoxx UK")
(str "Hello "  "developers" ", " "welcome" " " "to" " " "HackTheTower UK")
```

  You can see that there are no side-effects when using `str` and the string is returned as the value of the function call.

# Using Interpose with Strings

Its easy to join strings together with the `str` function, however `str` leaves no spaces between words.

# Using Regex

# Java Interop for Strings
>
> **Note** Change the case of strings and other common actions using the String object methods, in the form `(.methodName object)`

```clojure
(.toUpperCase "show me the money")

(.getName String)

(.indexOf "Where is the $ in this string" "$")
```

> **Hint** Look at the API docs for [java.lang.String](http://docs.oracle.com/javase/8/docs/api/java/lang/String.html) for other methods you can call.
