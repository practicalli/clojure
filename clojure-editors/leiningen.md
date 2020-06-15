# Leiningen - the build automation tool for Clojure

Leiningen will help you create, build and deploy your Clojure projects.


## Install Leiningen

Install the Leiningen tool using the specific instructions for your Operating System

<!-- Operating System specific instructions -->
{% tabs first="Linux", second="Homebrew", third="GitBash", forth="Chocolatey", fifth="Windows Manual" %}


{% content "first" %}
[Download the lein script](https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein) to your local `bin` directory.  Then make the `lein` script executable and run `lein` to download the full version.

```bash
mkdir ~/bin
curl https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein > ~/bin/lein
chmod u+x ~/bin/lein
lein
```
If the command `lein` is not found, run `source ~/.bashrc` to ensure your `bin` directory is on the path.


{% content "second" %}
If you have [Homebrew](https://brew.sh/) installed, run the following command in a terminal window.

```bash
brew install leiningen
```

## Windows Chocolatey
{% content "third" %}

If you have [Chocolatey](https://chocolatey.org/) installed, add the [Leiningen package](https://chocolatey.org/packages/Lein) by running the following command in a terminal window.

```bash
choco install lein
```

{% content "forth" %}
[GitBash](https://gitforwindows.org/) allows you to use the Linux `lein` script, which may have less issues when installing.

Create a directory called `C:\Users\your-user-name\AppData\Local\Programs\Leiningen`

Download the `lein` file and save it to the above directory

Open `Environment variables for your account` and add the directory to your path

Open a command window and run the command: `lein`

The full version of Leiningen will be downloaded and Leiningen is ready to use.



{% content "fifth" %}
Create a directory called `C:\Users\your-user-name\AppData\Local\Programs\Leiningen`

Download the `lein.bat` file and save it to the above directory

Open `Environment variables for your account` and add the directory to your path

Open a command window and run the command: `lein.bat`

The full version of Leiningen will be downloaded and Leiningen is ready to use.


{% endtabs %}
<!-- End of Operating System specific instructions -->



## Check Leiningen is working

Open a terminal and use the following command

```bash
lein
```

If a list of Leiningen commands is shown then it is working correctly.

![Leiningen help](/images/leiningen-help.png)
