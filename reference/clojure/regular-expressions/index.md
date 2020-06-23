# Regular Expressions - regex
Regular expressions are a powerful and compact way to find specific patterns in text strings. Clojure provides a syntax for literal Java regex patterns plus a few functions to help Java's regex capabilities fit better with the rest of Clojure. Java's regular-expression engine is reasonably powerful, supporting Unicode and features such as reluctant quantifiers and look-around clauses.

`#"pattern"` is the literal representation used to define regular expressions in Clojure, where `pattern` is from the regular expression language.  `(re-pattern pattern)` will return the Clojure literal representation of a given regex pattern.

`(re-find pattern-literal string)`

## Regular expressions overview
Regular expressions in Clojure
{% youtube %}
https://youtu.be/iTimmZcNToY
{% endyoutube %}

find the most common word in a book using regular expressions
{% youtube %}
https://youtu.be/hpz2vHaTz44
{% endyoutube %}


## References
* [4Clojure #37 - regular expressions](https://github.com/practicalli/four-clojure/blob/master/src/four_clojure/037_regular_expression.clj)
* [Regex in Clojure - purelyfunctional.tv](http://www.lispcast.com/clojure-regex)


## Double escaping not required
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

## Things to avoid
Java's regular-expression engine includes a Matcher object that mutates in a non-thread-safe way as it walks through a string finding matches. This object is exposed by Clojure via the re-matcher function and can be used as an argument to re-groups and the single-parameter form of re-find. Avoid these unless you're certain you know what you're doing. These dangerous functions are used internally by the implementations of some of the recommended functions described earlier, but in each case they're careful to disallow access to the Matcher object they use. Use matchers at your own risk, or better yet don't use them directly at all.
