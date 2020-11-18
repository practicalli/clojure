![Exercism.io challenge - Bob](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/exercism/exercisim-exercise-bob-banner.png)

Solution to Bob challenge using regular expressions and the `re-matches` function.

Using `re-matchers`, if the string matches the pattern, then the string is returned. Otherwise `nil` is returned

The [regular expressions cheatsheet from Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet) was very helpful in understanding regular expressions


## Asking Bob a question?
The phrase passed to Bob is a question if the last alphanumeric character is a question mark. Using a simple regular expression we can check if the last character in the string a `?`

`#"\?"` is a literal regular expression pattern that will match a single `?` character

So the regular expression pattern will match a single ? character

```eval-clojure
  (re-matches #"\?" "?")
```

With other characters present though the pattern doesn't match.

```eval-clojure
  (re-matches #"\?" "Ready?")
```

To match `?` with other characters,

`.` matches any single character except line terminators (new line, carriage return)

```eval-clojure
(re-matches #".\?" "R?")
```

`.*` matches any number of single characters one or more times,

```eval-clojure
(re-matches #".*\?" "?Ready")
```

`\s` matches a single whitespace character and `\s*` matches multiple whitespace characters

```eval-clojure
  (re-matches #".*\?$" "Okay if like my  spacebar  quite a bit?")
  ;; => "Okay if like my  spacebar  quite a bit?"
```

`$` is a boundary assertion so the pattern only matches the ? at the end of a string and not in the middle.  However, this is not required as the `re-matches` uses groups and that manages the boundary assertion.

`re-matches` does not require the `$` as there is an implicit boundary

```eval-clojure
  (re-matches #".*\?" "Okay if like my ? spacebar  quite a bit")
```

Match if there is a single space or space type character after the ?

```eval-clojure
  (re-matches #".*\?\s" "Okay if like my  spacebar  quite a bit? ")
  ;; => "Okay if like my  spacebar  quite a bit? "
```

Match if there are multiple space type characters after the ?

```eval-clojure
  (re-matches #".*\?\s*" "Okay if like my  spacebar  quite a bit?   ")
  ;; => "Okay if like my  spacebar  quite a bit?   "
```

Dont match if a question mark character is not at the end of the string

```eval-clojure
  (re-matches #".*\?" "Okay if like my ? spacebar  quite a bit")
```


## Shouting a question at Bob
`[^a-z]` matches if there are no lower case alphabetic characters.  The `^` at the start of the pattern negated the pattern.

`*` any number of the proceeding pattern

`[A-Z]+` any number of upper case alphabetic characters

When a phrase has all uppercase characters then we have a match

```eval-clojure
  (re-matches #"[^a-z]*[A-Z]+[^a-z]*" "HELLO")
```

If there are lower case characters, even if there are uppercase characters, the pattern does not match.

```eval-clojure
  (re-matches #"[^a-z]*[A-Z]+[^a-z]*" "Hello")
```

If the characters are all uppercase then the pattern matches, even if there are other non-alphabetic characters

```eval-clojure
  (re-matches #"[^a-z]*[A-Z]+[^a-z]*" "ABC 1 2 3")
```


## Silence of the Bob

`\s` matches any single whitespace character, including space, tab, form feed, line feed, and other Unicode spaces.

```eval-clojure
(re-matches #"\s*" "  \t\t\t")
```


## Solution using regular expressions
The `re-matches` expressions with regular expressions patterns can be put into a let expression.  The names are bound to the re-matches expressions which evaluated to either `true` or `false`

The names from the let are used with a `cond` function as conditions, returning the relevant reply from Bob.

For the shouting question, the `and` is used to check if two names are both true.

```clojure
(defn response-for
  [phrase]
  (let [;; A ? at the end of the phrase, not counting whitespace
        question (re-matches #".*\?\s*" phrase)

        ;; No lower case characters, at least one upper case character
        yelling (re-matches #"[^a-z]*[A-Z]+[^a-z]*" phrase)

        ;; The entire string is whitespace
        silence (re-matches #"\s*" phrase)]

    (cond
      silence                "Fine. Be that way!"
      (and question yelling) "Calm down, I know what I'm doing!"
      question               "Sure."
      yelling                "Whoa, chill out!"
      :whatever              "Whatever.")))
```
