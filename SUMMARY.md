# Summary

* [Introduction](introduction.md)
* [First taste of Clojure](first-taste-of-clojure.md)
<!-- replace repl.it with klipse - repl.it loads very slowly -->
<!-- * [Quick start](quickstart/index.md) -->
<!-- * [Quick reference](quickstart/quick-reference.md) -->
<!-- * [Virtual Study Guide](study-guide.md) -->
    * [Concepts](concepts/index.md)
        * [What is Functional Programming](concepts/what-is-functional-programming.md)
        * [Clojure Big Ideas](concepts/ten-big-ideas.md)
        * [Clojure made Simple](concepts/clojure-made-simple.md)
        * [Learning Clojure](concepts/learning-clojure.md)
        * [When to use Clojure](concepts/purpose.md)
        * [Who uses Clojure](concepts/who-uses-clojure.md)
        <!-- * [The syntax](concepts/syntax.md) -->
        * [Design](concepts/design.md)
        * [All bytecode in the end](concepts/all-bytecode-in-the-end.md)
        * [Features in more depth](concepts/features.md)


* [Getting Started](getting-started/index.md)
    * [Install Java](getting-started/install-java.md)
    * [Install Clojure](getting-started/install-clojure.md)


* [REPL driven development](repl-driven-development/index.md)
    * [Using the REPL](repl-driven-development/using-the-repl.md)
    * [rebel readline](repl-driven-development/rebel-readline.md)
    * [REPL uncovered](repl-driven-development/repl-uncovered.md)
    * [Create a project](repl-driven-development/create-a-project.md)
    <!-- Introductor Clojure examples that work well in the command line REPL -->
    <!-- a simple tic-tac-toe game or similar command line challenges, kata -->

    * [Add Libraries](repl-driven-development/add-libraries.md)
    * [Namespaces](repl-driven-development/namespace.md)
        * [Namespace refactor](repl-driven-development/namespace-refactoring.md)

## Clojure core library
<!-- Basic syntax and calling functions -->
* [Show me the docs](basic-clojure/show-me-the-docs.md)
<!-- * [Threading Macros](thinking-functionally/threading-macros.md) -->

<!-- Simple values numbers, strings ratios -->
    * [Strings](basic-clojure/strings.md)
    * [Numbers & Maths](basic-clojure/numbers-maths.md)
    * [Ratios](basic-clojure/ratios.md)
    * [Control flow](basic-clojure/control-flow.md)
    * [Comments](basic-clojure/comments.md)
<!--     * [Naming Conventions](reference/naming-conventions.md) -->

<!-- Persistent data structures list vector map set -->
<!-- Introducing the most common function families from clojure.core -->
<!-- map reduce apply -->
<!-- group-by sort-by -->
<!-- partition partiion-all partition... -->

* [Data structures](data-structures/index.md)
    * [List](data-structures/list.md)
    * [Map](data-structures/map.md)
    * [Vector](data-structures/vector.md)
    * [Set](data-structures/set.md)
    * [Naming data structures](data-structures/naming.md)
    * [Shared Memory](data-structures/shared-memory.md)
    * [Using data](using-data-structures/index.md)
        * [Sequences](using-data-structures/sequences.md)
        * [Lazy Sequences](using-data-structures/lazy-sequences.md)
        * [Destructuring](using-data-structures/destructuring.md)
        * [Applying functions](using-data-structures/applying-functions.md)
        * [Mapping functions](using-data-structures/mapping-data-structures.md)
    * [Modifying data](modifying-data-structures/index.md)
        * [Lists](modifying-data-structures/lists.md)
        * [Maps](modifying-data-structures/maps.md)
        * [Vectors](modifying-data-structures/vectors.md)
        * [Sets](modifying-data-structures/sets.md)
    * [Iterate over data](iterate-over-data/index.md)
        * [map](iterate-over-data/map.md)
            * [partial](iterate-over-data/map-partial.md)
            * [fn](iterate-over-data/map-fn.md)
        * [filter](iterate-over-data/filter-remove.md)
        * [apply](iterate-over-data/apply.md)
        * [reduce](iterate-over-data/reduce.md)
        * [comp](iterate-over-data/reduce.md)
        * [transduce](iterate-over-data/reduce.md)
    * [Designing Data Structures](designing-data-structures/index.md)
        * [With Vectors](designing-data-structures/with-vectors.md)
        * [With Vectors of Vectors](designing-data-structures/with-vectors-of-vectors.md)
        * [With Maps](designing-data-structures/with-maps.md)
        * [With Maps of Maps](designing-data-structures/with-maps-of-maps.md)
        * [With Vectors of Maps](designing-data-structures/with-vectors-of-maps.md)
        * [Model alphabet codes](designing-data-structures/modeling-alphabet-codes.md)
        * [Model name generation map](designing-data-structures/modeling-name-generation-map.md)

