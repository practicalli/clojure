# VSCode and Calva user guide
The [Calva User Guide]() provides a detailed guide.  The following are a few highlights.

Open the VSCode editor and open the root folder of your project.  Then add use let Calva start your project REPL and connect.

> ####HINT::MacOSX Keys - Option or Alt
> Depending on the version of Mac computer you use, your Alt key may be called Option
> So `Ctrl+Alt+c e` would be `Ctrl+Option+c e`

## Open Project Folder in VSCode
`Ctrl+k Ctrl+o` to open the Folder that contains your project.  Or using the menu **File** > **Open Folder**

Select the top level of the folder, e.g. `playground` and click **OK**


## Start a REPL for basic projects
`ctrl+alt+c ctrl+alt+j` to start a REPL click on the nrepl name in the bottom left of VSCode UI.

Select either `Clojure CLI` or `Leiningen` when prompted for the project type

![VS Code - Calva - Start REPL - nREPL button](/images/vscode-calva-clojure-repl-connect-project-type.png)

Wait a few moments for the REPL to start.

A new CLJ REPL tab will open when the Clojure REPL is ready

![VS Code - Calva - Start REPL - nREPL button](/images/vscode-calva-clojure-repl-connect-repl-tab.png)

### Troubleshooting
If the REPL did not start, the nREPL link in the bottom blue bar will show the word "Disconnected".

![VS Code - Calva - Start REPL - nREPL button](/images/vscode-calva-clojure-repl-connect-nrepl-button.png)

Open the Output tab to see the progress of the REPL starting.  Ask your coach for help if you see output other than that below.

![VS Code - Calva - Start REPL - nREPL button](/images/vscode-calva-clojure-repl-connect-output.png)

Try running a REPL in the command line and connecting to it (details at bottom of this page).


## Start a REPL on the command line
**Ctrl+`** toggles open the [VSCode Integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).  Or open your operating system terminal.

> ####INFO::Windows GitBash users
> [Configure the VS Code internal terminal to use the GitBash shell](https://code.visualstudio.com/docs/editor/integrated-terminal#_configuration).

In the terminal, change to the folder than contains your project, e.g. `cd projects/clojure/playground`

To use Leiningen, type the command `lein repl` in the terminal.

![VS Code Terminal - Clojure REPL running](/images/vscode-calva-terminal-repl-running.png)

To use Clojure CLI tools, us the practicalli/clojure-deps-edn aliases and run a REPL that also starts an nREPL server

```
clojure -M:middleware/cider-clj
```

If you also wish to have an interactive terminal REPL, include rebel readline when starting the REPL

```
clojure -M:repl/rebel-nrepl
```


### Connecting to an external REPL from Calva

`Ctrl+Alt+c Ctrl+Alt+c` will open a command pop-up asking you to enter **host** and **port**. These details were shown when the REPL was run in the terminal.

![Calva - connect to running REPL](/images/vscode-calva-connect-host-and-port.png)

In the bottom left of the VS Code window, check the status of the **nrepl** connection.  If you are connected, then the *disconnected* status should disappear

![Calva - nrepl disconnected](/images/vscode-calva-nrepl-disconnected.png)


## Developing your project ##
Once you have a running REPL, use these commands to help you develop your code.

> ####HINT::MacOSX Keys - Option or Alt
> Depending on the version of Mac computer you use, your Alt key may be called Option
> So `Ctrl+Alt+c e` would be `Ctrl+Option+c e`

| Evaluate code             | Keybinding         | Description                                             |
|---------------------------|--------------------|---------------------------------------------------------|
| Namespace/file            | `Ctrl+Alt+c ENTER` | Load current file/namespace and all required namespaces |
| Top level expression      | `Ctrl+Alt+c SPACE` | Show the result of the top level expression             |
| Expression                | `Ctrl+Alt+c e`     | Show the result of the current expression               |
| Expression (send to REPL) | `Ctrl+Alt+c alt+e` | Evaluate current expression in the REPL Window          |
| Expression to comment     | `Ctrl+Alt+c c`     | Evaluate current expression and paste as comment        |
| Replace expression        | `Ctrl+Alt+c r`     | Replace the expression with its result                  |
| In the REPL               | `ALt+Enter`        | Evaluates the current line REPL window                  |

You can run tests from Calva too...

| Tests to run            | Keybinding           | Description                             |
|-------------------------|----------------------|-----------------------------------------|
| All tests               | `Ctrl+Alt+c Shift+t` | Run all tests in the project            |
| Current Namespace tests | `Ctrl+Alt+c t`       | Run all tests for the current namespace |
| Re-run failing tests    | `Ctrl+Alt+c Ctrl+t`  | Run all tests for the current namespace |

> ####HINT::REPL history
> The REPL window maintains a history of the code typed in and can be navigated by pressing `Alt+Up` and `Alt+Down`.


## Commenting / uncommenting code
Use  `;;` at the start of a line, which comments it out.

> ####WARNING::Line comments keybindings ?
> The **Add Line Comment** command to place line comment command is broken in Calva, it only produces a single semi-colon


## Increase / decrease font size
`Ctrl +` and `Ctrl -` will increase and decrease the size of the whole editor.

`Ctrl Shift P` and type the command `Preference: Open Settings (JSON)` to open the `settings.json` configuration file.  Update the value for `editor.fontSize` and save the file.  The font should update immediately in the VS Code UI.

Other useful options that can be added to the `settings.json` configuration

```
   "workbench.colorTheme": "Solarized Light",
    "editor.fontSize": 14,
    "editor.fontFamily": "'Fira Code', 'Ubuntu Mono', 'Droid Sans Mono', 'monospace', monospace, 'Droid Sans Fallback'",
    "window.zoomLevel": 1,
    "calva.paredit.defaultKeyMap": "strict"
```


## Structured editing - Paredit

Once you get the basics of Clojure development, you can try structural editing which is a way to edit your code without breaking the structure of Clojure.  Structural editing ensures you dont have uneven parentheses, `()`, `[]`, `{}`, etc.

The [Calva visual Guide to Paredit](https://calva.io/paredit/) includes lots of examples of using Structural editing.


---
