# When to use Clojure
Clojure is a general purpose language suitable for any kind of application or service.  As Clojure implementations run across multiple technology platforms and operating systems, there are very few barriers to its use.

So Clojure is great for webapps, data science, big data, finance industry (banking, trading, insurance, etc), devops tools (log analysis, etc) and anything else really.

There are areas where Clojure obviously excels.

## Effective Data Manipulation
Fundamentally all software systems take in data (in the form of values or events), process or react to that data and return as a result.

The persistent data structures in Clojure (list, vector, hash-map and set) provide an efficient way to use immutable collections of data.

The `clojure.core` library contains a vast number of data processing functions in Clojure so data is easily transformed

## Highly Scalable
Clojure code is encouraged to be immutable and functions to be pure, you can run millions of parallel instances of your application or service for massive processing power.  These features also vastly simplify concurrent programming.

## Reducing Complexity
Clojure encourages a component design through functional composition, breaking down problems into components

Clojure and its libraries are all great examples of well designed components and the community strongly encourages this approach.

> #### Hint::Functional Reactive Programming
> You can also use ClojureScript for Functional Reactive programming ofclient-side apps for browsers and mobile device.
