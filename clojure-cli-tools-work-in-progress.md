# Clojure CLI tools - deps.edn

>####TODO::Work in progress
> Just a brain dump at the moment


it's early days with `clj` / `deps.edn` but I expect to see it more and more by the time 1.10 lands. There's a Mac installer (via `brew`) but nothing automated for Linux or Windows yet. A PowerShell install script is being worked on for Windows. For Linux, there's and install script, but you can't just use `apt` etc. At least, not yet. Several Contrib libraries have added `deps.edn` to support the use of git deps and some Contrib libraries have switched from using Leiningen as a local dev convenience to using `clj` / `deps.edn`. Cognitect (and a few other shops) have produced tooling around this -- Cognitect Labs' test runner is really nice, Juxt has `pack` to build JARs/uberjars, Health Finch has `depstar`.

The idea of a standardized way to manage dependencies and run code directly from source (via local or git deps) is very appealing to a lot of people tho'. But in the same way Boot hasn't (yet) displaced Leiningen, I think it'll be a long, slow road for `clj` / `deps.edn` to gain that level of traction.

Yeah, it's a runner, not a build/make tool, but even so you can use `:main-opts` to run tooling https://github.com/seancorfield/dot-clojure/blob/master/deps.edn So `clj -A:test:runner` will run all my tests in a project, and `clj -A:proto:nrepl` will start an nREPL server for use with Atom/ProtoREPL etc. I can also create new projects with `clj -A:new app myname/my-app` (edited)
