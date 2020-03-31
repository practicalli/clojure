# Atom.io and Proton user guide



A simplified user guide to get you started quickly and a [list of keyboard shortcuts](#keybindings-and-events).

Please take a look at the [Proton documentation](https://github.com/dvcrn/proton/blob/master/MANUAL.md) for a detailed guide.


## Space menu

`SPC` means press the Space bar on the keyboard.  This displays a text menu to run the most common commands.

`,` means press the comma key.  This will open the language specific menu.  So when a Clojure window pane is displayed, `,` will show you commands specific to Clojure.

You can also use `SPC m` to get to the same Clojure menu.

## Add Clojure Project to Atom

`SPC f f` to add a Clojure project to Atom.  This should be a project created with [Leiningen](http://leiningen.org).

Open the `project.clj` file and add [the latest proto-repl library](https://clojars.org/proto-repl) as a dependency


## Start a Local Clojure REPL

`, s i` will start a REPL using the Clojure project

A new window pane will open in Atom and the REPL will start in a few seconds.


### Connecting to a Remote REPL

`, s c` will connect to a running REPL, (i.e. that was started in a terminal with the command `lein repl`).

When prompted, enter the hosts and port number from the already running REPL.  These details were shown when the REPL was run.


## Evaluate code in the REPL

`shift+enter` evaluates code that you type in the REPL window.

 The REPL maintains a history of the code typed in and can be navigated by using the up and down arrow keys.

## Evaluate code in the source file

`, e b` evaluates an expression (a _block_ of code)

`, e B` evaluates the outer-most expression (top block)

`, e r` evaluates a selected _region_ of code


## Changing the REPL Namespace

Change the REPL namespace to get access to the functions in that namespace.

Place your cursor in the namespace definition, `(ns my-namespace ,,,)`

`, e B` evaluates the namespace expression and change the REPL to this new namespace.

## Save changes in the source code file

`SPC f s` will save the current file.


## Commenting / uncommenting code

`SPC ;` will comment or uncomment the current line.

Use `v` to select a region of code and `SPC ;` will comment or uncomment that region.


## Increase / decrease font size

`Ctrl +` and `Ctrl -` will increase and decrease the size of the font in the editor windows.

To increase the size of the font in the UI, you need to edit the theme

`Settings` > `Theme` > Theme name > settings cog icon

![Atom Settings Theme Configure](/images/atom-settings-theme-config.png)


> ####Hint::Atom UI styles CSS
> You can set the size of font used for the Atom UI, along with other CSS styles, by editing the `~/.atom/styles.less` file.
>
> See this [styles.less](https://gist.github.com/jr0cket/23635b4fb3060a014506ba10265ced5e) gist for examples of changes to the general styles and for theme specific styles, such as with one-dark-ui
