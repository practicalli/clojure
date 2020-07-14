# Summary

* [Introduction](introduction.md)
    * [First taste of Clojure](first-taste-of-clojure.md)
        <!-- * [reagent examples](reagent-examples.md) -->
    <!-- replace repl.it with klipse - repl.it loads very slowly -->
    <!-- * [Quick start](quickstart/index.md) -->
    <!-- * [Quick reference](quickstart/quick-reference.md) -->
    <!-- * [Virtual Study Guide](study-guide.md) -->
    * [REPL driven development](repl-driven-devlopment.md)
    * [Clojure concepts](concepts/index.md)
        * [Functional Verses Imperative Programming](concepts/what-is-functional-programming.md)
        * [Clojure Big Ideas](concepts/ten-big-ideas.md)
        * [Clojure from the Author](concepts/clojure-made-simple.md)
        <!-- * [Learning Clojure](concepts/learning-clojure.md) -->
        <!-- * [When to use Clojure](concepts/purpose.md) -->
        * [Who uses Clojure](concepts/who-uses-clojure.md)
                <!-- * [The syntax](concepts/syntax.md) -->
        * [Design with Clojure](concepts/design.md)
                <!-- * [All bytecode in the end](concepts/all-bytecode-in-the-end.md) -->
                <!-- * [Features in more depth](concepts/features.md) -->
                <!-- * [Functional Reactive Programming](concepts/functional-programming.md) -->
    * [Contributing](contributing.md)

## Getting Started
* [Clojure tools](clojure-tools/install/index.md)
    * [Install Java](clojure-tools/install/install-java.md)
    * [Install Clojure](clojure-tools/install/install-clojure.md)
    * [Using Clojure Tools](clojure-tools/using-clojure-tools.md)
        * [rebel REPL](clojure-tools/rebel-repl/index.md)
            * [Coding in the REPL](clojure-tools/rebel-repl/coding-in-the-repl.md)
            * [Help at the REPL](clojure-tools/rebel-repl/help-at-the-repl.md)
            * [Customize rebel](clojure-tools/rebel-repl/customize-rebel.md)
            <!-- * [REPL uncovered](clojure-tools/repl-uncovered.md) --> <!-- TODO rewrite -->
        * [deps.edn configuration](clojure-tools/deps-edn-configuration.md)
        * [deps.edn aliases](clojure-tools/deps-edn-aliases.md)
        * [Create projects](clojure-tools/create-projects.md)
            <!-- Introduce Clojure examples that work well in the command line REPL -->
            <!-- Run a repl in an example project, require, in-ns, run -->
            <!-- a simple tic-tac-toe game or similar command line challenges, kata -->
            * [Add Libraries](clojure-tools/add-libraries.md)
            * [Namespaces](clojure-tools/namespace.md)
            * [Using projects in REPL](clojure-tools/projects/using-projects.md)
                <!-- * [Namespace refactor](clojure-tools/using/namespace-refactoring.md) -->
        * [Configure REPL Startup](clojure-tools/configure-repl-startup.md)
         <!-- * [Design Journal](clojure-tools/design-journal.md) -->
        * [Clojure Inspector](clojure-tools/clojure-inspector.md)
        * [REBL data browser](clojure-tools/rebl-data-browser.md)

* [Clojure Aware Editors](clojure-editors/index.md)
    * [Editor Install Guides](clojure-editors/editor-install-guides/index.md)
        * [Atom ProtoREPL](clojure-editors/editor-install-guides/atom-protorepl.md)
        * [Atom Proton](clojure-editors/editor-install-guides/atom-proton.md)
        * [Emacs Spacemacs](clojure-editors/editor-install-guides/emacs-spacemacs.md)
        * [VSCode Calva](clojure-editors/editor-install-guides/vscode-calva.md)
        * [IntelliJ Cursive](clojure-editors/editor-install-guides/intellij-cursive.md)
    * [Editor User Guides](clojure-editors/editor-user-guides/index.md)
        * [Atom ProtoREPL](clojure-editors/editor-user-guides/atom-protorepl.md)
        * [Atom Proton](clojure-editors/editor-user-guides/atom-proton.md)
        * [Emacs Spacemacs](clojure-editors/editor-user-guides/emacs-spacemacs.md)
        * [VSCode Calva](clojure-editors/editor-user-guides/vscode-calva.md)
        * [IntelliJ Cursive](clojure-editors/editor-user-guides/intellij-cursive.md)

