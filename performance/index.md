# Clojure Performance and benchmarks

There are several aspects to performance testing

* time taken by individual functions / expressions
* time through a specific path in your application
* response times under different loads

The purpose of performance testing and bench-marking is to understand the expected behaviour of your application under various usage patterns.  This kind of testing can also suggest areas of the application that might benefit from optomisation


## Performance tools for Clojure

* [Criterium](https://github.com/hugoduncan/criterium) - benchmarks for Clojure expressions
* [Gatling]()


## Gatling

The Gatling Project is another free and open source performance testing tool, primarily developed and maintained by Stephane Landelle. Gatling has a basic GUI that's limited to test recorder only. However, the tests can be developed in easily readable/writable domain-specific language (DSL).

Key Features of Gatling:

* HTTP Recorder
* An expressive self-explanatory DSL for test development
* Scala-based
* Production of higher load using an asynchronous non-blocking approach
* Full support of HTTP(S) protocols and can also be used for JDBC and JMS load testing
* Multiple input sources for data-driven tests
* Powerful and flexible validation and assertions system
* Comprehensive informative load reports


## Reference: Other performance tools

Other notable performance tools include:

* The Grinder
* Apache JMeter (Java desktop app)
* Tsung (required Erlang)
* Locust (python)


Key Features of The Grinder:

* TCP proxy to record network activity into the Grinder test script
* Distributed testing that scales with an the increasing number of agent instances
* Power of Python or Closure, combined with any Java API, for test script creation or modification
* Flexible parameterization, which includes creating test data on the fly and the ability to use external data sources like files and databases
* Post-processing and assertion with full access to test results for correlation and content verification
* Support of multiple protocols


Key Features of JMeter:

* Desktop GUI tool
* Cross-platform. JMeter can run on any operating system with Java
* Scalable. When you need a higher load than a single machine can create, JMeter can execute in a distributed mode, meaning one master JMeter machine controls a number of remote hosts.
* Multi-protocol support. The following protocols are all supported out-of-the-box: HTTP, SMTP, POP3, LDAP, JDBC, FTP, JMS, SOAP, TCP
* Multiple implementations of pre- and post-processors around sampler. This provides advanced setup, teardo* wn parametrization, and correlation capabilities
* Various assertions to define criteria
* Multiple built-in and external listeners to visualize and analyze performance test results
* Integration with major build and continuous integration systems, making JMeter performance tests part of the full software development life cycle
* Extensions via plugins


## Resources

* [Open source load testing tools - which one should you use](https://www.blazemeter.com/blog/open-source-load-testing-tools-which-one-should-you-use)
