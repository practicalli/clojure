# Emacs and Spacemacs user guide

A simplified user guide to get you started quickly.

Please take a look at the [Spacemacs documentation](http://spacemacs.org/doc/DOCUMENTATION.html) and [Practicalli Spacemacs book](https://practicalli.github.io/spacemacs/) for detailed guides.

{% youtube %}
https://youtu.be/tzj1y4hNwrA
{% endyoutube %}


## Starting a Clojure REPL

`SPC f f` to open a Clojure or ClojureScript file.  Type the path and filename of the file (possible matches of existing files narrow as you type).

Now start either a Clojure or ClojureScript REPL

`, '` or `M-RET '` to start a Clojure repl.

`, "` or `M-RET "` to start a ClojureScript repl.

## Evaluating code

In the Clojure or ClojureScript file you opened, you can evaluate specific expressions (any parts of the code in `()`) or symbols.

`, e f` will evaluate the outer most expression and show the result inline.

`, e ;` will evaluate the outer most expression and show the result as a comment.

`, e e` will evaluate the last expression before the cursor position (eg. to the left or above).

## Changing the REPL Namespace

`, s n` changes the namespace to that in the current code buffer


> #### Hint::Practicalli Spacemacs
> [Practicalli Spacemacs](https://practicalli.github.io/spacemacs/) is a detailed guide to Clojure development with Spacemacs and is freely available.
>
> [Practicalli Spacemacs YouTube playlist](https://www.youtube.com/playlist?list=PLy9I_IfUBzKIC9I3iUcxCyL-i1hlJfYRp) contains all the videos from the book.
