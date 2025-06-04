# Changelog

# Unreleased

## Added
- install: remove -Sdescribe (deprecated), use --version
- cli: add run repl as an explicit section

# 2025-05-16
## Added
- dev: set markdown as repository language with `.gitattributes`
- dev: megalinter runner upgrade make task
- readme: star history for project on github
- mkdocs: CSS for round corners on buttons, etc.
- reference: creative coding overview
- dev: add scheduled stale issue & pull request check
- editors: open source plugins for Intellij IDEA editor

## Changed
- clojure-cli: enhance built-in commands description
- code-challenge: rewrite code challenges overview
- dev: code block consistent style lint rules 46 & 48
- mkdocs: clojure-idiom admonition style
- dev: gitleaks rules configuration for checking secrets in megalinter workflow
- clojure-cli: update donut system and system-repl examples
- reference: code block and admonition for common regular expression examples
- intro: use link for contribute and writing tips in practical.li main website
- dev: use python virtual env for mkdocs tasks in Makefile
- dev: upgrade megalinter to version 8
- dev: set markdown and make as git attributes of repo
- testing: update links to code challenges on overview page

# 2024-03-03

## Added
- button link to Clojure CLI releases changelog to view available versions
- readme: add book overview, update contributing section
- intro: clarify wording & approach in contributing guide
- intro: enhance clojure examples and simplify format for experimenting with code
- dev: checkout action v4 in all GitHub workflow
- clojure-cli: add `clojure -X:deps mvn-pom` built-in command description
- clojure-cli: `clojure -X:deps list` examples
- repl: donut-party/system gameboard example configuration

## Changed
- mkdocs: emoji extension name update for Material 9.4
- project: update built.tools approach and configuration examples
- install: refine section wording and format
- dev: changelog-check checkout action v4 with sparse-checkout
- dev: changelog-check remove paths-ignore
- clojure-cli: install deps.edn configuration
- clojure-cli: `clojure -X:deps tree` examples
- clojure-cli: `clojure -X:deps pom`
- install: debian packages approach for OpenJDK rather than a specific Ubuntu tab
- install: recommended OpenJDK versions of 17 and 21 as hint
- editor: refactor Clojure LSP page and format for Material for MkDocs
- editor: update Clojure LSP page and included Practicalli Clojure LSP Config via external url
- dev: update codeowners to practicalli-johnny
- dev: use funding from practicalli org
- dev: validate new & changed files in megalinter to speed up checks
- dev: signed commit checkbox in pull request template
- dev: skip readme change and sparse checkout for changelog check workflow
- dev: checkout v4 & python v5 actions in publish-book workflow
- dev: sparse checkout scheduled version workflow
- dev: upload-artefact v4 & remove explicit token from megalinter
- format: use shell for code blocks, add missing clojure language to code blocks
- dev: megalinter local runner - validate all files
- dev: spell lychee config file for megalinter config set as warnings
- dev: extend lychee exclusion rules and base url
- dev: allow `a` and `img` html elements in markdown linter
- editor: update link to build emacs from source code
- clojure-cli: update rebel help screenshots


# 2023-08-14

## Added

- mkdocs: 404 & announcement override
- automation: overview of automation tools
- automation: make page
- dev: add `lint-fix` MegaLiner task
- ci: monthly version check with antq
- ci: cron docs & examples in scheduled version check
- challenge: salary slip generator kata with basic example

## Changed

- projects: link to example random clojure function project
- project: build script with tools.build updates
- install: example of linux-install script version number
- ci: update name of sponsorship file
- readme: update links for mkdocs instructions
- install: linux-install scripts include version number
- install: linux install script for latest stable
- challenges: recent song list kata refactor
- clojure-cli: remove less common aliases
- alternative: deprecate reveal page
- clojure-cli: add arguments in execution options
- clojure-cli: defining aliases rewrite
- intro: update logic examples in 15 mins clojure
- ci: megalinter documentation flavor v6.22.2
- inspect: update link to Portal Editor section in clj-docs
- inspect: reorder flow of portal page
- inspect: portal alias update and enhanced docs
- inspector: Yaml support for Portal for Clojure/jvm only
- inspector: portal page updates
- intro: icon search in writing tips
- clojure-cli: enhance repl startup description and examples
- readme: update github status links for book
- testing: hint to ensure code evaluates before running tests
- testing: update Practicalli Clojure CLI Config links
- testing: rewrite kaocha test runner page
- testing: rewrite test runner introduction
- challenge: add salary slip generator to kata index
- simple-projects: update create project code
- simple-projects: update create project rna transcription
- simple-projects: update create project clacks messages
- simple-projects: update create project in ceaser cypher
- simple-projects: update create project in most common word
- challenge: update tripple lock kata
- challenge: update mutants assemble kata
- challenge: update recent-song list kata
- clojure-cli: update create project from template page
- link: update Practicalli Clojure CLI config
- intro: repl workflow updates - links and images
- intro: improve about book description
- intro: key bindings for book navigation
- clojure-cli: remove find-deps from repl startup
- alias: :dev/environment corrections
- format: updated from local MegaLinter run
- inspector: update portal configuration
- dev: add test to .PHONY
- dev: mega-linter-runner no install & remove container
- ci: update workflows to practicalli common configuration
- content: update `:dev/env` and `:test/env aliases
- projects: deps-new and practicalli project-templates
- clojure-cli: practicalli REPL Reloaded hotload & updates
- content: remove redundant Leiningen content
- ci: markdown lint configuration - minimise false positives
- mkdocs: update practicalli logo
- mkdocs: order features alphabetically
- intro: embed local and external files in code blocks
- challenge: update tdd-kata song list example
- ci: specify paths triggering book publish
- ci: megalinter action version 7
- ci: simplify megalinter config and workflow
- mkdocs: updated practicalli logo
- dev: makefile variables for megalinter_runner & mkdocs_server
- projects: use :project/build alias
- projects: refactor package section
- challenges: add nucleotide count exercism
- challenges: update rna transcription exercism
- challenges: format exercism overview page
- challenges: repl workflow in exercism overview page
- challenges: approach to solving challenges
- install: update overview and related project links
- clojure-cli: clearer wording on user config scope
- intro: update sponsorship description
- clojure-cli: repl startup requires clojure.core
- clojure-cli: improve terminal repl description
- clojure-cli-config: link to project templates directory
- challenges: update exercism section and and REPL workflow
- ci: spell lychee & repository trufflehog linters warn only (false positives)
- install: unattended aternative local location for Clojure CLI
- clojure-cli: rewrite Clojure REPL section
- automation: rewrite automation overview
- intro: rewrite introduction on front page
- intro: more examples in 15 mins page
- intro: rewrite and simplify book introduction
- install: GitHub release location for Clojure CLI linux install script
- install: linux script is also used to update to latest version
- install: update Practicalli Clojure CLI Config GitHub URLs


# 2023-03-10

## Added
- started a changelog
## Changed
- [#90](https://github.com/practicalli/clojurescript/issues/90) convert ClojureScript book to MkDocs
- Update figwheel logo name
- Update ClojureScript REPL workflow image
