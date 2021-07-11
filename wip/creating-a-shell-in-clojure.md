# Creating a shell in Clojure
https://clojurians.slack.com/archives/C053AK3F9/p1594067924170800


wanted to run a simple shell command using clojure. I am using the clojure.java.shell's sh function.
When I run something like (sh "ls") this prints out what I expect in the REPL. However, when I run (sh "lsof" "-nti:" (str port)) it doesn't print anything out. I can hit enter again and I get back the REPL prompt.
Does anybody know why this is?
1 reply
1 day agoView thread
noisesmith  21:41
what does it return? you can get the last return value with *1
alexmiller  21:41
should that be (sh "lsof" (str "nti:" port)) ?
noisesmith  21:42
shell/sh should collect all stdout/stderr from the process as data
kaneko  21:43
That might be it, I'll try that @alexmiller
kaneko  21:53
That works. (I had to add the hyphen before the "nti" part)
I think the main problem was that I ran an (sh ...) that started a server and that was hogging(?) all the *stdout* stuff.
When I killed my server process, both the server's output and the "lsof" output were printed out in the REPL. (edited)
noisesmith  21:59
I think the previous call was simply blocking your repl, sh doesn't run in the background
21:59
it shouldn't be using  *stdout* at all, it's redirected to a string
kaneko  22:01
If it was blocking my repl, I shouldn't be able to run another command right? Or does a repl command get dispatched to a new thread? (edited)
noisesmith  22:01
if it's blocking your repl, the repl doesn't read again until it returns
22:01
you can still type in, and that will get echod back
22:02
you just won't cause any evaluation
kaneko  22:02
Ah, okay. I'll just run a test to double check!
22:03
Yeah! I am able to type things in but nothing gets evaluated!
noisesmith  22:03
also, the ProcessBuilder and Process classes that sh is built on are not especially hard to use, and offer a lot of flexibility
kaneko  22:04
Would they be the right way to start some long running process? I guess since process is in the name... :stuck_out_tongue:
alexmiller  22:04
sh is not built on those
kaneko  22:04
Thank you, I will take a look at those!
alexmiller  22:05
it's built on the older and much less good Runtime stuff
noisesmith  22:05
oh, my mistake
alexmiller  22:06
I've been using ProcessBuilder via interop lately and they are much better :)
noisesmith  22:06
yes - was actually amazed by how easy Process / ProcessBuilder were to use, easier than the most popular wrapper on them even
alexmiller  22:07

(defn exec
  [command-args]
  (let [proc-builder (doto (ProcessBuilder. ^List command-args)
                       (.redirectOutput ProcessBuilder$Redirect/INHERIT)
                       (.redirectError ProcessBuilder$Redirect/INHERIT))
        proc (.start proc-builder)]
    (.waitFor proc)))

22:07
is a pretty good start for a lot of stuff (but doesn't handle swiping a "result" from the process, really just for forking out
ghadi  22:08
In Java 9+, Process gives you a completion callback too. Very useful (edited)
noisesmith  22:09
in a terminal this runs an editor, then you get your repl back after it exits

(-> ["vim"]
    (ProcessBuilder.)
    (.inheritIO)
    (.start)
    (.waitFor))



1 day agoView thread
noisesmith  22:11
if you remove the waitFor call, every other character you type goes to the repl or the editor on my machine
