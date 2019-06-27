# Atom Proton


[Proton-mode](https://github.com/dvcrn/proton) gives a Spacemacs-like experience to the Atom editor

Proton-mode provides a mnemonic menu and set of keybindings that offer an effective alternative to the interesting keybindings with Atom and ProtoREPL.  It also provides modal editing features, simplifying keybindings.

[![Proton-mode](/images/proton-mode.gif)](/images/proton-mode.gif)

## Install Atom.io

Follow the instructions for your operating system

{% tabs first="Debian/Ubuntu", second="MacOSX", third="RedHat", forth="Windows" %}

{% content "first" %}
The standalone install is the simplest option.  However, using the package manager approach will simplify updating Atom.io to new versions.

### Standalone Install
Download the latest `.deb` file from [Atom.io](https://atom.io)

Once downloaded, double-click the `.deb` file to install.


### Via Package Manager
Add the official Atom package repository to your system by running the following commands in a terminal window:

```bash
curl -sL https://packagecloud.io/AtomEditor/atom/gpgkey | sudo apt-key add -
sudo sh -c 'echo "deb [arch=amd64] https://packagecloud.io/AtomEditor/atom/any/ any main" > /etc/apt/sources.list.d/atom.list'
sudo apt-get update
sudo apt-get install atom
```

### Running Atom
To run atom, press the `Super` key and type `atom`, or open a terminal and type the command `atom`.


{% content "second" %}

Download the [`atom-mac.zip`](https://github.com/atom/atom/releases/latest) file.

Open the `atom-mac.zip` file (double click) and drag the Atom application into your "Applications" folder.

See [Installing Atom](https://flight-manual.atom.io/getting-started/sections/installing-atom/#platform-mac) for troubleshooting and further details.

{% content "third" %}
Download the latest `.rpm` file from Atom.io

Once downloaded, double-click the `.rpm` file to install.

To run atom, press the `Super` key and type `atom`, or open a terminal and type the command `atom`.

See the [Atom guide for Fedora](https://flight-manual.atom.io/getting-started/sections/installing-atom/#red-hat-and-centos-yum-or-fedora-dnf) if you wish to use the package manager instead.


{% content "forth" %}
Downloaded [`AtomSetup.exe`](https://github.com/atom/atom/releases/latest) Windows Installer.

Open the `AtomSetup.exe` installer and follow the instructions.

This will install Atom, add the `atom` and `apm` commands to your PATH and create a shortcut in the start menu.

{% endtabs %}

## Install Proton

Required packages

* [ink](https://atom.io/packages/ink) - Proto REPL dependency used for inline display and the REPL output.
* [proto-repl](https://github.com/jasongilman/proto-repl) - Clojure REPL, autocompletion, etc.
* [Proton-mode](https://github.com/dvcrn/proton) - Spacemacs style menu and keybindings to make Atom easier to use (included Vim / Emacs keybinding support)

Recommended packages

* [lisp-paredit](https://atom.io/packages/lisp-paredit) - to manage your `()`
* [proto-repl-charts](https://github.com/jasongilman/proto-repl-charts) - graphs and charts
* tool-bar - displays a REPL tool bar
* highlight-selected - highlights selected keywords throughout an editor


## Download the sample project

We have created an example Clojure project called "Welcome To ClojureBridge" to test your development tools.

{% tabs fifth="Download project as zip file", sixth="Clone project from Github" %}

{% content "fifth" %}
[Download the "Welcome To ClojureBridge" zip file](https://github.com/ClojureBridgeLondon/welcometoclojurebridge/archive/master.zip) and extract all the files.


{% content "sixth" %}
If you are comfortable using the git version control tool and the command line, then you can clone the project using git

```bash
git clone https://github.com/ClojureBridge/welcometoclojurebridge
```

{% endtabs %}

## Test your editor with a clojure project

Add the project called `welcometoclojurebridge`.

Open the `src/welcometoclojurebridge/core.clj` file.

`Ctrl-Alt-, s` to start a Clojure REPL and display the REPL in a new window.

You should see a friendly message from the ClojureBridge team.
