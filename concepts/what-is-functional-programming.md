# What is Functional Programming
Functional programming can seem quite different from imperative programming used in languages like C, C++ and Java.

Imperative languages may seem easier initially, as defining one step after another is familiar approach to many things in live.  As the scale of a system grows, so does complexity.  Imperative languages have applied object oriented design to manage complexity with varied rates of success.  When shared mutable state is common in a design, then a system quickly becomes complex and very difficult to reason about.

Functional programming is actually simpler that the OO approach, although initially it may be unfamiliar and not considered as easy.  As systems grow in complexity, the building blocks are still simple and deterministic, creating a system that is far easier to reason about.


## Imperative programming languages
In Imperative languages code is written that specifies a **sequential of instructions** that complete a task.  These instructions typically **modifies program state** until the desired result is achieved.

Variables typically represent **memory addresses that are mutable** (can be changed) by default.

![Imperative program - conceptual view](/images/functional-programming-imperative-program.png)


## Functional programming languages
Individual tasks are small and achieved by passing data to a function which returns a result.

Functions are **composed** together to form more complex tasks and satisfy larger business logic.  These composed functions pass the result of their evaluation to the next function, until all functions in the composition have been evaluated.

The entire functional program can be thought of as a single function defined in terms of smaller ones.

Program execution is an **evaluation of expressions**, with the nesting structure of function composition determining program flow.

Data is **immutable** and cannot be change once created.  Changes are expressed as new values, with complex values [sharing common values](/data-structures/shared-memory.md) for efficiency.

![Functional program - conceptual view](/images/functional-composition-illustrated.png)
