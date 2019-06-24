# Learning Clojure

Learning the syntax of Clojure is really quick (its very small and simple).  Learning to think functionally and discovering the 700+ functions in the Clojure API can take a little longer.  I recommend you find someone with a bit of Clojure experience to guide you.

Here is my suggested path to learning Clojure and thinking functionally.  Many of the tasks can be done in parallel.


## Simple rather than complex - the foundation of Clojure

Gaining an appreciation that systems should be simple is a crucial step truly understanding Clojure.  So early in your journey into Clojure, spend an hour watching [Rich Hickey talk about Simple made Easy](https://www.infoq.com/presentations/Simple-Made-Easy) - ([transcript of talk](https://github.com/matthiasn/talk-transcripts/blob/master/Hickey_Rich/SimpleMadeEasy.md)).


## Experience the Clojure syntax

Take a quick look at the Syntax of Clojure.  The syntax is very small, so this will take about 15 minutes to 1 hour (dependent on your own experiences with coding).  Don't try to remember all the syntax, it will come through practise.
- eg. [Clojure in 15 minutes](https://adambard.com/blog/clojure-in-15-minutes/)


## Set up an enjoyable environment to work in

Find how to use Clojure with your favourite editor or IDE.  Configure this tool so you can easily run a REPL and evaluate some expressions.
- [repl.it](https://repl.it) - web based repl you can share / fork
- [Spacemacs](https://spacemacs.org) - for the ultimate Emacs & Vim experience
- [Atom](https://atom.io) & [Proto REPL](https://atom.io/packages/proto-repl)
- [IntelliJ](https://www.jetbrains.com/idea/) and [Cursive](https://cursive-ide.com/)
- [Leiningen](https://leiningen.org) & any editor you like


## Building a frame of reference for functional programming

Find an introductory book that you like which provides lots of example code to help you feel more comfortable with the syntax and more importantly the major concepts of functional programming with Clojure.  Type in the exercises as you read and don't be afraid to play around with code examples

- [Clojure for the Brave and the True](https://www.braveclojure.com/)
- [Living Clojure](http://shop.oreilly.com/product/0636920034292.do) - includes a training guide
- [Practicalli Clojure](/) - you are already here :)
- [ClojureBridge London workshop](https://clojurebridgelondon.github.io/workshop/) - aimed at those new to coding
- [PurelyFunctional - Introduction to Clojure](https://purelyfunctional.tv/courses/introduction-to-clojure-v2/)

## Practice Clojure standard library (clojure.core)

Practice Clojure.  Write lots of small and relatively simple examples in Clojure and experiment with the code in the REPL and try break things.  This will start helping you learn the [Clojure API](https://clojure.github.io/clojure/)

You should become comfortable in your understanding of:
- basic values (strings, numbers, etc) and persistent collections (list, vector, map, set)
- binding names to values and their scope  (def, defn, let)
- calling functions, defining functions, arity options for functions
- Higher order functions and basics of functional composition (map, reduce, filter, etc)
- Designing with data, Extensible Data Notation (EDN), data manipulation

Activities to help practice Clojure include:
- [4Clojure.org](https://4clojure.org) - aim to complete the first 50 exercises, the first 10 are relatively easy
- Coding Kata exercises
  - [Awesome Kata collection](https://github.com/gamontal/awesome-katas)
  - [Alice In Wonderland inspired Katas](https://github.com/gigasquid/wonderland-clojure-katas)
- Attend coding dojo events - e.g. [London Clojurians](https://meetup.com/london-clojurians)


## Solidify some of the basics you have learned so far

Work on a relatively small project that you care about enough to work on
- eg. a tool to help you at work


## Learn more tools to help you think functionally
- mostly using immutable values and pure functions
- functional composition, sequences and transducers
- atoms for managing mutable state changes (with immutable values)


## Get a broader view of Clojure and learn some common practices

Start reading a book which is aimed at intermediate
- [Clojure CookBook](http://clojure-cookbook.com/)


Watch Video's about Clojure on subjects that are relevant to work or projects you want to work on.
- [ClojureTV on YouTube](https://www.youtube.com/user/ClojureTV)


Follow tutorials on Clojure, especially those that introduce the amazing libraries available in Clojure
- [Lambda Island](https://lambdaisland.com/)
- [PurelyFunctional.tv](https://purelyfunctional.tv/)
- [Practical.li](https://practicalli,github.io)


Work with some of the most common libraries in Clojure
- [Ring]() / [Compojure]() for web development (server side)
- [ClojureScript](https://clojurescript.org/) for web UI or native mobile apps (client side)
  - [Reagent](https://reagent-project.github.io/) - reactjs style single page apps
    - [Reagent deep dive](http://timothypratley.blogspot.co.uk/2017/01/reagent-deep-dive-part-1.html) - excellent tutorial
- [core.async]() - for asynchronous programming
- [clojure.string]() - specific functions for string manipulation
- [tools.logging](https://clojure.github.io/tools.logging/)
- [java.jdbc](https://clojure.github.io/java.jdbc/) - database access
- [data.zip](https://clojure.github.io/data.zip/) - manipulating trees of data, e.g. XML
