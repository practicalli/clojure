# Functional Programming

> “It is better to have 100 functions operate on one data structure than 10 functions on 10 data structures.” —Alan Perlis

As functional programming becomes more popular and people search for more declarative ways of expressing programs, it is only natural to wonder how immutable values and referentially transparent functions can be used to develop interactive systems. Even a fully reified notion of time is not enough to allow for the uncertainty of the timing and value of events.

How does one model the value of a system at a specific time? Can such a model be manipulated formally, as in an algebra, to be reasoned about mathematically? How can continuous functions of time be combined with discreet events? And how does one reason about an uncertain future?

Functional Reactive Programming (FRP) is a specific formalism of a model of behaviors that change in response to events, created by Conal Elliot. That's a pretty abstract statement, but FRP is abstract itself. It does not denote a particular implementation, but rather a formal semantics. It is not a style of programming or a paradigm. It's simply a formalism. And it is an answer to those hard questions.

FRP has caught my eye as an elegant means of modeling state over time in an easily composable way. I also find it to be incredibly inspiring. The notion that approaching the problem conceptually and developing a formal semantics first can lead to better optimization potential and frankly simpler implementations has gotten me to dig deeper into many of my programs and find much simpler and more elegant representations and implementations.

Let me say that again:
* Easier to reason about
* Simpler to implement
* Easier to optimize

Functional Reactive Programming (and Denotational Design, also by Conal Elliott) has a lot to teach us about how to design functional programs.

While the full variety of FRP material is much larger than I cite here, these materials will get you started.

---

## [Conal Elliott on FRP](http://www.haskellcast.com/episode/009-conal-elliott-on-frp-and-denotational-design/) Audio Interview

If you're looking for an explanation of the Functional Reactive Programming from the man who invented it, along with an idea of the intriguing process he used to invent it, this HaskellCast episode is for you.


---

## [Functional Reactive Animation](http://conal.net/papers/icfp97/)

A great paper from 1997 that spells out an early form of Functional Reactive Programming. It specifies behaviors (functions of time to a value) that change when events occur.

---

## [Conal Elliot's home page](http://conal.net/)

Conal Elliot created FRP while he was researching graphics and animation. Be sure to check out his [FRP papers](http://conal.net/papers/frp.html) section.


---

## [Push-pull functional reactive programming](http://conal.net/papers/push-pull-frp/)

A more advanced formulation of Functional Reactive Programming that formalizes the types and operations using Haskell's common type classes (Functor, ApplicativeFunctor, Monoid, etc). This one also includes a video of the paper presentation given at ICFP.

The main breakthrough of this paper is to model the notion of a future value for events that have not yet happened. But if they have not happened, how can future values be compared? For instance, how does one ask if event a happens before event b if neither of them has happened yet? The paper develops a cool and inspiring formalism which resolves this problem. And one is left with a value that represents the entire behavior of a system past, present, and future.

---

## [Elm Thesis](https://www.seas.harvard.edu/sites/default/files/files/archived/Czaplicki.pdf) - PDF

Elm is a different take on FRP (and it is potentially not FRP, according to some). Instead of behaviors (functions of time to a value), Elm uses discreet signals which are transformed to other signals using functional map-like operations. It also solves a real issue with computationally expensive operations blocking the propagation of signals by making some signals asynchronous.

All-in-all, the thesis is a pleasure to read. It is very clear and a decent introduction to the myriad implementations of FRP out there. See the bibliography.
