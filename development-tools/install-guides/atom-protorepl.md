# Atom.io and ProtoREPL

Proto REPL is a Clojure development environment and REPL for Atom.io.

[![Atom and ProtoREPL](/images/atom-protorepl-demo.gif)](/images/atom-protorepl-demo.gif)


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

## Install Proto REPL package

Open the Atom Settings.  In the install section, search for each of the required packages and install them.  If you have time, also install the recommended packages.

Required packages

* [ink](https://atom.io/packages/ink) - Proto REPL dependency used for inline display and the REPL output.
* [proto-repl](https://github.com/jasongilman/proto-repl) - Clojure REPL, autocompletion, etc.

Recommended packages

* [lisp-paredit](https://atom.io/packages/lisp-paredit) - to manage your `()`
* [proto-repl-charts](https://github.com/jasongilman/proto-repl-charts)

## Configure ProtoREPL with Leiningen

Go to the Proto REPL Settings (Atom Preferences, then packages, then Proto REPL)

Modify "Lein Path" to the path where Leiningen.

Use `which lein` in a terminal to get the path.



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
