# LightTable

  LightTable is a simple development tool that supports Clojure, ClojureScript, JavaScript and Python languages.  The tool is open source and written in Clojure & ClojureScript (with a little JavaScript & CSS)

![](/images/lighttable-screens.png)

# Install Lighttable

Download [lighttable.com](http://lighttable.com) and follow the suggested instructions:

**MacOSX**
  Install the `lighttable.dmg` file just as any other MacOSX package

**Linux**
  Extract the contents of the downloaded lighttable file to a suitable directory (`/usr/local` or `~/apps`).  Add `LightTable` to the system `$PATH`, or add the following script to the sytem `$PATH`.

<script src="https://gist.github.com/jr0cket/40988a6d6502883bbcf999ae545cbd0d.js"></script>

**Windows**
  Download the windows zip file for LightTable and extract the installer, following the instructions inside the installer.

## LightTable configuration

  Lighttable configuration is in the file `user.behaviours`.  Open the user behaviours file, `Ctrl-space` and type `user behaviors`.  When you save the file, `Ctrl-s`, changes are applied immediately.

**Sample User Behaviours file**

Here is a sample of user behaviours file for LightTable

<script src="https://gist.github.com/jr0cket/80344ffed2562fc50102c2dade0b48a8.js"></script>


## Using LightTable 

  LightTable has an online tutorial entitled [Getting started with LightTable](http://docs.lighttable.com/tutorials/full/)

  I create a project first with Leiningen, open the project directory in the LightTable workspace and open any files I want to work with.  I then connect the open editor window for the file by pressing `Ctrl-Enter` at the end of an expression.

> **Hint** my approach is documented in the [quick demo section of my Clojure & LightTable slides](http://jr0cket.co.uk/slides/jax-london-2013-light-table.html#/sec-12) from JAXLondon 2013.
