
# Why use Clojure

Clojure is a dynamically typed functional programming language for the Java Virtual Machine (JVM).

Clojure is an open source project and has a compelling combination of features that make it an rich development language for modern environments (multi-core, concurrency, etc)

* Clojure is elegant - a clean design allows you to write programs that get right to the essence of a problem, without clutter and ceremony
* Clojure is Lisp reloaded - the power inherent in Lisp updated to make the language more accessible to developers.
* Clojure encourages a pure functional approach - data structures are immutable keeping functions free from side effects, making it easier to write correct programs.	 
* Clojure simplifies concurrent programming - provides alternatives to locking using software transactional memory, agents, atoms, and dynamic variables.
* Clojure embraces Java - calling Java code from Clojure is direct and fast, with no translation layer.
* Clojure is fast - written to take advantage of the optimisations possible on the modern JVM. 

Many other languages on the JVM cover some of the features described, Ruby, Python, and JavaScript, Scala, and Groovy but none has such a core focus on functional programming as Clojure.





# Emacs commands 

A quick crib sheet for Clojure development using Emacs (see setup guide).  You can repeat a command using Ctrl and up/down arrows.

Meta is typically the Alt key on a PC keyboard.

 Files	 	 	 Buffers
 
 Open	 Ctrl-X, Ctrl-F	 	 Close Window/Buffer	 Ctrl-X, K
 Save current File
 Ctrl-X, Ctrl-S
 	 Quit	 Ctrl-X, Ctrl-C
 Save As	 Ctrl-X, Ctrl-W	 	 Scroll through buffers	 Ctrl-X, B
 Save All	 Ctrl-X, S	 	 List buffers in window	 Ctrl-X, Ctrl-B
 Revert to File	 Ctrl-X, Ctrl-V	 	 Maximise	 Ctrl-X, 1 
 Revert Buffer	 Meta-X, revert-buffer	 	 Split Horizontally
 Ctrl-X, 2 
Toggle buffer 
 Ctrl-C, T
 	 Split Vertically
 Ctrl-X, 3
 Text management
 	 	 Switch focus between windows
 Ctrl-X, o
 Select all
 Ctrl-x, h	 	 	 
 Cut Line	 Ctrl-k	 	Close current buffer 
Ctrl-X, 0 (zero)  
 Paste (yank)
 Ctrl-y	 	Run tests 
Ctrl-C, , 
 Undo	 Ctrl-_ 
 	 Build management
  
Cut selection 
 Ctrl-w	 	Compile code 
 Ctrl-c, Ctrl-k 
 	 	 	 Evaluate expression
 Ctrl-c Ctrl-e


Notes
When opening a file, use the backscape key to navigate to parent folder



Themes
M-x color-theme-select

Interacting with the shell
M-! shellcomand

Running a shell in the buffer
M+x shell

Run a shell in a new buffer
Ctrl-u Meta+x shell

Open a new buffer with the command as content
C-u command

Grep in Emacs
Meta-x grep


Alias for shell
If you use shell often, you can create a alias or a keyboard shortcut, by placing the following in your emacs init file: 

(defalias 'sh 'shell) 
  (global-set-key (kbd "<f5>") 'shell) 





# Emacs Paredit 

 Overview 
In paredit mode you cannot create unbalanced parenthesis or delete parens that contain content.  Paredit requires the learning of a few keyboard shortcuts to be really effective (cheatsheet), if you ever get stuck with Paredit you can turn it off with M-x paredit-mode


 Wrap text with:   M - ( [ { "

Move the cursor in front of the text you want to wrap in parens or other paired characters and press M - (

Examples

; missing [ ] around arguments of a function definition
; press [ to add [] then inside [] use M-) to pull in args one by one
(defn bad-args 1 2 3)
(defn good-args [1 2 3])



Pulling text into parens with: M - )
Regardless of which brackets or matched quotes you want to pull your text inside, the meta-) works for them all.

Say you start defining a function but forget to put the arguments in square brackets.  You can add the square brackets at the front of the arguments and press M - ) until you have pulled all the args in between the [].


Slurping & Barfing
Pull in (slurp) or throw out (barf) a whole s-expression (something between parens)
 
Forward slurp
C - )    or C - <right>

Forward barf
C-}   or  C - <left>

