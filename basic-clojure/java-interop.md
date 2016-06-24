# Java Interoperability

![Oracle Java](/images/java-banner.png)

  Clojure provides very clear and simple syntax for [Java interoperatility](http://clojure.org/java_interop), using the folowing functions
  
  * `import` - add functions from the Java library into the current namespace
  * `new` - create a new Java object
  * `.` - is the short form of the `new` function
  
  As Clojure is hosted on the Java Virtual Machine (JVM), its very easy to include libraries from any other languages that runs on the JVM, for example Java, Groovy, Scala, Jython, JRuby, Jaskell, etc.
  
  The Leiningen build tool provides a simple way to include libraries as dependencies, using the `:dependencies` section of the `project.clj` file. Any library published to [Maven Central](http://search.maven.org/) is available for download by Leiningen, as both Maven Central and [Clojars.org](https://clojars.org) repositories are used by default. 

> **Hint** Clojure projects and REPL environments include the `java.lang` library automatically.  Any methods from that library can be used without having to `import` them or include any dependencies

## The syntax 

  Its very easy to call Java methods and objects from clojure using the following syntax

```clojure
(.instanceMember instance args*)
(.instanceMember Classname args*)
(.-instanceField instance)
(Classname/staticMethod args*)
Classname/staticField
```

> **Note** Use the instanceMember .toUpperCase to convert a string from lower case to upper case 

<!--sec data-title="Reveal answer..." data-id="answer001" data-collapse=true ces-->

Call the `.toUpperCase` function on any string you like, for example

```clojure
(.toUpperCase "I was low, but now I'm up")
```

The string passed as an arguent should now be all uppercase: "I WAS LOW, BUT NOW I'M UP"

<!--endsec-->


> **Note** Use the staticField `Math/PI` to return the approximate value of Pi

<!--sec data-title="Reveal answer..." data-id="answer002" data-collapse=true ces-->

You can treat any static field like any name defined in your Clojure code, so when evaluated the static field simply returns the value it represents

In this case the `Math/PI` staic field simply returns the approximate value of Pi that fits into a java.lang.Double type.

```clojure
Math/PI
-> 3.141592653589793
```
<!--endsec-->


## Getting the Java environment

  Eariler we used Clojure functions to find information about our environment.  We can also used the `getProperty()` method from the `java.lang.System` object to ask for the _java version_ and _jvm name_.

> **Note** Get version of Java & the JVM, returning those values as a meaningful string.  Then get the version of the Clojure project

<!--sec data-title="Reveal answer..." data-id="answer003" data-collapse=true ces-->

```clojure
(str "You are running Java version " (System/getProperty "java.version") "with the JVM" (System/getProperty "java.vm.name")) 

(str "Latest project version: " (System/getProperty "playground.version"))
```
<!--endsec-->


> **Note** Use `System/getenv` to return your system's environment variables as a map

<!--sec data-title="Reveal answer..." data-id="answer004" data-collapse=true ces-->
```clojure
(System/getenv)
```

![](../images/clojure-playground-getenv.png)


  You may notice that this is a map data structure that we return, so we can use use destructuring or the maps behaviour itself to pull out information. 


> **Hint** A full list of properties can be seen in the [getProperty() documentation](http://docs.oracle.com/javase/8/docs/api/java/lang/System.html)

  There are more examples of Java Interoperability in the next few sections.

<!--endsec-->
