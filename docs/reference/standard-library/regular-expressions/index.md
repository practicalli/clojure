# Regular Expressions - regex

Regular expressions are a powerful and compact way to find specific patterns in text strings. Clojure provides a simple syntax for Java regex patterns.

`#"pattern"` is the literal representation of a regular expressions in Clojure, where `pattern` is the regular expression.

!!! HINT "Create regular expression pattern"
    `(re-pattern pattern)` will return the Clojure literal representation of a given regex pattern.

    A string can become a regular expression pattern, e.g. `":"` becomes the regex pattern `#":"`
    ```clojure
    (re-pattern ":")
    ```

The **[regular expression syntax cheatsheet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet)** by Mozilla is an excellent reference for regular expression patterns.


## Regular expressions overview

Regular expressions in Clojure

<p style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/iTimmZcNToY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>


Find the most common word in a book using regular expressions

<p style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/hpz2vHaTz44" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>



??? HINT "Double escaping not required"
    The Clojure syntax means you do not need to double escape special characters, eg. `\\`, and keeps the patterns clean and simple to read. In other languages, backslashes intended for consumption by the regex compiler must be doubled.

    ```clojure
    (java.util.regex.Pattern/compile "\\d")
    ;;=> #"\d"
    ```

    The rules for embedding unusual literal characters or predefined character classes are listed in the Javadoc for Pattern.


## Host platform support

Clojure runs on the Java Virtual Machine and uses [Java regular expressions](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/regex/package-summary.html).

Regular expressions in Clojure create a [java.util.regex.Pattern](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/regex/Pattern.html) type

```clojure
(type #"pattern")
;;=> java.util.regex.Pattern
```

ClojureScript runs on JavaScript engines and uses Javascript regular expressions.


## Option flags

Regular expression option flags can make a pattern case-insensitive or enable multiline mode. Clojure's regex literals starting with (?<flag>) set the mode for the rest of the pattern. For example, the pattern `#"(?i)yo"` matches the strings `“yo”`, `“yO”`, `“Yo”`, and `“YO”`.

Flags that can be used in Clojure regular-expression patterns, along with their long name and a description of what they do. See Java's documentation for the java.util.regex.Pattern class for more details.

| Flag | Flag Name        | Description                                                                                             |
|------|------------------|---------------------------------------------------------------------------------------------------------|
| d    | UNIX_LINES       | ., ^, and $ match only the Unix line terminator '\n'.                                                   |
| i    | CASE_INSENSITIVE | ASCII characters are matched without regard to uppercase or lower-case.                                 |
| x    | COMMENTS         | Whitespace and comments in the pattern are ignored.                                                     |
| m    | MULTILINE        | ^ and $ match near line terminators instead of only at the beginning or end of the entire input string. |
| s    | DOTALL           | . matches any character including the line terminator.                                                  |
| u    | UNICODE_CASE     | Causes the i flag to use Unicode case insensitivity instead of ASCII.                                   |

The re-seq function is Clojure's regex workhorse. It returns a lazy seq of all matches in a string, which means it can be used to efficiently test whether a string matches or to find all matches in a string or a mapped file:

```clojure
(re-seq #"\w+" "one-two/three")
;;=> ("one" "two" "three")
```

The preceding regular expression has no capturing groups, so each match in the returned seq is a string. A capturing group (subsegments that are accessible via the returned match object) in the regex causes each returned item to be a vector:

```clojure
(re-seq #"\w*(\w)" "one-two/three")
(["one" "e"] ["two" "o"] ["three" "e"])
```


## References

[4Clojure #37 - regular expressions](https://github.com/practicalli/four-clojure/blob/master/src/four_clojure/037_regular_expression.clj){target=_blank .md-button}
[Regex in Clojure - purelyfunctional.tv](http://www.lispcast.com/clojure-regex){target=_blank .md-button}
