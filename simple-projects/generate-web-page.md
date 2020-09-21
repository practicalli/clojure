# Simple Project: Generate Web Page
Generate a web page from Clojure code, using Hiccup

Generate a full HTML webpage with content.

Add a CSS library (bulma.io, bootstrap) to improve generation

{% tabs repl="In the REPL", project="In a Clojure Project" %}

{% content "repl" %}


{% content "project" %}

```shell
clojure -A:new app practicalli/generate-webpage
```



{% endtabs %}


## Summary
Generating a web page in Clojure shows how easy it is to structure data and transform that data into other structures.

Although this kind of project is easy enough to just do in a REPL directly, using a Clojure aware editor with a Clojure project makes changes to the code far simpler, without loosing any of the immediate feedback of the REPL.

Most Clojure developers use the REPL by evaluating code in the editor showing the source code from the project.

[Practicalli WebApps book](https://practicalli.github.io/clojure-webapps/) shows how to build websites, create self-documented API's, manage Web Application servers and use databases to persist data.
