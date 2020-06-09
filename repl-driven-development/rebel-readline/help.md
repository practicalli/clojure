# Help at the REPL
rebel readline provides tools to help you discover and use functions from clojure.core and any other libraries you add to the REPL.

`:repl/help` will show all the commands available for rebel readline

`TAB` to autocomplete the current characters into a function name.  All functions that match the characters will be show, allowing quick discovery of functions available.
Typing in the first few characters of a function and press

![Clojure REPL rebel readling - autocompletion](/images/clojure-repl-rebel-readline-function-autocomplete.png)

Moving the cursor after the name of a function will show the signatures available, so the correct arguments can be used with the function call.

![Clojure REPL rebel readline - function signature help](/images/clojure-repl-rebel-readline-function-signature-help.png)

`Ctrl-x Ctrl-D` or using the function `clojure.repl/doc` function will show the documentation for functions, so you can understand the functions purpose.

![Clojure REPL rebel readline - doc function showing a function docstring](/images/clojure-repl-repl-readline-doc-reduce.png)
