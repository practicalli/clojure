## Java - a host platform for Clojure

[![Oracle Java](/images/java-banner.png)](https://www.java.com)

  You will need to have a Java Runtime Edition (usually installed on most computers by default) to run any Clojure applications.  Version 8 is recommended (although version 6 & 7 should work).

To test if you have Java on your computer, open a command line window and run the command

    java -version


## Installing the Java Runtime Edition

  Download and install the latest [Oracle Java SDK](https://www.java.com) (version 1.8 at time of writing).

  Alternatively, install [OpenJDK](http://openjdk.java.net/install/index.html) or [Zulu build of OpenJDK](http://zulu.org/)

## Ubuntu

The OpenJDK is available as a package on Ubuntu and can be installed via the Ubuntu software center or via the command line:

    sudo apt-get install openjdk-8-jre


## Why is Java Required

Clojure was designed as a hosted language, which means it is developed and run on top of Java's Virtual Machine (JVM).  However, _its not neccessary to learn the Java language to use Clojure_.

Clojure is compiled into Java bytecode when you evaluate the code.  This compilation happens in the background so you dont usually see it happening.  For example, if you are using the Clojure REPL then each time you evaluate an expression it is compiled into Java bytecode and then injected into the running REPL and the results are then returned.  This all happens pretty instantaneously.

Most of the current Clojure tooling was developed for Clojure on the JVM, for example Leiningen.

As Clojure runs on Java you can also use all the other libraries that run on the Java Virtual machine, regardless of whether those libraries were written in Java, Clojure, Scala, JRuby, jython, Groovy, etc.
