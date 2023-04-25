# Ratios

  In mathematics you need to ensure that you manage precision of your calculations when you are dividing numbers.  Once you create a decimal number then everything it touches had a greater potential to becoming a decimal.

> **Note** Calculate a rough approximation to Pi by dividing 22 by 7

```
(/ 22 7)
(class (/ 22 7))
(/ (* 22/7 3) 3)
```

![](../images/clojure-playground-ratio-pi.png)

  If the result of an integer calculation would be a decimal number, then Clojure holds the value as a Ratio.  This is one example of lazy evaluation.  Rather than calculate the decimal value at some particular precision (number of decimal points).  Clojure is saving the calculation until its needed, at which time the specific precision required should be known.

> **Note** Explore the ratio type further and see how to get a decimal value as the result

```clojure
(/ 14 4)
(/ 16 12)
(/ 2)
(/ 22 7.0)
(type (/ 22 7.0))
(float (/ 22 7))
(double (/ 22 7))
```

![](../images/clojure-playground-ratio-examples.png)

  When one or more of the numbers in the division is a decimal, then Clojure will return a decimal value.  Or you can coerce a value to a specific decimal type, eg. float or double.
