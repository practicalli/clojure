# Spacemacs Install

This quick install guide will show you how to:

* [Install Emacs version 25 or greater](https://practicalli.github.io/spacemacs/before-you-start/install-emacs.html)
* [Install Spacemacs](https://practicalli.github.io/spacemacs/install-spacemacs/)
* [Configure an enhanced Clojure experience](https://practicalli.github.io/spacemacs/install-spacemacs/enhance-clojure-experience.html)


## Install Emacs

Spacemacs is a configuration for Emacs version 25 or greater.

<!-- Emacs Install Operating System specific instructions -->
{% tabs linux="Debian/Ubuntu", mac="MacOSX", chocolatey="Chocolatey", windows="Windows" %}

<!-- Debian/Ubuntu Emacs Install -->
{% content "linux" %}

Open a terminal and run the following command (you will be prompted for your login password to complete the install)

```bash
sudo apt-get install emacs25
```

> #### Hint:: Emacs 25 not available?
> If Emacs 25 is not available, add the [Ubuntu Emacs Lisp team personal package archive](https://launchpad.net/~ubuntu-elisp/+archive/ubuntu/ppa)
```bash
sudo add-apt-repository ppa:ubuntu-elisp/ppa
sudo apt-get update
sudo apt-get install emacs25
```
If you want the bleeding edge of Emacs, use the command `sudo apt-get install emacs-snapshot`


<!-- MacOSX -->
{% content "mac" %}

[Download the latest Emacs version](https://emacsformacosx.com/)

Open the `.dmg` file when downloaded and follow the install instructions.

[![Emacs for MacOSX website](/images/emacs-install-macosx-website.png)](https://emacsformacosx.com/)


> #### Hint:: Alternatively, use Homebrew
> Use Homebrew to install software on MacOSX
```bash
brew tap d12frosted/emacs-plus
brew install emacs-plus
brew linkapps emacs-plus
```


<!-- Choclatey (Windows) install -->
{% content "chocolatey" %}

[Chocolatey](https://chocolatey.org/) is a package manager for Windows (similar to Homebrew for MacOSX)

Install [Emacs](https://chocolatey.org/packages/Emacs) using the following commands in a command window

```bash
choco install emacs
```
Open a command window and run the command: `runemacs.exe`


<!-- Windows -->
{% content "windows" %}

Create a directory called `C:\Users\your-user-name\AppData\Local\Programs\emacs`

[Download Emacs for Windows (64bit)](http://mirror.koddos.net/gnu/emacs/windows/emacs-26/emacs-26-x86_64-deps.zip)

Unzip the downloaded file to the above directory.

Open `Environment variables for your account` and add the directory to your path

Open a command window and run the command: `runemacs.exe`

{% endtabs %}
<!-- End Of Emacs Install Operating System specific instructions -->



## Install Spacemacs

Use Git to clone the Spacemacs repository, then change to the `.emacs.d` directory and change to the `develop` branch.

```bash
git clone https://github.com/syl20bnr/spacemacs ~/.emacs.d
cd ~/.emacs.d/
git checkout develop
```

Run Emacs as usual and answer the following questions when prompted

| Prompt;                 | Answer   |
|-------------------------|----------|
| Evil or Holy mode       | Evil     |
| Standard or Lightweight | Standard |
| Helm or Ivy             | Helm     |

Spacemacs will now download all its Emacs packages and this will take 5 to 10 minutes based on your Internet speed.

Once all the packages have downloaded, we recommend you restart Spacemacs, `SPC q r`.

## Configure Spacemacs for Clojure

Follow the instructions in the [enhancing the Clojure experience in Spacemacs](https://practicalli.github.io/spacemacs/install-spacemacs/enhance-clojure-experience.html) page.
