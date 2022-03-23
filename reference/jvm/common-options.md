# Commonly used JVM Options

Examples of commonly used options for any language on the Java Virtual Machine (JVM).

> [Understanding memory usage](understanding-memory-usage.md) has more options to diagnose out of memory errors, garbage collection pauses and JIT compilation


## Java heap size

Set the initial heap size if memory usage will quickly grow

`-Xms` – start heap size for JVM, e.g. `-Xms2048m` sets an initial heap size of 2 GB

`-XX:InitialRAMPercentage=n` sets the initial heap as `n` percentage of total RAM

Set the maximum heap size if usage is relatively high under normal conditions

`-Xmx` – maximum heap size of JVM, e.g. `-Xmx2048m`

`-XX:MaxRAMPercentage=n` sets the maximum heap as `n` percentage of total RAM

`-Xss` - set java thread stack size

`-Xms` and `-Xmx` are commonly used together.

<!-- TODO: JVM options: example JVM thread stack size -->

### Set heap with respect to garbage collection

`-XX:MaxHeapFreeRatio` – maximum percentage of heap free after garbage collection to avoid shrinking.

`-XX:MinHeapFreeRatio` – minimum percentage of heap free after GC to avoid expansion

> VisualVM or JConsole can monitor the heap usage


## Enable class data sharing

`-Xshareclasses` enables class data sharing in a shared class cache.

The JVM connects to an existing cache (creating a cache if none exist). Multiple caches specified by adding a sub-option to the `-Xshareclasses` option.


## Handling ‘OutOfMemory’ Error

Generating a Heap Dump for out of memory (OOM) issues is recommended for production systems, to provide data for a deep analysis of the problem.  Generating a heap dump does not add overhead to the running JVM.

`-XX:+HeapDumpOnOutOfMemoryError` - trigger heap dump on out of memory failure

`-XX:HeapDumpPath=path-to-heap-dump-directory` - sets path to write the heap dump file (defaults to directory in which java command was ran from)

A heap dump file can gigabytes in size, so assure that the target file system has sufficient capacity.

`-XX:OnOutOfMemoryError="shutdown -r"` - restart the process immediately after out of memory failure

The option can take multiple commands, separated by a `;`, e.g. `-XX:OnOutOfMemoryError="< cmd args >;< cmd args >"`


## Trace classloading and unloading

Identify memory leaks suspected from the JVM Class Loader, e.g. classes are not unloading or garbage collected

`-XX:+TraceClassLoading`  - log classes loaded into the JVM

`-XX:+TraceClassUnloading` - log classes unloaded from the JVM


## Profiling

Profiling JVM processes provides a fine-grained view of application execution and resource utilization. Monitor parameters including Method Executions, Thread Executions, Garbage Collections and Object Creations.

* `-Xprof`
* `-Xrunhprof`

Consider using a profile tool, such as VisualVM

![Oracle Java VisualVM profiler example results](https://docs.oracle.com/javase/8/docs/technotes/guides/visualvm/images/profiler-memory.png)


## Skip byte code verification

The byte code for each class loaded by the JVM Class Loader is verified, which is a relatively expensive task at startup. Adding classes on the boot classpath skips the cost of the verification, although also introduces a security risk so should only be used when classes have been previously verified.

* `-Xbootclasspath` specifies classpath entries to load without verification

> Profiling an application is a more suitable long term solution than skipping byte code verification

Checks carried out by the verifier include

* Uninitialized Variables
* Access rules for private data and methods are not violated
* Method calls match the object Reference
* There are no operand stack overflows or under-flows
* Arguments to all JVM instructions are valid types
* Final classes are not subclassed and final methods are not overridden
* field and method references have valid names, valid classes and valid type descriptor


## Print GC

Enable the garbage collection logging to capture detailed statistics, e.g. type of garbage collector, how often memory is restored and how much time memory was held for. Garbage collection can last several milliseconds, so logging is useful for latency-sensitive processes.

* `-verbose:gc` - logs garbage collector runs and how long they're taking.
* `-XX:+PrintGCDetails` - includes the data from -verbose:gc but also adds information about the size of the new generation and more accurate timings.
* `-XX:-PrintGCTimeStamps` - Print timestamps at garbage collection.

> Consider using [LMAX disruptor](https://lmax-exchange.github.io/disruptor/) for a Garbage Collection free architecture for ultra latency-sensitive applications


## Deprecated: PermGen Size

`-XX:PermSize` - size of PermGen space where string pool and class metadata is saved.

Option is useful for web servers which load classes of a web application during deployment (e.g. deploying a jar or war to Tomcat).

> Metaspace has taken over PermGen space in Java 8