Backward slurp
C - (   or   C - M - <left>

Backwards barf
C - {   or C - M - <right>


Adding comments
Type in your function definition or other expression and with the cursor at end of your definition press M - ;

(def my-fn [args])                      ;Comment

;; Or on an empty line, press M-; and you get 

;;




Comment split between two functions with:  M -;

(1 2 3)
;; Press M-; between two functions to create comment between them
(4 5 6)


Examples

;;; Justify code C-j - format a line into two lines

(defn blah []
  (printlin "blah blah blacksheep" ))


General movement

;;; C-d - delete forward
;;; M-d - delete forward by word
;;; Del - delete backwards
;;; M-Del - delete backwards by word
;;; C-k - delete from cursor to end of parens | line (paste with C-y)
;;; C-d

;;; C-M-f - jump forward through parens
;;; C-M-b - jump backwards through parens



# Special Forms
Special forms are recognized by the Clojure compiler and not implemented in Clojure source code. There are a relatively small number of special forms and new ones cannot be implemented.

catch, def, do, dot ('.'), finally, fn, if, let, loop, monitor-enter, monitor-exit, new, quote, recur, set!, throw, try and var. 

# Sharing Mutable data
Use mutable references to immutable data - Reference Types

Refs provide synchronous access to multiple pieces of shared data ("coordinated") by using Software Transactional Memory (STM).

Atoms provide synchronous access to a single piece of shared data.

Agents provide asynchronous access to a single piece of shared data.


# Clojure core functions to get to know

Creating macros: 
defmacro definline macroexpand-1 macroexpand

Branching: 
and or when when-not when-let when-first if-not if-let cond condp

Looping (see also Sequences): 
for doseq dotimes while

Working with vars (see also Vars and Environment): 
ns declare defn defmacro definline defmethod defmulti defn- defonce defstruct

Arranging code differently: 
.. doto ->

Dynamic scopes (see also Vars and Environment): 
binding locking time with-in-str with-local-vars with-open with-out-str with-precision

Creating lazy things (see also Sequences): 
lazy-cat lazy-cons delay

Java interop macros: 
.. amap areduce gen-class gen-interface proxy proxy-super memfn

Documenting code: 
assert comment doc

Transactions: 
dosync io!



# Namespace
A namespace is a bit like a package definition in Java.

Defining a name space


(ns name)

(... more ...)
(... code ...)
(... defn ...)


Loading into interpreter (REPL)

(use name)

(use 'clojure.core)

(use 'my-name-space)

This will load your namespace into the Clojure repl and you can then call the functions defined in that namespace.  The namespace name should have the quote ' character in front of it to tell Clojure it is data and not a function to evaluate.


Easy mistakes to make
A name space is not like a class definition, it is a single line definition like the package.  Therefore you should not put your code inside the namespace (ns name) or it will do some very strange things...

If you define your clojure code inside your namespace as follows...

(ns cl1 
(def s 1)
(print s)
) 

then you will get the error...

java.lang.Exception: No such var: clojure.core/def (clojure.clj:1)

The correct form would be as follows
(ns cl1)

(def s 1)
(println s)

Including namespaces in your code

The usual way an additional namespace is added into your own is to use :require when defining the namespace

(ns namespace
:require my-other-namespace)
 
Run (doc require) in the repl to view the clojure documentation for more information 

Adding other name spaces using aliases...

Including namespaces in your project as dependencies


(defproject

:dependencies [[...]]
:dev-dependencies [[...]]


# Data structures

into conj cons

user=> (doc cons)
-------------------------
clojure.core/cons
([x seq])
  Returns a new seq where x is the first element and seq is
    the rest.
nil


user=> (doc into)
-------------------------
clojure.core/into
([to from])
  Returns a new coll consisting of to-coll with all of the items of
  from-coll conjoined.
nil

user=> (doc conj)
-------------------------
clojure.core/conj
([coll x] [coll x & xs])
  conj[oin]. Returns a new collection with the xs
    'added'. (conj nil item) returns (item).  The 'addition' may
    happen at different 'places' depending on the concrete type.
nil


(into [1 2][3])
(conj [1 2] 3)


user=> (into [1 2][3])
[1 2 3]
user=> (conj [1 2] 3)
[1 2 3]
user=> (into '(1 2)[3 4])
(4 3 1 2)

you can conj with a map too...



(cons {:a 1} {:b 2})

user=> (cons {:a 1} {:b 2})
({:a 1} [:b 2])
user=> 


(seq {:a 1} {:b 2} )

(seq "Hello world")

user=> (seq "Hello world")
(\H \e \l \l \o \space \w \o \r \l \d)


Sequences

(first {:a 1} {:b 2} )

(second {:a 1} {:b 2} )

(last {:a 1} {:b 2} )


(first [1 2 3] )

(second [1 2 3] )

(last [1 2 3] )


user=> (doc sorted-set)
-------------------------
clojure.core/sorted-set
([& keys])
  Returns a new sorted set with supplied keys.
nil
user=> 


(reverse [2 7 3] )


(sort [2 7 3] )

(sort ( seq "Hello World" ) )

user=> (sort ( seq "Hello World" ) )
(\space \H \W \d \e \l \l \l \o \o \r)
user=> 




user=> (doc sorted-set)
-------------------------
clojure.core/sorted-set
([& keys])
  Returns a new sorted set with supplied keys.
nil
user=> 
user=> (doc sorted-set)
-------------------------
clojure.core/sorted-set
([& keys])
  Returns a new sorted set with supplied keys.
nil
user=> 


( -> "Hello world" (seq) (sort) (reverse))
( ->> "Hello world" (seq) (sort) (reverse))

( -> "Hello" ( seq ) (interpose "_" ) )


user=> ( -> "Hello" ( seq ) (interpose "_" ) )
(\_)
user=> ( ->> "Hello" ( seq ) (interpose "_" ) )
(\H "_" \e "_" \l "_" \l "_" \o)



Predicates 

return true or false based on the argument

( nil ? 1 ) - should be false
( nil ? nil )  - should be true
( even ? 2 )

( filter even ? [1 2 3 4 5 6 7] )

( fn [x] ( not ( even ? x) ) )


( def odd ? #( not (even ? % ) ) )



assoc dissoc
updae-in get-in


; defining house as a variable ??

( def house { :rooms { :pantry { :description "The pantry" } } } )

(assoc house :name "Haunted house" )


user=> ( def house { :rooms { :pantry { :description "The pantry" } } } )
#'user/house
user=> (assoc house :name "Haunted house" )
{:name "Haunted house", :rooms {:pantry {:description "The pantry"}}}
user=> house
{:rooms {:pantry {:description "The pantry"}}}
user=> (println house)
{:rooms {:pantry {:description The pantry}}}
nil


(dissoc house :rooms )

user=> (dissoc house :rooms )
{}

; now have an empty house


( def house { :rooms { :pantry { :description "The pantry" } } } )

( ( ( house :rooms) : pantry ) : description ))


user=> ( ( ( house :rooms) :pantry ) :description ))  
"The pantry"
java.lang.Exception: Unmatched delimiter: )
user=> ( ( ( house :rooms) :pantry ) :description ) 
"The pantry"



( get-in house [ :room :pantry :description ] ) { :description }

( update-in house [ :rooms ] #(assoc % :ktichen "Spooky kitchen" ) )


user=> ( get-in house [ :rooms :pantry :description ] ) { :description }
"The pantry"
java.lang.ArrayIndexOutOfBoundsException: 1
user=> ( update-in house [ :rooms ] #(assoc % :ktichen "Spooky kitchen" ) )
{:rooms {:ktichen "Spooky kitchen", :pantry {:description "The pantry"}}}
user=> (println house)
{:rooms {:pantry {:description The pantry}}}
nil
user=> 


Changing state

Atoms
References

(  def  joe ( atom { :name "Joe" } ) )

; atom guarantteed to have atomic changes on it - clojure will automatically retry changing a value if the atom is locked
; atoms are useful ways of looking at state

; change atoms

( reset! joe { :name "Joelyn" } )

user=> (  def  joe ( atom { :name "Joe" } ) )
#'user/joe
user=> ( reset! joe { :name "Joelyn" } )
{:name "Joelyn"}
user=> (println joe)
#<Atom@32d35f5f: {:name Joelyn}>
nil
user=> 


( swap! joe #(assoc % :age 33) )

user=> ( swap! joe #(assoc % :age 33) )
{:age 33, :name "Joelyn"}
user=> 


( def world ( ref { :continents [ "Europe", "Asia" ]}))
  (dosync ref-set world { :continents ["Americas" ] } )
  ( dosync ( alter world #(assoc % :size 1 ) )

( dosync ( alter world assoc :size 1 ) )



# Common errors

## Not an IFn 
Calling something that is not a function by putting it as the first element of a list.

## Putting code inside namespace definition
The namespace in clojure is a bit like the package keyword in Java.  The namespace definition is self-contained and therefore does not contain the rest of the code.







# Using the clojure inspector

Clojure uses parenthasis (()) through out its syntax as they represent the data structure of the language itself.  You can see this data structure clearly by using the Clojure Inspector.

The Clojoure inspector is a very simple Swing gui that you call from within clojure.  Start up the REPL, if using Leiningen you can use lein repl

At the repl prompt, load the clojure inspector into the namespace
user=> (use 'clojure.inspector)
Then enter your clojure expression you want to inspect 
(inspect-tree {:a 1 :b 2 :c [1 2 3 {:d 4 :e 5 :f [6 7 8]}]})
The inspector will evaluate the expression and show the data structure in a Swing gui.


# Extreme Startup
Extreme Startup NinjaExtreme startup is a practical workshop which simulates the excitement and insanity of working for a high pressure startup company, where every decision (or lack of) can make or loose you money.  

Think of it as an extreme version of a coding dojo, where you are constantly challenged with new requirements and have to make quick decisions on what you should develop.  An extreme startup server is used to steadily grown requirements by asking you what seems to be simple questions at an increasing rate and complexity.  As these questions grow and change, as a normal project would, you are continually urged to develop your code to meet these changes.

Scores are displayed for each time in real time, so you can see your progression in terms of your competition.  Teams can choose any language they wish to implement their product and there are a number of basic project templates to help you get started.

Like other dojos its best to run the extreme startup workshop with a number of pairs or very small teams, to get people coding.

The Set up for Clojure

Extreme Startup hub - facilitator
The facilitator of the workshop will setup an extreme startup hub server that will pump out questions and keep scores of all the answers.  Install Ruby 1.9.2 and get the code from Github.

When testing the setup of the extreme startup hub, run the project using:
WARMUP=1 ruby web_server.rb

When starting the extreme startup session, start up the server using:
ruby web_server.rb


Extreme Startup Company Server - 1 per team
For your Clojure product development you will need:
Java runtime environment or SDK - version 6 preferably
Leinigen - or some other Clojure tool
Emacs + Clojure-mode, Clojure-test, paredit - or some other development environment
A repl - using lein repl or lein swank + emacs
1) Download the basic server from Github to give you a head start - you will need it, trust me!

    git clone https://github.com/bodil/extreme_startup_servers.git extreme-startup

    cd extreme-startup/clojure

    lein deps

2) Navigate to the Clojure project

Have a look at the code, the rules.clj is the most important file at this point.  Hint: look at the dispatcher function and consider using the tests, you may need them for your sanity :-)

3) Load your code into the repl and fire up your browser *

    lein repl

Running lein repl in the top level of the project directory should load the project code into the repl.  If not, then run (load-file 'src/extremestartup/server.clj)

    (server/start 3000) 

3000 is the port number to run your server on, you can use anything that is available on your machine
    
Open your browser at http://localhost:3000/ to see if it works
                    
4) Register your team as a player

The facilitator should provide you a URL to connect to.  Select the "I want to play!" link and register your team.


    Check your current IP address on your laptop and use that address for the URL.  To find your IP address, open a command line terminal and run ifconfig (Mac / Linux) or ipconfig (windows).  Make sure you use the port number you specified, if different from above.


5) Get coding

Load the rules.clj file and extend the dispatcher function to your heart's content. Use the testrule macro to quickly unit test your dispatcher.

Hint: you may want to have a look at the questions you are getting asked, so you can answer them!!



* You can use lein run to fire up Jetty with your code - the only downside is you have to kill and run Jetty each time you make a change.  Jetty will run on port 8080 by default, so you would use that port value as the end part of the URL when adding a player - i.e. http://192.168.1.2:8080





# Background

Creator Rich Hickey has explained that building on top of the JVM grants Clojure automatic platform stability from a broad user and developer community, but that itself was not the goal of creating the language. Hickey's primary interest was concurrency — he wanted the ability to write multi-threaded applications, but increasingly found the mutable, stateful paradigm of object oriented programming to be part of the problem. "Discovering Common Lisp after over a decade of C++, I said to myself — 'What have I been doing with my life?', and resolved to at some point code in Lisp. Several years of trying to make that practical, with 'bridges' like jFli, Foil etc, made it clear that bridges weren't going to be sufficient for the commercial work I was doing."

Hickey became less enamored of object oriented programming and started adopting a functional-programming style in his work, which he found to make the code more robust and easier for him and for his coworkers to understand. Eventually, maintaining that style in other languages like C# became more trouble than it was worth: 

The idea of a functional Lisp integrated with a commercially accepted host platform just seemed like chocolate and peanut butter. It can be hard to remember the exact time in which you decide to do the crazy thing that is designing a new language - you just find yourself doing it because you have to. Coming up with persistent data structures that were fast enough was the tipping point for my considering it viable.

Clojure does provide persistent data structures, although it does considerably more. For those unfamiliar, functional programming (the style from which Lisp and Clojure originate) places a greater emphasis on functions as first-class objects, meaning that functions can be placed into data structures, passed as arguments to other functions, evaluated in comparisons, even returned as the return value of another function. Moreover, functions do not have "side effects" — the ability to modify program state or data. This paradigm focuses on computation in the mathematical sense, rather than procedural algorithms, and is a completely different approach to programming.

As a language, Clojure is a Lisp-1, part of the same family of Lisp variants as Scheme, notable for sharing a single namespace between functions and variables. Clojure differs from Scheme and other Lisp dialects in several respects documented at the Clojure web site. For application developers, the most significant distinction is that Clojure defaults to making all data structures immutable. To maintain program state, developers must use one of four special mutable structures that are explicitly designed to be shared between threads: refs, vars, atoms, and agents. Clojure uses software transactional memory (STM) to coordinate changing these mutable structures while keeping them in a consistent state, much like a transactional database. This model makes it considerably simpler to write thread-safe code than it is in object oriented languages. No locks are required, therefore there are no deadlocks or race conditions.

Like other Lisp implementations, Clojure is interpreted through a console-like read-eval-print-loop (REPL). The user launches the REPL from a .jar file and is presented with the REPL command prompt, from which he or she can load Clojure programs or directly write and execute functions and macros. The code is compiled on-the-fly to Java bytecode, which is then in turn executed by the JVM. The REPL environment is much like an interactive IDE and debugger all rolled into one, but for distribution purposes, Clojure code can be compiled ahead of time into ordinary Java applications. Because it is hosted by the JVM, Clojure can automatically make use of its features, including the type system, thread implementation, and garbage collector, rather than having to re-implement each of them. Clojure code can also call Java libraries, opening up a wealth of classes and interfaces to Clojure programmers.


Why functional programming?

A single method call on a single object can cause a cascade of change throughout the object graph. Understanding what is going to happen when, how things got into the state they did, and how to get them back into that state in order to try to fix a bug are all very complex. Add concurrency to the mix, and it can quickly become unmanageable. We throw mock objects and test suites at our programs but too often fail to question our tools and programming models.

Functional programming offers an alternative. By emphasizing pure functions that take and return immutable values, it makes side effects the exception rather than the norm.

face increasing concurrency in multicore architectures



Why a Lisp based approach


Literally millions of lines of code have been written to work around missing features
in programming languages.

In Clojure, you can add your own language features with macros.  Clojure itself is built out of macros such as defstruct:

(defstruct person :first-name :last-name)

If you need different semantics, write your own macro. If you want a
variant of structs with strong typing and configurable null-checking for
all fields, you can create your own defrecord macro, to be used like this:

(defrecord
   person [String :first-name String :last-name]
   :allow-nulls false)

This ability to reprogram the language from within the language is the
unique advantage of Lisp. You will see facets of this idea described in
various ways:
    • Lisp is homoiconic - Lisp code is just Lisp data. This makes it easy for programs to write other programs.
    • The whole language is there, all the time. Paul Graham’s essay “Revenge of the Nerds” explains why this is so powerful.

http://www.paulgraham.com/icad.html

Lisp syntax also eliminates rules for operator precedence and associativity, with fully parenthesized expres-
sions, there is no possible ambiguity.

The downside of Lisp’s simple, regular syntax, at least for beginners, is Lisp’s fixation on parentheses and on lists as the core data type. Clojure offers an interesting combination of features that makes Lisp more approachable for non-Lispers.



# Functional programming

Functional programming is all about having simple datastructures and applying powerful functional abstractions on them

I. - immutable, very simple datastructures based on hashtables/maps 
II. - the lisp syntax with all the parenthesis (code = data) 
III. - the macro system.

You pass simple data to functions, the functions return new data or new functions that you can pass on. You have small, but powerful building blocks. And the language makes folding, transforming and filtering of data very easy.

Clojure is loosely typed, but can have type hints

tight integration with Java through Iterable and Iterator, implementing Java interfaces, but keeping immutable structures

implementing STM in Clojure is genius – lots of people talk about STM and it could be the next big thing for sharing state in distributed applications - software transactional memory, an easy way to share data

Well thought Seq concept, tightly integrated with Java 

Sequences in Clojure - Rich Hickey

Java methods as functions in Clojure 
(map (memfn charAt i) ["fred" "ethel" "lucy"] [1 2 3])

Collections in Clojure implement Collection

Functions implement Callable and Runnable

“Core abstractions, like seq, are Java interfaces”

“Clojure seq library works on Java Iterables, Strings and arrays”



# Resources 

* [Full Disclojure & video tutorials](https://vimeo.com/channels/fulldisclojure)
* [Clojure Toolbox](http://www.clojure-toolbox.com/)
* [FPish](http://fpish.net/home/1/clojure) - blog aggregator on FP - Clojure section
* [Clojure - Functional Programming for the JVM](http://java.ociweb.com/mark/clojure/article.html)
* [Clojure Koans](https://github.com/functional-koans/clojure-koans)
* [Best In Class.dk](http://www.bestinclass.dk/best-class-blogposts) - various clojure articles


# My talks on Clojure 

* <a href="http://skillsmatter.com/podcast/scala/clojure-made-simple-3135" target="_blank"><img border="0" src="https://sites.google.com/site/jr0cketwebclojure/getting-started/talks/Clojure-made-simple-talk-skillsmatter.png"></a>
* <a href="http://skillsmatter.com/podcast/scala/perfect-clojure-environment" imageanchor="1" target="_blank"><img border="0" src="https://sites.google.com/site/jr0cketwebclojure/getting-started/talks/clojure-perfect-environment-talk-skillsmatter.png"></a>
* <a href="http://skillsmatter.com/podcast/scala/lightening-talk-noir-web-framework" target="_blank"><img border="0" src="https://sites.google.com/site/jr0cketwebclojure/getting-started/talks/clojure-really-simple-guide-to-noir.png"></a>

## Images
* [large swirl of clojure logos](https://www.flickr.com/photos/llcawthorne/5343231058/sizes/l/in/photostream/)
* [curve of clojure logos](https://www.flickr.com/photos/llcawthorne/5342621527/sizes/l/in/photostream/)
* [clean background in clojure colours](https://imgur.com/yfXWG)
* [clojure leaves background](https://imgur.com/eXukW)


# Clojure colour palette
Clojure blue - 5881d8
Dark Green - 63b132
Light Green - 91dc47




##########################################
## code examples


json example
this example is work in progress and will end up on my repository at: bitbucket.org/jr0cket

;; Processing JSon information
;  define an input file that contains the json data

(def data-file "json-data.js")

; read the data into the application

(clojure.java.io./reader data-file)

; clojure.java.io is the namespace for the reader function.  reader is a java object that allows you to read from a stream - in this case a file.  The reader pulls all the words out of a file

; ?  is there a a java.io reader specifically for json ??

; wrap this in the with-open command to bind the reader name to the data and ensure that no matter what happens within the function the reader always gets closed.

(with-open [ (Clojure.java.io/reader data-file) ]  ... )

;; the function call is now contained within a vector rather than in a list (...) - this implies different things in clojure.... [jps - need a good way to explain the difference]


; We need a way to read each line and do something with them

(def process-lines
     (fn [path file]
          (with-open [ ( clojure.java.io/reader data-file ) ] 
               (file (line-sea reader) ) ) ) )
 

; can we write the above as (defn process-lines [path file]



; Now to have something that prints out the matching information - the process we will pass to process-lines

(def print-matchiing 
     (fn [words]
          (println ... )

;; print-matching receives the sequence of all words, selections all of the matching ones and prints out he results

;; this is a very procedural and over complex approach, clojure simplifies this with the idea of a filter - filtering the list of words and only keeping what we want.

(filter length-ten? words)

;; a call to the function called filter with a function and data as arguments




Clojure an outside in approach - define what you want to achieve and delegate the behaviour down to the right functional abstraction - its turtles all the way down and you only need the next turtle :)

;; the use of the ? sign in the length-ten? name is purely conventional - for when you have a function that returns a boolean - I think it helps make the language more expressive


-- JPS - my own programming efforts with my functional brain
(defn length-ten? [words] 
     (.length(10, words))
)


;; a more functional approach would be...

(defn length-ten? [words] 
     ( = 10 ( count word) ) )

;; (count word) is the equivalent of java.string.length(word)



* putting it all together

(def data-file "json.js")

(defn process-data-file [file-path function] 
     (with-open (clojure.java.io/reader file-path) ) 
          (function (line-seq reader) ) )

(defn length-ten? [words] 
     ( = 10 (count words) ) )

(defn print-matching [words] 
     (prn (filter length-ten? words) ) )

(process-data-file data-file print-matching)




* a more specific example for twitter

(defn filter-tweets-for-keyword [tweets-stream] 
     () )

     