## Clojure Standard Library
<!-- Basic syntax and calling functions -->
* [Syntax](basic-clojure/syntax.md)
    * [Code documentation](basic-clojure/code-documentation.md)
    * [Comments](basic-clojure/comments.md)
    * [Whats my environment](basic-clojure/whats-my-environment.md)
    <!-- Simple values numbers, strings ratios -->
    * [Strings](basic-clojure/strings.md)
    * [Numbers & Maths](basic-clojure/numbers-maths.md)
    * [Ratios](basic-clojure/ratios.md)

    * [Control flow](basic-clojure/control-flow.md)

    * [Assigning Names](basic-clojure/assigning-names.md)
    <!-- * [Naming](basic-clojure/naming.md) -->
    <!--     * [Global definitions](basic-clojure/global-definitions.md) -->
    <!--     * [Local Bindings](basic-clojure/local-bindings.md) -->
    <!--     * [Private functions](basic-clojure/private-functions.md) -->
    <!--     * [Naming Conventions](reference/naming-conventions.md) -->

    <!-- Persistent data structures list vector map set -->
* [Data structures](data-structures/index.md)
    * [List](data-structures/list.md)
    * [Map](data-structures/map.md)
    * [Vector](data-structures/vector.md)
    * [Set](data-structures/set.md)
    * [Naming data structures](data-structures/naming.md)

    <!-- Introducing the most common function families from clojure.core -->
    <!-- map reduce apply -->
    <!-- group-by sort-by -->
    <!-- partition partiion-all partition... -->

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

    * [Shared Memory](data-structures/shared-memory.md)

<!-- Definging names for data and expressions -->
<!-- Defining custom functions -->
<!-- reducting functions -->
* [Defining Functions](basic-clojure/defining-functions.md)
    * [Defing behaviour with Functions](defining-behaviour-with-functions/index.md)
    * [Syntax](defining-behaviour-with-functions/syntax.md)
    * [Calling functions](defining-behaviour-with-functions/calling-functions.md)
    <!-- * [Examples](defining-behaviour-with-functions/examples.md) -->
    <!-- * [Parameters](defining-behaviour-with-functions/parameters.md) -->
    * [Anonymous Functions](defining-behaviour-with-functions/anonymous-functions.md)
    * [Threading Macros](thinking-functionally/threading-macros.md)


<!-- Convert to deps.edn -->
* [Simple projects](simple-projects/index.md)
    <!-- * [Create a project](simple-projects/create-project.md) -->
    <!-- * [Run the REPL](simple-projects/run-the-repl.md) -->
    * [Random function](simple-projects/random-clojure-function.md)
    <!-- Refactor or delete -->
    <!-- * [Reading Files](simple-projects/index.md) -->
    <!--     * [Reading project file](simple-projects/reading-project-file.md) -->

<!-- Games -->
* [Games](games/index.md)
    <!-- Convert to deps.edn -->
    * [TicTacToe CLI](games/tictactoe-cli/index.md)
        * [Create Project](games/tictactoe-cli/create-project.md)




<!-- Elegantly applying Clojure idiomatically and climbing up the Clojure abstraction mountain (kilimanjaro, eg. its tall but not a sheer face like the Eiger, as each layer builds upon previous layers, a refinement as it were) -->
<!-- Abstrction mountain
     - functions
     - function composition
     - recursion - loop/recur recursive functions with recur
     - clojure.core recursive functions
     - clojure.core sequences and related functions
     - reduce and reducing functions
     - comp juxt
     - transducers teep-->

<!-- Or draw the analyogy of riding across the Clojure landscape
     -- riding up and down hills as you learn major milestones of Clojure,
     climbing and reaching various platos.
     Showing the effort of climbs as an overall effort of brain power with
     decents being growth in confidence

     This example can then be used in one of the exercises to judge the effort
     a reader has exerted so far and how much more effort is still required.
-->
<!-- Thinking Functionally -->
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

 <!-- Testing -->
