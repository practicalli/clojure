# Assigning Names

   If we have to type the same values over and over, it would be very hard to write a program. What we need are names for values, so we can refer to them in a way we can remember. We do that using `def`.

```clojure
(def mangoes 3)
(def oranges 5)
(+ mangoes oranges)
```

When you assign a name to a value, that name is called a _symbol_. You can assign more than simple values to symbols. Try the following:

```clojure
(def fruit (+ mangoes oranges))
(def average-fruit-amount (/ fruit 2))
average-fruit-amount
```

Look at the last line, and see how we can use symbols by themselves to refer to a value.

> **Note** Take the Clojure syntax you have learnt to far and write a metric/imperial converter

Take your height in feet and inches and convert it to inches using arithmetic in Clojure.

Then convert that to centimeters. There are 2.54 centimeters in an inch.

Lastly, ask two people near you for their height in centimeters. Find the average of your heights.

> **Note** Bonus: Convert that average back to feet and inches. The feet and the inches will be separate numbers. `(quot x y)` will give you the whole number part when dividing two numbers. `(mod x y)` will give you the remainder when dividing two numbers.
