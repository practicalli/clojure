# Clojure Study guide

A suggested study guide for those new to functional programming with Clojure.

> #### Hint::MeetAMentor Clojure Study Group - 3rd November 2018 onwards
> [MeetAMentor Community](http://meetamentor.co.uk/) is hosting a Clojure Study group starting 3rd November, using this study guide.  Sign up via the[ MaM Study Group form](http://bcrw.typeform.com/to/VkChxI).
>
> All broadcasts are available via the [jr0cket YouTube channel](https://www.youtube.com/channel/UCelY2sic3hsIiSeAhWt640g)

## Week1: Overview of Clojure

[![youtube live recorded broadcast](/images/youtube-live-recorded-broadcast.png)](https://www.youtube.com/watch?v=MZcuL4lRw5E&index=1&list=PLy9I_IfUBzKJSgctCJaRYcnF6kZdiZ5ku)

Briefly discuss what the Clojure programming languages is good for, some example companies using Clojure and give suggestions on how to start learning Clojure.

Cover [the syntax and a few common functions](https://repl.it/@jr0cket/Clojure-In-15-minutes),

### Homework
* Simple Clojure exercises from [ClojureBridge London workshop](https://clojurebridgelondon.github.io/workshop/simple-values/)
* Understand the principles behind the design of the Clojure language by watching [Simple made Easy](https://www.infoq.com/presentations/Simple-Made-Easy) by Rich Hickey (the author of Clojure)

## Week2: REPL Driven Development overview and ClojureBridge London exercise review

[![youtube live recorded broadcast](/images/youtube-live-recorded-broadcast.png)](https://www.youtube.com/watch?v=y5TAHwZc1JE&index=2&list=PLy9I_IfUBzKJSgctCJaRYcnF6kZdiZ5ku)

Discuss REPL Driven Development ([my blog post on the topic](http://jr0cket.co.uk/2018/11/REPL-driven-development-with-Clojure.html))

Review the ClojureBridge London exercises homework - [Github Gist](https://gist.github.com/jr0cket/6551c8ef224a63e891bc61665471bcd1) - [Repl.it project](https://repl.it/@jr0cket/ClojureBridge-London-exercises)

### Homework
* [4Clojure exercises](http://www.4clojure.com/)


## Week 3: Using the REPL and Structural editing

[![youtube live recorded broadcast](/images/youtube-live-recorded-broadcast.png)](https://www.youtube.com/watch?v=PmSPKvlJk74&index=3&list=PLy9I_IfUBzKJSgctCJaRYcnF6kZdiZ5ku)

#### Part 1: Structural Editing
The first part of the video covers Structural Editing for Clojure development and the concept of code as symbolic expressions.  Demonstrating the basic of structural editing using Spacemacs

Briefly covers the different editors that give a good Clojure experience.
http://practicalli.github.io/clojure/development-tools/

Visit http://practicalli.github.io/spacemacs to learn more about Clojure development with Spacemacs (Emacs and CIDER).

#### Part 2: 4Clojure exercises 1 to 15
At [34.50 onwards we discuss solving the first fifteen challenges of 4Clojure](https://www.youtube.com/watch?v=PmSPKvlJk74&feature=youtu.be&t=2090), a website that gives you Clojure code snippets to complete.  Entering the missing code and the website will run the code and tests, showing if you got the answer correct.

[Solving the first 15 challenges - 34.50 onwards](https://www.youtube.com/watch?v=PmSPKvlJk74&feature=youtu.be&t=2090)

### Homework
* [4Clojure exercises](http://www.4clojure.com/)
* Install a Clojure development environment using these [install guides for several Clojure aware editors](https://practicalli.github.io/clojure/development-tools/)


## Clojure Loves Data: A 40 minute sessions at London Java Community conference

[![youtube live broadcast](/images/youtube-live-recorded-broadcast.png)](https://www.youtube.com/watch?v=Ja63rOa2MFA)

Live coding session covering the basics of using data structures (collections) in Clojure, mostly focusing on Vectors (arrays) and Maps (hash-map, dictionary).
I will also attempt to broadcast live a lightning talk on how to broadcast live (because I like being quite meta some times).



## Week 4: Clojure maps, ascii code generator and clojure test

[![youtube live broadcast](/images/youtube-live-recorded-broadcast.png)](https://www.youtube.com/watch?v=ikW6Qk73K1s)

Working with Clojure maps (hash-map) and [writing a simple ascii code generator](https://youtu.be/ikW6Qk73K1s?t=1052).

### Homework
* Test driven development for the Clacks messages converter.  See [61 minutes onwards for ideas how to create the tests](https://www.youtube.com/watch?v=ikW6Qk73K1s&feature=youtu.be&t=3660).


## Week 5: Test Driven Development - Clacks messenger

[![youtube live broadcast](/images/youtube-live-recorded-broadcast.png)](https://www.youtube.com/watch?v=LvissLmUNho&index=5&list=PLy9I_IfUBzKJSgctCJaRYcnF6kZdiZ5ku)

This week we will look at Test Driven Development and Clojure.

The [`clojure.test`](https://clojure.github.io/clojure/clojure.test-api.html) library is part of Clojure and is the simplest way to start with TDD and Clojure.  We will take a small challenge and solve it by first writing a failing test, then writing some code to make the test pass, then refactor the code if necessary.

We will start by creating a new project on the command line with Leiningen, which creates parallel source and test branches.

```bash
lein new my-project
```

Open the source code file from the project (`SPC f f`) and start the REPL - `, '` or `M-RET`.

Toggle between source code and test code with `SPC p a`.  Or open the other in a new window using `SPC p f`, highlight the filename and use `C-c o` to open in new window.

Run all tests using `, t a` or `M-RET t a`.

To automate running of tests, toggle cider-auto-test-mode using `, T t` and then evaluate either source or test buffer using `, e b` and tests will run for that namespace

### Source code examples
* [Clacks encoder/decoder TDD style](https://github.com/practicalli/clacks)

### Homework
* Try some of the [Advent of Code challenges](https://adventofcode.com/)
* Solve [4Clojure challenges](http://www.4clojure.com/) from #16 onwards


## Week 6: Advent of Clojure

[![youtube live broadcast](/images/youtube-live-recorded-broadcast.png)](https://www.youtube.com/watch?v=opM7fU7IAV8&index=6&list=PLy9I_IfUBzKJSgctCJaRYcnF6kZdiZ5ku)

Solving day one of the [Advent of Code challenges](https://adventofcode.com/).  The first part of the problem is solved with a simple `reduce` function.  The second part we investigate several different approaches, becoming more functional and using higher abstractions in Clojure.

If you understand the progression of the solutions, you are a good way on to creating very clean Clojure code at a good level of abstraction.

> #### Note::Advent of Code
> [jr0cket/advent-of-code-2018](https://github.com/jr0cket/advent-of-code-2018) repository contains documented descriptions of the solutions to Advent of Code created so far.
>
> [Advent of Code](https://adventofcode.com/) is a yearly coding challenge that sets one challenge per day, just like an advent calendar.
>
> Tim Pote will be live [streaming their solution to the advent of code](https://www.twitch.tv/timpote) each day at 12 noon (UTC-5 timezone) on Twitch.
>
> Borkdude also has a [Github repository where advent of code solutions will be published](https://github.com/borkdude/advent-of-spec), with all solutions checked with Clojure spec



## Week 7: Simple website with ClojureScript, reagent, bootstrap and SVG

[![youtube live broadcast](/images/youtube-live-recorded-broadcast.png)](https://www.youtube.com/watch?v=WYaIy3E6nLk&index=7&list=PLy9I_IfUBzKJSgctCJaRYcnF6kZdiZ5ku)

Creating a very simple front end website with ClojureScript.  ClojureScript is Clojure that runs on JavaScript engines, such at the one in your browser or node.js.  The project included [reagent](), a react.js style framework for ClojureScript.  The web page is made up of one or more components that are managed by the reagent library, so if there are updates to the components the reagent library will refresh the web page.

The project also used [Bootstrap](https://getbootstrap.com/) as a Cascading Style Sheet library, to help structure the layout of the page and add visual components.  The reagent library also lets us define graphics using markup, creating [Scalable Vector graphics](https://clojurebridgelondon.github.io/workshop/introducing-clojure/clojure-svg-graphics.html).

The project was created with the [Leiningen figwheel template](https://github.com/bhauman/lein-figwheel), to give instant feedback in the web page as we update the code.

```bash
lein new figwheel simple-website -- --reagent
```


## Week 8: 4Clojure challenges 16 to 22

[![youtube live broadcast](/images/youtube-live-recorded-broadcast.png)](https://www.youtube.com/watch?v=8u8y73zh0w0&index=8&list=PLy9I_IfUBzKJSgctCJaRYcnF6kZdiZ5ku)

Solving the 4Clojure challenges from 16 to 32.

> #### Hint::4Clojure challenges up to 15
> We solve [the first 15 challenges in study group #3 from 34.50 onwards](https://www.youtube.com/watch?v=PmSPKvlJk74&feature=youtu.be&t=2090)
>
> [jr0cket/four-clojure](https://github.com/jr0cket/four-clojure) repository - discussions of 4Clojure solutions

## Week 9: Tic-Tac-Toe

[![youtube live broadcast](/images/youtube-live-recorded-broadcast.png)](https://www.youtube.com/watch?v=ikW6Qk73K1s)

Building a simple command line tic-tac-toe game in Clojure in a very functional style.

No frameworks were harmed (or used) in the making of this broadcast :smile_cat:

* [practicalli/tictactoe GitHub repository](https://github.com/practicalli/tictactoe-cli)

> #### Hint::Joining the Live discussion
> A hangout link will be posted to the MeetAMentor Slack channel and London Clojurians meetup page about 30 minutes before broadcast.



## Additional concepts to cover
* Understanding how to model the world with immutable data (values)
* Writing your own (pure) functions
* using sequences
* lisp comprehension
* higher order functions
* functional composition.

Homework: various small challenges and 4Clojure exercises.

## Resources for practising Clojure
* [4Clojure](http://www.4clojure.com/)
* [Exorcism](https://exercism.io/)
* [CodeWars](https://www.codewars.com/)

Demonstrate how to use the REPL in [Spacemacs](http://practicalli.github.io/clojure/development-tools/#spacemacs) and [Atom.io with ProtoREPL](http://practicalli.github.io/clojure/development-tools/#atom-protorepl).  Demonstrating evaluation of code, structural editing, refactoring, etc.



> #### Hint::Finding your own learning path
> As there are many ways to study, please feel free to carve out your own learning path and share what you found useful if you wish.
> [Learning Clojure section](learning-clojure.md) describes important steps you should take on your journy into Clojure.
