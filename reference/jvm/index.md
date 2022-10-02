# Reference: Java Virtual Machine

Understand the configuration options for the Java Virtual machine (JVM) which Clojure is hosted upon.

Overview of tools for monitoring and profiling Clojure applications running on the JVM, to ensure effective running of Clojure applications in production.

<!-- * Tools for managing a JVM -->
* [Common JVM Options](common-options.md) - for development and deployment
* [JVM Profiling tools](profile-tools.md) - understand resources and help diagnose run-time problems


> #### Hint::`JDK_JAVA_OPTIONS` Environment Variable
> `JDK_JAVA_OPTIONS` is the official Environment Variable for setting options when calling `java`, `javac` and other Java commands to start running a Java Virtual Machine (Java version 9 onward).


## Display resources available to the JVM

`-XshowSettings:system` displays the resources the JVM believes it has access too when running any Java command and is a very simple diagnostic tool to start with.

See the environment resources available to the JVM without running a Clojure or Java application:

```bash
java -XshowSettings:system -version
```

![Java Virtual Machine - show system settings without running an application](https://raw.githubusercontent.com/practicalli/graphic-design/live/java/screenshots/java-command-options-showsettings-system-version.png)

Include `-XshowSettings:system` when running any Java command to provide simple diagnostics, e.g. when running a Clojure Uberjar

```bash
java -XshowSettings:system -jar practicalli-service.jar
```

> #### Hint::Print resources in Container systems
> `-XshowSettings:system` is especially useful for environments which may vary in resources available, such as containers (Docker, Kubernettes, etc.)


## JVM option types

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


<!-- TODO: review IBM Java documentation JVM options -->

<!-- [IBM SDK Java Documentation - JVM -XX command line options](https://www.ibm.com/docs/en/sdk-java-technology/7.1?topic=options-jvm-xx-command-line) -->

<!-- -XXallowvmshutdown:[false|true] (default:true) -->
<!--     This option is provided as a workaround for customer applications that cannot shut down cleanly, as described in APAR IZ59734. -->

<!-- -XX:codecachetotal=<size> -->
<!--     Use this option to set the maximum size limit for the JIT code cache. This option also affects the size of the JIT data cache. -->
<!--     Start of changes for service refresh 3 fix pack 20-XX:[+|-]EnableCPUMonitorEnd of changes for service refresh 3 fix pack 20 -->
<!--     This option relates to the information about the CPU usage of thread categories that is available with the com.ibm.lang.management.JvmCpuMonitorMXBean application programming interface. CPU monitoring is enabled by default, and can be disabled by the command line option -XX:-EnableCPUMonitor. This option might not be supported in subsequent releases. -->

<!-- -XX:MaxDirectMemorySize -->
<!--     This option sets a limit on the amount of memory that can be reserved for all Direct Byte Buffers. -->

<!-- -XX:[+|-]PackedObject -->
<!--     The -XX:+PackedObject option enables packed object support. -->

<!-- -XX:[+|-]PageAlignDirectMemory -->
<!--     This option affects the alignment of direct byte buffer allocation. -->

<!-- -XX:[+|-]ReduceCPUMonitorOverhead -->
<!--     This option relates to the information about the CPU usage of thread categories that is available with the com.ibm.lang.management.JvmCpuMonitorMXBean application programming interface. This option affects the way that the JVM records the amount of CPU usage of non-Garbage Collection (GC) threads that do work on behalf of GC. -->

<!-- -XXsetHWPrefetch -->
<!--     This option enables or disables hardware prefetch. -->

<!-- -XX:ShareClassesEnableBCI -->
<!--     This option is equivalent to -Xshareclasses:enableBCI. -->

<!-- -XX:ShareClassesDisableBCI -->
<!--     The option -Xshareclasses:enableBCI is set by default. You can turn off this option by specifying -XX:ShareClassesDisableBCI when you start Java. -->

<!-- -XX:-StackTraceInThrowable -->
<!--     This option removes stack traces from exceptions. -->

<!-- -XX:[+|-]UseCompressedOops (64-bit only) -->
<!--     This option enables or disables compressed references in 64-bit JVMs, and is provided to help when porting applications from the Oracle JVM to the IBM JVM. This option might not be supported in subsequent releases. -->

<!-- -XX:[+|-]VerboseVerification -->
<!--     You can use this option to control the output of verbose diagnostic data that relates to verification. -->

<!-- -XX:[+|-]VMLockClassLoader -->
<!--     This option affects synchronization on class loaders that are not parallel-capable class loaders, during class loading. -->
