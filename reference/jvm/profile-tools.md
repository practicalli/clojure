# Profile JVM applications

Profile applications on the JVM, visualising memory and CPU resources, identifying bottlenecks and areas of the code to review to optimise a running application.

* [Using FlameGraphs To Illuminate The JVM](https://youtu.be/ugRrFdda_JQ) by Nitsan Wakart at Devoxx UK 2017
* [A Simple Approach to the Advanced JVM Profiling](https://youtu.be/TDpbt4thECc) - JetBrains

<!-- ## Command line -->
<!-- TODO: JVM profile - anything useful on the command line? -->


## Java VisualVM

A simplified and robust profiling tool for Java applications, bundled with the Java Development Kit (JDK) and using JConsole, jstat, jstack, jinfo, and jmap.

![Java VisualVM screenshot](https://www.baeldung.com/wp-content/uploads/2017/10/7-visualvm-sample-memory.png)

Ubuntu
```bash
sudo apt install visualvm
```


## JDK Flight Recorder

JDK Flight Recorder is a production time profiling and diagnostics engine built into the JVM

* Extremely low overhead - no measurable impact on the running application
* High performance flight recording engine and high performance data collection
* Safe and reliable in production, tested on all platforms as part of the JVM/JDK-testing
* Time machine records data before, up to, and right after a problem occurs (even if the JVM process crashes)

`jcmd` to access the flight recorder data from the command line

Mission control provides a graphical tool to visualise flight recorder data.

* [Continuous Monitoring with JDK Flight Recorder](https://youtu.be/plYESjZ12hM) - Java channel - September 2020
* [JDK11 - Introduction to JDK Flight Recorder](https://youtu.be/7z_R2Aq-Fl8) - September 2020
* [Production profiling with JDK Flight Recorder & JDK Mission Control](https://youtu.be/wwgvDDuJwtk) - Madrid JUG


## Mission Control

[Mission Control]([GitHub repository](https://github.com/openjdk/jmc)) is an open source desktop tool for visualising production time profiling and diagnostics from the JDK flight recorder tool. JDK Mission Control supports OpenJDK 11 and above.

JDK Mission Control consists of

* A JDK Flight Recorder (JFR) analyser and visualiser
* A Java Management Extensions (JMX) Console
* A heap dump (hprof format) analyzer (JOverflow)

[Eclipse Mission Control from Adoptium](https://adoptium.net/jmc.html).

<!-- TODO:  Compare to VisualVM and Mission Control.  Does it reduce down to Mission Control being a real-time stats version of VisualVM? Or due to leveraging jdk flight recorder -->


Java Mission Control demo - 2014 outated but might be useful if nothing newer

{% youtube %}
https://youtu.be/aJH_aZNQ-G4
{% endyoutube %}

![Java Mission Control - Clojure example](https://raw.githubusercontent.com/practicalli/graphic-design/live/java/screenshots/java-mission-control-clojure-example.png)


## Profiling guides

Profiling your Java Application - A Beginner’s Guide - Victor Rentea

Explore three of the best free tools for profiling a Java (Spring) application:
* Using Java Flight Recorder to profile method execution times
* Using Micrometer-Prometheus-Grafana to profile connection starvation issues
* Using Glowroot to identify long-running queries

{% youtube %}
https://youtu.be/3PWgGzpHykc
{% endyoutube %}


## References

* [Java Profilers - Baeldung](https://www.baeldung.com/java-profilers) - overview of several profiling tools
* [Java SE HotSpot Virtual Machine Garbage Collection Tuning Guide - Oracle](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/)