* [Testing Clojure](testing/index.md)
    * [Unit testing](testing/unit-testing/index.md)
        * [Testing deps.edn projects](testing/unit-testing/testing-deps.edn-projects.md)
        * [Requiring Test namepaces](testing/unit-testing/require-test-namespaces.md)
        * [Writing Unit Tests](testing/unit-testing/writing-unit-tests.md)
        <!-- * [Expectations](testing/unit-testing/clojure-test-expectations.md) -->

    * [Test runners](testing/test-runners/index.md)
        * [Cognitect-labs](testing/test-runners/congnitect-labs-test-runner.md)
        <!-- * [eftest](testing/test-runners/eftest-runner.md) -->
        * [koacha](testing/test-runners/koacha-runner.md)
        * [Example projects](testing/test-runners/example-projects.md)

    * [Spec & Generative Testing](clojure-spec/index.md)
        * [Spec in the REPL](clojure-spec/using-spec-in-the-repl.md)
        * [Add Spec to Projects](clojure-spec/add-spec-to-projects.md)
        * [Organising Specs](clojure-spec/organising-specs.md)
        * [Data Specifications](clojure-spec/data/index.md)
            * [Predicates](clojure-spec/data/predicate-specifications.md)
            * [literal values](clojure-spec/data/literal-values.md)
            * [conform](clojure-spec/data/conform.md)
            * [valid?](clojure-spec/data/valid-q.md)
            * [explain](clojure-spec/data/explain.md)
            * [defining specs](clojure-spec/data/defining-specifications.md)
            * [registry](clojure-spec/data/registry.md)
            * [Entity Maps](clojure-spec/data/entity-maps.md)
            * [Map Literals](clojure-spec/data/map-literals.md)
            * [and/or specs](clojure-spec/data/and-or-specifications.md)
            * [Composite Specs](clojure-spec/data/composite-specifications.md)
            * [Hierarchical Specs](clojure-spec/data/hierarchical-specifications.md)

        * [Spec functions](clojure-spec/functions/index.md)
            * [function definitions](clojure-spec/functions/function-definition-specifications.md)
            * [documentation](clojure-spec/functions/documentation.md)
            * [higher-order functions](clojure-spec/functions/higher-order-functions.md)

        * [Testing Specifications](clojure-spec/testing/index.md)
            * [Checking arguments](clojure-spec/testing/checking arguments.md)
        <!-- * [Defining Specifications](clojure-spec/defining-specifications/index.md) -->
        * [Generative Testing](clojure-spec/generative-testing/index.md)
            * [Predicate generators](clojure-spec/generative-testing/predicate-generators.md)
            <!-- * [Generating Generators](clojure-spec/generative-testing/generating-generators.md) -->
            * [Example Projects](clojure-spec/generative-testing/example-projects/index.md)
                * [next-jdbc](clojure-spec/generative-testing/example-projects/next-jdbc.md)

        * [Spec Projects](clojure-spec/projects/index.md)
            <!-- Checking for bad names in ns declarations, lets, etc. -->
            <!-- * [Convention Checks](clojure-spec/projects/convention-checks.md) -->

            <!-- Playing cards -->
            * [Card Game](clojure-spec/projects/card-game/index.md)
                * [Playing Card Specifications](clojure-spec/projects/card-game/playing-card-specifications.md)
                * [Generating Data](clojure-spec/projects/card-game/generative-data-from-specifications.md)
                * [Game Specifications](clojure-spec/projects/card-game/game-specifications.md)
                * [Function Specifications](clojure-spec/projects/card-game/function-specifications.md)
                * [Organizing Instrumentation](clojure-spec/projects/card-game/organising-instrumentation.md)
            * [Bank Account TDD style](clojure-spec/projects/bank-account/index.md)
                <!-- * [Create project](clojure-spec/projects/bank-account/create-project.md) -->
                * [Write Failing test](clojure-spec/projects/bank-account/write-failing-tests.md)
                * [Spec: Customer details](clojure-spec/projects/bank-account/customer-details-specification.md)
                * [Spec: Account holder](clojure-spec/projects/bank-account/account-holder-specification.md)
                * [Generate test data](clojure-spec/projects/bank-account/generate-test-data.md)
                * [Unit Tests with spec](clojure-spec/projects/bank-account/unit-tests-with-spec.md)
                * [Spec Functions](clojure-spec/projects/bank-account/function-specifications.md)
                * [Test Function against spec](clojure-spec/projects/bank-account/test-functions-against-spec.md)

    * [Integration Testing](testing/integration-testing/index.md)
        * [Circle CI](testing/integration-testing/circle-ci/index.md)
            * [Random Clojure Function](testing/integration-testing/circle-ci/random-clojure-function.md)
            * [Status Monitor](testing/integration-testing/circle-ci/status-monitor.md)
            * [Circle CI sample project](testing/integration-testing/circle-ci/circle-ci-sample-project.md)
    <!-- * [Performance Testing](testing/performance-testing/index.md) -->
    <!-- * [Load/Stress Testing](testing/load-stress-testing/index.md) -->

