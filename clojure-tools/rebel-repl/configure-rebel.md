# Configure Rebel Readline


## Configure rebel readline

In `~/.clojure/rebel_readline.edn` you can provide a map with the
following options:

```
:key-map         - either :viins or :emacs. Defaults to :emacs

:color-theme     - either :light-screen-theme or :dark-screen-theme

:highlight       - boolean, whether to syntax highlight or not. Defaults to true

:completion      - boolean, whether to complete on tab. Defaults to true

:eldoc           - boolean, whether to display function docs as you type.
                   Defaults to true

:indent          - boolean, whether to auto indent code on newline. Defaults to true

:redirect-output - boolean, rebinds root *out* during read to protect linereader
                   Defaults to true

:key-bindings    - map of key-bindings that get applied after all other key
                   bindings have been applied
```


For example, to change the default keybindings to vi, edit `~/.clojure/rebel_readline.edn` and add

```
{:key-map :viins}
```
