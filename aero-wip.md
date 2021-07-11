# Aero - simplifying configuration

https://clojurians.slack.com/archives/C03S1KBA2/p1598481682261500

I have a config.edn file (env variables) in the root of my project (the root is not on the classpath because it’s not specified).  As a result, the following won’t work:

(io/resource "config.edn") ; => nil

But this would work

(io/as-url (File. "config.edn")) ;=> #object[java.net.URL 0x6e4e60f5...]

If one  wanted to continue using resource over the File. solution, I would have to add the root "." to the classpath.  Is there a downside to adding the root to the classpath?  or would the preference be to opt for io/resource and just move config.edn to the resources dir? (edited)
phronmophobic  00:04
it depends. typically, config belongs outside of the program/jar so that it can be specified at runtime. what kind of config is this? (edited)
athomasoriginal  00:10
My config.edn would be configuring all aspects of the app itself e.g. secret keys, ports, database URI etc.  The secrets themselves would live outside the config.edn  and the config.edn pulls them in.  (i’m using Aero) (edited)
phronmophobic  00:42
i'm not sure familiar with Aero, but if config.edn is just a template for loading config values (ie. it will be the same for everyone), then putting it on the resource path seems fine. otherwise, I would load it at runtime based on some user provided path
pmonks  00:52
@athomasoriginal I too use aero, and what I’ve tended to do is have a “default” config.edn in a resources sub-folder (which is part of the classpath), but then allow an alternative config.edn file to be specified on the command line.  The default is only used if nothing is provided on the command line, and generally contains aero instructions to just read from environment variables.
00:54
Here’s an example:

    Default config.edn, showing delegation to env vars: https://github.com/pmonks/futbot/blob/main/resources/config.edn
    config.edn for my production environment: https://github.com/pmonks/futbot/blob/main/heroku-config.edn (note mix of env vars and “hardcoded” values)
    Code that reads command line and determines which config.edn to read: https://github.com/pmonks/futbot/blob/main/src/futbot/main.clj and https://github.com/pmonks/futbot/blob/main/src/futbot/config.clj#L50-L53 (note that I also use mount for state management, so it’s where the config.edn gets managed at runtime).

(edited)
00:56
Not saying it’s the “best” or even the “right” way to do this mind you, but it’s worked well enough for me in a variety of apps over the last 5 years or so.
athomasoriginal  01:02
@pmonks thank you for sharing your process!@phronmophobic No worries, Aero is just a detail we can ignore that for now.The general question is: is there a downside to adding the root of ones project to the classpath?  I have everything working, but i’m just curious at this point :thinking_face:The driver of the question:  io/resource would need the root of the project that in order to find a file at the root.
pmonks  01:03
@athomasoriginal my only thought would be whether having two roots that overlap (. and ./src) might cause issues. I don’t think I’ve ever dug into what the Java classloader(s) do in that case, let alone the Clojure classloader(s).
01:04
It’s certainly not done much in Java (or, I suspect, Clojure), so I would be a bit hesitant to do it, albeit without any specific objections to cite…
athomasoriginal  01:05
Good point and yeah it’s not something I’ve see either.
