# Introducing core.async

> #### TODO::work in progress, sorry
> Pull requests are welcome


The [`core.async`](https://clojure.github.io/core.async/) library provides a way to do concurrent programming using channels (eg. queues).

It minimises the need to use complex concurrent constructs and worry less about thread management.

`core.async` is written in Clojure and can be used with both Clojure and ClojureScript.


> #### Hint:: core.async resources
* [core.async getting started](https://github.com/clojure/core.async/wiki/Getting-Started)
* [Introduction to asyncronous programming](http://www.bradcypert.com/2016/07/15/clojure-async/)
* [ClojureScript core.async and todos](https://rigsomelight.com/drafts/clojurescript-core-async-todos.html) - Bruce Haurman
* [core.async 101](https://medium.com/@loganpowell/cljs-core-async-101-f6522faf536d)
* [Mastering concurrent processes](https://www.braveclojure.com/core-async/)
* [LispCast Clojure core.async: Channels](https://www.youtube.com/watch?v=msv8Fvtd6YQ&t=1s) - first lesson only.
* [core.async introduction in ClojureScrpt unravelled](https://funcool.github.io/clojurescript-unraveled/#csp-with-core-async)
* [core.async: Concurrency without Callbacks - Stuart Halloway](https://www.youtube.com/watch?v=VrmfuuHW_6w)
* [David Nolan - core.async for asynchronous programming](https://www.youtube.com/watch?v=AhxcGGeh5ho)
* [Timothy Baldridge - Core.Async](https://www.youtube.com/watch?v=enwIIGzhahw&t=882s)
* [core.async in Use - Timothy Baldridge](https://www.youtube.com/watch?v=096pIlA3GDo&t=22s)
* [Timothy Baldridge - core.async - pipelines](https://www.youtube.com/watch?v=k6zbfb84yIM) - free video
* [Timothy Baldridge - core.async - garbage collected go blocks](https://www.youtube.com/watch?v=VrwVc-saWLw) - free video

---

>####Hint::Communicating Sequential Processes
Communicating Sequential Processes (CSP) is a formalism for describing concurrent systems pioneered by C. A. R. Hoare in 1978. It is a concurrency model based on message passing and synchronization through channels

## core.async on ClojureScript

core.async is very widely used withing ClojureScript applications and many libraries are built on top of it.

It’s a good example of the syntactic abstractions that can be achieved by transforming code with ClojureScript macros.

JavaScript is single-threaded so you do not get the benefit of safe communication between threads, as there is only one.


# Concepts

![Concepts - channel, put, take](/images/core.async-concepts-put-take.png)


## Channels

A channel is a queue with one or more publishers and one or more consumers.  Producers _put_ data onto the queue, consumers _take_ data from the queue.

As data in Clojure is immutable, channels provide a safe way to communicate between threads.

### Chanel size

Channels do not include a buffer by default,  they use a producer (`put!`) and consumer (`take!`) to transfer a value through the channel.  A maximum of 1024 `put!` functions can be queued onto a single channel.

Specify a channel using `(chan)` or a channel with a fixed buffer using `(chan 12)`.


## Processes

Processes are independently running pieces of code that use channels for communication and coordination.

Calling `put!` and `take!` inside a process will stop that process until the operation completes.

Processes are launched using the go macro and puts and takes use the <! and >! placeholders. The go macro rewrites your code to use callbacks but inside go everything looks like synchronous code, which makes understanding it straightforward:

In ClojureScript, stopping a process doesn’t block the single-threaded JavaScript environment, instead, the process will be resumed at a later time when it is no longer blocked.



# Important functions

## `chan`

The `chan` function creates a new channel.

You can give a name to a channel using the `def` function, eg. `(def my-channel (chan))`

A single channel can take a maximum of 1024 put requests.  Once it has reached the maximum, then it is considered full.

A buffer of a fixed size can be specified when defining a new channel: `(def channel-with-fixed-buffer (chan 12))`.  This buffer increases the number of puts that can be sent to the channel.  A _dropping_ or _sliding_ buffer can be used to discard messages added when the buffer is full.

A channel can also include a transducer, to manipulate the value on the channel
eg. adding a timestamp `(chan 32 (map (Date. now)))`
eg. filtering messages `(chan 12 (map even?))`

Channels can be explicitly closed using `(close channel-name)` or by adding a timeout that closes the channel after the specified number of milliseconds `(timeout 6000)`.


## `put!`

The `put!` function puts a value (message) on the channel.

You can put messages on the channel even if nothing is listening (no waiting `take!` functions).

Evaluating `put!` will always add a message on to the channel as long as the channel is open and not full.


## `take!`

The `take!` function will take a single message from the queue.

If there are no messages on the queue when you evaluate `take!`, then the function will wait to execute as soon as something is put on the channel

The `take!` function needs an argument that is the channel and a function that will receive any message taken from a channel.




## `time`
This is a macro that executes an expression and prints the time it takes

[Criterium](https://github.com/hugoduncan/criterium) is an excellent library for performance testing your code


## `go`

Referred to as a _go block_, the `go` function creates a lightweight process, not bound to threads.  Thousands of go blocks can be created efficiently and they can all have their own channel.





### blocking and non-blocking

core.async offers two ways to write to and read from channels: blocking and non-blocking. A blocking write blocks the thread until the channel has space to be written to (the buffer size of a channel is configurable), a blocking read blocks a thread until a value becomes available on the queue to be read.

More interesting, and the only type supported in ClojureScript, are asynchronous channel reads and writes to channels, which are only allowed in "go blocks". Go blocks are written in a synchronous style, and internally converted to a state machine that executes them asynchronously.

Consider the following core.async-based code:

```clojure
(let [ch (chan)]
  (go (while true
        (let [v (<! ch)]
          (println "Read: " v))))
  (go (>! ch "hi")
      (<! (timeout 5000))
      (>! ch "there")))
```

In this example, let introduces a new local variable ch, which is a new channel. Within the let's scope two go blocks are defined, the first is an eternal loop that reads (<!) a new value from channel ch into variable v. It then prints "Read: " followed by the read value to the standard out. The second go block writes (>!) two values to channel ch: "hi", it then waits 5 seconds and then writes "there" to the channel. Waiting for 5 seconds is implemented by reading from a timeout channel, which is a channel that closes itself (returns nil) after a set timeout. When running this code in the Clojure REPL (for instance), it will return instantly. It will then print "Read: hi", and 5 seconds later it will print "Read: there".

>####Hint::
In JavaScript you cannot do blocking loops like this: the browser will freeze up for 5 seconds. The "magic" of core.async is that internally it converts the body of each go block into a state machine and turns the synchronous-looking channel reads and writes into asynchronous calls.
