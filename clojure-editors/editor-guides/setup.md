Getting Set Up
==============

## Requirements

Everyone in the workshop should have a laptop. If it is running Windows, it should be running Windows 7 or above. If it is running OS X, it should be running 10.7 "Lion" or above. If it is running Linux, you are probably fine.

If anyone attending does not have access to a laptop running one of the above choices, let the instructors know. You can either pair with someone else, or we can provide a virtual machine that you can run if you have a laptop.

## What we are installing

By the end of these instructions, you will have the following installed:

* **Java standard edition (SE)** - Clojure runs on top of Java.  The Java Runtime Enviromment (JRE) is needed to run Clojure .
* **Leiningen** - a tool for running Clojure programs, also creating & managing Clojure projects
* **LightTable** - an easy to use development tool for Clojure and other programming languages
* **Git** - versioning your Clojure code (so you can go back to earlier versions if you make a mistake)

> Java version 1.8 (Java 8) is the latest version.  Java 1.7 (Java 7) & 1.6 (Java 6) will also work.

## Instructions by operating system

Choose your operating system to get setup instructions:

* [OS X](setup_osx.md)
* [Windows 7](setup_win7.md)
* [Windows 8](setup_win8.md)
* [Ubuntu Linux](setup_ubuntu.md)

Once this is done, please also install the Instarepl plugin and create a Clojure project, as described in the next two sections

## Add the LightTable Instarepl plugin

In LightTable, open the menu: _view_ > _Commands_ or use `Ctrl-Space` or `Cmd-Space` keyboard shortcut

In the command window, type **plugin** and select _Plugins: Show plugin manager_

![Commands: Plugins: Show plugin manager](img/lighttable-plugin-command-list.png)

In the plugins manager, select the _Available_ button and type _Instarepl_.  Press the _Enter_ key to search for the plugin

![Plugin manager: Available Plugins: ClojureInstarepl](img/lighttable-plugin-clojureinstarepl-available.png)

On the _ClojureInstarepl_ plugin, click _Install_.

Run the Instarepl via the menu: _View_ > _Commands_ and type **Instarepl**.  Select _Instarepl: Open a clojure Instarepl

![Instarepl: Open a clojure Instarepl](img/lighttable-command-instarepl.png)

## Create a Clojure project

Create a new project to practice what you are learning about Clojure:

Open a command line terminal and run the following command:

```bash
lein new playground
```

This command creates a new folder called `playground` that contains your new Clojure project.

Open the file `playground/src/playground/core.clj` in LightTable.


## Light Table convenience settings

The following setting are optional, but can make LightTable easier to use for Clojure.

To add a setting, edit the User Behaviour file as follows:

> * `Ctrl-Space` to open Commands
> * Type `user behaviors` and click the proposed command

This opens the User Behaviours file for editing.  When you save the file, `Ctrl-s`, changes are applied immediately.  Add any of the following options you wish:

**Open Workspace on startup**

Show the workspace browser when you run LightTable, so you can see all the projects you have added and open files easily.

> `[:app :lt.objs.sidebar.workspace/workspace.open-on-start]`

**automatic closing of characters**

Auto-close characters, so when you type an opening `{`, `[` or `(` you automatically get a closing `)`, `]` or `}`.

> `[:editor :lt.objs.editor/autoclose-brackets]`

**show line numbers**

Show line numbers on the left hand side of the editor

> `[:editor :lt.objs.editor/line-numbers]`

**don't wrap lines**

Dont wrap a line of text around if they are to long for the screen:

> `[:editor :lt.objs.editor/no-wrap]`


For more on configuring behaviors see [behaviour & keymap configuration](https://github.com/LightTable/LightTable/blob/master/doc/behavior-and-keymap-configuration.md).


**Sample User Behaviours file**

If you want all the settings, simply copy the example User Behaviour file at the end of this section.

```
[
 ;; The app tag is kind of like global scope. You assign behaviors that affect
 ;; all of Light Table to it.
 [:app :lt.objs.style/set-skin "dark"]
 [:app :lt.objs.plugins/load-js "user_compiled.js"]
 [:app :lt.objs.sidebar.workspace/workspace.open-on-start]

 ;; The editor tag is applied to all editors
 [:editor :lt.objs.editor/no-wrap]
 [:editor :lt.objs.style/set-theme "default"]
 [:editor :lt.objs.style/font-settings "Sans" 12]
 [:editor :lt.objs.editor/autoclose-brackets]
 [:editor :lt.objs.editor/line-numbers]

 ;; Here we can add behaviors to just clojure editors
 [:editor.clojure :lt.plugins.clojure/print-length 1000]

 ;; Behaviors specific to a user-defined object
 [:user.hello :lt.plugins.user/on-close-destroy]

 ;; To subtract a behavior, prefix the name with '-' e.g.
 ;; [:app :-lt.objs.intro/show-intro]
]
```
