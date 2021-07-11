## Lazynesss  -  why is it helpful


Slack discussion - https://clojurians.slack.com/archives/C053AK3F9/p1597754662042000

Could someone give me examples of where laziness is helpful in Clojure?

Links, explanations, or anecdotes are all welcome :slightly_smiling_face:. Basically, switching back and forth between lazy/non-lazy operations has so far seemed a bit clumsy to me. I'm constantly asking myself, "Wait, does this function return the data structure (typically a vector) that I actually want in the end, or is it a lazy seq?" I also find myself calling into [] a lot, which seems kind of verbose. It seems clumsier than, say, Haskell, where I don't have to think about laziness much if I don't want to because everything is lazy. That said, I've been impressed enough by other parts of Clojure's design that I'm willing to consider that I just don't "get it" yet.What are practical examples of where I would benefit from lazy evaluation? Being able to manipulate infinite lists and objects bigger than memory is neat and all, but not something I use all that often. (edited)
noisesmith  13:46
laziness simplifies code by turning a series of side effects / a stateful generator, into a value
noisesmith  13:46
because it only calculates as needed, a loop of side effects just to calculate a value can be replaced with a simple traversal






this is easier to reason about, so errors are easier to see and fix
13:47
even compared to generators, it's simpler because the logic around holding / releasing the generator is replaced by something much simpler to think about: creating a piece of data, and letting it go
13:48
counter-indications are cases where the thing you are doing is not a calculation that would produce the same result (or interchangable result) twice - side effects and laziness can increase rather than decrease complexity
13:49
but if all you are doing is avoiding doing expensive CPU work that would give the same answer twice, lazy-seqs can help a lot
13:50
also, a lazy-seq can turn a recursive algorithm that would consume stack, into one that streams results to a consumer on demand without going deeper on the stack
13:52
(the gotcha here is that mixing lazy and imperative collection operations can undo that behavior - it's good to remember which "world" you are in)
13:53
also, the lazy operations can act as algorithmic middleware, I can compose lazy functions to make an algorithm in a modular way
13:58
@Jack Arrington apologies, I put more attention into my attempt at an answer than I did to your question. You know a bunch of this already if you have haskell experience.




because it only calculates as needed, a loop of side effects just to calculate a value can be replaced with a simple traversal

Hm, I am trying to understand what you mean by this. Say I called map or reduce on a list type in an imperative language, or a strictly-evaluating functional one like OCaml. How does that have any more side effects than the lazy, seq-ified version in Clojure?
noisesmith  31 minutes ago
it's about driving the production of results via the consuming code, but yes you are right, standard imperative fp has a lot of that benefit already
noisesmith  30 minutes ago
I'm thinking about concrete examples of things that are easier to do with laziness, beyond the classic fibonacci / ackermann
noisesmith  29 minutes ago
the benefit with those is that you no longer need logic inside the generator to limit the production - that can be a separate and modular aspect of the consumer
noisesmith  25 minutes ago
on the other hand, many clojure features could be seen as attempts to replace lazy-seqs in places where they don't quite fit (eg. core.async where side effects and coordination matter, transducers where throughput / performance matters)lazy-seqs are a good default thing to turn to in a first iteration, and sometimes need to be replaced with something else, they help keep things unentangled in most cases
noisesmith  21 minutes ago
consider this code, between a side effecting source (wrapped by get-data), which provides a lazy stream of input) and a work dispatch system

(-> (get-data)
    (filter actionable?)
    (map assign-worker-id))

what comes out is data describing a series of tasks, which can then be used to drive a strict (side effecting) process (edited)
noisesmith  17 minutes ago
I'm not quite happy with this as an example though - get-data producing a lazy-seq can mean that confirming message receipt to a remote host, or handling host availability, can get tangled into lazy code (probably a bad idea), let's assume that get-data is well designed and provides a nice lazy seq while preventing that complexity from leaking into the rest of the code
