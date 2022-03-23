# Reference: Java Virtual Machine

Understand the configuration options for the Java Virtual machine (JVM) which Clojure is hosted upon.

Overview of tools for monitoring and profiling Clojure applications running on the JVM, to ensure effective running of Clojure applications in production.

<!-- * Tools for managing a JVM -->
* [Common JVM Options](common-options.md) - for development and deployment
* [JVM Profiling tools](profile-tools.md) - understand resources and help diagnose run-time problems


# JVM option types

`-X` - nonstandard VM options

`-XX` standard VM options

`-XX` options are not checked for validity, so are ignored if the VM does not recognize the option. Options can therefore be used across different VM versions without ensuring a particular level of the VM.

`-D` a system property for the application running on the JVM using a name=value
<!-- TODO: is the java -D option an alternative to reading in a system.properties file? -->


## Java Modules

Java 9 introduced modules to move features out of JVM itself and include them as optional modules.

Before [CLJS-2377 issue was resolved](https://clojure.atlassian.net/browse/CLJS-2377), ClojureScript (2017) depended on `java.xml.bind.DataTypeConverter`. `java.xml.bind package` was deprecated in Java 9 and moved to a non-default module.

At that time, compiling a ClojureScript project without adding the java.xml.bind module would return the error:

```bash
<Exception details>
...
Caused by: java.lang.ClassNotFoundException: javax.xml.bind.DatatypeConverter
```

`clojure J--add-modules "java.xml.bind"` command line option will include the module

`:jvm-opts ["--add-modules" "java.xml.bind"]` added to Clojure CLI deps.edn or Leiningen project.clj file will include the module.

`-Djdk.launcher.addmods=java.xml.bind` added to the `JAVA_TOOL_OPTIONS` environment variable (`jdk.launcher.addmods` `--add-modules` doesn’t work in `JAVA_TOOL_OPTIONS`)


## Unified Logging sub-system

`-Xlog` - [JEP 158](https://openjdk.java.net/jeps/158)


## References

* [Best practice for JVM Tuning with G1 GC](https://backstage.forgerock.com/knowledge/kb/article/a75965340)
* [Command Line Options - IBM SDK documentation](https://www.ibm.com/docs/en/sdk-java-technology/7.1?topic=reference-command-line-options)
* [Best HotSpot JVM Options and switches for Java 11 through Java 17](https://blogs.oracle.com/javamagazine/post/the-best-hotspot-jvm-options-and-switches-for-java-11-through-java-17)

