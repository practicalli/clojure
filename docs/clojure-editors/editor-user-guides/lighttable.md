# Install LightTable

Go to the [Light Table site](http://www.lighttable.com/) and click the  button for your Operating System (MacOSX, Windows, Linux) and save the file.


## Ubuntu & MacOSX
* Extract the compressed file `tar -xzf LightTableLinux64.tar.gz`
* Move the LightTable directory to "/usr/local/bin" `sudo mv LightTable /usr/local/bin`
* Set your path so you can launch LightTable from the command line `export PATH=$PATH:/usr/local/bin/LightTable`
* Launch LightTable `LightTable`

## Windows

* Create a directory called C:\Users\your-user-name\AppData\Local\Programs\LightTable
* Extract the contents of the downloaded file to the above directory
* Open "Environment variables for your account" and add the directory to your path
* Open a command window and run the command: `LightTable.bat`

---

## Testing Light Table

Now we will open and run the sample Clojure apps in Light Table, so start Light Table

In Light Table, click on the menu "File" then choose "Open Folder." Find the
directory, `welcometoclojurebridge`, which was created when you ran
`git clone` command. Click "Upload." In the workspace menu on the
left, click on `welcometoclojurebridge` - `src` -
`welcometoclojurebridge` - `core.clj`. Double-click the `core.clj` file
to open it. This is a Clojure program.

![Testing apps - welcome code](img/testing-welcome-app-code.png)


Click on the file contents and
press the following key combination:

<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Enter</kbd>

You should see a fun welcome message.

![Testing apps - welcome](img/testing-welcomeclojurebridge.png)


Next, in the workspace menu on the left, click on
`welcometoclojurebridge` - `src` - `clojurebridge-turtle` -
`walk.clj`. Double-click the core.clj file to open it.

![Testing apps - walk code](img/testing-turtle-walk-code.png)

press the following key combination:

<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Enter</kbd>

An initial image of the turtles app will pop up.

Type `(forward 40)` at the end of the `walk.clj` and press the
following combination:

<kbd>Ctrl</kbd> + <kbd>Enter</kbd>

You should see this on the Light Table:

![Testing apps - forward](img/testing-turtle-forward.png)

also, your turtle should move.

> Pressing the Control button and Space Bar together (abbreviated `Ctrl+Space`) is how you start giving Light Table a command.


#### Success!

Congratulations! You have opened and run your first Clojure apps, and
your install and setup are all completed!
