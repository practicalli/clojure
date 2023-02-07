# VSCode

VS Code supports Clojure and ClojureScript development through an extension called [Calva](https://marketplace.visualstudio.com/items?itemName=betterthantomorrow.calva).

![VSCode Calva extension for Clojure development](https://github.com/BetterThanTomorrow/calva/raw/master/assets/howto/evaluate.gif)


## Install VS Code

=== "Debian/Ubuntu"
    [Download the `.deb` file](https://code.visualstudio.com/)

    Open (double click) the file.  The Ubuntu software studio will open.  Click the Install button.

    [![VSCode Install on Ubuntu](/images/vscode-install-ubuntu-software.png)](/images/vscode-install-ubuntu-software.png)

    Enter your password when prompted to install the software.

    Close the Ubuntu Software app once the install has finished.

    [Reference: VSCode on Linux](https://code.visualstudio.com/docs/setup/linux)

    To run VSCode, press the `Super` key and type `code`, or open a terminal and type the command `code`.


=== "MacOSX"

    [Download the `.zip` file](https://code.visualstudio.com/)

    Double-click on the downloaded archive to expand the contents.

    Drag `Visual Studio Code.app` to the `Applications` folder, making it available in the Launchpad.

    Add VS Code to your Dock by right-clicking on the icon and choosing `Options, Keep in Dock`.

    [Reference: VSCode on MacOSX](https://code.visualstudio.com/docs/setup/mac)

    Launch VSCode from the Dock, or in a command line terminal, type `code`.


=== "Redhat Linux"
    [Download the `.rpm` file](https://code.visualstudio.com/)

    Open (double click) the file.  The Ubuntu software studio will open.  Click the Install button.

    To run VSCode, press the `Super` key and type `code`, or open a terminal and type the command `code`.

    [Reference: VSCode on Linux](https://code.visualstudio.com/docs/setup/linux)


=== "Windows"
    [Download the Windows Installer](https://code.visualstudio.com/)

    Run the installer which should have a name similar to `VSCodeUserSetup-{version}.exe`.

    VS Code is installed under `C:\users\{username}\AppData\Local\Programs\Microsoft VS Code`.

    [Reference: VSCode on Windows](https://code.visualstudio.com/docs/setup/windows)

    Open the Start menu and type `code`.  Click on the VSCode icon to start.


## Clojure Extension

VS Code supports Clojure and ClojureScript development

=== "Calva"

    ++ctrl+"p"++ to launch VS Code Quick Open, paste the extension install command and press enter.
    ```shell
    ext install betterthantomorrow.calva
    ```
    After a few moments the extension will show as installed.

    ![VSCode Calva Extensions list](/images/vscode-calva-extension-installed.png)

    [Calva Quick User Guide](calva-quick-guide/)


=== "Clover"
    ++ctrl+"p"++ to launch VS Code Quick Open, paste the extension install command and press enter.
    ```shell
    ext install mauricioszabo.clover
    ```


## VSpaceCode

Add VSpaceCode to provide a Spacemacs like experience, allowing VS Code to be more completely controlled via keyboard.

[Official VSpaceCode documentation](https://vspacecode.github.io/docs/)

!!! INFO "Calva key bindings in VSpaceCode"
    VSpaceCode includes Calva key bindings directly ([pull request #154](https://github.com/VSpaceCode/VSpaceCode/pull/154))


### Install VS Code extension

Select the Extensions icon in the left hand navigation.

Type `vspacecode` into the search box to list the relevant extension

![VSCode Calva Extensions list](/images/vscode-vspacecode-extension.png)

Click the `Install` button next to the `VSpaceCode` extension.

After a few momments the extension will show as installed, along with several other extensions that VSpaceCode uses.

![VSCode Calva Extensions list](/images/vscode-vspacecode-installed.png)

A notification will help you to configure both the necessary settings and user bindings.


### Manual Configuration

Follow the manual configuration commands if the automatic setup was not followed.

`Ctrl+Shift+p` (`SPC SPC` when VSpaceCode keys are working) opens the VS Code command menu, type `vspacecode` to narrow the command list and select `VSpaceCode: Configure Default Settings and Keybindings`.

![VSpaceCode configure default settings and key bindings](/images/vspacecode-configure-default-settings-keybindings.png)

Save the `settings.json` and `keybindings.json` by searching `Preference: Open Settings (JSON)` and `Preference: Open Keyboard Shortcuts (JSON)` in the command palette (`Ctl+Shift+P`)


### Remap the Calva Esc key

Calva extension adds `Esc` as a keyboard shortcut for clearing evaluation results.  This binding breaks vim-style editing in VSpaceCode, so the Calva keyboard shortcut should be remapped.

`SPC SPC` opens the VSCode command menu, type `keyboard` to narrow the command list and select `Preferences: Open keyboard shortcuts (JSON)`.

![VSpaceCode open key bindings json](/images/vspacecode-menu-keyboard-shortcuts.png)

Toward the end of the `settings.json` file, add the following configuration.  This removes `Esc` from the `calva.clearInlineResults` and creates a new keyboard shortcut for that command using `Shift Esc`

```json
  {
    "key": "escape",
    "command": "-calva.clearInlineResults"
  },
  {
    "key": "shift+escape",
    "command": "calva.clearInlineResults",
    "when": "editorTextFocus && !editorHasMultipleSelections && !editorReadOnly && !hasOtherSuggestions && !suggestWidgetVisible && editorLangId == 'clojure'"
},
```

<!--
## Add the Calva specific keyboard shortcuts

> Required for VSpaceCode version 0.8.5 or earlier. Later version will include the [Clojure keybindings for the Calva extension pull request](https://github.com/VSpaceCode/VSpaceCode/pull/154).

`SPC f f` and select the `~/.vscode/extensions/vspacecode.vspacecode-0.8.5/package.json` file.

`/` followed by `Major` to find the location to add the clojure keyboard shortcuts

Open the [Clojure keybindings pull request](https://github.com/VSpaceCode/VSpaceCode/pull/154) and copy the code from the package.json change to your local package.json file.

`SPC f s` to save the file and the keyboard shortcuts will be available when opening a Clojure file.

-->


## Configure theme and font

`SPC SPC` opens the VSCode command menu, type `settings` to narrow the command list and select `Preferences: Open Settings (JSON)`.

![VSpaceCode open settings json](/images/vspacecode-menu-settings.png)

Change the preferences for theme, font size, font family and window zoom level (size of graphical parts of the VS Code windows - positive numbers for larger, negative for smaller).

```json
    "workbench.colorTheme": "Solarized Light",
    "editor.fontSize": 14,
    "editor.fontFamily": "'Fira Code', 'Ubuntu Mono', 'Droid Sans Mono', 'monospace', monospace, 'Droid Sans Fallback'",
    "window.zoomLevel": 0,
```

`SPC f f` to save changes and apply them directly.


> [Fira Code](https://github.com/tonsky/FiraCode) and [Ubuntu Mono](https://fonts.google.com/specimen/Ubuntu) fonts may require installing on your operating system.


![VSpaceCode in action](https://raw.githubusercontent.com/VSpaceCode/vspacecode.github.io/master/static/img/demo.gif)
