# Clojure: get, get-in, contains?, and some

Clojure provides a get function that returns the value mapped to a key in a set or map. The documentation shows the example: (get map key). While that's completely valid, I tend to use sets and maps as functions when the get is that simple.

For example, I'd use ({"FSU" 31 "UF" 7} "FSU") if I wanted the value of the key "FSU". It's much less likely that I'd use (get {"FSU" 31 "UF" 7} "FSU"), largely because the former example is less typing.

However, if I'm doing something more complicated I've found the get function to be helpful. Often, I like to use the combination of get and -> or ->>.

The following example takes some json-data, converts it to a clojure map, and pulls the value from the "FSU" key.

(-> json-data read-json (get "FSU"))

It's also worth noting, in our example we have to use get, since strings are not Clojure functions. If instead we chose to make our keys keywords, we could choose either of the following solutions. I don't believe there is a right or wrong solution; which you use will likely be a personal preference.

(-> json-data (read-json true) (get :FSU))
(-> json-data (read-json true) :FSU)

We can modify the example and assume nested json that results in the following clojure map: {"timestamp" 1291578985220 "scores" {"FSU" 31 "UF" 7}}

Building off of a previous example, we could use a slightly modified version to get the score for FSU.

(-> json-data read-json (get "scores") (get "FSU"))

However, getting nested values is common enough that Clojure provides a function designed specifically to address that need: get-in

The get-in function returns the value in a nested associative structure when given a sequence of keys. Using get-in you can replace the last example with the following code.

(-> json-data read-json (get-in ["scores" "FSU"]))

The get-in function is very helpful when dealing with nested structures; however, there is one gotcha that I've run into. The following shows a REPL session and what get-in returns with various keys.

user=> (get-in {"timestamp" 1291578985220 "scores" {"FSU" 31 "UF" 7}} ["scores" "FSU"])
31

user=> (get-in {"timestamp" 1291578985220 "scores" {"FSU" 31 "UF" 7}} ["scores"])      
{"FSU" 31, "UF" 7}

user=> (get-in {"timestamp" 1291578985220 "scores" {"FSU" 31 "UF" 7}} [])        
{"timestamp" 1291578985220, "scores" {"FSU" 31, "UF" 7}}

user=> (get-in {"timestamp" 1291578985220 "scores" {"FSU" 31 "UF" 7}} nil)
{"timestamp" 1291578985220, "scores" {"FSU" 31, "UF" 7}}

Everything looks logical enough; however, if you are pulling your key sequence from somewhere else you could end up with unexpected results. The following example shows how a simple mistake could result in a bug.

user=> (def score-key-seqs {"FSU" ["scores" "FSU"]})                             
#'user/score-key-seqs

user=> (get-in {"timestamp" 1291578985220 "scores" {"FSU" 31 "UF" 7}} (score-key-seqs "FSU"))
31

user=> (get-in {"timestamp" 1291578985220 "scores" {"FSU" 31 "UF" 7}} (score-key-seqs "UF")) 
{"timestamp" 1291578985220, "scores" {"FSU" 31, "UF" 7}}

If you're always expecting a number and you get a map instead, things might not work out well.

It's also worth noting that both get and get-in allow you to specify default values. You can check the documentation on clojure.org for more information on default values.

You don't always need to get a value, sometimes it's good enough to know that a key is in a map or set. In general I use the value returned from a map or set to determine if a key exists - the following snippet uses that pattern.

(if (a-map :key) 
  (do-true-behaviors) 
  (do-false-behaviors))

However, that pattern fails if the value of :key is nil. If it's possible that the value might be nil you might want to use Clojure's contains? function. The contains? function returns true if key is present in the given collection, otherwise returns false. The following code pasted from a REPL session demonstrates that contains? works perfectly well with nil.

user=> (contains? {:foo nil} :foo)
true

The contains? function works well with sets and maps; however, if you try to use it on a vector you might get surprising results.

user=> (contains? [1 3 4] 2)
true

For numerically indexed collections like vectors and Java arrays, the contains? function tests if the numeric key is within the range of indexes. The Clojure documentation recommends looking at the some function if you're looking for an item in a list.

The some function returns the first logical true value of a predicate for any item in the list, else nil. The following REPL session shows how you can use a set as the predicate with some to determine if a value is found in a list.

user=> (some #{2} [1 3 4])  
nil
user=> (some #{1} [1 3 4])
1

Clojure provides various functions for operating on maps and sets. At first glance some of them may look superfluous; however, as you spend more time working with sets and maps you'll start to appreciate the subtle differences and the value they provide. 
