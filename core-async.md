# Core.async


## Discussion from the clojurians clojure-uk slack channel

recommendation / intro tutorial

https://github.com/clojure/core.async/blob/master/examples/walkthrough.clj


EuroClojure talk about clojure otp library that built on top of core.async because they felt it was too low level




At the REPL
- if you don’t create channels with non-zero sized buffers, or don’t perform operations in separate threads or go-blocks, then you can end up blocked quite easily


In production be sure to catch exceptions, or at least be logging them. It can be too easy to loose errors (and the processes that threw them)

if you make a note of the nrepl port when you start a repl, you can always connect a second repl to the same process to recover from accidental blocking



## core.async and transducers

core.async + transducers



## Manifold - alternative to core.async

another approach is to use `manifold`

it’s use of deferred values makes it harder to block the REPL - but obviously the buffering still has to happen somewhere!

`manifold` for general async stuff more than `core.async`



use core.async as a way of chaining together bits of data processing. manifold would be good for that too


 put multiple calls to an external API on a channel and have them “do their thing” in their own time in the background.  This __seems__ to be a good use for core.async…  Is Manifold is as good / better?


If processing streams of data then `core.async` is fine (as are manifold `Stream`s)
If calls are better suited to promises then consider manifold `Deferred`
If you are wanting streams of promises then manifold is a more complete solution (because the manifold `stream` and `deferred` work easily together


API calls are generally more promise-like than stream-like (unless your result is an SSE stream or websocket etc)


there are `promise-chan`s in core.async too though


Manifold could be used to collect a number of remote resources together in a `let`
which isn't very stream like

manifold has two distinct core abstractions - the `deferred`, which is a promise with callbacks and additional machinery, and the `stream` which is a umm stream of values, and supports buffering, backpressure etc


First call to the API I will get a total back as part of the result and as there is no paging functionality “built in” on the API in question I will need to take the total and figure out how many more calls I need to make to get the “rest” of the data.  I was going to do this by throwing the calls onto a channel using core.async… I am sensing that their promise-y nature would, you feel, be better suited to Manifold Deferred..?
a stream or a channel works quite well for that sort of query
in my data access lib we actually use a promise of a stream for that sort of access
which is an improvement over just a plain stream because it allows easy mixing with other calls which return promises of a value

I was intending to stack up API operations in a channel as a queue so that a) I don’t block execution and b) so that I don’t have to use an __actual__ queue (SQS / rabbitMQ etc)
I am starting to think I may not have understood the implications of what I want to do… :disappointed:


i'm not sure - are you just trying to get a stream of records from a paginated api ?


what are you trying to not block the execution of?


The API is not paginated, I need to figure out how many pages there are and stack up the calls.

can you pass an offset or something ?


What I am looking for is a way to stack work up asynchronously in the background so that my call(s) to the external API don’t lock up the whole app / program for minutes at a time.

yes, but there is no “next” call - the offset and page-size are arbitrary params every call, there is no way to ask for “page 2 of my last query to the API”

a channel of results in core.async is perfectly reasonable, as is a manifold stream of deferred responses


so:

1. Make call for first page
2. Process first page (hopefully async)
3. Use total to work out how many more ops I need to make
4. Fill up channel with calls
5. Consume channel “elsewhere”.

is my thesis - does that make sense..?


what is the main thread in this context?
the app that “runs” which in turn is a hybrid API / webapp

core.async itself uses a threadpool, so you might not need to funnel them all down one channel
unless you wanted to limit the number of concurrent api calls
I would like to do as much concurrently as possible, but it’s not a deal-breaker, serial is fine as long as the work can be “kicked off” and left going.
order of results being processed is not important, so concurrency (particularly if it makes the whole thing faster) would be great.

I need to make one call to find out how many results match the request, the vendor / curator of the AI in question is not prepared to produce a simplified response to figure out the size of results sets, so I am stuck with that.

I am assuming that I need to “def” the channel(s) and then have a form that is in an evaluated namespace that is “waiting” for the channel(s) to have something on them..?

a common idiom is to return channels/streams/promises as the result of a query fn

OK, but how would I consume them without tying up the main thread?

many options
- put the consuming code inside a core.async `go` block
- create a new channel with a transducer and pipe your first channel to that
- have your api fn take the channel you want responses put on and pass in a channel with a transducer


similarly in manifold,
- chain a step onto a deferred https://github.com/ztellman/manifold/blob/master/docs/deferred.md#composing-with-deferreds
- map a fn over a stream https://github.com/ztellman/manifold/blob/master/docs/stream.md#stream-operators