## Custom code
<!-- Definging names for data and expressions -->
<!-- Defining custom functions -->
<!-- reducting functions -->
* [Assigning Names](basic-clojure/assigning-names.md)
<!-- * [Naming](basic-clojure/naming.md) -->
<!--     * [Global definitions](basic-clojure/global-definitions.md) -->
<!--     * [Local Bindings](basic-clojure/local-bindings.md) -->
<!--     * [Private functions](basic-clojure/private-functions.md) -->
* [Defining Functions](basic-clojure/defining-functions.md)
* [Defing behaviour with Functions](defining-behaviour-with-functions/index.md)
    * [Syntax](defining-behaviour-with-functions/syntax.md)
    * [Calling functions](defining-behaviour-with-functions/calling-functions.md)
    <!-- * [Examples](defining-behaviour-with-functions/examples.md) -->
    <!-- * [Parameters](defining-behaviour-with-functions/parameters.md) -->
    * [Anonymous Functions](defining-behaviour-with-functions/anonymous-functions.md)


## Unit testing
* [Testing](testing/index.md)
    * [clojure.test](testing/clojure.test.md)


## Pure functional design
* [Thinking Functionally](thinking-functionally/index.md)
    * [Side effects](thinking-functionally/side-effects.md)
    * [Pure functions](thinking-functionally/pure-functions.md)
    * [Impure functions](thinking-functionally/impure-functions.md)
    * [First Class functions](thinking-functionally/first-class-functions.md)
    * [Homoiconicity](thinking-functionally/homoiconicity.md)
    * [Function Composition](thinking-functionally/function-composition.md)
        * [Example: Hitchhikers Guide](thinking-functionally/example-hitchhikers-guide.md)
    * [Higher Order functions](thinking-functionally/higher-order-functions.md)
    * [Immutability](thinking-functionally/immutability.md)
        * [Immutable values](thinking-functionally/immutable-values.md)
        * [Immutable collections](thinking-functionally/immutable-collections.md)
        * [Immutable Local Bindings](thinking-functionally/immutable-local-bindings.md)
    * [Currying & Partial Functions](thinking-functionally/partial-functions.md)
        * [map with partial](thinking-functionally/map-with-partial.md)
    * [List Comprehension](thinking-functionally/list-comprehension.md)
    * [Lazy Evaluation](thinking-functionally/lazy-evaluation.md)
    * [Sequences](thinking-functionally/sequences.md)
    * [Sequence-abstraction](thinking-functionally/sequence-abstractions.md)
    * [Functors](thinking-functionally/functors.md)
    * [Arity](thinking-functionally/arity.md)
    * [Pattern matching](thinking-functionally/pattern-matching.md)
    * [Polymorphism](thinking-functionally/polymorphism.md)
    * [Recursion](thinking-functionally/recursion.md)
    * [Recursion & Polymorphism](thinking-functionally/recursion-polymorphism.md)
    * [Tail recursion](thinking-functionally/tail-recursion.md)

## Host Interoperability

* [Java Interoperability](basic-clojure/java-interop.md)
    * [More Java fun](basic-clojure/more-java-fun.md)

## Projects
<!-- Convert to deps.edn -->
* [Simple project](simple-project/index.md)
    * [Create a project](simple-project/create-project.md)
    * [Run the REPL](simple-project/run-the-repl.md)
* [Reading Files](basic-clojure/index.md)
    * [Whats my environment](basic-clojure/whats-my-environment.md)
    * [Reading project file](basic-clojure/reading-project-file.md)

## Command Line Games
* [Games](games/index.md)
    <!-- Convert to deps.edn -->
    * [TicTacToe CLI](games/tictactoe-cli/index.md)
        * [Create Project](games/tictactoe-cli/create-project.md)


## Performance testing
<!--     * [Performance](performance/index.md) -->
<!--         * [Testing functions](performance/testing-functions.md) -->
<!--         * [Performance](performance/load-testing.md) -->


<!-- ## Reference -->
<!-- * [Reference](reference/index.md) -->
<!--     * [Basic Syntax](reference/basic-syntax.md) -->
<!--     <\!-- * [Naming](reference/naming.md) -\-> -->
<!--     * [Functions](reference/functions.md) -->
<!--     * [Sequences](reference/sequences.md) -->
<!--     * [Control Flow](reference/control-flow.md) -->
<!--     * [Persistent Data Structures](reference/persistent-data-structures.md) -->
<!--     * [Quick look at Types](basic-clojure/quick-look-at-types.md) -->
<!--     * [Changing State](reference/changing-state.md) -->
<!--     * [Recursion](reference/recursion.md) -->
<!--     <\!-- * [Reader Macros](reference/reader-macros.md) -\-> -->
<!--     * [Regular Expressions](reference/regular-expressions.md) -->
<!--     * [Core.async](reference/core-async.md) -->
<!--     * [Prasmatic Schema](reference/prasmatic-schema.md) -->
<!--     * [Books on Clojure](reference/books.md) -->
<!-- * [Standard Library](standard-library/index.md) -->
<!--     * [Sequences](standard-library/sequences.md) -->
<!--     * [Collections](standard-library/collections.md) -->
<!--     * [Iteration](standard-library/iteration.md) -->

