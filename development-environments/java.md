## Java - a host platform for Clojure

  You will need to have a Java Runtime Edition (usually installed on most computers by default) to run any Clojure applications.  Version 8 is recommended (although version 6 & 7 should work).

To test if you have Java on your computer, open a command line window and run the command

    java -version


## Installing the Java Runtime Edition

  Download and install the latest [Oracle Java SDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) (version 1.8 at time of writing).

  Alternatively, install [OpenJDK](http://openjdk.java.net/install/index.html)

## Ubuntu

The OpenJDK is available as a package on ubuntu and can be installed via the software center or via the command:

    sudo apt-get install openjdk-8-jre


## Why is Java Required

Clojure was designed as a hosted language, which means it is developed and run on top of Java.  However, its not neccessary to learn Java to use Clojure.

Clojure is compiled into Java bytecode you evaluate the code.  This compilation happens in the background so you dont usually see it happening.  For example, if you are evaluating code in the REPL, then the expressions you evaluate are compiled into Java bytecode and then run.

As Clojure runs on Java you can also use all the other libraries that run on the Java Virtual machine, regardless of whether those libraries were written in Java, Clojure, Scala, JRuby, jython, Groovy, etc.
