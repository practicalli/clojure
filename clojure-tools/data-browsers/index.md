# Clojure Data Browsers
Clojure has a strong focus on using the built in data structures (list, vector, hash-map, set) to represent information in the system.  Tools to inspect data and browse through nested or large data sets is invaluable in understanding what the system is doing.

There are many `clojure.core` functions that can be used to explore data structures and transform them to produce specific views on data.

`tap>` and `datafy` are recent additions to Clojure that provide a more elegant way of exploring data than the classic `println` statement.

New tools are being created to capture and visualize results from evaluated expressions (REBL, Reveal) as well as tools to specifically visualize `tap>` expressions (Reveal, Portal).


## Common approaches
* Clojure functions (TODO)
* Editor data browsers (`cider-inspect`, etc.)
* [Reveal](reveal.md) repl with data browser, also a `tap>` source (new project)
* [Portal](https://github.com/djblue/portal) - tool to navigate your data (new project)
* [Clojure inspector](clojure-inspector.md) (Java Swing based inspector)
* [Cognitect REBL data browser](rebl-data-visualization.md) - originally developed to work with Datomic Clojure database
