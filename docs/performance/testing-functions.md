# Testing Functions


## Adding the Criterium library

Add `[criterium "0.4.4"]` to you `project.clj` file.

Add criterium to the namespace were you run your tests

```clojure
(ns ,,,
  :require [criterium.core] :refer [quick-bench])
```

Or simply require criterium in the REPL

```clojure
(require '[criterium.core] :refer [quick-bench])
```

## Using Criterium to test code

Lets try a few similar Clojure functions to see the Criterium benchmark in action


```clojure
(let [number 5]
  (quick-bench (cond = 5 1 1 2 2 3 3 4 4 5 5)))
```

Benchmark output is sent to the REPL

```
Evaluation count : 50788488 in 6 samples of 8464748 calls.
             Execution time mean : 2.535916 ns
    Execution time std-deviation : 0.096838 ns
   Execution time lower quantile : 2.435814 ns ( 2.5%)
   Execution time upper quantile : 2.686146 ns (97.5%)
                   Overhead used : 9.431514 ns

Found 1 outliers in 6 samples (16.6667 %)
    low-severe   1 (16.6667 %)
 Variance from outliers : 13.8889 % Variance is moderately inflated by outliers
```

Running the benchmark again for the same expression, we get pretty consistent results

```
Evaluation count : 50408712 in 6 samples of 8401452 calls.
             Execution time mean : 2.571379 ns
    Execution time std-deviation : 0.163071 ns
   Execution time lower quantile : 2.366952 ns ( 2.5%)
   Execution time upper quantile : 2.721099 ns (97.5%)
                   Overhead used : 9.431514 ns
```

There is a parallized version of `cond` called `condp`.

```clojure
(let [number 5]
  (quick-bench (condp = 5 1 1 2 2 3 3 4 4 5 5)))
```


```
Evaluation count : 3625284 in 6 samples of 604214 calls.
             Execution time mean : 156.813816 ns
    Execution time std-deviation : 2.560629 ns
   Execution time lower quantile : 154.222522 ns ( 2.5%)
   Execution time upper quantile : 160.425030 ns (97.5%)
                   Overhead used : 9.431514 ns

Found 1 outliers in 6 samples (16.6667 %)
    low-severe   1 (16.6667 %)
 Variance from outliers : 13.8889 % Variance is moderately inflated by outliers

```

That figure is quite high, lets run that again.

```
Evaluation count : 3707922 in 6 samples of 617987 calls.
             Execution time mean : 154.219102 ns
    Execution time std-deviation : 3.427811 ns
   Execution time lower quantile : 149.777377 ns ( 2.5%)
   Execution time upper quantile : 159.225180 ns (97.5%)
                   Overhead used : 9.431514 ns
```

So using a parallized version of a function adds a significant exectution time.  I believe the extra time is due to setting up a thread.  If so, then when using `condp` you only get a more effective throughput when running multiple parallel threads, which should be fairly obvious.


Now lets benchmark a similar function called `case`.  This function is nicely optimised on the JVM especially when the values are sequential, so we should see faster results

```clojure
(let [number 5]
  (quick-bench (case 5 1 1 2 2 3 3 4 4 5 5)))
```

Benchmark output is sent to the REPL

```
Evaluation count : 56533626 in 6 samples of 9422271 calls.
             Execution time mean : 1.158650 ns
    Execution time std-deviation : 0.187322 ns
   Execution time lower quantile : 1.021431 ns ( 2.5%)
   Execution time upper quantile : 1.471115 ns (97.5%)
                   Overhead used : 9.431514 ns

Found 1 outliers in 6 samples (16.6667 %)
    low-severe   1 (16.6667 %)
 Variance from outliers : 47.5092 % Variance is moderately inflated by outliers
```
