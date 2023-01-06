# Reference: JVM Experimental Options

<!-- TODO: research HotSpot JVM experimental features -->

The HotSpot JVM provides the opportunity to try features that may appear in future release, although are currently not production-ready.

HotSpot JVM experimental features need to be unlocked by specifying the `-XX:+UnlockExperimentalVMOptions` option.

For example, the ZGC garbage collector in JDK 11 can be accessed using

```bash
java -XX:+UnlockExperimentalVMOptions -XX:+UseZGC
```

> The ZGC collector became a product option in JDK 15, so is no longer experimental.


## Manageable

<!-- TODO: JVM Experimental Options - manageable options description and examples -->

Show locks held by `java.util.concurrent` classes in a HotSpot JVM thread dump:

```bash
java -XX:+UnlockExperimentalVMOptions -XX:+PrintConcurrentLocks
```

> These options can be set at runtime via the MXBean API or related JDK tools


## Diagnostic

Accessing advanced diagnostic information about the HotSpot JVM.

These options require you to use the `-XX:+UnlockDiagnosticVMOptions`  option before they can be used.

View advance compilation optimisations using the `-XX:+LogCompilation` option:

```bash
java -XX:+UnlockDiagnosticVMOptions -XX:+LogCompilation
```

The HotSpot JVM outputs a log file containing details of all the optimisations made by the JIT compilers. Inspect the output to understand which parts of your program were optimized and to identify parts of the program that might not have been optimized as expected.

The LogCompilation output is verbose but can be visualized in a tool such as JITWatch, which can tell you about method inlining, escape analysis, lock elision, and other optimizations that the HotSpot JVM made to your running code.


<!-- ## Developmental -->

<!-- TODO: JVM Experimental Options - developmental options description and examples -->
<!-- These options allow configuration and debugging of the most-advanced HotSpot JVM settings, and they require a special debug HotSpot JVM build before you can access them. -->
