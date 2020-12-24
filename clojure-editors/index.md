# Editors for Clojure development
The best editor to use for learning Clojure is the editor you are already familiar with (or want to learn).  Ideally this will be an editor that supports clojure by providing:

* syntax highlighting (colored parens can be useful too)
* structural editing to ensure parens are balanced when writing and refactor code
* running / connecting to a REPL process
* evaluation results inline or in a repl window (fast feedback on what the code does)
* data inspector / browser to visualise large and nested data ([external tools available](/clojure-tools/data-browsers/))

![Clojure REPL driven development with Clojure aware editors](https://raw.githubusercontent.com/jr0cket/developer-guides/master/clojure/clojure-repl-driven-development-clojure-aware-editor.png)

Emacs (Spacemacs), VSCode, Atom, Vim and IntelliJ are the most common Editors for Clojure and ClojureScript development. **[Install guides](editor-install-guides)** are provided for these editors.

> #### Hint::Just starting to code?
> VSCode and Calva is a good choice for those just starting to write code.


<!-- Clojure Editors -->
{% tabs vscode="VSCode & Calva", spacemacs="Emacs & Spacemacs", vimconjure="NeoVim & Conjure", spacevim="SppaceVim & Fireplace", vimiced="vim-iced", atom="Atom & Chlorine", intellij="IntelliJ & Cursive" %}


<!-- VSCode and Calva -->
{% content "vscode" %}
Use VSCode and Calva if you are familiar with VSCode or have no editor preference.

Calva is inspired by CIDER, the most popular Clojure environment for Emacs.  Calva is a very active project and the [#calva channel on the Clojurians Slack community](clojurians.slack.com/messages/calva) is very supportive.

* [VSCode & Calva install guide](editor-install-guides/vscode-calva.html)
* [VSCode & Calva user guide](editor-user-guides/vscode-calva.html)
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
<iframe style="width:100%;height:100%;border:0px solid #000000" src="https://www.youtube.com/embed/NDrpclY54E0" scrolling="yes">This browser does not support Iframe</iframe>
</div>


<!-- NeoVim and Conjure -->
{% content "vimconjure"%}

[![Neovim and Conjure](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/neovim-conjure-banner.png)](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/neovim-conjure-banner.png)

Neovim is a hyperextensible Vim-based text editor that is a drop-in replacement of Vim, implemented in less coded, fully compatible with Vim's editing model and Vimscript extension language.  Neovim also allows configuration in Lua.

[Conjure](https://github.com/Olical/conjure) is an interactive environment for evaluating code within your running program, initially targeted at Lisp languages such as Clojure.

#### Install and user guides
* [Practicalli install guide for neovim and conjure](./editor-install-guides/neovim-conjure.md)
* [Practicalli user guide for neovim and conjure](./editor-user-guides/neovim-conjure.md)


#### Quick try tutorial
Try the Conjure interactive `:ConjureSchool` tutorial without the need to install, only a recent version of neovim
```shell
curl -fL conjure.fun/school | sh
```
![Clojure editors - neovim and conjure tutorial](/images/clojure-editors-neovim-conjure-tutorial.png)

`:q` to quit the tutorial.


<!-- [![asciicast](https://asciinema.org/a/325517.svg)](https://asciinema.org/a/325517) -->

#### References

* [Getting started with Neovim and Conjure](https://oli.me.uk/getting-started-with-clojure-neovim-and-conjure-in-minutes/)
* [Neovim user guide](https://neovim.io/doc/user/)
* [Conjure install guide](https://github.com/Olical/conjure)
* [Conjuring Clojure in Vim](https://blog.djy.io/conjuring-clojure-in-vim/) - an introduction to using Conjure

<!-- SpaceVim and vim-fireplace -->
{% content "spacevim"%}
[SpaceVim](https://spacevim.org/) is a fully featured vim experience that includes a simple Clojure development environment based around [vim-fireplace](https://github.com/tpope/vim-fireplace)

* [Practicalli install guide](editor-install-guides/spacevim-fireplace.md)
* [Practicalli user guide](editor-user-guides/spacevim-fireplace.md)
* [SpaceVim quickstart guide](https://spacevim.org/quick-start-guide/)
* [SpaceVim documentation](https://spacevim.org/documentation/)

![SpaceVim start screen](/images/spacevim-start-screen.png)

![SpaceVim and vim-fireplace - Clojure project and REPL](/images/spacevim-clojure-repl-gruvbox-light.png)

<!-- vim-iced and vim-fireplace -->
{% content "vimiced"%}
Clojure Interactive Development Environment for Vim8/Neovim.

* [vim-iced documentation](https://liquidz.github.io/vim-iced/)

[![Clojure Interactive Development Environment for Vim8 / Neovim](https://raw.githubusercontent.com/liquidz/vim-iced/master/doc/pages/assets/logo.svg)](https://github.com/liquidz/vim-iced)


<!-- Atom.io -->
{% content "atom" %}

[Atom.io](https://atom.io/) is flexible and simple to use editor.  [Chlorine](https://github.com/mauricioszabo/atom-chlorine) is the recommended plugin for Atom.io. [ProtoREPL](https://atom.io/packages/proto-repl) is not actively maintained at present. The [Chlorine plugin for Atom](https://github.com/mauricioszabo/atom-chlorine) is especially recommended for ClojureScript shadow-cljs projects.

#### Chlorine
* [Chlorine install guide](https://github.com/mauricioszabo/atom-chlorine)

![Chlorine animated gif](https://raw.githubusercontent.com/mauricioszabo/atom-chlorine/master/docs/eval-code.gif)

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
