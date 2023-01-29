# Clojure Data Browsers

Clojure has a strong focus on using the built in data structures (list, vector, hash-map, set) to represent information in the system.  Tools to inspect data and browse through nested or large data sets is invaluable in understanding what the system is doing.

There are many `clojure.core` functions that can be used to explore data structures and transform them to produce specific views on data.

`tap>` and `datafy` are recent additions to Clojure that provide a more elegant way of exploring data than the classic `println` statement.

New tools are being created to capture and visualize results from evaluated expressions (REBL, Reveal) as well as tools to specifically visualize `tap>` expressions (Reveal, Portal).


## Common approaches

* Editor data browsers - e.g. [cider-inspect](https://practical.li/spacemacs/evaluating-clojure/inspect/){target=_blank}
* [Portal](portal.md) - tool to navigate and visualise data via `tap>`
* [Clojure inspector](clojure-inspector.md) - built-in Java Swing based inspector
* [Reveal](https://vlaaad.github.io/reveal/) repl with data browser, also a `tap>` source (semi-commercial project)
