![Exercism.io challenge - Bob](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/exercism/exercisim-exercise-bob-banner.png)

Solution to Bob challenge using `clojure.string` functions and Character class from Java.

## Asking Bob a question?
The phrase passed to Bob is a question if the last alphanumeric character is a question mark.

Using a simple comparison we can check if the last character in the string a `?`

```clojure
(= \? (last "this is a question?"))
```

However if there is whitespace after the question mark then the `last` character is a whitespace and so the expression returns false

```clojure
  (= \? (last "this is still a question? "))

```

[`clojure.string/trimr`](https://clojuredocs.org/clojure.string/trimr) will remove all the trailing whitespace from the right side of a string.  Once trimmed, then our initial comparison code will work again.

```clojure
  (= \? (last (clojure.string/trimr "this is still a question? ")))
```

## Shouting at Bob
Unfortunately the  clojure.string API does not have a function to check if a string is in capital letters.  There is an `upper-case` function, so a comparison can be made  with the original string and the string returned from `clojure.string/upper-case`.

Convert the string to uppercase
```
(clojure.string/upper-case "watch out!")
```

compare the uppercase version of the string with the original, if they are equal, then the original string must have been in upper case
```clojure
  (= "WATCH OUT!"
     (clojure.string/upper-case "WATCH OUT!"))

```
```clojure
  (= "watch out!"
     (clojure.string/upper-case "watch out!"))
```

There is a flaw in this approach thought, as it will give false positives for strings that should return the 'Whatever' response
```clojure
  (= "1, 2, 3"
     (clojure.string/upper-case "1, 2, 3"))
```

Refined rule to check that the phrase contains alphabetic characters, otherwise it is not shouting.

The [java.lang.Character class](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Character.html) has a method called [isLetter](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Character.html#isLetter(char)) that determines if a character is a letter.


> The Classes and methods in `java.lang` are always available within a Clojure project, without the need for specifically importing the library.

`Character/isLetter` can be called as a function in Clojure, passing in a character type.

```
(Character/isLetter \a)
```

To support all Unicode characters there is an isLetter method that takes an integer type.  As there could be any kind of characters in the phrase, we will use the int version.  This required conversing the character to an int first before calling `Character/isLetter`

```
(Character/isLetter (int \a))
```
the [`some`](https://clojuredocs.org/clojure.core/some) function is used to iterate over all the characters in the phrase. As soon as a letter is found it returns true, so does not need to process the whole phrase unless no letter is found.

```
(some #(Character/isLetter (int %)) phrase)
```


## Silence of the Bob
`clojure.string/blank?` is a predicate function that returns true if a string is empty or contains only whitespace.  It also returns true for a `nil` value.


## Final solution
Each of the rules is bound to a name that represents either a true or false value returned from each expression.

The `cond` expression then evaluates the local names to see if they are true or false.  The first true value found returns the string associated with the name.

For the shouting question, the `and` is used to check if two names are both true.

```clojure

(defn response-for [phrase]
  (let [phrase    (string/trimr phrase)
        silence?  (string/blank? phrase)
        question? (= \? (last phrase))
        letters?  (some #(Character/isLetter (int %)) phrase)
        shouting? (and (= phrase (string/upper-case phrase))
                       letters?)]
    (cond
      (and shouting? question?) "Calm down, I know what I'm doing!"
      silence?                  "Fine. Be that way!"
      shouting?                 "Whoa, chill out!"
      question?                 "Sure."
      :else                     "Whatever.")))

```

> The first let binding, `phrase` over-rides the name of the argument to the function.  This is not that common an approach as over-riding can lead to confusion.  However, in this relatively simple example it feels okay to do.  The over-ride is the first let binding and it is preparing the string for all the other let bindings to use.

> Over-riding names of functions from the Clojure standard library is not recommended as this does lead to much confusion.
