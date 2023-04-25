# Clojure names use kebab-case

![Clojure kebab-case tofu kebabs](/images/tofu-kebabs.png)

kebab-case is a clean, human-readable way to combine the words that would otherwise have spaces.

Cloure uses kebab-case to combines words with a dash, `-`, rather than a space. e.g. `rock-paper-scissors`,  `tic-tac-toe` or `(def db-spec-development {:db-type "h2" :db-name "banking-on-clojure"})`

kebab-case is used throughout Clojure, including

* Var names with `def` and function names with `defn`
* Local names with `let`
* Clojure spec names

kebab-case is used in lisp languages including Clojure. The style is also used in website URLs, e.g. [practicalli.github.io/clojure-webapps](https://practical.li/clojure-web-services/)

## Using meaningful names

To provide greater clarity to human developers, words may be combined for the names used when writing the code. Using multiple words can give greater context in to the purpose of that code.

Using a combination of meaningful names makes understanding and debugging code far easier.

## Spaces characters have special meaning

Programming languages remove spaces between words because the space character is used as a separator when parsing the code.

If spaces were not used as a separator for the some other character would be required, adding complexity to the language syntax.

## Other Styles

* camelCase - used in Java and C-style programming languages
* PascalCase - used in the [Pascal programming language][1]
* snake_case - used for `ENVIRONMENT_VARIABLES` and `database_table_names_and_columns`

[1]: https://en.wikipedia.org/wiki/Pascal_(programming_language)
