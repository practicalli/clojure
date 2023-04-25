# Create a Clojure project
>
> #### TODO::work in progress, sorry

Create a project for our game.

{% tabs deps="deps.edn projects", lein="Leiningnen projects" %}

{% content "deps" %}
Create a new project using `clj-new` alias, found in [:fontawesome-solid-book-open: Practicalli Clojure CLI Config]({{ book.P9IClojureDepsEdn }})

```bash
clojure -M:new practicalli/tictactoe-cli
```

Open the project in [a Clojure aware editor](/clojure-editors/) or run a rebel REPL

```bash
clojure -M:repl/rebel
```

Once the rebel REPL is running, load the project and change to the main namespace

```clojure
(require 'practicalli/tictactoe-cli)

(in-ns 'practicalli/tictactoe-cli)
```

{% content "lein" %}
The default Leiningen template is suitable fine for the project as no additional libraries are used.

```
lein new tictactoe-cli
```

> #### Hint::Alternatively clone the github repository
>
> You can also clone the tictactoe-cli game from GitHub

```bash
git clone https://github.com/practicalli/tictactoe-cli.git
```

## Updating Clojure version and licence

In the `project.clj` file I have updated Clojure to version 1.10.0 and changed the licence to be the more open Creative Commons license.

```clojure
(defproject tictactoe-cli "0.1.0-SNAPSHOT"
  :description "TicTacToe game played on the command line"
  :url "https://github.com/practicalli/tictactoe-cli"
  :license {:name "Creative Commons Attribution Share-Alike 4.0 International"
            :url "https://creativecommons.org"}
  :dependencies [[org.clojure/clojure "1.10.0"]])
```

I also removed the `license` file and added a brief description of the project to the `README.md` file

{% endtabs %}
