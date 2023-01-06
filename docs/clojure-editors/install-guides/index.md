# Editor Install Guides

All these editors support Clojure development.  Use an editor you are familiar with or ask a coach for advice.

| Editor Install Guides                                                                          |
|------------------------------------------------------------------------------------------------|
| [Atom & ProtoREPL](atom-protorepl.html) or [Atom & Proton](atom-proton.html)                   |
| [Microsoft VSCode & Calva](vscode-calva.html)                                                  |
| [Spacemacs](emacs-spacemacs.html)  (TODO)                                                      |
| [Emacs & CIDER](emacs-cider.html)  (TODO)                                                      |
| [IntelliJ & Cursive](intellij-cursive.html)   (TODO)                                           |
| [LightTable](https://github.com/ClojureBridgeLondon/curriculum/blob/gh-pages/outline/setup.md) |


## Clojure editor options

**[Install guides](install-guides/index.html)** are provided for all these editors.

<!-- Clojure Editors -->
{% tabs first="Atom", second="VSCode", third="Spacemacs", forth="IntelliJ" %}

<!-- Atom.io and ProtoREPL -->
{% content "first" %}

[Atom.io](https://atom.io/) is flexible and simple to use editor.  The [ProtoREPL](https://atom.io/packages/proto-repl) plugin adds support for Clojure and ClojureScript.

![Atom.io and ProtoREPL](/images/atom-protorepl-demo.gif)

### Simplified menu and configuration approach

Proton offers a simple mnemonic menu as an alternative to the somewhat cumbersome keybindings in Atom.io.  Proton also gives you a simple text configuration to manage all your packages quickly.

![Atom.io proton-mode demo](/images/atom-proton-mode-demo.gif)


<!-- VSCode and Calva -->
{% content "second" %}

[VSCode Calva extension](https://marketplace.visualstudio.com/items?itemName=cospaia.clojure4vscode)

![VSCode Calva demo](https://github.com/BetterThanTomorrow/calva/raw/master/assets/howto/features.gif)

<!-- Spacemacs -->
{% content "third" %}

Spacemacs is a community configuration bring Emacs and Vim together.  Spacemacs uses a mnemonic menu system that makes it easy to learn.

[Spacemacs, Practicalli](https://practicalli.github.io/spacemacs) guides you through Clojure development, documenting with org-mode, Git version control with Magit, Vim editing modes and dozens of other features.

<iframe width="780" height="480" src="https://www.youtube.com/embed/Uuwg-069NYE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<!-- IntelliJ and Cursive -->
{% content "forth" %}

[Cursive IDE for IntelliJ](https://cursive-ide.com/images/cursive-screenshot.png)

![Cursive IDE](https://cursive-ide.com/images/cursive-screenshot.png)

{% endtabs %}
<!-- End of Clojure editors -->
