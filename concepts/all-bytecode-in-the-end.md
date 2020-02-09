# Its all Bytecode in the end

> The REPL is your compiler

![Clojure - conceptual view of how Clojure runs](../images/clojure-evaluation-process.png)

  As soon as you evaluate your code in the REPL it is also being compiled in the background into Java Bytecode.  So there is no need for a seperate build and run phase.

  As you can inject code into the running environment you can easily bug fix or itteratively develop your application.
