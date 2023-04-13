## Bob

![Exercism.io challenge - Bob](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/exercism/exercisim-exercise-bob-banner.png)

The Bob challenge involves writing a very basics example of a text parser, something that would be used for [a text based adventure game](https://en.wikipedia.org/wiki/Text-based_game).

Bob is described as a [lackadaisical](https://en.wiktionary.org/wiki/lackadaisical) teenager, so responses are very limited.  To create the Bob text parser we need to identify the rules that determine Bob's response.

The instructions provide some basic rules:

* Bob answers 'Sure.' if you ask him a question.
* He answers 'Whoa, chill out!' if you yell at him.
* He answers 'Calm down, I know what I'm doing!' if you yell a question at him.
* He says 'Fine. Be that way!' if you address him without actually saying anything.
* He answers 'Whatever.' to anything else.

It is important to also read through the supplied unit tests to elaborate on these rules.


## Create the project

Download the Bob transcription exercise using the exercism CLI tool

```bash
exercism download --exercise=bob --track=clojure
```

> To use the Clojure CLI tool instead of Leiningen, create a `deps.edn` file containing an empty hash-map, `{}` and clone [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](clojure/clojure-cli/practicalli-config.md) to `~/.clojure/`.


## Rules derived from the Unit tests

Reviewing all the examples from the unit tests, there are 5 rules for the Bob parser

These rules were discovered by searching through the unit test code for each reply that Bob should return, showing the tests for each reply.

Each rule also had to ensure it did not create any false positives by being true for any other reply that Bob could make, especially the whatever reply.

| Name              | Rule description                                                                        |
|-------------------|-----------------------------------------------------------------------------------------|
| question          | The phrase has a ? as the last alphanumeric character, not including whitespace         |
| shouting          | The phrase has uppercase alphabetic characters, but no lower case alphabetic characters |
| shouting question | A combination of question and shouting                                                  |
| silence           | The phrase is empty or contains characters that are not alphanumeric                    |
| whatever          | Any phrase that does not match any of the other rules                                   |


## Design approach

There are two main approaches to solving this challenge.  The first is to use the [`clojure.string`](https://clojure.github.io/clojure/clojure.string-api.html) functions to check or transform the phrase given to Bob.  The second approach is to use [regular expressions](/reference/standard-library/regular-expressions) with functions such as [`re-seq`](https://clojuredocs.org/clojure.core/re-seq), [`re-find`](https://clojuredocs.org/clojure.core/re-find) and [`re-matches`](https://clojuredocs.org/clojure.core/re-matches).

Start by defining the rules as an expression that returns either true or false, using some of the example strings from the unit tests.

Use a `let` expression to bind a name to each rule, e.g. `shouting?`, `question?`, `silence?`.  Then these names can be used in a simple `cond` expression to return the appropriate phrase.  Regardless of if using `clojure.string` or regular expressions, the `cond` code should be similar

Once you have tried this challenge for yourself, take a look at the design journal for the [clojure.string approach](bob-string-approach.md) and the [regular expression approach](bob-regular-expression-approach.md).


[Bob - clojure.string approach](bob-string-approach.md){.md-button}
[Bob - regular expression approach](bob-regular-expression-approach.md){.md-button}


<!-- ## Design Review -->

<!-- `clojure.string/blank?` checks for empty strings and whitespace, but does not provide a check for tabs, newlines and similar white space characters.  The regex patter `\s` covers all those white space characters. -->

<!-- While each binding in the let expression could be made into a `defn`, this add repetition in the `cond` conditions as each one would be a function call and argument.  Using the let binding, the cond is very simple. -->

<!-- In the scope of this project those functions are only used with `response-for`, making function definitions seem redundant.  If this project evolved more rules, then it may be useful to extract commonly used code into additional function definitions. -->
