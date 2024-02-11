![Java](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/practicalli-java-adoptium-banner.png)

Java is a host platform for Clojure, on which Clojure projects and tools run.  Java provides a virtual machine which runs the bytecode generated when Clojure code is compiled.

Java virtual machine includes a Just In Time (JIT) compiler that optimises running of bytecode.

!!! INFO "Practicalli recommends OpenJDK version 21"


## Install Java

Check to see if there is an appropriate version of Java already installed.

Open a terminal and run the command

```bash
java --version
```

If Java is installed and on the execution path, the version infomation is returned

![Java version check - dark version](https://github.com/practicalli/graphic-design/blob/live/java/screenshots/java-openjdk-21-version-in-terminal-light.png?raw=true#only-light)
![Java version check - light version](https://github.com/practicalli/graphic-design/blob/live/java/screenshots/java-openjdk-21-version-in-terminal-dark.png?raw=true#only-dark)


=== "Debian Packages"
    Install Java development kit (JDK) using the `apt` package manager (login as `su -` or prefix the command with `sudo`)

    ```bash
    apt install openjdk-21-jdk
    ```

    ??? HINT "Check available versions of OpenJDK"
        Long terms support versions should include OpenJDK 17 and may include OpenJDK 21.  Check versions available via the `apt` package management tool.

        ```shell
        apt search --names-only openjdk
        ```

    ??? HINT "Optionally include Java docs and sources"
        Install the `openjdk-21-doc` locally to provide Javadocs to support Java Interop code.

        Install the `openjdk-21-source` package to support navigation of Java Object and Method source code, especially useful when using Java Interoperability from within Clojure code.

        ```bash
        sudo apt install openjdk-21-doc openjdk-21-source
        ```

        [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) provides the `:src/java17` alias to include the Java sources in the classpath when running a REPL.

    If `openjdk-21-jdk` package is not available, add the [Ubuntu OpenJDK personal package archive](https://launchpad.net/~openjdk-r/+archive/ubuntu/ppa){target=_blank}

    !!! NOTE ""
        ```bash
        sudo add-apt-repository ppa:openjdk-r/ppa
        sudo apt-get update
        ```
    When multiple versions of Java are installed, set the version using the `update-alternatives` command in a terminal

    !!! NOTE ""
        ```bash
        sudo update-alternatives --config java
        ```
    Available java versions will be listed.  Enter the list number for the version you wish to use.

=== "Homebrew"
    Using [Homebrew](https://brew.sh/){target=_blank}, run the following command in a terminal to install Java 17:

    !!! NOTE ""
        ```bash
        brew install openjdk@21
        ```

    ??? HINT "Switching between Java versions"
        More than one version of Java can be installed on MacOSX. Set the Java version by opening a terminal and using one of the following commands

        Show the Java versions installed
        ```bash
        /usr/libexec/java_home -V
        ```

        Switch to Java version 21
        ```bash
        export JAVA_HOME=$(/usr/libexec/java_home -v 21)
        ```

        Alternatively, install [JEnv Java version manager](https://www.jenv.be/)

=== "Windows"
    For Windows 10 use [Windows Subsystem for Linux and Windows Terminal are recommended](https://conan.is/blogging/clojure-on-windows.html){target=_blank} if you have administrative privileges and are happy to use a Unix system on the command line.

    Alternatively use [scoop.sh](https://scoop.sh/){target=_blank}, a command line installer for windows.  [Powershell 5](https://aka.ms/wmf5download){target=_blank} or greater is required.

    Follow the [scoop-clojure install instructions](https://github.com/littleli/scoop-clojure){target=_blank}, summarized here:

    ```bash
    scoop bucket add java
    scoop install temurin-lts-jdk
    ```

    scoop can also be used to [install clojure](clojure-cli.md)

    If neither Scoop or Windows Subsystem for Linux work, try the [Chocolatey](https://chocolatey.org/){target=_blank} package manager. Install the [Java Runtime (JRE)](https://chocolatey.org/packages/javaruntime){target=_blank} using the following command in a command line window

    ```bash
    choco install javaruntime
    ```

    If Chocolatey does not work, then try the [manual Java install](install-java.html#manual).

=== "Manual"
    [Download OpenJDK from Adoptium](https://adoptium.net/){target=_blank} - pre-build OpenJDK binaries freely available for multiple operating systems.

    Run the file once downloaded and follow the install instructions.

    ![Adoptium Prebuilt OpenJDK Binaries - web page](https://github.com/practicalli/graphic-design/blob/live/java/screenshots/java-adoptium-website-temurin-21.png?raw=true)


## Multiple versions of Java

[:globe_with_meridians: jenv](https://www.jenv.be/){target=_blank} provides a simple way to switch between multiple installed versions of Java.  jenv can be used to set the java version globally, for the current shell or for a specific project by adding `.java-version` file containing the Java version number in the root of the project.


## A little Java Knowledge

Very little knowledge of the Java language or the Java Virtual Machine is required.

It is quite simple to call Java methods from Clojure, although there are a wealth of functions and libraries provided by Clojure and its community to minimise the need for Java Interoperability.

[Reading stack traces](https://8thlight.com/blog/connor-mendenhall/2014/09/12/clojure-stacktraces.html){target=_blank} may benefit from some Java experience, although its usually the first couple of lines in a stack trace that describe the issue.

Clojure uses its own build tools (Leiningen, Clojure CLI tools) and so Java build tool knowledge is not required.

When libraries are added to a project, they are downloaded to the `$HOME/.m2` directory.  This is the default Maven cache used by all JVM libraries.

`clojure  -Spom` will generate a Maven pom.xml file used for deployment. Understanding of a [minimal Maven POM (pom.xml) file](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html#minimal-pom){target=_blank} is useful when managing issues with packaging and deployment.

[Maven in 5 minutes](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html){target=_blank .md-button}

The Java Virtual Machine is highly optimised and does not usually require any options to enhance its performance. The most likely configuration to supply to the JVM are to manage the amount of memory assigned, specifically for resource constrained environments.
