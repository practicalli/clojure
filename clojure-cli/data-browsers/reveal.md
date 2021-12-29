# Reveal - REPL with visual data browser
[Reveal](https://vlaaad.github.io/reveal/) provides a REPL with a connected visual data explorer.  Reveal can also be used as a `tap>` target, visualizing data added to a `tap>` (an elegant approach compared to print statements).

[Reveal](https://vlaaad.github.io/reveal/) describes itself as a read evaluate visualize loop tool proving extra tools to explore data in Clojure visually.  The [extensive documentation](https://vlaaad.github.io/reveal/) shows the many ways to use Reveal.

Use Reveal with [a terminal REPL](#using-reveal-in-a-terminal), a [Clojure editor that uses nrepl](#using-reveal-with-nrepl-editors), such as Emacs Cider and Spacemacs.  Reveal can be added as a tap source to any running REPL, eg. using [Reveal with Rebel Readline](#using-reveal-with-rebel-and-tap).

{% youtube %}
https://youtu.be/1jy09_16EeY
{% endyoutube %}


## Using Reveal in a terminal
[`practicalli/clojure-deps-edn`]({{ book.P9IClojureDepsEdn }}) contains the `:inspect/reveal` alias to run Reveal REPL in a terminal with the Reveal UI along-side.

Open a terminal and run the command:

```bash
clojure -M:inspect/reveal
```
> Use the `clj` command if the `rlwrap` binary is available

Write Clojure code as normal in the REPL and result are also sent to the Reveal data browser window.

The [extensive documentation](https://vlaaad.github.io/reveal/) shows the many ways to use Reveal.

<!-- #### Tracking state with an atom -->
<!-- Define the state as an atom, the state being a simple value in this case -->

<!-- ```clojure -->
<!-- (def state (atom 24)) -->
<!-- ``` -->

<!-- Select the reference created for the state in the Revel browser. -->

<!-- `SPACE` or `ENTER` to open the menu and select `Deref`.  A tab opens with the value of the atom. -->

<!-- `SPACE` or `ENTER` with the value selected and select `Watch:all`. -->

<!-- In the REPL, update the value of the state atom. -->

<!-- ```clojure -->
<!-- (swap! state * 12) -->
<!-- ``` -->
<!-- The new value of the state atom is shown in the Reveal data browser.  Each Clojure expressions evaluated that affects the state atom will be displayed in the Reveal browser. -->



## Using Reveal with nrepl Editors
[`practicalli/clojure-deps-edn`]({{ book.P9IClojureDepsEdn }}) contains the `:inspect/reveal-nrepl` alias that run a Reveal repl with data browser and nrepl server, allowing connections from [Clojure aware editors](/clojure-editors/) such as Emacs CIDER and VSCode Calva.  `:inspect/reveal-light-nrepl` does the same and uses a light them with Ubuntu Mono 32 point font (good for demos, HiDPI screens)

{% tabs practicalli="Using practicalli/clojure-deps-edn", manual="Manually add Alias" %}

{% content "practicalli" %}

{% content "manual" %}
Add the following aliases to your user level `~/.clojure/deps.edn` configuration to make reveal available to all projects.

Plain nrepl server with Reveal.

```clojure
  :inspect/reveal-nrepl
  {:extra-deps {vlaaad/reveal {:mvn/version "1.1.159"}
                nrepl/nrepl   {:mvn/version "0.8.3"}}
   :main-opts  ["-m" "nrepl.cmdline"
                "--middleware" "[vlaaad.reveal.nrepl/middleware]"]}
```
CIDER specific nrepl connection with the Cider middleware

```
  :inspect/reveal-nrepl-cider
  {:extra-deps {vlaaad/reveal                 {:mvn/version "1.1.159"}
                nrepl/nrepl                   {:mvn/version "0.8.3"}
                cider/cider-nrepl             {:mvn/version "0.25.4"}
                refactor-nrepl/refactor-nrepl {:mvn/version "2.5.0"}}
   :main-opts  ["-m" "nrepl.cmdline"
                "--middleware" "[vlaaad.reveal.nrepl/middleware,refactor-nrepl.middleware/wrap-refactor,cider.nrepl/cider-middleware]"]}
```

{% endtabs %}

Start a Reveal REPL with nrepl server

```
clojure -M:inspect/reveal-nrepl
```

Connect to the Reveal repl from a [Clojure aware editor](/clojure-editors/), e.g `cider-connect`


### Using Reveal with Cider Jack-in
`C-u cider-jack-in-clj` in CIDER to start a reveal REPL  (`SPC u , '` in Spacemacs)

Edit the jack-in command by deleting the all the configuration after the `clojure` command and add the alias
```
clojure -M:inspect/reveal-nrepl-cider
```

`:inspect/reveal-nrepl-cider` is a light version of the above.

### Cider jack-in with reveal using a .dir-locals.el
Add a `.dir-locals.el` file to the root of the Clojure project. The `.dir-locals.el` configuration adds the `:inspect/reveal-nrepl-cider` via `cider-clojure-cli-global-options` and all other automatically injected configuration is disabled to prevent those dependencies over-riding the alias.

```
((clojure-mode . ((cider-preferred-build-tool . clojure-cli)
                  (cider-clojure-cli-global-options . "-M:inspect/reveal-nrepl-cider")
                  (cider-jack-in-dependencies . nil)
                  (cider-jack-in-nrepl-middlewares . nil)
                  (cider-jack-in-lein-plugins . nil)
                  (cider-clojure-cli-parameters . ""))))
```

Ensure the `.dir-locals.el` file is loaded by using `revert-buffer` on any open Clojure file from the project.

`cider-jack-in-clj` should now start the Reveal REPL and send evaluations from Cider to the Reveal visualization UI.


## Using Reveal with Rebel and `tap>`
Reveal can be used as a `tap>` target with the Rebel REPL, launching the Reveal data browser when added as a tap> target.

Start Rebel REPL with Reveal library as a dependency

```bash
clojure -M:repl-reveal:repl/rebel
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
