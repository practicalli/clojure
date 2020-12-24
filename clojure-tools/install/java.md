![Java](/images/java-banner.png)

Java is a host platform for Clojure, on which Clojure projects and tools run.  [No experience of Java or its platform is required](#what-you-need-to-know-about-java) for successful Clojure projects.


# Install Java
Check to see if there is an appropriate version of Java already installed.

Open a terminal and run the command

```shell
java -version
```

If Java is installed, you will see something like this in your terminal:

![Java version](/images/development-environment-java-check.png)

If the version is `11` or above, then [jump to the Clojure install page](install-clojure.md)


## Operating System specific install instructions
For windows users, the scoop install is recommended.

<!-- Operating System specific instructions -->
{% tabs ubuntu="Debian/Ubuntu", homebrew="Homebrew", windows="Windows", manual="Manual" %}

<!-- Ubuntu install -->
{% content "ubuntu" %}

Open a terminal and run the following command (you will be prompted for your login password to complete the install)

```shell
sudo apt install openjdk-11-jdk
```

## openjdk-11 not available or not the right version?
 If openjdk-11 is not available, add the [Ubuntu OpenJDK personal package archive](https://launchpad.net/~openjdk-r/+archive/ubuntu/ppa)

```shell
sudo add-apt-repository ppa:openjdk-r/ppa
sudo apt-get update
```

If you have more than one version of Java installed, set the version by opening a terminal and using the following command

```shell
sudo update-alternatives --config java
```

Available java versions will be listed.  Enter the list number for the version you wish to use.


<!-- Homebrew (MacOSX) install -->
{% content "homebrew" %}

Using [Homebrew](https://brew.sh/), run the following command in a terminal to install Java 11:

```shell
brew cask install adoptopenjdk11
```

> #### Hint::Switching between Java versions
> You can run more than one version of Java on MacOS. Set the Java version by opening a terminal and using one of the following commands
>
> Show the Java versions installed
```shell
/usr/libexec/java_home -V
```
>
> Switch to Java version 11
```shell
export JAVA_HOME=$(/usr/libexec/java_home -v 11)
```


<!-- Windows install -->
{% content "windows" %}
For Windows 10 use [Windows Subsystem for Linux and Windows Terminal are recommended](https://conan.is/blogging/clojure-on-windows.html) if you have administrative privileges and are happy to use a Unix system on the command line.

Alternatively use [scoop.sh](https://scoop.sh/), a command line installer for windows.  [Powershell 5](https://aka.ms/wmf5download) or greater is required.

Follow the [scoop-clojure install instructions](https://github.com/littleli/scoop-clojure), summarized here:

```shell
scoop install git
scoop bucket add java
scoop bucket add scoop-clojure https://github.com/littleli/scoop-clojure
scoop install adoptopenjdk-lts-hotspot
```

scoop can also be used to [install clojure](install-clojure.md)

## Still having problems?
If neither Scoop or Windows Subsystem for Linux work, try the [Chocolatey](https://chocolatey.org/) package manager. Install the [Java Runtime (JRE)](https://chocolatey.org/packages/javaruntime) using the following command in a command line window

```shell
choco install javaruntime
```

If Chocolatey does not work, then try the [manual Java install](install-java.html#manual).


<!-- Manual Install -->
{% content "manual" %}

[Download OpenJDK 11 Hotspot](https://adoptopenjdk.net/)

[![Adopt OpenJDK webpage](/images/adoptopenjdk-install.png)](https://adoptopenjdk.net/)

Run the file once downloaded and follow the install instructions.


{% endtabs %}
<!-- End of Operating System specific instructions -->


## What you need to know about Java
Actually very little knowledge is required.

No knowledge of the Java programming language is required, although it is quite simple to call Java methods from Clojure.

[Reading stack traces](https://8thlight.com/blog/connor-mendenhall/2014/09/12/clojure-stacktraces.html) may benefit from some Java experience, although its usually the first couple of lines in a stack trace that describe the issue.

Clojure uses its own build tools (Leiningen, Clojure CLI tools) and so Java build tool knowledge is not required.

When libraries are added to a project, they are downloaded to the `$HOME/.m2` directory.  This is the default Maven cache used by all JVM libraries.

`clojure  -Spom` will generate a Maven pom.xml file used for deployment. Understanding of a [minimal Maven POM (pom.xml) file](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html#minimal-pom) is useful when managing issues with packaging and deployment.

* [Maven in 5 minutes](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)
