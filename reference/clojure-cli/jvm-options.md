# Reference: Clojure CLI JVM Options

> #### Hint::`JDK_JAVA_OPTIONS` Environment Variable
> `JDK_JAVA_OPTIONS` is the official Environment Variable for setting options when running a Java Virtual Machine (Java version 9 onward).


[Java Virtual Machine options can be passed using the Clojure CLI](https://clojure.org/reference/deps_and_cli#_prepare_jvm_environment), either via the `-J` command line flag or `:jvm-opts` in a `deps.edn` alias.

<!-- TODO: reference: clojure CLI JVM options - common options and there use (e.g. manage heap size, garbage collection, etc.) -->

> #### Hint::Java Virtual Machine configuration and reporting
> [Java Virtual Machine section](/reference/jvm/index.md) covers commonly used options, reporting JVM metrics and optimisation of the JVM process.


## Clojure CLI command line options

Clojure CLI `-J` flag passes configuration options to the JVM. When there are multiple, each must be prefixed with `-J`.

```
clojure -J-XX:+UnlockDiagnosticVMOptions -J‑XX:NativeMemoryTracking=summary -J‑XX:+PrintNMTStatistics
```


## Clojure CLI deps.edn configuration

`:jvm-opts` key in an alias adds JVM options to Clojure CLI deps.edn configuration.  The `:jvm-opts` key has a value that is a collection of string JVM options `["-Xms2048m" "-Xmx4096"]`

Alias to set a large heap size

```clojure
:jvm/heap-max-2g {:jvm-opts ["-Xmx2G"]}
```

Report a full breakdown of the HotSpot JVM’s memory usage upon exit using the following option combination:

```clojure
:jvm/report {:jvm-opts ["-XX:+UnlockDiagnosticVMOptions"
                        "‑XX:NativeMemoryTracking=summary"
                        "‑XX:+PrintNMTStatistics"]}
```

Add a Java module

```clojure
:jvm/xml-bind {:jvm-opts ["–add-modules java.xml.bind"]}
```

Ignoring unrecognised options

```clojure
:jvm-opts ["-XX:+IgnoreUnrecognizedVMOptions"]
```

The aliases can be used with the Clojure CLI execution options: `-A` (for built-in REPL invocation), `-X` (for function execution), or `-M` (for clojure.main execution).

> `-J` JVM options specified on the command line are concatenated after the alias options


<!-- ## Optimising JVM for a container -->

<!-- TODO: JVM options useful when running in a container, e.g. docker -->


## Calling A Clojure Uberjar

JVM options must be specified when calling an uberjar with the `java` command, `:jvm-opts` in the project `deps.edn` are not used with the `java` command

```
java -jar project-uberjar.jar -J...
```

> #### Hint::Use `JDK_JAVA_OPTIONS` to define JVM options
> `JDK_JAVA_OPTIONS` environment variable is used to define options that are used whenever the `java` command is called, greatly simplifying `java` commands.
>
> The `JDK_JAVA_OPTIONS` environment variable can be used with deployment systems and passed to container environments to simplify adjustment of resources used by the JVM process.


## Clojure related JVM options

Specify options or system properties to set up the Clojure service

`-Dclojure.compiler.disable-locals-clearing=true` - make more info available to debuggers

`-Dclojure.main.report=stderr` - print stack traces to standard error instead of saving to file, useful if process failing on startup

`-Dclojure.spec.skip-macros=false` - skip spec checks against macro forms


### Memory Management

`-XX:CompressedClassSpaceSize=3G` - prevent a specific type of OOMs

`-XX:MaxJavaStackTraceDepth=1000000` - prevents trivial Stack Overflow errors

`-Xmx24G` - set high maximum heap, preventing certain types of Out Of Memory errors (ideally high memory usage should be profiled if cause not known)

`-Xss6144k` - increase stack size x6 to prevent Stack Overflow errors

> The current default can be found with `java -XX:+PrintFlagsFinal -version 2>/dev/null | grep "intx ThreadStackSize"`

`-Xms6G` - Set minimum memory that is equal or greater than memory used by a running REPL, to improve performance

`-Xmx1G` - limit maximum heap allocation so a process can never use more memory, useful for environments with limited memory resources


```clojure
:jvm/mem-max1g {:jvm-opts ["-Xmx1G"]}
```

## Container Memory Management

`JDK_JAVA_OPTIONS` environment variable should be used for setting JVM options within a container or in the provisioner service (e.g. Kubernettes / Argo CD) that deploys containers.

Use JVM options that optomise running in a container

* `-XshowSettings:system` to output the resources the JVM believes it has access too, a very simple diagnostic tool to include

* `-XX:+UseContainerSupport` instruct the JVM that it is running in a container environment, disabling the checks the JVM would otherwise carry out to determine if it was running in a container.  Can save a very small amount of start up time, though mainly used to ensure the JVM knows its in a container.

* `-XX:MaxRAMPercentage=90` to set a relative maximum percentage of heap to use, based on the memory available from the host, e.g. `-XX:MaxRAMPercentage=80` will use a heap size of 80% of the available host memory


### Dockerfile example with JDK_JAVA_OPTIONS environment variable

In this `Dockerfile` excerpt the `JDK_JAVA_OPTIONS` environment variable is used to print out the resources the JVM believes it has access to at startup. The JVM is instructed that it is running in a container environment and should use a maximum 90% heap size of the hosts memory resource.

```yaml
ENV JDK_JAVA_OPTIONS "-XshowSettings:system -XX:+UseContainerSupport -XX:MaxRAMPercentage=90"
CMD ["java", "-jar", "/opt/practicalli-service.jar"]
```

## Low latency systems

For systems that require very low latency, use the Z Garbage collector

```
"-XX:+UnlockExperimentalVMOptions -XX:+UseZGC"
```


### Stack traces

`-XX:+TieredCompilation` - enable tiered compilation to support accurate bench-marking (increases startup time)

`-XX:-OmitStackTraceInFastThrow` - don't elide stack traces


### Startup options

`-Xverify:none` option reduces startup time of the JVM by skipping verification process

```bash
"-Xverify:none"
```

> The verification process is a valuable check, especially for code that has not been run before.  So the code should be run through the verification process before deploying to production.


### Benchmark options

Enable various optimizations, for guaranteeing accurate benchmarking (at the cost of slower startup):

`"-server"`


### Graphical UI related options

`-Djava.awt.headless=true` - disable all UI features for disabling the clipboard for personal security:

`-Dapple.awt.UIElement=true` - remove icon from the MacOSX Dock

`-Dclash.dev.expound=true` - ?


### Garbage Collection

Setup GC with short STW pauses which can be relevant for very high web server workloads

```clojure
:jvm/g1gc
{:jvm-opts ["-XX:+UseG1GC"
            "-XX:MaxGCPauseMillis=200"
            "-XX:ParallelGCThreads=20"
            "-XX:ConcGCThreads=5"
            "-XX:InitiatingHeapOccupancyPercent=70"]}
```

* Source: [Tuning Garbage Collection with Oracle JDK](https://docs.oracle.com/cd/E40972_01/doc.70/e40973/cnf_jvmgc.htm#autoId2)


### View JVM options of a running JVM process

Use a JMX client, e.g. [VisualVM](https://visualvm.github.io/)

`jcmd pid VM.system_properties` or `jcmd pid VM.flags` using `jcmd -l` to get the pid of the JVM process

On Linux `ps -ef | grep java` which includes the options to run the JVM process, `ps -auxww` to show long arguments

* [Getting the parameters of a running JVM](https://stackoverflow.com/questions/5317152/getting-the-parameters-of-a-running-jvm)


### References

* [JVM Options cheatsheet - JRebel](https://www.jrebel.com/blog/jvm-options-cheat-sheet)
