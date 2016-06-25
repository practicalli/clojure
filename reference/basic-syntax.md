# Reference: Basic Syntax 


## Notes from Aphyr


Let’s write a simple program. The simplest, in fact. Type “nil”, and hit enter.

user=> nil
nil
nil is the most basic value in Clojure. It represents emptiness, nothing-doing, not-a-thing. The absence of information.

user=> true
true
user=> false
false
true and false are a pair of special values called Booleans. They mean exactly what you think: whether a statement is true or false. true, false, and nil form the three poles of the Lisp logical system.

user=> 0
0
This is the number zero. Its numeric friends are 1, -47, 1.2e-4, 1/3, and so on. We might also talk about strings, which are chunks of text surrounded by double quotes:

user=> "hi there!"
"hi there!"
nil, true, 0, and "hi there!" are all different types of values; the nouns of programming. Just as one could say “House.” in English, we can write a program like "hello, world" and it evaluates to itself: the string "hello world". But most sentences aren’t just about stating the existence of a thing; they involve action. We need verbs.

user=> inc
#<core$inc clojure.core$inc@6f7ef41c>
This is a verb called inc–short for “increment”. Specifically, inc is a symbol which points to a verb: #<core$inc clojure.core$inc@6f7ef41c>– just like the word “run” is a name for the concept of running.

There’s a key distinction here–that a signifier, a reference, a label, is not the same as the signified, the referent, the concept itself. If you write the word “run” on paper, the ink means nothing by itself. It’s just a symbol. But in the mind of a reader, that symbol takes on meaning; the idea of running.

Unlike the number 0, or the string “hi”, symbols are references to other values. when Clojure evaluates a symbol, it looks up that symbol’s meaning. Look up inc, and you get #<core$inc clojure.core$inc@6f7ef41c>.

Can we refer to the symbol itself, without looking up its meaning?

user=> 'inc
inc
Yes. The single quote ' escapes a sentence. In programming languages, we call sentences expressions or statements. A quote says “Rather than evaluating this expression’s text, simply return the text itself, unchanged.” Quote a symbol, get a symbol. Quote a number, get a number. Quote anything, and get it back exactly as it came in.

user=> '123
123
user=> '"foo"
"foo"
user=> '(1 2 3)
(1 2 3)
A new kind of value, surrounded by parentheses: the list. LISP originally stood for LISt Processing, and lists are still at the core of the language. In fact, they form the most basic way to compose expressions, or sentences. A list is a single expression which has multiple parts. For instance, this list contains three elements: the numbers 1, 2, and 3. Lists can contain anything: numbers, strings, even other lists:

user=> '(nil "hi")
(nil "hi")
A list containing two elements: the number 1, and a second list. That list contains two elements: the number 2, and another list. That list contains two elements: 3, and an empty list.

user=> '(1 (2 (3 ())))
(1 (2 (3 ())))
You could think of this structure as a tree–which is a provocative idea, because languages are like trees too: sentences are comprised of clauses, which can be nested, and each clause may have subjects modified by adjectives, and verbs modified by adverbs, and so on. “Lindsay, my best friend, took the dog which we found together at the pound on fourth street, for a walk with her mother Michelle.”

Took
  Lindsay
    my best friend
  the dog
    which we found together
      at the pound
        on fourth street
    for a walk
      with her mother
        Michelle
But let’s try something simpler. Something we know how to talk about. “Increment the number zero.” As a tree:

Increment
  the number zero
We have a symbol for incrementing, and we know how to write the number zero. Let’s combine them in a list:

clj=> '(inc 0)
(inc 0)
A basic sentence. Remember, since it’s quoted, we’re talking about the tree, the text, the expression, by itself. Absent interpretation. If we remove the single-quote, Clojure will interpret the expression:

user=> (inc 0)
1
Incrementing zero yields one. And if we wanted to increment that value?

Increment
  increment
    the number zero
user=> (inc (inc 0))
2
A sentence in Lisp is a list. It starts with a verb, and is followed by zero or more objects for that verb to act on. Each part of the list can itself be another list, in which case that nested list is evaluated first, just like a nested clause in a sentence. When we type

(inc (inc 0))
Clojure first looks up the meanings for the symbols in the code:

(#<core$inc clojure.core$inc@6f7ef41c>
  (#<core$inc clojure.core$inc@6f7ef41c>
    0))
Then evaluates the innermost list (inc 0), which becomes the number 1:

(#<core$inc clojure.core$inc@6f7ef41c>
 1)
Finally, it evaluates the outer list, incrementing the number 1:

2
Every list starts with a verb. Parts of a list are evaluated from left to right. Innermost lists are evaluated before outer lists.

(+ 1 (- 5 2) (+ 3 4))
(+ 1 3       (+ 3 4))
(+ 1 3       7)
11
That’s it.

The entire grammar of Lisp: the structure for every expression in the language. We transform expressions by substituting meanings for symbols, and obtain some result. This is the core of the Lambda Calculus, and it is the theoretical basis for almost all computer languages. Ruby, Javascript, C, Haskell; all languages express the text of their programs in different ways, but internally all construct a tree of expressions. Lisp simply makes it explicit.

