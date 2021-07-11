# Configure Lighttable keyboard mappings

`LightTable/User/user.keymap`

## Emacs 

  Add a keybinding to kill a line 
  

Suggested configuration   

```clojure
    [:editor "ctrl-k" (:editor.line-start)
                      (:editor.kill-line)
                      (:editor.delete-char-left)]
```

> need to test this 
