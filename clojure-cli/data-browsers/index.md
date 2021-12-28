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

## Specific cases
[Cognitect REBL data browser](/alternative-tools/clojure-tools/cognitect-rebl.md) has been developed to assist with Datomic Clojure database development.

Cognitect provides the REBL data browser as part of the [Cognitect dev-tools](https://cognitect.com/dev-tools)

> #### WARNING::Sign-up and personal repository code required
> Sign-up to the Cognitect dev-tools license which will email a user specific maven configuration, which must be added as a new server entry under servers in `~/.m2/settings.xml` and as a provider entry in `~/.clojure/deps.edn`
