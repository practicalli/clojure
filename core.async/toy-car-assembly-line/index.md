# core.async example - toy car assembly line

>####Note::Get the example project and open it in a Clojure REPL
> Clone or download the [Lispcast: Clojure core-async Factory example](https://github.com/ericnormand/lispcast-clojure-core-async)
>
> Open that project in your Clojure editor or run `lein repl` in the top level directory of the project.


## The toy car factory

The toy car factory assembles car parts before distributing them.  How can we make this process faster and more scalable?


## The current process

One worker picks out random parts of a car from the parts box until all the parts are collected to assemble the car.



## The `time` macro

We will use the time macro to see how long parts of our code takes to run and help find parts to optomise.

A simple example would be:

```clojure
(time
  (map inc (range 0 10000)))
```


## Timing assembly functions

Investigate the time it takes to carry out the different assembly line tasks

```clojure
(time (take-part))

(time (attach-wheel :body :wheel))

(time (box-up :body))

(time (put-in-truck :body))
```

And to total time it takes to get a a whole car through the assembly line

```clojure
(time (build-car))
```

The total time can be longer than the sum of the tasks, as the `take-part` function does not always give the required part needed.


## Hiring more workers

Adding 10 more workers is equivalent to adding 10 processes that run the assembly tasks.

Lets use a go block for a worker

```clojure
(do
  (go
    (dotimes [number 10]
      (println "First go block processing:" number)
      (Thread/sleep 1200)))
  (go
    (dotimes [number 10]
      (println "Second go block processing:" number)
      (Thread/sleep 1200))))
```

These are two separate go blocks, so their is no co-ordination between the two.  You can see the println statement from each go block intertwined.
