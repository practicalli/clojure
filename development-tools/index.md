# Clojure development environment guides

Coaches can help you set up development tools on your laptop if you wish to continue discovering Clojure after the ClojureBridge London event.

## Common tools required

| Tool            | Is it installed? | Install guide                       |
|-----------------|------------------|-------------------------------------|
| Java 8 or above | `java -version`  | [Java install](java.html)           |
| Leiningen       | `lein version`   | [Leiningen install](leiningen.html) |
| Git             | `git --version`  | https://git-scm.com/                |

Clojure is a hosted language and runs on top of Java or JavaScript (and other platforms).  The Java Runtime Enviromment (JRE is needed to run Clojure.

Leiningen is a build tool for running Clojure code, creating and managing projects.

Git can be used to version your Clojure code, so you can go back to earlier versions if you make a mistake.


## Clojure editor choices

**[Install guides](install-guides/index.html)** are provided for all these editors.

<!-- Clojure Editors -->
{% tabs first="Atom", second="VSCode", third="Spacemacs", forth="IntelliJ" %}

<!-- Atom.io and ProtoREPL -->
{% content "first" %}

[Atom & ProtoREPL install guide](install-guides/atom-protorepl.html)


[Atom.io](https://atom.io/) is flexible and simple to use editor.  The [ProtoREPL](https://atom.io/packages/proto-repl) plugin adds support for Clojure and ClojureScript.

![Atom.io and ProtoREPL](/images/atom-protorepl-demo.gif)


### Simplified menu and configuration approach

[Atom & Proton install guide](install-guides/atom-proton.html)

Proton offers a simple mnemonic menu as an alternative to the somewhat cumbersome keybindings in Atom.io.  Proton also gives you a simple text configuration to manage all your packages quickly.

![Atom.io proton-mode demo](/images/atom-proton-mode-demo.gif)


<!-- VSCode and Calva -->
{% content "second" %}

[VSCode Calva extension](https://marketplace.visualstudio.com/items?itemName=cospaia.clojure4vscode)

![VSCode Calva demo](https://github.com/BetterThanTomorrow/calva/raw/master/assets/howto/features.gif)

[Microsoft VSCode & Calva install guide](install-guides/vscode-calva.html)

<!-- Spacemacs -->
{% content "third" %}

[Emacs & Spacemacs install guide](install-guides/emacs-spacemacs.html)

[Spacemacs](https://spacemacs.org/) is a community configuration bring [Emacs](https://www.gnu.org/software/emacs/) and [Vim](https://www.vim.org/) together.  Spacemacs uses a mnemonic menu system that makes it easy to learn.

[Spacemacs, Practicalli](https://practicalli.github.io/spacemacs) guides you through Clojure development, documenting with org-mode, Git version control with Magit, Vim editing modes and dozens of other features.

<iframe width="780" height="480" src="https://www.youtube.com/embed/Uuwg-069NYE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


<!-- IntelliJ and Cursive -->
{% content "forth" %}

[IntelliJ & Cursive install guide](install-guides/intellij-cursive.html)

[Cursive IDE for IntelliJ](https://cursive-ide.com/)

![Cursive IDE](https://cursive-ide.com/images/cursive-screenshot.png)


{% endtabs %}
<!-- End of Clojure editors -->
