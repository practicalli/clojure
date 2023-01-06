# Microsoft VSCode and Calva extension

VS Code supports Clojure and ClojureScript development through an extension called [Calva](https://marketplace.visualstudio.com/items?itemName=cospaia.clojure4vscode).  A Clojure REPL is run via Leiningen first, then connected to from VSCode.

![VSCode Calva extension for Clojure development](https://github.com/BetterThanTomorrow/calva/raw/master/assets/howto/evaluate.gif)

## Install VS Code

<!-- Operating System specific instructions -->
{% tabs first="Debian/Ubuntu", second="MacOSX", third="RedHat", forth="Windows" %}

<!-- Debian/Ubuntu instructions -->
{% content "first" %}
[Download the `.deb` file](https://code.visualstudio.com/)

Open (double click) the file.  The Ubuntu software studio will open.  Click the Install button.

[![VSCode Install on Ubuntu](/images/vscode-install-ubuntu-software.png)](/images/vscode-install-ubuntu-software.png)

Enter your password when prompted to install the software.

Close the Ubuntu Software app once the install has finished.

[Reference: VSCode on Linux](https://code.visualstudio.com/docs/setup/linux)

### Running VSCode

To run VSCode, press the `Super` key and type `code`, or open a terminal and type the command `code`.


<!-- MacOSX instructions -->
{% content "second" %}

[Download the `.zip` file](https://code.visualstudio.com/)

Double-click on the downloaded archive to expand the contents.

Drag `Visual Studio Code.app` to the `Applications` folder, making it available in the Launchpad.

Add VS Code to your Dock by right-clicking on the icon and choosing `Options, Keep in Dock`.

[Reference: VSCode on MacOSX](https://code.visualstudio.com/docs/setup/mac)

### Running VSCode

Launch VSCode from the Dock, or in a command line terminal, type `code`.


<!-- RedHat instructions -->
{% content "third" %}
[Download the `.rpm` file](https://code.visualstudio.com/)

Open (double click) the file.  The Ubuntu software studio will open.  Click the Install button.

### Running VSCode

To run VSCode, press the `Super` key and type `code`, or open a terminal and type the command `code`.

[Reference: VSCode on Linux](https://code.visualstudio.com/docs/setup/linux)


<!-- Windows instructions -->
{% content "forth" %}

[Download the Windows Installer](https://code.visualstudio.com/)

Run the installer which should have a name similar to `VSCodeUserSetup-{version}.exe`.

VS Code is installed under `C:\users\{username}\AppData\Local\Programs\Microsoft VS Code`.

[Reference: VSCode on Windows](https://code.visualstudio.com/docs/setup/windows)

### Running VSCode

Open the Start menu and type `code`.  Click on the VSCode icon to start.

{% endtabs %}
<!-- End of Operating System specific instructions -->

## Install Calva extension

Launch VS Code Quick Open, `Ctrl+P`, paste the following command, and press enter.

```
ext install cospaia.clojure4vscode
```

[Reference: VSCode Extension Marketplace](https://code.visualstudio.com/docs/editor/extension-gallery)
