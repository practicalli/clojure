# Observability
Monitoring, logging, tracing, alerting, etc.



## WIP

 https://juxt.pro/blog/posts/logging.html
 Is it common to pass logger instance as an explicit argument?
 - it looks reasonable but I feel it unnecessarily bloats functions signatures.

I've seen it in some non-Clojure projects but I haven't yet seen any Clojure projects that pass a logger "object" via the argument chain (although perhaps there are Component-based projects where a logger subcomponent is part of the overall "system" being passed in?).

I like the clojure.tools.logging approach: code that wants to log can require that just like any other namespace and then invoke the macros defined in it. The implementation used is controllable externally, via a JVM option, or you can accept the default based on what c.t.l finds on the classpath.

It's common in Java, I think in Clojure people tend to use macros that create a logger behind the scenes based on the namespace. That's also what pedestal.log and Glögi do, although they also allow specifying a specific logger. If you're using goog.log or one of the Java libs directly you'll have to create your own loggers, I've seen Figwheel do that.

How do you deal with logging common "context" (like request-id)? With timbre, we use with-context and wrap the handler invocation with it - something like this:

(log/with-context (add-user-data-to-context user-id {:request-id (generate-request-id)})
        (handler request))

On the java level this is done through something called MDC (mapped diagnostic context). Pedestal-log has a with-context macro as well, it uses this MDC under the hood. Not sure if Timbre does so as well.

not too familiar with the details of MDC, but it's basically a way of setting context like this on a per-thread basis which logging frameworks can then pick up

Aviso.io logging lib has a nice way of using the MDC with clojure.tools.logging: https://cljdoc.org/d/io.aviso/logging/0.3.2/api/io.aviso.logging.mdc

io.aviso/logging: Clojure logging with Logback and SLF4J plus request correlation across servers. Documentation for io.aviso/logging v0.3.2 on cljdoc.

in general i would say you could do context like that with dynamic vars
that feels like what they are for
iff you need to roll something like that yourself

Interesting - I haven't used dynamic vars for anything beyond global config in 3rd party libs. Our request handlers/consumers always pass a context map so the MCD is set based on that

I remember reading about MDC when we first switched to log4j2 and thinking "Hmm, that might come in handy"
The CloseableThreadContext in log4j2 would work very nicely with Clojure's with-open -- something like this:
```clojure
(with-open [ctc (org.apache.logging.log4j.CloseableThreadContext/putAll {"map" "of", "clojure" "data"})]
  (do-stuff-that-logs :things))
```
(as long as you have %X in your log appender pattern)

Yup, MDC is just java working around the lack of binding.
"Context" is also handy when emitting metrics.

It's mildly annoying that MDC is usually Map<String,String> and not Map<String,Object> since the latter would allow for more interesting options when emitting structured logs.

Given that you'd have to stringize the keys in a Clojure map before calling .putAll(), you might as well pr-str (or just str) the value as well...

Yeah, it's the decoding back to, say a number for JSON encoding for transport to a log collector that's irritating.

or use a json encoder for the data you'd put under the value
but that might not be as nice for your json logger API, right

seancorfield
This discussion encouraged me to add a with-log-context macro to our code base today. It takes a context (usually) a hash map, and a body to be executed and stringizes the context (into a CloseableThreadContext). Very useful! Thank you all again for the nudge!

### Parsing log files
Any recommendations on parsing log file data? Looking to write a little utility to stream in logs from a kubernetes cluster and performe Clojuresque voodoo upon the data.

I think the best answer is to use logging that's meant to be machine readable, my company has had good luck with cambium json logging https://cambium-clojure.github.io/

Cambium Home - Structured logging for Clojure
Structured logging (in other words ‘Logs as data’) for Clojure

oh - the logs aren't from clojure originally...
Right. In fact, they're from a variety of sources in a variety of formats, now that I look at them, so I don't know if I'll find something out of the box to cover the spectrum. But maybe something as an example to get started would be helpful.

I guess in theory the spectrum goes from regex to instaparse(?) -- google shows me a few libs but I can't tell you if any are better than others
eg. https://github.com/dmillett/clash
dmillett/clash
Clojure Data Analysis Shell - interactive log analysis with clojure

Thanks, this might do it, especially in conjunction with https://github.com/lambdaisland/regal.
lambdaisland/regal
Royally reified regular expressions
