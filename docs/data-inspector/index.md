# Clojure Data Inspector tools

Clojure has a strong focus on built in data structures (list, vector, hash-map, set) to represent information in the system.  Tools to inspect data and browse through nested or large data sets are invaluable in understanding what the system is doing.

There are many `clojure.core` functions that can be used to explore data structures and transform them to produce specific views on data.

`tap>` and `datafy` provide an elegant way of exploring data, rather than a classic `println` expression.

Data Inspector tools capture and visualize results from evaluated expressions as well as tools to specifically visualize `tap>` expressions (Reveal, Portal).

## Common approaches

* [:fontawesome-solid-book-open: Portal](portal.md) tool to navigate and visualise data via `tap>` for use with any editor or directly with a REPL prompt
* [:fontawesome-solid-book-open: Clojure inspector](clojure-inspector.md) built-in Java Swing based inspector
* [:fontawesome-solid-book-open: CIDER inspect](https://practical.li/spacemacs/evaluating-clojure/inspect/){target=_blank} Emacs specific tool (Practicalli Spacemacs)


!!! TIP "Practicalli recommends Portal"
    [:fontawesome-solid-book-open: Portal](portal.md)  works with any Clojure connected editor and can inspect `tap>` expressions and automatically inspect all evaluation results over nREPL for a complete REPL history.

    Practicalli sends all log events to Portal using a custom mulog publisher.