need some code in an evaluated namespace that was effectively “listening” for there to be “things” on the channel, just a form at the end of my namespace containing a go block that was consuming a named channel onto which my API function would place “things”

most web or UI frameworks will already have an event loop to do that i’d have expected?

order of ops:

1. Make first query to API
2. Process result, including calculation of how many more ops required
3. Load up a channel with the other calls



It’s an app that will periodically (every hour / day not sure yet) make calls to an API, stash the returned data in a database and an ElasticSearch cluster, and then do it all again the next time.


might want to add [4] concatenate results from each of the page queries into a single record stream

but what will consume the eventual record stream ?


This makes the API into a smaller, custom dataset that can be interrogated via Kibana


I am not saying I don’t want to add “[4] concatenate results from each of the page queries into a single record stream”, but I can’t think of why I would do that, and that is probably me being ignorant of the benfits etc.  Please could you explain to me why I would add this step - I really am asking, not being a prick, I promise :slightly_smiling_face:


do you want to expose your downstream consumers to an additional level of structure (pages) which is an implementation feature of the upstream API  ?

No

I want to take each of the 100 / 1000 / 10000 results and store them as individual documents in ES and as JSONB fields in Postgres


The API I am “harvesting” has a 90 day sliding window, so over time the queries I make will have different results.  I don’t want to keep track of the last article I harvested, nor do I want to have to “find” it in the results to then get all the newer ones.  It’s easier to just “eat” the whole response every time and reply on ES refusing to re-import a document with an existing id (into the same index) and on postgres’s ability to enforce a “unique” index on the id field.

but I can’t “get” all of the results in one query, the API limits “pages” to 1000 results, so I need to be able to stack up calls and execute them in an async, non-blocking manner.

yep, so you can concatenate the pages into a single record-stream, and process each of the records individually

OK, I like the sound of this in principle, and I __think__ I am sort of doing that already with the synchronous, manual approach, as I get 100 articles back and then I do a doseq over the vector of maps to do INSERT queries into postgres and PUT calls to ES


What do you mean by a “record-stream”?

by "record stream" i mean a conceptual sequence of individual records... could be on a core.async `chan` or a manifold `stream`

the benefit is just simplicity - a sequence of individual records is a simpler thing than a sequence of pages of individual records... but there are tradeoffs - sometimes you want to deal with pages of records


Oh I see!  Right, yeah, I was just going to consume the channel of returned promises with the doseq I already have, so concatenating them together into one HUGE vector first seemed like a redundant step.
i.e. one of the queries I am going to do returns (currently) a little over 13,000 records - I was expecting to grab the results of 14 promises off the channel and “doseq” each one until the channel was empty

I suppose I could consume them off the channel into one big vector, or indeed another channel and then have another consumer running what currently runs inside the doseq on each map / JSON blob that comes out of the channel…  Is that what you mean?

so:

channel of promises
consumer turns vector of maps into another channel of individual maps
consumer2 puts maps into DB and ES off second channel


i meant another channel, yes


possibly even:

consumer2 puts maps into DB and onto another channel
consumer3 puts maps on third channel into ES

(as an aside @maleghast , doing any long-running or blocking processing in a vanilla core.async `go` block isn't a good idea - there is a fixed-size core.async threadpool which you can exhaust, causing blocking - so you can use https://clojure.github.io/core.async/index.html#clojure.core.async/thread )


So if I use thread inside a go block, or instead of a go block..?

here is an example

```(async/go
  (let [v (async/<! (async/thread (do-blocking-stuff)))]
    (do-non-blocking-stuff v))
```

something like that


## Long running processes

also, beware long-running processes in core.async that expand items with eg. `mapcat` operations. You can break back pressure that way. (ie. pages on a channel being expanded into multiple events)

ooo i haven't come across that problem  what happens ?


requires a very specific use case to be a problem, but it’s caught a few people out: https://stackoverflow.com/questions/37953401/where-is-the-memory-leak-when-mapcat-breaks-backpressure-in-core-async

Where is the memory leak when mapcat breaks backpressure in core.async?
I wrote some core.async code in Clojure and when I ran it it consumed all available memory and failed with an error. It appears that using mapcat in a core.async pipeline breaks back pressure. (Whi...


you’re not likely to hit it unless you are using a lot of transforms on your channels, and then its easily worked around, but it can work fine in test, and then blow up in prod with more data/longer running processing
