# Practicalli Clojure

```none
██████╗ ██████╗  █████╗  ██████╗████████╗██╗ ██████╗ █████╗ ██╗     ██╗     ██╗
██╔══██╗██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██║██╔════╝██╔══██╗██║     ██║     ██║
██████╔╝██████╔╝███████║██║        ██║   ██║██║     ███████║██║     ██║     ██║
██╔═══╝ ██╔══██╗██╔══██║██║        ██║   ██║██║     ██╔══██║██║     ██║     ██║
██║     ██║  ██║██║  ██║╚██████╗   ██║   ██║╚██████╗██║  ██║███████╗███████╗██║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝

 ██████╗██╗      ██████╗      ██╗██╗   ██╗██████╗ ███████╗
██╔════╝██║     ██╔═══██╗     ██║██║   ██║██╔══██╗██╔════╝
██║     ██║     ██║   ██║     ██║██║   ██║██████╔╝█████╗
██║     ██║     ██║   ██║██   ██║██║   ██║██╔══██╗██╔══╝
╚██████╗███████╗╚██████╔╝╚█████╔╝╚██████╔╝██║  ██║███████╗
 ╚═════╝╚══════╝ ╚═════╝  ╚════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝
```

> NOTE: Ascii Art Generator: https://patorjk.com/software/taag/#p=display&f=ANSI%20Shadow&t=Astro%205

## Book Overview

A guide to software development with the Clojure programming language, using Clojure CLI and a wide range of community tools for a REPL focused workflow.

The guide uses Practicalli Clojure CLI Config to provide aliases to run over 30 community tools that complement the workflow, including a REPL Reloaded workflow for a highly interactive and effective development experience.

Learning Clojure syntax and how to think in a functional design is also covered with code examples and challenge that help embed these concepts.


## Book status

[![MegaLinter](https://github.com/practicalli/clojure/actions/workflows/megalinter.yaml/badge.svg)](https://github.com/practicalli/clojure/actions/workflows/megalinter.yaml)[![Publish Book](https://github.com/practicalli/clojure/actions/workflows/publish-book.yaml/badge.svg)](https://github.com/practicalli/clojure/actions/workflows/publish-book.yaml)
[![Publish Book](https://github.com/practicalli/clojure/actions/workflows/publish-book.yaml/badge.svg)](https://github.com/practicalli/clojure/actions/workflows/publish-book.yaml)
[![pages-build-deployment](https://github.com/practicalli/clojure/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/practicalli/clojure/actions/workflows/pages/pages-build-deployment)

[![Ideas & Issues](https://img.shields.io/github/issues/practicalli/clojure?label=content%20ideas%20and%20issues&logoColor=green&style=for-the-badge)](https://github.com/practicalli/clojure/issues)
[![Pull requests](https://img.shields.io/github/issues-pr/practicalli/clojure?style=for-the-badge)](https://github.com/practicalli/clojure/pulls)

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/practicalli/clojure?style=for-the-badge)
![GitHub contributors](https://img.shields.io/github/contributors/practicalli/clojure?style=for-the-badge&label=github%20contributors)

## Creative commons license

<div style="width:95%; margin:auto;">
  <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a>
  This work is licensed under a Creative Commons Attribution 4.0 ShareAlike License (including images & stylesheets).
</div>

## Contributing

Issues and pull requests are most welcome although it is the maintainers discression as to if they are applicable.  Please detail issues as much as you can.  Pull requests are simpler to work with when they are specific to a page or at most a section.  The smaller the change the quicker it is to review and merge.

Please read the [detailed Practicalli contributing page](https://practical.li/contributing/) before raising an issue or pull request to avoid disapointment.

* [Current Issues](https://github.com/practicalli/clojure/issues)
* [Current pull requests](https://github.com/practicalli/clojure/pulls)

[Practicalli Clojure CLI Config](clojure/clojure-cli/practicalli-config.md) provides a user level configuration providing aliases for community tools used throughout this guide.  Issues and pull requests can also be made via its GitHub repository.

By submitting content ideas and corrections you are agreeing they can be used in any work by Practicalli under the [Creative Commons Attribution ShareAlike 4.0 International license](https://creativecommons.org/licenses/by-sa/4.0/).  Attribution will be detailed via [GitHub contributors](https://github.com/practicalli/clojure/graphs/contributors).

## Sponsor Practicalli

[![Sponsor Practicalli via GitHub](https://raw.githubusercontent.com/practicalli/graphic-design/live/buttons/practicalli-github-sponsors-button.png)](https://github.com/sponsors/practicalli-johnny/)

All sponsorship funds are used to support the continued development of [Practicalli series of books and videos](https://practical.li/), although most work is done at personal cost and time.

Thanks to [Cognitect](https://www.cognitect.com/), [Nubank](https://nubank.com.br/) and a wide range of other [sponsors](https://github.com/sponsors/practicalli-johnny#sponsors) for your continued support


## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=practicalli/clojure&type=Date)](https://star-history.com/#practicalli/clojure&Date)


## GitHub Actions

The megalinter GitHub actions will run when a pull request is created,checking basic markdown syntax.

A review of the change will be carried out by the Practicalli team and the PR merged if the change is acceptable.

The Publish Book GitHub action will run when PR's are merged into main (or the Practicalli team pushes changes to the default branch).

Publish book workflow installs Material for MkDocs version 9


## Local development

Install mkdocs version 9 using the Python pip package manager

```shell
pip install mkdocs-material=="9.5"
```

Install the plugins used by the Practicalli site using Pip (these are also installed in the GitHub Action workflow)

```shell
pip3 install mkdocs-material mkdocs-callouts mkdocs-glightbox mkdocs-git-revision-date-localized-plugin mkdocs-redirects pillow cairosvg
```

> pillow and cairosvg python packages are required for [Social Cards](https://squidfunk.github.io/mkdocs-material/setup/setting-up-social-cards/)

Fork the GitHub repository and clone that fork to your computer,

```shell
git clone https://github.com/<your-github-account>/<repository>.git
```

Run a local server from the root of the cloned project

```shell
make docs
```

The website will open at <http://localhost:8000>

If making smaller changes, then only rebuild the content that changes, speeding up the local development process

```shell
make docs-changed
```

> NOTE: navigation changes may not be correctly reflected without reloading the page in the web browser or carrying out a full `make docs` build

