# Comments
As well as the classic line comments, Clojure also can comment specific parts of the code structure, even when it run over multiple lines.

`;;` to comment a whole line and `;` to add a comment after the start of a line

`(comment )` wraps forms and returns `nil` when evaluated, used for rich comment blocks

`#_` to ignore the next form as if it has not been written


## comment function
The `(comment ,,,)` function is used to included code that is only run by the developer directly. Unlike line comments, forms inside a comment block can be evaluated in a [Clojure aware editor](/clojure-editors/) to help the developer work with a project.

```clojure
(comment
  (map + [1 2 3] [1 2 3])
)
```

The `comment` function returns `nil` so its advised not to use it inside another form.  For example:

```
(map + [1 2 3] (comment [1 2 3])) ; nil will be passed to map as the third argument
```

This will fail as it tries to use the `+` function to add `1` to `nil`

The `#_` is the appropriate comment style for this example


### Rich comment blocks
Rich comment blocks are very useful for rapidly iterating over different design decisions by including the same function but with different implementations.  Hide [clj-kondo linter](/clojure-cli/install/install-clojure.html#clj-kondo-static-analyser--linter) warnings for redefined vars (`def`, `defn`) when using this approach.

```clojure
;; Rich comment block with redefined vars ignored
#_{:clj-kondo/ignore [:redefined-var]}
(comment

  ) ;; End of rich comment block
```

The expressions can represent example function for using the project, such as starting/restarting the system, updating the database, etc.

![Practicalli Clojure Repl Driven Development - Rich comment blocks example](/images/practicalli-clojure-repl-driven-development-rich-comment-blocks.png)

Expressions in rich comment blocks can also represent how to use a namespace API, providing examples of arguments to supply to further convey meaning to the code.

These rich comment blocks make a project more accessible and easier to use.

The "Rich" in the name also refers to Rich Hickey, the author and benevolent dictator of Clojure design.


## Comment forms with the comment reader macro
`#_` is the comment reader macro that instructs the Clojure reader to completely ignore the next form, as if it had never been written.

No value is returned, so this comment is safe to use within an expression.

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

`#_` can also be put on the line(s) before the Clojure form, which can make your code more readable and keep alignment of your code consistent.

### debugging with comment macro
As the comment macro can be used without returning a value, it can safely be added to code to help with debugging.

This code example finds the most common word in the text of a book.  Most of the lines of code in the threading macro have been commented to discover what the non-commented code does.

As each expression in the threading macros is understood, by looking at its results, comments can be removed to understand more of the code.

```clojure
(defn most-common-words [book]
  (->> book
       (re-seq #"[a-zA-Z0-9|']+" ,,,)
       #_(map #(clojure.string/lower-case %))
       #_(remove common-english-words)
       #_frequencies
       #_(sort-by val)
       #_reverse
       ))
```

This is an effective way to deconstruct parts of a larger Clojure expression.

Watch episode [#13 of Practicalli Clojure study group](https://youtu.be/ZkemmMgXT08?t=2015) to see this in practice.

### comment nested forms
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
