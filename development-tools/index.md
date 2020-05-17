# Clojure development environment guides
Emacs (Spacemacs), VSCode, Atom, Vim and IntelliJ are the most common Editors / IDE's for Clojure and ClojureScript development.

Use the editor you are most familiar with, or if just starting to code then VSCode and Calva is a good choice.

**[Install guides](install-guides/index.html)** are provided for all these editors.


<!-- Clojure Editors -->
{% tabs vscode="VSCode & Calva", spacemacs="Emacs & Spacemacs", vim="NeoVim & Conjure", atom="Atom & Chlorine", intellij="IntelliJ & Cursive" %}


<!-- VSCode and Calva -->
{% content "vscode" %}
Use VSCode and Calva if you are familiar with VSCode or have no editor preference.

Calva is inspired by CIDER, the most popular Clojure environment for Emacs.  Calva is a very active project and the [#calva channel on the Clojurians Slack community](clojurians.slack.com/messages/calva) is very supportive.

* [VSCode & Calva install guide](install-guides/vscode-calva.html)
* [VSCode Calva extension](https://marketplace.visualstudio.com/items?itemName=betterthantomorrow.calva)

<!-- The tabs code block does not support a nested youtube block -->
<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/a2vRDYXDAug" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->

<div class="iframe-container">
<iframe style="width:100%;height:100%;border:0px solid #000000" src="https://www.youtube.com/embed/a2vRDYXDAug" scrolling="yes">This browser does not support Iframe</iframe>
</div>

<br />

![VSCode Calva demo](https://github.com/BetterThanTomorrow/calva/raw/master/assets/howto/features.gif)


<!-- Spacemacs -->
{% content "spacemacs" %}
[Spacemacs](https://spacemacs.org/) is a community configuration bringing [Emacs](https://www.gnu.org/software/emacs/) and [Vim](https://www.vim.org/) together.  Spacemacs uses a mnemonic menu system that makes it easy to learn.

[Spacemacs, Practicalli](https://practicalli.github.io/spacemacs) guides you through Clojure development, documenting with org-mode, Git version control with Magit, Vim editing modes and dozens of other features.

* [Spacemacs install guide](https://practicalli.github.io/spacemacs/install-spacemacs/)

<!-- The tabs code block does not support a nested youtube block -->
<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/rZNYLGw1qFk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->

<div class="iframe-container">
<iframe style="width:100%;height:100%;border:0px solid #000000" src="https://www.youtube.com/embed/rZNYLGw1qFk" scrolling="yes">This browser does not support Iframe</iframe>
</div>



<!-- NeoVim and Conjure -->
{% content "vim"%}
[Conjure](https://github.com/Olical/conjure) is a plugin for Neovim
* [Conjure install guide](https://github.com/Olical/conjure)
* [Conjuring Clojure in Vim](https://blog.djy.io/conjuring-clojure-in-vim/) - an introduction to using Conjure

[![asciicast](https://asciinema.org/a/325517.svg)](https://asciinema.org/a/325517)

<!-- Atom.io -->
{% content "atom" %}

[Atom.io](https://atom.io/) is flexible and simple to use editor.  [Chlorine](https://github.com/mauricioszabo/atom-chlorine) is the recommended plugin for Atom.io. [ProtoREPL](https://atom.io/packages/proto-repl) is not actively maintained at present. The [Chlorine plugin for Atom](https://github.com/mauricioszabo/atom-chlorine) is especially recommended for ClojureScript shadow-cljs projects.

#### Chlorine
* [Chlorine install guide](https://github.com/mauricioszabo/atom-chlorine)

![Chlorine animated gif](https://github.com/mauricioszabo/atom-chlorine/blob/master/docs/eval-code.gif)

#### ProtoREPL
* [Atom & ProtoREPL install guide](install-guides/atom-protorepl.html)

![Atom.io and ProtoREPL](/images/atom-protorepl-demo.gif)


#### Proton - alternative menu and configuration approach
Proton offers a simple mnemonic menu as an alternative to the multiple keys for shortcuts in Atom.io.  Proton also gives you a simple text configuration to manage all your packages quickly.  Unfortunately Proton is not complete replacement of all actions.

* [Atom & Proton install guide](install-guides/atom-proton.html)

![Atom.io proton-mode demo](/images/atom-proton-mode-demo.gif)


<!-- IntelliJ and Cursive -->
{% content "intellij" %}
Developers from a Java background are usually familar with IDE's such as IntelliJ, so [Cursive IDE for IntelliJ](https://cursive-ide.com/) may be an appropriate choice.  Cursive uses the static analysis of Clojure code as well as a REPL.

> #### Hint::Requires license for commercial development
> There is a free license when development is not for commercial projects, however, a license must be purchased for each developer working on a commercial project.

* [IntelliJ & Cursive install guide](install-guides/intellij-cursive.html)

![Cursive IDE](https://cursive-ide.com/images/cursive-screenshot.png)


{% endtabs %}
<!-- End of Clojure editors -->
