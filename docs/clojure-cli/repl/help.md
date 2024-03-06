# Help at the REPL

rebel readline provides tools to help you discover and use functions from clojure.core and any other libraries you add to the REPL.

`:repl/help` will show all the commands available for rebel readline

++tab++ to autocomplete the current characters into a function name.  All functions that match the characters will be show, allowing quick discovery of functions available.
Typing in the first few characters of a function and press

![Clojure REPL rebel readling - autocompletion](https://github.com/practicalli/graphic-design/blob/live/clojure/rebel/clojure-repl-rebel-function-autocomplete-map-dark.png?raw=true#only-dark)
![Clojure REPL rebel readling - autocompletion](https://github.com/practicalli/graphic-design/blob/live/clojure/rebel/clojure-repl-rebel-function-autocomplete-map-light.png?raw=true#only-light)

Moving the cursor after the name of a function will show the signatures available, so a function can be called with the correct number and form of arguments.

![Clojure REPL rebel readline - function signature help](https://github.com/practicalli/graphic-design/blob/live/clojure/rebel/clojure-repl-rebel-function-signature-map-dark.png?raw=true#only-dark)
![Clojure REPL rebel readline - function signature help](https://github.com/practicalli/graphic-design/blob/live/clojure/rebel/clojure-repl-rebel-function-signature-map-light.png?raw=true#only-light)

++ctrl+c+ctrl+"d"++ on a function name shows the docstring to help understand the functions purpose.

![Clojure REPL rebel readline - doc function showing a function docstring](https://github.com/practicalli/graphic-design/blob/live/clojure/rebel/clojure-repl-rebel-function-doc-map-dark.png?raw=true#only-dark)
![Clojure REPL rebel readline - doc function showing a function docstring](https://github.com/practicalli/graphic-design/blob/live/clojure/rebel/clojure-repl-rebel-function-doc-map-light.png?raw=true#only-light)

> `clojure.repl/doc` function also shows the docstring of a function `(clojure.repl/doc doc)`

++ctrl+x++ ++ctrl+"a"++ on a name shows all the possible matching functions to help you discover what is available.  ++tab++ through the list of matches, ++enter++ to select a function

![clojure repl rebel - apropos on function showing all variations](https://github.com/practicalli/graphic-design/blob/live/clojure/rebel/clojure-repl-rebel-function-apropos-map-dark.png?raw=true#only-dark)
![clojure repl rebel - apropos on function showing all variations](https://github.com/practicalli/graphic-design/blob/live/clojure/rebel/clojure-repl-rebel-function-apropos-map-light.png?raw=true#only-light)


## Rebel Commands

Type `:repl/help` or `:repl` followed by ++tab++ to see a list of available commands.

| Keybinding                | Description                                                       |
|-------------------------- | ----------------------------------------------------------------- |
| `:repl/help`              | Prints the documentation for all available commands.              |
| `:repl/key-bindings`      | search or list current key bindings                               |
| `:repl/quit`              | Quits the REPL                                                    |
| `:repl/set-color-theme`   | Change the color theme `:dark-screen-theme` `:light-screen-theme` |
| `:repl/set-key-map`       | Change key bindings to given key-map, `:emacs` `:vicmd` `:viins`  |
| `:repl/toggle-color`      | Toggle ANSI text coloration on and off                            |
| `:repl/toggle-completion` | Toggle the completion functionality on and off                    |
| `:repl/toggle-eldoc`      | Toggle the auto display of function signatures on and off         |
| `:repl/toggle-highlight`  | Toggle readline syntax highlighting on and off                    |
| `:repl/toggle-indent`     | Toggle the automatic indenting of Clojure code on and off         |


## Key-bindings

| Keybinding                | Description                                                                     |
| ------------------------- | ------------------------------------------------------------------------------- |
| ++ctrl+"c"++              | aborts editing the current line                                                 |
| ++ctrl+"d"++              | at the start of a line => sends an end of stream message                        |
| ++tab++                   | word completion or code indent when cursor in whitespace at the start of line   |
| ++ctrl+"x"++ ++ctrl+"d"++ | Show documentation for word at point                                            |
| ++ctrl+"x"++ ++ctrl+"s"++ | Show source for word at point                                                   |
| ++ctrl+"x"++ ++ctrl+"a"++ | Show apropos for word at point                                                  |
| ++ctrl+"x"++ ++ctrl+"e"++ | Inline eval for SEXP before the point                                           |

Examine key-bindings with the `:repl/key-bindings` command.
