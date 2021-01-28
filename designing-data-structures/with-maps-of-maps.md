# With Maps of Maps

> **Note** Define a collection of starwars characters using a map of maps.  Each character should have an name that they are typically referred to, along with their fullname and skill

<!--sec data-title="Reveal answer" data-id="answer001" data-collapse=true ces-->

```clojure
(def starwars-characters
   {:luke   {:fullname "Luke Skywarker" :skill "Targeting Swamp Rats"}
    :vader  {:fullname "Darth Vader"    :skill "Crank phone calls"}
    :jarjar {:fullname "JarJar Binks"   :skill "Upsetting a generation of fans"}})
```

Now we can refer to the characters using keywords.  Using the get function we return all the informatoin about Luke

```clojure
(get starwars-characters :luke)
```

By wrapping the get function around our first, we can get a specific piece of information about Luke

```clojure
(get (get starwars-characters :luke) :fullname)
```

There is also the get-in function that makes the syntax a little easier to read

```clojure
(get-in starwars-characters [:luke :fullname])
(get-in starwars-characters [:vader :fullname])
```

Or you can get really Clojurey by just talking to the map directly

```clojure
(starwars-characters :luke)
(:fullname (:luke starwars-characters))
(:skill (:luke starwars-characters))

(starwars-characters :vader)
(:skill (:vader starwars-characters))
(:fullname (:vader starwars-characters))
```

And finally we can also use the threading macro to minimise our code further

```clojure
(-> starwars-characters
    :luke)

(-> starwars-characters
    :luke
    :fullname)

(-> starwars-characters
    :luke
    :skill)
```
<!--endsec-->

> *Note** Create a slightly  data structure holding data around several developer events.  Each event should have a website address, event type, number of attendees, call for papers.

<!--sec data-title="Reveal answer" data-id="answer002" data-collapse=true ces-->

```clojure
(def dev-event-details
  {:devoxxuk     {:URL                 "http://jaxlondon.co.uk"
                  :event-type          "Conference"
                  :number-of-attendees 700
                  :call-for-papers     "open"}
   :hackthetower {:URL                 "http://hackthetower.co.uk"
                  :event-type          "hackday"
                  :number-of-attendees 99
                  :call-for-papers     "closed"}})
```

This data structure is just a map, with each key being the unique name of the developer event.

The details of each event (the value to go with the event name key) is itself a map as there are several pieces of data associated with each event name.
So we have a map where each value is itself a map.

Call the data structre and see what it evaluates too, it should not be a surprise

```clojure
dev-event-details
```

We can ask for the value of a specific key, and just that value is returned

```clojure
(dev-event-details :devoxxuk)
```

In our example, the value returned from the :devoxxuk key is also a map, so we can ask for a specific part of that map value by again using its key

```clojure
(:URL (dev-event-details :devoxxuk))
```

<!--endsec-->
