# Side effects

A side effect is something that creates a change outside of the current code scope, or something external that affects the behaviour or result of executing the code in the current scope.

## Nondeterministic - the complexity iceberg

When you have side effects, you cannot reason accurately about a piece of the code.

In order to understand a piece of code you must look at all possible side effects created in all lines of code to ensure you fully understand the result of executing your code.

With side effects in your system, complexity is hidden, causing a far greater risk of a dangerous situation.

## Side causes - side effects

You can think about these effects is in two specific areas, **Side Causes** and **Side Effects**

* **Side Causes** - are where other pieces of code (function) or state change affects the behaviour of a function.

* **Side Effects** - are where the current code (function) affects the rest of the system


[![Side Causes & Side Effects - Kris Jenkins](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/theory/side-causes-side-effects.png)](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/theory/side-causes-side-effects.png)

> #### Hint::Side Causes term
> The term of side causes was coined by [Kris Jenkins](https://twitter.com/krisajenkins) in the superb article [What is Functional Programming?](http://blog.jenkster.com/2015/12/what-is-functional-programming.html)