<!-- Host Interoperability -->
* [Java Interoperability](basic-clojure/java-interop.md)
    * [More Java fun](basic-clojure/more-java-fun.md)


<!-- ## Scripting with Clojure -->
<!-- Section mostly covering Babashka and its pods -->


## Performance testing
<!-- * [Code Performance](performance/index.md) -->
<!--         * [Testing functions](performance/testing-functions.md) -->
<!--         * [Performance](performance/load-testing.md) -->
<!-- * [Performance Testing](testing/performance/index.md) -->
<!--     * [time](testing/performance/time.md) -->
<!--     * [Gatling](testing/performance/gatling.md) -->
<!--     * [clj-gatling](testing/performance/clj-gatling.md) -->


## Deployment

<!-- * [Observability](deployment/observability/index.md) -->



## Reference
* [Reference](reference/index.md)
<!--     * [Basic Syntax](reference/basic-syntax.md) -->
<!--     <\!-- * [Naming](reference/naming.md) -\-> -->
<!--     * [Functions](reference/functions.md) -->
    * [Predicate functions](reference/clojure/predicate-functions.md)
    * [doc / source functions](reference/doc-and-source-functions.md)
<!--     * [Sequences](reference/sequences.md) -->
<!--     * [Control Flow](reference/control-flow.md) -->
<!--     * [Persistent Data Structures](reference/persistent-data-structures.md) -->
<!--     * [Quick look at Types](basic-clojure/quick-look-at-types.md) -->
<!--     * [Changing State](reference/changing-state.md) -->
<!--     * [Recursion](reference/recursion.md) -->
<!--     <\!-- * [Reader Macros](reference/reader-macros.md) -\-> -->
    * [Regular Expressions](reference/clojure/regular-expressions/index.md)
        * [Matching with groups](reference/clojure/regular-expressions/matching-with-groups.md)
        * [Matching sub-strings](reference/clojure/regular-expressions/matching-sub-strings.md)
        * [Matching sub-sequences](reference/clojure/regular-expressions/matching-sub-sequences.md)
        * [Common Patterns](reference/clojure/regular-expressions/common-regex-patterns.md)
        * [String replace](reference/clojure/regular-expressions/string-replace-with-regex.md)
        * [String Split](reference/clojure/regular-expressions/string-split-with-regex.md)
        * [Sub-expression matches](reference/clojure/regular-expressions/sub-expression-matches.md)

    * [threading macros](reference/threading-macros.md)
    * [Tagged Literals](reference/tagged-literals/index.md)
        * [uuid](reference/tagged-literals/uuid.md)

    * [alternative tools](alternative-tools/index.md)
        * [Basic REPL](alternative-tools/clojure-tools/basic-repl.md)
        * [Evaluate an expression](alternative-tools/clojure-tools/evaluate-an-expression.md)
        * [Files and scripts](alternative-tools/clojure-tools/files-and-scripts.md)
        * [Hot Load Dependencies](alternative-tools/clojure-tools/hot-load-dependencies.md)
        * [REPL start namespace](alternative-tools/clojure-tools/set-namespace-on-repl-startup.md)

<!--     * [Core.async](reference/core-async.md) -->
<!--     * [Prasmatic  Schema](reference/prasmatic-schema.md) -->
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
