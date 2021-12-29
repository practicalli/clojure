## Arity
  The number of arguments a function takes.  This can be a fixed number or variable number of arguments.  Simple polymorphism can also be used to have one function take different numbers of arguments.

```clojure

(defn single-arity [argument]
  (str "I take 1 argument only"))

(defn triple-arity [argument1 argument2 argument3]
  (str "I take 3 arguments only"))

(defn multi-arity
 ([argument]
   (str "I match 1 argument only"))
 ([argument1 argument2]
   (str "I match when 2 arguments are used")))

(defn variable-arity [argument & more-arguments]
  (str "I assign the first argument to argument,
        all other arguments to more-arguments"))
```
---

## Higher Order Functions
> A function for which both the input and the output are functions.

```js
let greet = (name) => () => `Hello ${name}!`;
```

```js
greet("HOF")(); // Hello HOF!
```

## Partial
> The process of getting a function with lesser arity compared to the original function by fixing the number of arguments is known as partial application.

```js
let sum = (a, b) => a + b;

// partially applying `a` to `40`
let partial = sum.bind(null, 40);

// Invoking it with `b`
partial(2); //=> 42
```

---

## Currying
> The process of converting a function with multiple arity into the same function with less arity.

```js
let sum = (a,b) => a+b;

let curriedSum = function(a) {
    return function(b) {
        return a + b;
    };
};

curriedSum(40)(2) // 42.
```

---

## Purity
> A function is said to be pure if the return value is only determined by its input values, without any side effects.

```js
let greet = "yo";

greet.toUpperCase(); // YO;

greet // yo;
```
---

<!-- ## Side effects -->

---

## Idempotent

> A function is said to be idempotent if it has no side-effects on multiple executions with the the same input parameters.

`f(f(x)) = f(x)`

`Math.abs(Math.abs(10))`

---

<!-- ## Contracts -->

---

<!-- ## Guarded Functions -->

---


## Functor
> Structure that can be mapped over.

Simplest functor in javascript is an `Array`

```js
[2,3,4].map( function(n) {
  return n + 2;
}); // [4,6,8]
```
---

## Referential Transparency

> An expression that can be replaced with its value without changing the behaviour of the program is said to be referential transparent.

Say we have function greet:

```js
let greet = () => "Hello World!";
```

Any invocation of `greet()` can be replaced with `Hello World!` hence greet is referential transparent.

---

## Lazy evaluation
> a.k.a. call-by-need is an evaluation mechanism which delays the evaluation of an expression until its value is needed.

```js
let rand = function*() {
    while(1<2) {
        yield Math.random();
    }
}
```
```
let randIter = random();
randIter.next(); // Each execution gives a random value, expression is evaluated on need.
```
---

<!-- ## Monoid -->

---

<!-- ## Monad -->

---

<!-- ## Co-monad -->
---

<!-- ## Applicative Functor -->

---


<!-- ## Morphism -->

---

<!-- ## Setoid -->

---

<!-- ## Semi-group -->

---

<!-- ## Chain -->
---
