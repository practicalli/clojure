# Writing Games with Clojure

> #### TODO::work in progress, sorry
> Pull requests are welcome

Games are driven by events and require state to be managed, so are a good way to explore how to manage state with immutable values.

For games in Clojure the events are simply function calls and we prefer to pass the state around rather than have a central mutable container for our state.

This section will contain several games that have been built using a functional approach with immutable data structures.

* TicTacToe on the command line


> #### Hint::Games in ClojureScript
> There is a section on games in the Practicalli ClojureScript book, including [a TicTacToe game using Reagent](https://practical.li/clojurescript/reagent-projects/tic-tac-toe/) (react.js style library) and Scalable Vector Graphics (SVG).
