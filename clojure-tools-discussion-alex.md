Alex Miller
I have been working for a few months now on tools.build and a number of tools.deps clj enhancements that I think will kickstart a new round of activity on clj tooling. It's in pretty good shape at this point and I'm just doing a lot of clean up work. I'll be out on vacation next week but I'm hoping to get it in the hands of a few people week after that. Let me know if you're interested.


one kind of early heads-up is that we're going to deprecate the support for using unqualified lib names  (like cheshire) and eventually require cheshire/cheshire . This was always a bad idea and we should not have cargo culted the support for it in clj. Initially you'll just get warnings but will eventually go away  completely. So you might want to check through any aliases you have for unqualified libs.
16:32
like https://github.com/practicalli/clojure-deps-edn/blob/master/deps.edn#L105 for example
deps.edn:105

  {:extra-deps {nrepl                         {:mvn/version "0.7.0"}

<https://github.com/practicalli/clojure-deps-edn|practicalli/clojure-deps-edn>practicalli/clojure-deps-edn | Added by GitHub
practicalli:speech_bubble:  16:39
Ah yes, this makes sense.  All the new projects I create have qualified names and have encouraged others to do so.  I'll add some depreciation comments in the next monthly review
I will see if I can help some maintainers migrate the lib namespaces (I've done this for work on several occasions).
alexmiller  16:40
I just noticed your inclusion of jcenter at https://github.com/practicalli/clojure-deps-edn/blob/master/deps.edn#L438 too - there is no ordering about which repo is checked first so adding a clojars mirror there as a second repo makes your build less predictable (could be checking and using either first).
deps.edn:438

             "clojars" {:url "https://repo.clojars.org/"}

<https://github.com/practicalli/clojure-deps-edn|practicalli/clojure-deps-edn>practicalli/clojure-deps-edn | Added by GitHub
16:40
You could replace the clojars repo url to swap it out, or Maven does actually support explicit mirror definition in ~/.m2/settings.xml and clj/tools.deps supports this. http://maven.apache.org/guides/mini/guide-mirror-settings.html
16:41
google actually has some mirrors of central that are region-specific and I've seen some people get substantial benefit in asia from using the google asia mirror
practicalli:speech_bubble:  16:50
Interesting, I hadn't considered order and has assumed it was done on order.
I added jcenter as a mirror as I raised a ticket with jfrog and got them to add a clojars mirror, it was the only way I could get access to clojars from inside the bank I worked at.
 I remember a discussion about Google mirrors in the Asia region.  I will  mention them as options.  I will add these points to the repo docs and also add it to the Clojure book.  Thanks.
