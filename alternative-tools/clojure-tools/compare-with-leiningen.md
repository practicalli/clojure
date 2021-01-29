# Compare Clojure CLI tools With Leiningen
Leingingen, Boot and Clojure CLI tools are ways to configure Clojure projects and each have various ways of extending their basic functionality.

Leiningen has been the main tool used for Clojure projects for the last decade, however, in the last few years many new projects have started with Clojure CLI tools.  Boot is a project designed to make far greater flexibility in configuring Clojure projects and initially was popular, however, it does require more thought to configuring a project than Leiningen.  Once Clojure CLI tools started to be adopted, it seems boot interest has diminished, as Clojure CLI tools provides a great deal of flexibility without the complexity of Boot.

> #### Hint::Clojure code is the same which ever tool is used
> The Clojure code for the project will be the same regardless of which tool is used to configure and manage the Clojure project.

## Basic comparison

| Tool              | Project Config                                         | User config          | Extension                                                                                        |
|-------------------|--------------------------------------------------------|----------------------|--------------------------------------------------------------------------------------------------|
| Clojure CLI tools | deps.edn hash-map merged with user config              | ~/.clojure/deps.edn  | aliases in deps.edn                                                                              |
| Leiningen         | project.clj and `defproject` macro                     | ~/.lein/profiles.clj | [Leiningen specific plugin](https://github.com/technomancy/leiningen/blob/master/doc/PLUGINS.md) |
| Boot              | build.boot with `deftask`, `task-options!`, `set-env!` |                      | Write the tasks required in Clojure                                                              |


## Installation
{% tabs depsinstall="Clojure CLI tools", leininstall="Leiningen", bootinstall="Boot" %}

{% content "depsinstall" %}
As Clojure CLI tools is a wrapper around the Java command line, its really lightweight.  Tools are mostly libraries and are only installed on first use or when a version is updated.

Install is via a Linux script or Homebrew.

For windows, Scoop is recommended, although there is also an alpha level install from Clojure.org

{% content "leininstall" %}
Leiningen is a script that managed the download and use of the leiningen-$LEIN_VERSION-standalone.zip package.

Lein script or lein.bat to install, or use one of the [supported package managers](https://github.com/technomancy/leiningen/wiki/Packaging).

{% content "bootinstall" %}
[Install](https://github.com/boot-clj/boot#install) via package mangers or the boot.sh script

{% endtabs %}



## Configuration
{% tabs depsconfig="Clojure CLI tools", leinconfig="Leiningen", bootconfig="Boot" %}

{% content "depsconfig" %}
Clojure CLI tools are configured with an EDN data structure, i.e. a hash-map of key-value pairs.  As this is a Clojure data structure its much easier to parse and should be very familiar to Clojure developers.

{% content "leinconfig" %}
Leiningen projects are configured with a `project.clj` file which contains a `defproject` macro with a great many options.  The [Leiningen tutorial](https://github.com/technomancy/leiningen/blob/stable/doc/TUTORIAL.md) explains the options in detail.  A [sample project.clj](https://github.com/technomancy/leiningen/blob/stable/sample.project.clj) contains examples of using each of this options.

For most projects all the configuration resides in the project.clj file.  Exceptions to this include figwheel-main, which also adds it own EDN configuration and EDN build configuration files.

Leiningen also has a user level configuration


{% content "bootconfig" %}
build.boot is a file containing Clojure code that defines the tasks for using your project.

{% endtabs %}


## Extending the tools
{% tabs depsextend="Clojure CLI tools", leinextend="Leiningen", bootextend="Boot" %}

{% content "depsextend" %}
Clojure CLI tools has been designed for a very specific role, to provide a lightweight wrapper over running Clojure programs and via tools.deps managing dependencies from Maven and Git repositories.

The projects that extend Clojure CLI tools are self-contained libraries and tools, so are not tied to any one particular tool.  Any general tools written for Clojure should work with Clojure CLI tools by calling their main function (clojure main) or a specifically named function (clojure exec)


{% content "leinextend" %}
[Leiningen plugin extension](https://github.com/technomancy/leiningen/blob/master/doc/PLUGINS.md) was the main way to extend the functionality of Leiningen (or getting pull requests accepted to the Leiningen projects).

Although there are several plugins that were widely adopted, some plugins eventually caused more confusion than benefit or were simply trivial and in the main plugins seem to have become less important to the Clojure community.

One of the limitations of Leiningnen plugin mechanism was not being able to exclude any configuration in a users `.lein/profles.clj` file, so there was greater potential for conflict.

The recommended way to extend Leiningen is to not write plugins, but to include aliases that define a qualified function to run when that alias is used with the Leiningen command.


{% content "bootextend" %}
Write clojure to define scripts to run with boot projects.

> #### Hint::Babashka for Clojure scripting
> It seems Babaska is a more popular way of running scripts in Clojure, either for Clojure projects or more general tools.

{% endtabs %}
