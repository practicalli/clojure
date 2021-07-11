Hey, figured we were drifting a bit off topic (edited)
12:42
I like your deps.edn. How does it compare to Sean Corfields?
12:42
https://github.com/seancorfield/dot-clojure
seancorfield/dot-clojure
My .clojure/deps.edn file
Stars
324
Last updated
6 days ago
<https://github.com/seancorfield/dot-clojure|seancorfield/dot-clojure>seancorfield/dot-clojure | 15 Mar 2018 | Added by GitHub
12:45
It's an interesting trade-off I think (in general) with the (not entirely) closed form project management tool that is leiningen and the total free form deps.edn style (which isn't really a project management tool). I guess the former is easier to build tools/tutorials for.
12:48
(I'm having a slow day at work today...)
practicalli:speech_bubble:  12:49
There is cross-over between mine and Seans, I've basically added everything I understand and consider relatively mainstream.  I've made some aliases more descriptive that Seans.  I havent included some of the more edge case aliases, such as test on different jvm versions.I update mine config at least once a month with new versions if available, or as soon as I seem them in announcements.
slipset  12:49
Cool.
practicalli:speech_bubble:  12:50
A free form tool is only as free form as you want it to be.  Most of the Leiningen stuff is there by convention, often from Java.  The practicalli deps.edn project could be a useful convention if people choose to adopt it...
slipset  12:52
Yes! I guess I might be overproblematazing  (freely translated from Norwegian), but there is something lisp-cursyish about everyone tailoring their deps.edn to their specific needs/likings. Makes it hard to jump between projects. Conventions are nice in that way.
12:54
Was having a similar conversation with Sean the other day on renaming the  master branch to something else, and my worry is now we'll have some projects with master, some with main, some trunk, Sean favours develop etc.
12:55
But then again, most people work on one project for a longer period of time I guess...
practicalli:speech_bubble:  12:59
Yes, master has no intrinsic meaning in a distributed version control.  I already dropped orgin and upstream for remote aliases, as they  didnt tell me where I was actually pushing too.
I have though a bit about names and did like live or prime, but now you mention develop that seems to be the most appropriate default branch, at that is the starting point of everything.  Then if needed by the team workflow, you can have a live branch that tracks what is in production.  I mean you dont start off with putting something into production, you start with development...I like this idea, although its only just come to me... so will think about this and write blog post.. see if there are any gotcha's to this approach.
New
slipset  13:01
I think I might disagree with you (at least in context of my current work). The app I'm working on now is a saas thingy, so we basically just push master to production all the time. So I guess live or production would be nice names if we were to change (hadn't thought about live, but I like that)
13:02
I guess it's different if you're doing libraries or applications which are distributed and installed and you'd need to keep track of released version (and possibly also bugfix on previous versions)
13:02
As such, at work we develop on feature branches (which are named after the Jira issue or whatever)
practicalli:speech_bubble:  13:13
Using continuous deployment from one branch with specific development done in feature branches then live are live and develop any different to each other?  (and master becomes even less of a relevant name).  There have been so many suggestions to replace master also demonstrates is means very little in the context of software development.Releases can be tracked using Git tags rather than separate branches, so minimising the need for superfluous names.  As with Clojure, I prefer to use a meaningful name or no name at all.If a teams workflow is constrained by having to have separte branch for dev and live (as we had to in a bank as it took a week to get anything deployed) it still seems more appropriate to have live be an child of develop rather than the other way around.  Develop would be the focal point of the repository and live branch just a concequence of the deployment process.
13:14
Very interesting talk, have to get on with some work for the broadcast tomorrow... I am busy learning kaocha test runner (and practicing how to pronounce it too).
