# Atom and ProtoREPL user guide

A simplified user guide to get you started quickly and a [list of keyboard shortcuts](#keybindings-and-events).

Please take a look at the [ProtoREPL documentation](https://github.com/jasongilman/proto-repl/blob/master/README.md#usage) for a detailed guides.

{% youtube %}
https://youtu.be/_P7urPN2QRQ
{% endyoutube %}


## Start a Local Clojure REPL

`Ctrl-Shift-a` to add a Clojure project to Atom.  This should be a project created with [Leiningen](http://leiningen.org).

Open the `project.clj` file and add [the latest proto-repl library](https://clojars.org/proto-repl) as a dependency

`Ctrl-Shift-p` to pop-up the Command Palette (cmd-shift-p) and select `Proto REPL: Toggle`

`ctrl-alt-, e` will exit the REPL, (i.e. once you have finished the workshop).

### Connecting to a Remote REPL

Proto REPL can connect to a Clojure REPL started with Leiningen on the command line.

`Ctrl-Alt-, y` and enter the hosts and port number from the already running REPL.

Alternatively, use `Ctrl-Shift-p` to pop-up the Command Palette (cmd-shift-p) and select `Proto REPL: Remote Nrepl Connection`.  Enter the host and port of the REPL to establish the connection.


## Evaluating Code

Code can be evaluated in a Clojure file or the REPL window.

`shift+enter` to evaluate code typed in the REPL window. The REPL maintains a history of the code typed in and can be navigated by using the up and down arrow keys.

`ctrl-alt-, b` evaluates an expression (a block of code)

`ctrl-alt-, s` evaluates a selected area of code

`ctrl-alt-, f` evaluates the whole Clojure file

## Changing the REPL Namespace

Change the REPL namespace to get access to the functions in that namespace.

Place your cursor in the namespace definition, `(ns my-namespace ,,,)`

`ctrl-alt-, b` evaluates the namespace expression and change the REPL to this new namespace.


## Keybindings and Events

Keyboard shortcuts below refer to using `ctrl-alt-,` then a letter. This means press the `ctrl` key and the comma key at the same time, release them, and then press the subsequent letter.

| Keybinding           | Action                                                                                                                                |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `ctrl-alt-, L`       | Starts the REPL                                                                                                                       |
| `ctrl-alt-, shift-L` | Starts the REPL using the current open project.clj                                                                                    |
| `ctrl-alt-, y`       | Connects to a remote nREPL session.                                                                                                   |
| `ctrl-alt-, j`       | Starts a self hosted REPL.                                                                                                            |
| `ctrl-alt-, e`       | Exits the REPL                                                                                                                        |
| `ctrl-alt-, k`       | Clears REPL Output                                                                                                                    |
| `ctrl-alt-shift-, s` | Enables/Disables autoscrolling the REPL                                                                                               |
| `ctrl-alt-, b`       | Sends the current block of Clojure code to the REPL for execution.                                                                    |
| `ctrl-alt-, B`       | Sends the current top-level block of Clojure code to the REPL for execution.                                                          |
| `ctrl-alt-, s`       | Sends the selected text to the REPL for execution.                                                                                    |
| `ctrl-alt-, f`       | Loads the current file in the repl.                                                                                                   |
| `ctrl-alt-, r`       | Runs the `user/reset` function. See [Clojure Workflow, Reloaded](http://thinkrelevance.com/blog/2013/06/04/clojure-workflow-reloaded) |
| `ctrl-alt-shift-, r` | Clears all loaded namespaces using `clojure.tools.namespace` the runs the `user/reset` function.                                      |
| `ctrl-alt-, p`       | Pretty prints the last value returned at the REPL.                                                                                    |
| `ctrl-alt-, x`       | Runs all the tests in the current namespace.                                                                                          |
| `ctrl-alt-, t`       | Runs the test that has a name under the cursor.                                                                                       |
| `ctrl-alt-, a`       | Runs all the test in the current project.                                                                                             |
| `ctrl-alt-, d`       | Prints the documentation of a var under the cursor.                                                                                   |
| `ctrl-alt-, c`       | Prints out the code of the var under the cursor.                                                                                      |
| `ctrl-alt-, o`       | Opens the code of the var or namespace under the cursor. This works even with vars defined in libraries.                              |
| `ctrl-alt-, n`       | Lists the vars in the namespace under the cursor.                                                                                     |
| `ctrl-alt-shift-, n` | Lists the vars in the namespace under the cursor with documentation.                                                                  |
| `shift-ctrl-c`       | Attempts to interrupt the currently running command in the REPL.                                                                      |
| `ctrl-alt-shift-, i` | Inserts a call to `proto/save` with a unique id                                                                                       |
| `ctrl-alt-shift-, d` | Displays values saved using the `proto/save` function.                                                                                |
| `ctrl-alt-shift-, c` | Clears previously saved values using the `proto/save` function.                                                                       |
