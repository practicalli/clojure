# The Clacks - encoding and decoding messages

> #### TODO::Add unit testing

In the 33rd Discworld novel, [Going Postal](https://en.wikipedia.org/wiki/Going_Postal), messages are sent faster than a speeding horse via the [Clacks](https://en.wikipedia.org/wiki/Technology_of_the_Discworld#The_clacks) system.  The Clacks system composes of a series of towers spread across a continent with each tower sending a light signal to the next tower using combinations of lights for each character in the message.  Each tower sees a grid of lights from a distant tower and sends the message on to the next tower.

> The Clacks system was introduced in the 24th Discworld novel called "The Fifth Elephant". "Going Postal" elaborates the full history of the Clacks system.


## The Challenge
Create a Clacks encoder that converts any English language message into its corresponding clacks signal, based on the [Clacks alphabet](https://boardgamegeek.com/image/1670734/clacks-discworld-board-game) as defined by the board game of the same name.

The board game defines the alphabet as a 2 by 3 grid (although in the Discworld its actually 8 large squares).  Naturally, the interpreter also converts the Clacks signal back into an English message too.

![Terry Pratchett - The Clacks Alphabet](/images/terry-pratchett-clacks-alphabet.png)

## Create a project
Use [Clojure CLI tools and clj-new]({{ book.P9IClojureDepsEdnInstall }}) to create a new Clojure project.

```bash
clojure -M:new app practicalli/clacks-messenger
```

This project has a `deps.edn` file that includes the aliases
- `:test` - includes the `test/` directory in the class path so unit test code is found
- `:runner` to run the Cognitect Labs test runner which will find and run all unit tests


## Representing a Clack
For each clack, the light pattern is read from the top of the first column to the bottom, then from the top of the second column to the bottom.  A light in a position represents a 1 value and no light represents a 0 value.  This gives us our 6 number pattern for each clack in the alphabet.

The initial data structure chosen was essentially just modelling each individual clack.  Since a clack is a 2x3 structure, the simplest way to represent a clacks is to have a vector that contains 2 vectors, each with three elements.

So a simple expression of the letter a in the clacks alphabet would be:

```clojure
[[0 1 0][0 0 1]]
```
Therefore we could define a single letter of our alphabet as follows:

```clojure
(def a [[0 1 0][0 0 1]])
```

Before defining the complete alphabet using this data structure, test this is the right data structure for the conversion process.

## Testing a simple conversion with our data structure
Define a function to convert a single character into a clack:

```clojure
(defn character->clack [character]
  (if (= character "a")
    a
    (str "Sorry, character is not yet in the alphabet, please create a pull request")))
```

Calling the function converts a string into the corresponding clack

```clojure
(character->clack "a")
```

> #### Hint::Clojure function naming
> `->` is a naming convention to indicate a function is specifically transforming to a data format.  For example, `json->clj-map` would be a generic function for transforming json to Clojure hash-map


The code is simple for a single character, however, would require a lot of redundant code to convert the whole alphabet.  We would need either a deeply nested set of if statements or a very long `cond` function, neither of which seems to be a particularly functional approach or idiomatic Clojure.

If a `cond` statement was used, how would a clacks be converted back into a character?

So perhaps we need to change the data structure, one that provides an easy way to map to values together.

Also, there seems no value in mapping values to a 2x3 grid as long as we consistently express a clack.


## Define the alphabet with a hash-map
A hash map associates each key with a value and are used to create self-describing data. For example a person could be described as a hash-map

```clojure
{:name "Jenny Jetpack" :age "21" :twitter "jenjetpack"}
```

Clojure keywords are often used for the keys because keywords can be used as a function with a map as an argument.  This will return the value associated with the keyword in the map.

The new design for the clacks data structure associates a keyword of each letter of the alphabet with its corresponding clacks light pattern code

```clojure
{:a [0 1 0 0 0 1]}
```

Test the design by defining enough letters for the clacks alphabet to convert some simple words, i.e bat

```clojure
(def alphabet {:a [0 1 0 0 0 1]
               :b [0 0 1 0 1 0]
               :t [1 0 0 1 1 1]})
```

## Testing the map design
Use a keyword to lookup the value of its clack code

```clojure
(:a alphabet)

;; => [0 1 0 0 0 1]
```

Create a simple function to convert a single character to its Clacks representation, referred to a clack.

```clojure
(defn character->clack [character]
    ((keyword character) alphabet))
```

> The `->` character is part of the function name.  This is a Clojure naming convention used when the function you are defining converts from one type to another.

And call the function as follows

```clojure
(character->clack "a")

;; => [0 1 0 0 0 1]
```

## Converting a word
Now we want to convert a whole word to a clacks sequence.  It seemed the easiest way to convert a whole word was to convert each letter at a time using the map to look up each clack code, returning all the clacks codes in a sequence.

So we redefined the `string->clacks` function to take in a whole word.

We used the `map` function to apply a conversion function over each element in the word (each element of the string).  This conversion function called `clacksify`.

```clojure
(defn clacksify [letter]
  (let [character (str letter)]
  (alphabet (keyword character))))

(defn string->clacks [word]
  (map clacksify word))
```

Now we could convert any word that used the letters of our limited alphabet.  We chose bat as a simple word.

```clojure
(string->clacks "bat")
```

> As we are passing a string and not a keyword to the `clacksify` function, then we first convert the string to a keyword using the `keyword` function.

## Converting the clack to a string
Is there a simple way to look up a key given a value that is unique in the map?

All Clack codes are unique in the map, but there did not seem to be a simple expression to find the key when given a value.

We could have created a second mapping, however having two maps seemed redundant and a potential cause for silly bugs.

The answer was simple once we found it.  As the clack codes are unique, they could be used as keys for the letter values, we just needed to swap the map around.  Swapping a map's keys and values was done by writing a `reverse-map` function.

```clojure
(defn reverse-map
  "Reverse the keys and value pairs in a map.
  Allows the map to be used to convert from a clack to a letter without defining a second map"
  [m]
  (into {} (map (fn [[a b]] [b a]) m)))
```

So we defined the function `declacksify` which takes a clack code and returns its corresponding character.  The clack code returns the corresponding keyword rather than a character, so we use the `name` function to convert the keyword into a character name.

```clojure
(defn declacksify [clack]
  (name ((reverse-map alphabet) clack)))

(defn clacks->string [clacks]
  (map declacksify clacks))
```

So calling these functions with a clacks

```clojure
(declacksify  [1 0 0 1 1 1])
;; => "t"

(clacks->string [[0 0 1 0 1 0] [0 1 0 0 0 1] [1 0 0 1 1 1]])
;; => ("b" "a" "t")
```

> At this point you may be thinking that using keywords to represent the characters of the alphabet may not be the most effective.  Using keywords has required more code to be written, adding to the complexity of the solution.


## Tidying up the output
`clacks->string` function returns the right result, but not quite in the format required.  Rather than a single string a sequence of characters is returned.

Using the `map` function we can apply the `str` function over the resulting characters to give a single string.

```clojure
(defn clacks->string [clacks]
(map str (map declacksify clacks)))
```

Using `clojure.string/join` is a more idiomatic approach to converting a sequence of characters to a string


```clojure
(require '[clojure.string :as string])

(defn clacks->string [clacks]
  (string/join (map declacksify clacks)))
```


## Refactor the dictionary design
Converting characters to keywords and back again seem redundant when characters themselves can be used as keys in a hash-map.

Using keywords is problematic when it comes to the space character as a keyword cannot be a space.  Using `:-` to represent a space required the _clacksification_ and _declacksification_ functions to convert between `:-` and the space character.  This also prevents hyphenated words working in the Clacks system.

Refactor the dictionary to use a string for each character as the keys in the map, instead of Clojure keywords.  This solves the issue with space and other special characters.

```clojure
(def dictionary
  {"a"		[0 1 1 0 0 0 0 1]
   "b"		[0 1 1 0 0 0 1 0]
   "c"		[0 1 1 0 0 0 1 1]
   "d"		[0 1 1 0 0 1 0 0]
   "e"		[0 1 1 0 0 1 0 1]
   ,,,})
```


## Move the dictionary to its own namespace
As the dictionary can be quite large to represent in code, move the dictionary definition to its own namespace.

Use a more specific name for the dictionary, describing what languages the dictionary is used for

```clojure
(def english->clacks
  {"a"		[0 1 1 0 0 0 0 1]
   "b"		[0 1 1 0 0 0 1 0]
   "c"		[0 1 1 0 0 0 1 1]
   "d"		[0 1 1 0 0 1 0 0]
   "e"		[0 1 1 0 0 1 0 1]
   ,,,})
```

A dictionary is required to translate from Clacks to English to decode the messages. Rather than write the reverse mappings for each character in the dictionary, in effect creating a second directory for the same two languages, use a function to invert the map by swapping keys and values.

`clojure.set/map-invert` will swap each key/value pair in the map so the key becomes the value and the value becomes the key.

Define a `clacks->english` dictionary that holds the result of the `map-invert` function call

```clojure
(ns practicalli.clacks-dictionary
  (:require [clojure.set]))

(def clacks->english { ,,, })

(def clacks->english (clojure.set/map-invert english->clacks))

```

Require the dictionary namespace using the alias `dictionary` to give the dictionary names context when used in the main namespace.

Also require `clojure.string` using the alias `string` to use the join function.

```clojure
(ns practicalli.clacks-messenger
  (:require [practicalli.clacks-dictionary :as dictionary]
            [clojure.string :as string]))
```


## Removing side effects
Designing pure functions, those that receive all their data via arguments, is a common way to remove [side effects](/thinking-functionally/side-effects.html).

Include the dictionary as an argument to each of the functions.  This ensures that each function is pure and prevents side effects (side causes).

```clojure
(defn character->clack [char dictionary]
  (let [character (str char)]
    (get dictionary character)))

(defn message->clacks [message dictionary]
  (map #(character->clack % dictionary) message))

(defn clack->character [clack dictionary]
  (get (clojure.set/map-invert dictionary) clack))

(defn clack->character [clack dictionary]
  (get dictionary-inverted clack))

;; Create a clacks code back to a message

(defn clacks->message [clacks dictionary]
  (string/join (map #(clack->character % dictionary) clacks)))

```

Test the updated functions by calling them via the REPL

```clojure
(message->clacks "cab" dictionary/english->clacks)
;; => ([0 1 1 0 0 0 1 1] [0 1 1 0 0 0 0 1] [0 1 1 0 0 0 1 0])

(message->clacks "cab cab" dictionary/english->clacks)
;; => ([0 1 1 0 0 0 1 1] [0 1 1 0 0 0 0 1] [0 1 1 0 0 0 1 0] [0 0 0 0 0 0 0 0] [0 1 1 0 0 0 1 1] [0 1 1 0 0 0 0 1] [0 1 1 0 0 0 1 0])

;; Create a charater from a clack code

;; test data
(clacks->message '([0 1 1 0 0 0 1 1] [0 1 1 0 0 0 0 1] [0 1 1 0 0 0 1 0]) dictionary/english->clacks)

(clacks->message
 '([0 1 1 0 0 0 1 1] [0 1 1 0 0 0 0 1] [0 1 1 0 0 0 1 0] [0 0 0 0 0 0 0 0] [0 1 1 0 0 0 1 1] [0 1 1 0 0 0 0 1] [0 1 1 0 0 0 1 0]) dictionary)
```

## Using different dictionaries
Thanks to a flexible design with no side effects or side causes then its really easy to replace the English language alphabet with another language that can be encoded into Clack codes.  All that is required is to define a dictionary for another language.  So languages based on the greek, latin or cyrillic alphabet could be send if a suitable alphabet with clack codes is supplied.
