# What is Functional Programming

Functional programming can seem quite different from imperative programming used in languages like C, C++ and Java.

Although imperative languages may seem easier initially, definging one step after another, as the scale of a system grows, so does complexity.  Imperative languages have applied object oriented design to manage complexity with varied rates of success.

Functional programing is actually simpler that the OO approach, although initially it is unfamiliar and not considered as easy.

## Imperative programming languages

In Imperative languages code is written that specifies a **sequential of instructions** that complete a task.  These instructions typically **modifies program state** until the desired result is achieved.

Variables typically represent **memory addresses that are mutable** (can be changed) by default.

![Imperative program - conceptual view](/images/functional-programming-imperative-program.png)

## Functional programming languages

In functional programming individual tasks are small and achieved by passing data to a function which returns a result.  This function typically does not change the state of the system or other functions.

Functions are **composed** together to form more complex tasks and satisfy larger business logic.  These composed functions pass the result of their evaluation to the next function, until all functions in the composition have been evaluated.

The entire functional program can be thought of as a single function defined in terms of smaller ones.

Program execution is an **evaluation of expressions**, with the nesting structure of function composition determining program flow.

Data is **immutable** and cannot be change once created.   represent values (in the mathematical sense).

![Functional program - conceptual view](/images/functional-composition-illustrated.png)
