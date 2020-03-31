# Create a project

We recommend creating a project to test our your development tools.  You can also use this project to save all your Clojure experiements from the workshop.

1. Open a terminal window and change to a suitable folder

```shell
cd projects/clojure
```

2. Create a new project using clj-new.  Use your company name or GitHub name instead of `practicalli`

```shell
clojure -A:new practicalli/playground
```

3. Change into the directory and test the project runs

```shell
cd playground

clj -A:rebel
```

You should now see a prompt for your repl.  Try typing in some simple Clojure code, such as:

```clojure
(+ 1 2 3 4 5)
```

> ####NOTE::Try the project with your preferred editor
> Go to the [Editor user guides](editor-guides/)
