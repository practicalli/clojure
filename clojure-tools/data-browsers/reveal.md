# Reveal - REPL with visual data browser
[Reveal](https://github.com/vlaaad/reveal) provides a REPL with a connected visual data explorer.  Reveal can also be used as a `tap>` target, visualizing data added to a `tap>` (an elegant approach compared to print statements).

[Reveal](https://github.com/vlaaad/reveal) describes itself as a read evaluate visualize loop tool proving extra tools to explore data in Clojure visually.

## Reveal as a deps.edn alias
[`practicalli/clojure-deps-edn`]({{ book.P9IClojureDepsEdn }}) contains the `:repl-reveal` alias that run a Reveal repl with data browser.

```clojure
:repl-reveal
{:extra-deps {vlaaad/reveal {:mvn/version "0.1.0-ea26"}}
 :main-opts  ["-m" "vlaaad.reveal" "repl"]}
```

## Using Reveal
Run a REPL with Reveal

```shell
clj -R:repl-reveal
```
> The `clj` command requires the `rlwrap` binary

Write code as normal in the REPL and result are also sent to the Reveal data browser window.

## Tracking state with an atom
Define the state as an atom, the state being a simple value in this case

```clojure
(def state (atom 24))
```

Select the reference created for the state in the Revel browser.

`SPACE` or `ENTER` to open the menu and select `Deref`.  A tab opens with the value of the atom.

`SPACE` or `ENTER` with the value selected and select `Watch:all`.

In the REPL, update the value of the state atom.

```clojure
(swap! state * 12)
```
The new value of the state atom is shown in the Reveal data browser.  Each Clojure expressions evaluated that affects the state atom will be displayed inthe Reveal browser.


## Using Reveal with nrepl
[`practicalli/clojure-deps-edn`]({{ book.P9IClojureDepsEdn }}) contains the `:repl-reveal-nrepl` alias that run a Reveal repl with data browser and nrepl server, allowing connections from [Clojure aware editors](/clojure-editors/) such as Emacs CIDER and VSCode Calva.

```clojure
:repl-reveal-nrepl
{:extra-deps {vlaaad/reveal {:mvn/version "0.1.0-ea26"}
              nrepl/nrepl   {:mvn/version "0.7.0"}}
 :main-opts  ["-m" "nrepl.cmdline"
              "--middleware" "[vlaaad.reveal.nrepl/middleware]"]}
```

Start a Reveal REPL with nrepl server

```
clj -A:repl-reveal-nrepl
```

Connect to the Reveal repl from a [Clojure aware editor](/clojure-editors/), e.g `cider-connect`


## Using Reveal with Rebel and `tap>`
Reveal can be used as a `tap>` target with the Rebel REPL, launching the Reveal data browser when added as a tap> target.

Start Rebel REPL with Reveal library as a dependency

```shell
clojure -R:repl-reveal -A:rebel
```

Add reveal as a tap target that will receive all data from `tap>` function calls

```clojure
(add-tap ((requiring-resolve 'vlaaad.reveal/ui)))
```

A reveal window opens and receives all `tap>` values while the REPL is running.

```clojure
(tap> [1 2 3 4 5])
(tap> {:name "Jenny" :skill "Clojure"})
(tap> (zipmap [:a :b :c] [1 2 3 4]))
```

> TODO: find more examples of using tap>.
> It seems you can bind specific functions to a tap set, `(add-tap (bound-fn* clojure.pprint/pprint))` `(add-tap (bound-fn* prn))` so am assuming if a function is bound, where ever it is used its result is sent to reveal browser window.  Then functions can be removed from the tap.
> To stop reveal, shut down the REPL (is there another approach?)


## Use atom to hold tapped value
Create an atom for debugging purposes

```clojure
(def debug-state (atom nil))
(add-tap #(reset! debug-state %))
```

Use `tap>` to capture intermediate values in the middle of code that requires debugging, inspecting or watching the atom value (deref the atom and watch:latest or watch:all).  This approach complements an editor debugging process
