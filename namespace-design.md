# Namespace Design

> #### TODO::work in progress, sorry


## Namespace size

When is a namespace too big?

I suggest there is no 'size' limit to a namespace, as you can always code fold and have much less code showing.

Namespaces are a way to logically group behaviour (functions) and information (data structures), so as you think about the aspects or components of your codebase then namespaces should evolve fairly naturally.

Start with one namespace and split out into more when it makes sense to logically separate parts of the system.

To help understanding when to refactor, use comments to identify sections of your code.  For example, group functions and vars via concepts such as application state, helper functions, areas of business logic, system, services, etc.

> #### Hint::Caveats
> If your namespace is too big to load into your editor comfortably, then its time to refactor


## Notes from #clojure-uk slack channel

how big is too big for a namespace?
about ~200 lines and I start thinking “hmm, I should break this down”, but should I instead just turn my monitor sideways?

IMO it depends on the problem space you're dealing with. I don't see an issue with a file growing larger than 200 loc if all the code is very relevant to the namespace

IMO: No function should be larger than a screen (horizontal). For a namespace, count the number of publicly available functions and cap it at a aesthetically reasonable number. (edited)

For example: a really large namespace that’s all about page rendering. Group functions based on their conceptual use within that namespace and if a particular part of the page gets complex and thought about as it’s own thing (like a file up-loader or editor), split into it’s own namespace


A small main namespace can generally be a good sign of a well organised project, with clearly understood additional namespaces that are logically separate.

I think there was around 8,000 lines of code.

The largest single code file contained all the configuration/environment variables (using aero to manage multiple regions and hardware environments, prod, qa, uat, dev).


God classes come into being (IMO) for lack of function capabilities
Each and every Util would be better as separate functions

we grew some very large namespaces quite early on - i remember splitting one monster down into 9 separate namespaces at one point. i think there is less of a tendency to large namespaces in yapster now, perhaps because there are so many namespaces already that there is no draw to “keep things simple” by avoiding creating further namespaces

More to the point I’m just reading simple vs easy. A screen-sized function is easy (to read, because you need never to cache its above-fold contents in your memory.) A namespace is simple if it has a single concern.

i think our largest namespaces are unit-test namespaces now, because they are constrained by relation to the code being tested

for me it’s usually ease of comprehension
i think the single-concern thing is right - i need to be able to forget about as much as possible to focus on what’s important, and it’s much easier to forget about simple stuff

lein var-graph useful as a way of visualising if I can/should break up a nampespace

btw, this is the one I'm breaking up atm https://gist.github.com/otfrom/92ac4d4f1c175f017380b6ef2dbb4853
it is looking at this repo: https://github.com/MastodonC/witan.send

https://github.com/gfredericks/clj-usage-graph

I look for things where there are arrows coming in from lots of different namespaces into one thing and I look for things where the arrow comes into a namespace from only one other (a helper function that isn't very local)


single responsibility is usually the key.
I think it’s worth mentioning there are two different styles of slicing functionality/responsibilities.  One is vertically, the other is horizontally.  I think vertically sliced usually belongs to applications; and it means that you want to slice namespaces per feature; not by layer; i.e. I consider it a bit of a smell to have in a web app `mywebapp.handlers`, `mywebapp.models`, `mywebapp.templates`… unfortunately as far as I’ve seen most getting started templates tend to slice apps this way… which I think scales poorly; and results in a mixing of concerns.

In apps I much prefer to see `mywebapp.blog`, `mywebapp.follow`, `mywebapp.product.search` `mywebapp.product.purchase` etc…  Things can then be split horizontally within those; if required.  Splitting this way makes it much easier to write tests; and much easier to verify where you have test coverage and where you don’t… as you should basically have at least 1 test ns per namespace.  If things are split horizontally different features get mixed up and split in weird ways that becomes harder to verify they’re tested etc.

Libraries tend to be for more cross-cutting concerns; they’re by definition usually intended to be reusable.  So I think it’s more natural to split them horizontally… e.g. a library for database access, a library for async stuff, a library for string manipulation.  i.e. you expect a bucket of miscellaneous functions for doing X in a namespace.

I'm trying to make witan.send more vertical and see if there is a library (around monte carlo methods and markov chains and others) that can be factored out
here is what the app used to look like: https://gist.github.com/otfrom/f511916d77851ee2de776445dac3e89c
I'm iteratively refactoring from the entry point (and hitting some of the obvious ones in other parts)
and just doing the really mechanical ones first

I think a feature first templating system would be harder to write though.

Why does vertical work better than horizontal? Doesn't it actually result in a mixing of feature logic with http semantics?

A number of reasons:

1. The app’s layout immediately tells you about *what the app is doing*; rather than how it is doing it… i.e. _the what_ is brought up to the top of the app, rather than being buried and split across leaf namespaces.  This I think has huge benefits for onboarding, and groking a new unfamiliar app.
2. Typically one works on a feature at a time; which means the majority of changes occur together.  I personally find it easier to work on things when all the files are co-located, rather than split across a large tree… though this latter point is perhaps more subjective.
3. Split by feature typically results in less conflicts when multiple developers are adding features…. though cross cutting changes will clearly touch lots of things… yes there are trade offs :slightly_smiling_face:
4. Easier to confirm things are tested/untested.
5. Probably less bespoke rules about where things go, leading to greater consistency.  I think it’s easier to say to people “all feature stuff goes together”, and have your expectations met rather than horizontally dividing things, where people tend to make more wildly different decisions (in my experience).

On the mixing HTTP semantics front… it depends what you mean by semantics.  I think HTTP semantics tend to get removed pretty quickly in the handlers… but yes in rest features tend to map roughly to routes, and the rules about roughly follows the route form… though I think that’s more a coincidence of organising features into tree’s (paths on filesystem and http) rather than being about HTTP semantics.

Within a large feature splitting horizontally; or by input/output operations also works well IMHO.

Obviously you have the problem of where to put shared stuff… I typically like to organise this in a `common` namespace; often at various levels of hierarchy….  The more common stuff is the closer to the root common it moves.  `common` stuff is then also a good candidate for factoring out into libraries.
( got to go do some decorating - bbl) (edited)


The django approach in python is supposed to be vertical slicing, but it tends toward a collection of monoliths, so you end up having to use e.g. flask to do microservices instead

By http semantics, I mean that you put together your counter and ring handler in one area. It's harder to have the layer split perhaps?

Possibly… but it’s not something I’ve seen happening.  I certainly agree that you don’t want response codes etc being mixed with business logic; but people seem to understand that’s the job of the handler/middleware layer - or your “resource” abstraction if you’re using something like liberator/yada/compojure-api etc.

I’m personally not too prescriptive about every feature having a `app.feature.handler` namespace as some trivial features may just be `app.feature`, which contains the handler and the data access etc in a single namespace.  When you do that the functions should be clearly layered, but there’s no point adding extra boilerplate/files etc if it’s not serving a purpose…. basically features & apps should be organised at a level that’s appropriate for their complexity.

At the point you start sprouting more than a handful of http helper functions to handle http things, and/or the same for data access / business logic etc, you should definitely start splitting horizontally but within the initial vertical feature layering.  Sometimes you might want to group features into top level feature categories etc… but these are bridges you should cross as you come to them.
