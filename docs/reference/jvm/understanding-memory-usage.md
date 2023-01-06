# Understanding memory usage.

Adjusting the heap size and Garbage Collection behaviour is often the simplest means to improving application performance and stability. A mismatch between the heap size.

Allocating additional memory to the HotSpot JVM is a relatively cheap way to improve the performance of an application.

Garbage collection cost is in the form of execution pauses while the HotSpot JVM cleans up the no-longer-needed heap allocations.


Report a full breakdown of the HotSpot JVM’s memory usage upon exit using the following option combination:

```bash
-XX:+UnlockDiagnosticVMOptions ‑XX:NativeMemoryTracking=summary ‑XX:+PrintNMTStatistics.
```


## Out Of Memory errors

When experiencing `OutOfMemory` errors, consider how the HotSpot JVM should behave if the application runs out of memory.

`-XX:+ExitOnOutOfMemoryError` - HotSpot JVM exits on the first OutOfMemory error, suitable if the JVM will be automatically restarted (such as in container services)

`-XX:+HeapDumpOnOutOfMemoryError` - dump contents of heap to file, `<java_pid>.hprof`, to help diagnose memory leaks

`-XX:HeapDumpPath` defines the path for the heap dump, default is current directory


## Choose A Garbage Collector

The [HotSpot Virtual Machine Garbage Collection Tuning Guide](https://docs.oracle.com/en/java/javase/17/gctuning/index.html) provides advice on [selecting a suitable garbage collector](https://docs.oracle.com/en/java/javase/17/gctuning/available-collectors.html#GUID-9E4A6B11-BB94-424F-90EF-401287A1C333) (GC)

G1GC collector is the default used by the [JDK ergonomics](https://docs.oracle.com/en/java/javase/17/gctuning/ergonomics.html#GUID-DB4CAE94-2041-4A16-90EC-6AE3D91EC1F1) process on most hardware.

Other garbage collectors available include:

`-XX:+UseSerialGC` - serial collector, performing all GC work on a single thread

`-XX:+UseParallelGC` - parallel (throughput) collector, performs compaction using multiple threads.

`-XX:+UseZGC` - ZGC collector scalable low latency garbage collector (experimental in JDK 11, so requires `-XX:+UnlockExperimentalVMOptions`).


Enable garbage collection logging

`-Xlog:gc` - basic GC logging

`-Xlog:gc*` - verbose GC logging


## Object Allocation

Applications that create short-lived objects at a high allocation rates can lead to the premature promotion of short-lived objects to the old-generation heap space. There the objects will accumulate until a full garbage collection is needed

To avoid premature promotion:

`-XX:NewSize=n` - initial size for the young generation

`-XX:MaxNewSize=n` - maximum size for the young generation

`-XX:MaxTenuringThreshold=n` - maximum number of young-generation collections an object can survive before it is promoted to the old generation


## Just In Time Optimisation

Understand how the Just In Time (JIT) compiler optimises the code.

Once an application garbage collection pauses are an acceptable level, check the JIT compilers are optimizing the parts of your program you think are important for performance.

Enable compilation logging:

`-XX:+PrintCompilation` print basic information about each JIT compilation to the console

`-XX:+UnlockDiagnosticVMOptions ‑XX:+PrintCompilation ‑XX:+PrintInlining` - information about method in-lining
