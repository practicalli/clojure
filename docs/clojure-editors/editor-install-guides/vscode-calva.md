# Microsoft VSCode and Calva extension

VS Code supports Clojure and ClojureScript development through an extension called [Calva](https://marketplace.visualstudio.com/items?itemName=betterthantomorrow.calva).

> #### Warning::Calva with LSP has moments of high memory use
> The current version of Calva runs clojure-lsp when opening a Clojure project.  The `clojure-lsp` process will use a noticeable amount of memory, especially with a large number of dependencies in a project.
>
> Use Calva version 2.0.136 if RAM resources are very constrained.  A specific version can be selected via *Extensions > Calva extension settings > Install Another Version...*

![VSCode Calva extension for Clojure development](https://github.com/BetterThanTomorrow/calva/raw/master/assets/howto/evaluate.gif)


## Install VS Code

<!-- Operating System specific instructions -->
{% tabs debian="Debian/Ubuntu", mac="MacOSX", redhat="RedHat", windows="Windows" %}

<!-- Debian/Ubuntu instructions -->
{% content "debian" %}
[Download the `.deb` file](https://code.visualstudio.com/)

Open (double click) the file.  The Ubuntu software studio will open.  Click the Install button.

[![VSCode Install on Ubuntu](/images/vscode-install-ubuntu-software.png)](/images/vscode-install-ubuntu-software.png)

Enter your password when prompted to install the software.

Close the Ubuntu Software app once the install has finished.

[Reference: VSCode on Linux](https://code.visualstudio.com/docs/setup/linux)

### Running VSCode

To run VSCode, press the `Super` key and type `code`, or open a terminal and type the command `code`.


<!-- MacOSX instructions -->
{% content "mac" %}

[Download the `.zip` file](https://code.visualstudio.com/)

Double-click on the downloaded archive to expand the contents.

Drag `Visual Studio Code.app` to the `Applications` folder, making it available in the Launchpad.

Add VS Code to your Dock by right-clicking on the icon and choosing `Options, Keep in Dock`.

[Reference: VSCode on MacOSX](https://code.visualstudio.com/docs/setup/mac)

### Running VSCode

Launch VSCode from the Dock, or in a command line terminal, type `code`.


<!-- RedHat instructions -->
{% content "redhat" %}
[Download the `.rpm` file](https://code.visualstudio.com/)

Open (double click) the file.  The Ubuntu software studio will open.  Click the Install button.

### Running VSCode

To run VSCode, press the `Super` key and type `code`, or open a terminal and type the command `code`.

[Reference: VSCode on Linux](https://code.visualstudio.com/docs/setup/linux)


<!-- Windows instructions -->
{% content "windows" %}

[Download the Windows Installer](https://code.visualstudio.com/)

Run the installer which should have a name similar to `VSCodeUserSetup-{version}.exe`.

VS Code is installed under `C:\users\{username}\AppData\Local\Programs\Microsoft VS Code`.

[Reference: VSCode on Windows](https://code.visualstudio.com/docs/setup/windows)

### Running VSCode

Open the Start menu and type `code`.  Click on the VSCode icon to start.

{% endtabs %}
<!-- End of Operating System specific instructions -->

## Install Calva extension

Select the Extensions icon in the left hand navigation.

Type `calva` into the search box to list the relevant extensions to install

![VSCode Calva Extensions list](/images/vscode-calva-extension.png)

Click the `Install` button next to the `Calva: Clojure & ClojureScript interactive programming` extension.

After a few moments the extension will show as installed.

![VSCode Calva Extensions list](/images/vscode-calva-extension-installed.png)

> ####HINT::No restart required
> VSCode version 1.31.1 does not need to restart after installing the extensions.
>
> [Calva 2](https://marketplace.visualstudio.com/items?itemName=betterthantomorrow.calva) was released in May 2019, please remove any older extensions