<!-- ## To organise -->
<!-- * [Work in Progress](work-in-progress.md) -->
<!--     * [core.async](core.async/index.md) -->
<!--         * [Bike Assembly Line](core.async/bike-assembly-line/index.md) -->
<!--         * [Toy Car assembly line](core.async/toy-car-assembly-line/index.md) -->
<!--         * [Clacks Messages](core.async/clacks-messages/index.md) -->
<!--     * [Managing state changes](thinking-functionally/managing-state-changes.md) -->
<!--     * [Project Palindrome](project-palindrome/index.md) -->
<!--         * [Simple palindrome test](project-palindrome/simple-palindrome-test.md) -->
<!--     * [Libraries](libraries/index.md) -->
<!--         * [clojure.core](libraries/clojure-core.md) -->
<!--         * [clojure.core](libraries/clojure-core-lisp-comprehension.md) -->
<!--         * [Clojars](libraries/clojars.md) -->
<!--         * [om](libraries/om.md) -->
<!--         * [edn](libraries/edn.md) -->
<!--     * [Leiningen Configuration](leiningen/index.md) -->
<!--         * [Create a project](leiningen/create-a-project.md) -->
<!--         * [Run the REPL](leiningen/run-the-repl.md) -->
<!--         * [Profiles overview](leiningen/profile.md) -->
<!--         * [Adding a dev profile](leiningen/adding-a-dev-profile.md) -->
<!--         * [Templates](leiningen/templates.md) -->
<!--         * [Create a template](leiningen/create-a-template.md) -->
<!--         * [Plugins](leiningen/plugins.md) -->
<!--     * [Explaining Macros](explaining-macros.md) -->
<!-- * [Where next](where-next.md) -->

<!-- ## Development tools -->

<!-- * [Development Tools](development-tools/index.md) -->
<!--     * [Java](development-tools/java.md) -->
<!--     * [Leiningen](development-tools/leiningen.md) -->
<!--     * [Editor install guides](development-tools/editor-install-guides/index.md) -->
<!--         * [Atom.io - ProtoREPL](development-tools/editor-install-guides/atom-protorepl.md) -->
<!--         * [Atom.io - Proton](development-tools/editor-install-guides/atom-proton.md) -->
<!--         * [VS Code - Calva](development-tools/editor-install-guides/vscode-calva.md) -->
<!--         * [Emacs - Spacemacs](development-tools/editor-install-guides/emacs-spacemacs.md) -->
<!--         * [IntelliJ - Cursive](development-tools/editor-install-guides/intellij-cursive.md) -->
<!--     * [Editor User Guides](development-tools/editor-user-guides/index.md) -->
<!--         * [Atom.io - Protorepl](development-tools/editor-user-guides/atom-protorepl.md) -->
<!--         * [Atom.io - Proton](development-tools/editor-user-guides/atom-proton.md) -->
<!--         * [Emacs - Spacemacs](development-tools/editor-user-guides/emacs-spacemacs.md) -->
<!--         * [VS Code - Calva](development-tools/editor-user-guides/vscode-calva.md) -->
<!--         * [IntelliJ - Cursive](development-tools/editor-user-guides/intellij-cursive.md) -->
<!--         * [Lighttable](lighttable/index.md) -->
<!--             * [Configure Keyboard mappings](lighttable/configure-keyboard-mappings.md) -->

<!-- ## Puzzles -->
<!-- * [Puzzles](puzzles/index.md) -->
<!--     * [Random Seat Assignment](puzzles/random-seat-assignment.md) -->

<!-- ## Deprecated Content -->
<!-- * [How to use the workshop](using-the-workshop/index.md) -->
<!--     * [Technical Requirements](using-the-workshop/requirements.md) -->
<!--     * [Code Examples](using-the-workshop/code-examples.md) -->
<!-- * [Development Environments](development-environments/index.md) -->
<!--     * [Java](development-environments/java.md) -->
<!--     * [Leiningen](development-environments/leiningen.md) -->
<!--     * [LightTable](development-environments/lighttable.md) -->
<!--     * [Other tools](development-environments/other-tools.md) -->
