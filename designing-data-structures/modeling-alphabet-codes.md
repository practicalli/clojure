# Model alphabet codes

Maps in Clojure are used to model key and value pairs.

* Keys must be unique within a map.
* A key can be a number, string or keyword.

Vectors in Clojure are a general data structure that are good for handing any kind of information.


> **Note** Define a data structure where each letter of the alphabet is represented by a 6 digit binary code

<!--sec data-title="Reveal answer" data-id="answer001" data-collapse=true ces-->

Lets define a name called `alphabet` that is bound to a map.  Each key in the map is a character of the alphabet and each value is a vector of numbers that represent a binary code.

The map also includes a binary code for a full stop and space character

```clojure
(def alphabet {"A" [0 1 0 0 0 1]
               "B" [0 0 1 0 1 0]
               "C" [0 1 0 0 1 0]
               "D" [1 0 1 0 0 0]
               "E" [1 0 1 1 0 0]
               "F" [1 1 0 1 0 0]
               "G" [1 0 0 1 1 0]
               "H" [1 0 1 0 0 1]
               "I" [1 1 1 0 0 0]
               "J" [0 0 1 1 1 1]
               "K" [0 1 0 1 0 1]
               "L" [1 1 1 0 0 1]
               "M" [1 1 1 0 1 1]
               "N" [0 1 1 1 0 1]
               "O" [1 1 0 1 1 0]
               "P" [1 1 1 1 1 0]
               "Q" [1 0 1 1 1 0]
               "R" [1 1 1 1 0 0]
               "S" [0 1 1 1 1 0]
               "T" [1 0 0 1 1 1]
               "U" [0 0 1 0 1 1]
               "V" [0 1 1 0 0 1]
               "W" [1 1 0 1 0 1]
               "X" [1 0 1 0 1 0]
               "Y" [1 0 0 0 1 1]
               "Z" [1 1 0 0 1 1]
               "." [1 0 1 1 0 1]
               " " [0 0 1 0 0 0]})

```

<!--endsec-->
