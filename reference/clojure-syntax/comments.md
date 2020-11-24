# Comments

You can use `;;` to comment a whole line (`;` is the comment but `;;` is Clojure convention).

`(comment )` function can wrap other expressions to comment that code, returning `nil` when evaluated.

`#_` is the comment reader macro that comments out specific forms in Clojure, so you can get really specific with your comments.


## `comment` function

Wrap any Clojure code inside the `comment` function to prevent it from being executed.  Using your editor, you can manually evaluate the code inside a comment function.

The `comment` function returns `nil` so its advised not to use it inside another form.  For example:

```
(map + [1 2 3] (comment [1 2 3]))
```

This will fail as it tries to use the `+` function to add `1` to `nil`

## Comment forms with the comment reader macro

`#_` is the comment reader macro and is used to comment a Clojure form (Clojure code that can be evaluated).  `#_` is not just a line comment.

You can place `#_` before the start of a form and everything inside that form will be commented


```clojure
#_(def my-data [1 2 3 4 5])
```

`#_` will comment forms that span multiple lines, for example function definitions

```clojure
#_(defn my-function
        [args]
        (str "I am an experiment, so not always needed"))
```

`#_` can also be put on the line before the comment (possibly many lines - to test).  This approach can make your code more readable and keep alignment of your code consistent.

## comment nested forms

`#_` tells the reader to ignore the next form, it is therefore never evaluated and neither is the `#_`.  This means that `#_` can be used inside a nested form to comment just a part of the expression

In this example the third vector of values is not read by the Clojure reader and therefore is not passed as an argument to `+` function by `map`

`(map + [1 2 3] [4 5 6] #_[7 8 9])`


## Stacking comments

The comment reader macro has the ability to stack these comments on forms, so using `#_#_` will comment out two successive forms.

In a `let` form we can comment out a name binding that is causing problems.  As the name and value are both forms, then we use a stacked `#_` to comment both out.
We also do the same in the body of the let, so as to not include the evaluation of the string or `name2` local name in the `str` form.

```
(let [name1 "value"
       #_#_name2 "another-value]
   (str "First name is: " name1 #_#_" second name is: " name2
```


## Comments in threading macros

The comment reader macro can also be used in a threading macro, so provide a simple way to apply or skip a particular forms used within the threading macro.

```clojure
(->> book
     (re-seq #"[a-zA-Z0-9|']+" ,,,)
     (map #(clojure.string/lower-case %))
     #_(remove common-english-words)
     frequencies
     #_(sort-by val)
     #_reverse)
```

Watch episode [#13 of Practicalli Clojure study group](https://youtu.be/ZkemmMgXT08?t=2015) to see this in practice.
