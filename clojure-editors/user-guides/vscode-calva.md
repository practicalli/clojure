# VS Code User Guide

> #### TODO::work in progress, sorry

Calva connects to a running `nrepl` session, so you need to start that outside Calva, then connect (`ctrl+alt+v c`).

It has dependencies on `tools/nrepl` and `cider/nrepl`. Please make sure to read the [Getting started](https://github.com/BetterThanTomorrow/calva/wiki/Getting-Started) page on the wiki to get instructions and information on how to unlock the power of the REPL inside your editor.


## Features

### At a glance
- Evaluate code inline
- Run tests
- Integrated repls (using the VS Code Terminal)
- Intellisense
- Underlining compile-time errors
- Go to / Peek at definition
- View docstrings on hover
- View function signatures on hover
- Supports all clojure filetypes, clj, cljc and cljs.
- Easy toggle between clj and cljs repl for cljc files
- Autoindent according to: https://github.com/bbatsov/clojure-style-guide
- Enables `clj` evaluation of clojure code in all files (e.g. Markdown, etcetera).
- Support for [shadow-cljs](http://shadow-cljs.org).

Demo: switch between clj and cljs repl sessions for cljc files:

![CLJC repl switching](/assets/howto/cljc-clj-cljs.gif)

### More in depth (and some usage info)
- Running tests through the REPL connection, and mark them in the Problems tab
  - Run namespace tests: `ctrl+alt+v t`
  - Run all tests: `ctrl+alt+v shift+t`
  - Rerun previously failing tests: `ctrl+alt+v ctrl+t`
  - Marks test failures using the Problem tab
  - User setting for running namespace tests on save (defaults to **on**)
  - **Caveat**: Right now the tests are reported only when all are run, making it painful to run all tests in larger projects. I'll fix it. Promise!
- Code evaluation
  - Evaluate code at cursor and show the results as annotation in the editor: `ctrl+alt+v e`
  - Evaluate code and replace it in the editor, inline: `ctrl+alt+v r`
  - Pretty printing evaluation results: `ctrl+alt+v p`
  - Evaluate current top level form (based on where the cursor is) and show results inline: `ctrl+alt+v space`
    - Send the current top level form to the REPL terminal: `ctrl+alt+v alt+space`
  - Error information when evaluation fails (at least a hint)
  - Support for `cljc` files and you can choose if they should be evaluated by the `clj` or the `cljc` repl session.
  - Enables `clj` repl for all files/editors. You now can evaluate those clojure code snippets in Markdown files.
  - The evaluation commands will auto-”detect” vectors and maps as well as list.
  - User setting to evaluate namespace on save/open file (defaults to **on**)
- Integrated REPLs using the Terminal tab
  - Switch to current namespace in the terminal REPL: `ctrl+alt+v n`
  - Load current namespace in the terminal REPL: `ctrl+alt+v alt+n`
  - Evaluate code from the editor to the terminal REPL: `ctrl+alt+v alt+e`
- When editing `cljc` files, easily choose if repl commands should go to the `clj` or `cljs` repl by clicking the `cljc/clj[s]` indicator in the status bar.
- Selection of current form: `ctrl+alt+v s`. Auto-detected the same way as for evaluation. Will select the form preceding or following the cursor first, otherwise the form the cursor is inside. (Only when the cursor is directly adjacent to any bracket so far.)

Demo: Peek at definitions, etcetera:

![Features](/assets/howto/features.gif)

Demo: lint errors are marked in the editor. (As are unit test failures)

![underline error](/assets/howto/error.png)

## Calva Paredit and Calva Formatter included

With Calva you also get structural editing, from [Calva Paredit](https://marketplace.visualstudio.com/items?itemName=cospaia.paredit-revived) and formatting, through [Calva Formatter](https://github.com/BetterThanTomorrow/calva-fmt).

You really should have a look at the READMEs for those as well. One thing to note about it is that Calva Formatter sets the default keybinding of the **Format current form** command to `tab`. Good to know, right? Please check that README before you change the keybinding.

### How to contribute

Calva is being ported to a combination of TypeScript and ClojureScript. The ClojureScript part uses the [shadow-cljs](http://shadow-cljs.org) toolchain. See the [How to Contribute](https://github.com/BetterThanTomorrow/calva/wiki/How-to-Contribute) page on the wiki for instructions on how to hack on Calva.

PRs welcome, file an issue or chat me (@pez) up in the [`#editors` channel](https://clojurians.slack.com/messages/editors/) of the Clojurians Slack. Tweeting [@pappapez](https://twitter.com/pappapez) works too.

❤️
