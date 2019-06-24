# Create a Leiningen project

Create a project for our game.

We are not using any particular libraries, so the default Leiningen template is just fine for our project.

```
lein new tictactoe-cli
```

> #### Hint::Alternatively clone the github repository
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

---

> #### TODO::Add Clojure CLI project configuration
> Add the relevant configuration to run this project from the Clojure CLI tools as well as Leiningen, to make it more future proof and give readers more options on how to run the project.
