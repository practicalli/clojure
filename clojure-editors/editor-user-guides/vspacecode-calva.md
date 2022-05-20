## VS Code with VSpaceCode and Calva
The [Calva User Guide](https://calva.io/) provides a detailed guide to the features of Calva, although the key bindings for VSpaceCode are not included in that guide.

Open the VSCode editor and open the root folder of your project.  Then add use let Calva start your project REPL and connect.

## Open Project Folder in VSCode
`SPC SPC` to open the command menu and type `file open folder` and select the folder that contains the Clojure project.

Select the top level of the folder, e.g. `playground` and type `Ctrl-l`


## Start a REPL for the project
`, "` to jack-in to a Clojure REPL for the project.  This starts an external REPL process and connects to it.

> Alternative, use `, '` to connect to an external REPL process that has already started.

Select either `deps.edn` for Clojure CLI or `Leiningen` when prompted for the project type

![VS Code - Calva - Start REPL - nREPL button](https://raw.githubusercontent.com/practicalli/graphic-design/live/vspacecode/screenshots/vspacecode-clojure-repl-jack-in-leiningen.png)

Wait a few moments for the REPL to start.

A new REPL window will open when the Clojure REPL is ready

![VS Code - Calva - Start REPL - nREPL button](/images/vspacecode-calva-jack-in-repl-output.png)


### Troubleshooting
If the REPL did not start, the nREPL link in the bottom blue bar will show the word "Disconnected".

![VS Code - Calva - Start REPL - nREPL button](/images/vscode-calva-clojure-repl-connect-nrepl-button.png)

Open the Output tab to see the progress of the REPL starting.

![VS Code - Calva - Start REPL - nREPL button](/images/vscode-calva-clojure-repl-connect-output.png)

Try running a REPL in the command line and connecting to it (details at bottom of this page).


## Evaluating Clojure code
`, e f` to evaluate a top-level expression and see the results inline.  Or `, e s` to select a specific expression and `, e e` to evaluate it.

`, e l` to clear all the evaluated results.

| Keybinding | Description                                          |
|------------|------------------------------------------------------|
| `, e ;`    | Evaluate the current expression and paste as comment |
| `, e :`    | Evaluate the current expression and paste as comment |
| `, e e`    | Show the result of the current expression            |
| `, e f`    | Show the result of the top level expression          |
| `, e l`    | Clear all the evaluated results                      |
| `, e n`    | Evaluate all code in the current file/namespace      |
| `, e w`    | Replace the expression with its result               |


## Running tests
`, e n` to evaluate all the unit test code in the current window

`, t a` to run all the unit tests in the project

`, t f` to run just the failing tests

| Keybinding | Description                             |
|------------|-----------------------------------------|
| `, t a`    | Run all tests in the project            |
| `, t f`    | Run all tests for the current namespace |
| `, t n`    | Run all tests for the current namespace |
| `, t t`    | Run all tests for the current namespace |

> ####HINT::Test results shown in REPL
> The REPL window is used to display the results of running unit tests


## Commenting / uncommenting code
`SPC c l` toggles a comment on the current line.

Use the **Add Line Comment** command to place `;;` at the start of a line, which comments it out.



## Linting
`, c n` and `, c N` cycle through clj-kondo linting warnings


## Increase / decrease font size
`Ctrl +` and `Ctrl -` will increase and decrease the size of the whole editor.

`SPC SPC` and type the command `Preference: Open Settings (JSON)` to open the `settings.json` configuration file.  Update the value for `editor.fontSize` and save the file.  The font should update immediately in the VS Code UI.

Other useful options that can be added to the `settings.json` configuration

```
   "workbench.colorTheme": "Solarized Light",
    "editor.fontSize": 14,
    "editor.fontFamily": "'Fira Code', 'Ubuntu Mono', 'Droid Sans Mono', 'monospace', monospace, 'Droid Sans Fallback'",
    "window.zoomLevel": 1,
    "calva.paredit.defaultKeyMap": "strict"
```


## Structural editing - Paredit
`, k` is the structural editing menu.

Structural editing ensures code can be written and edited without breaking the structure of Clojure.  Structural editing ensures you dont have uneven parentheses, `()`, `[]`, `{}`, etc.

The [Calva visual Guide to Paredit](https://calva.io/paredit/) includes lots of examples of using Structural editing.

| Keybinding | Description                                        |
|------------|----------------------------------------------------|
| `, k .`    | Toggle paredit strict mode                         |
| `, k b`    | Barf forwards                                      |
| `, k c`    | Convolute expression                               |
| `, k h`    | Jump backwards                                     |
| `, k j`    | Jump forward down an expression                    |
| `, k k`    | Jump backwards down an expression                  |
| `, k l`    | Jump forward an expression                         |
| `, k r`    | Raise an expression (over-write parent expression) |
| `, k s`    | Slurp forward                                      |
| `, k t`    | Transpose expression                               |
| `, k w (`  | Wrap with ()                                       |
| `, k w [`  | Wrap with []                                       |
| `, k w {`  | Wrap with {}                                       |
| `, k w "`  | Wrap with ""                                       |
| `, k w p`  | rewrap with ()                                     |
| `, k w s`  | rewWrap with []                                    |
| `, k w c`  | rewWrap with {}                                    |
| `, k w q`  | rewWrap with ""                                    |



---

## Start a REPL on the command line
**Ctrl+`** toggles open the [VSCode Integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).  Or open your operating system terminal.

> ####INFO::Windows GitBash users
> [Configure the VS Code internal terminal to use the GitBash shell](https://code.visualstudio.com/docs/editor/integrated-terminal#_configuration).

In the terminal, change to the folder than contains your project, e.g. `cd projects/clojure/playground`

For a Clojure CLI project, use the command `clojure -M:env/test:middleware/cider-clj` to run a REPL process for Calva to connect to via nREPL, using the [practicalli/clojure-deps-edn configuration](https://github.com/practicalli/clojure-deps-edn#middleware).

![Clojure CLI tools REPL running with nrepl and cider libraries, including the test path](/images/clojure-cli-tools-repl-termina-headless-nrepl-cider.png)

For a Leiningen project, use the command `lein repl`

![VS Code Terminal - Clojure REPL running](/images/vscode-calva-terminal-repl-running.png)


### Connecting to an external REPL from Calva

`, '` to connect to an external REPL process.

Select either `Clojure CLI` or `Leiningen` when prompted for the project type

![VS Code - Calva - Start REPL - nREPL button](/images/vscode-calva-clojure-repl-connect-project-type.png)


Confirm the **host** and **port** of the REPL, this should be automatically detected. These details were shown when the REPL was run in the terminal.

![Calva - connect to running REPL](/images/vscode-calva-connect-host-and-port.png)

Wait a few moments for the REPL to start.

A new REPL window will open when the Clojure REPL is ready

![VS Code - Calva - Start REPL - nREPL button](/images/vspacecode-calva-connect-repl-output.png.png)


In the bottom left of the VS Code window, check the status of the **nrepl** connection.  If you are connected, then the *disconnected* status should disappear

![Calva - nrepl disconnected](/images/vspacecode-status-bar-calva-repl-status.png)
