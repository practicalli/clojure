# Leiningen Build tool

[![Leiningen - automating Clojure projects](/images/leiningen-banner.png)](http://leiningen.org/)

[leiningen.org](http://leiningen.org/) (pronounced line-ing-en) is a very powerful build automation tool for automating Clojure projects.  With Leiningen you can:

* Create Clojure Projects with templates
* Define and manage dependencies
* Run an interactive Clojure environment (REPL)
* Run unit tests using Clojure.test
* Run your Clojure application
* Create a deployable Clojure application, as Java Jar file
* Deploy a Clojure library to a remote repository

![Leiningen - build automation for Clojure](/images/leiningen-repl-custom-prompt.png)

## Install Leiningen

  Download the install script from [leiningen.org](http://leiningen.org/) and run the Leiningen script in a terminal

  On Linux and MacOSX, make the script executable first

    chmod a+x lein
    ./lein

> **Hint** I put the `lein` script in `~/bin` directory which is part of my operating system execution path ($PATH).  To include the `~/bin` directory in the system path, I add the following code to the `~/.profile` file

<script src="https://gist.github.com/jr0cket/adb952b71dc69f9d059bc49272254d8b.js"></script>

## Testing Leiningen is working

  Test that Leiningen is installed with the following command

    lein version

  Output should look similar to:

    Leiningen 2.6.1 on Java 9-internal OpenJDK 64-Bit Server VM
