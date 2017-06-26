# Sequence abstractions

There are functions that work on all the built in datastructures in Clojure.

`first`
`second`
`rest`
`cons`

## Practising with lists

> **Note** Create a simple collection of developer events.  First use a list of strings, then try a map with keywords.  For each data structure, pull out some of the event details

```clojure
(def developer-events-strings '("Devoxx UK" "Devoxx France" "Devoxx" "Hack the Tower"))

(def developer-events-strings2 (list "Devoxx UK" "Devoxx France" "Devoxx" "Hack the Tower"))

developer-events-strings

(first developer-events-strings)

(def developer-events-vector
  [:devoxxuk :devoxxfr :devoxx :hackthetower] )
```

Using a Clojure Vector data structure seems a little more Clojurey, especially when the vector contains keywords.  Think of a Vector as an Array, although in Clojure it is again immutable in the same way a list is.

> **Note** Create a slightly more involved data structure, holding more data around each developer events.  Suggest using a map, with each key being the unique name of the developer event.
The details of each event (the value to go with the event name key) is itself a map as there are several pieces of data associated with each event name.

```clojure
(def dev-event-details
  {:devoxxuk     {:URL "http://jaxlondon.co.uk"
                  :event-type "Conference"
                  :number-of-attendees 700
                  :call-for-papers true}
   :hackthetower {:URL "http://hackthetower.co.uk"
                  :event-type "hackday"
                  :number-of-attendees 60
                  :call-for-papers false}})
```

Lets call the data structre and see what it evaluates too, it should not be a surprise
```
dev-event-details
```

We can ask for the value of a specific key, and just that value is returned

```
(dev-event-details :devoxxuk)
```

In our example, the value returned from the :devoxxuk key is also a map, so we can ask for a specific part of that map value by again using its key

```
(:URL (dev-event-details :devoxxuk))
```

> **Note** Lets define a simple data structure for stocks data using a vector of maps, as there will be one or more company stocks to track.  Each map represents the stock information for a company.  Get the value of the whole data structure by refering to it by name, ask for a specific element by its position in the array using the `nth` function.  Then try some of the common functions that work on collections.

```clojure
(def portfolio [ { :ticker "CRM" :lastTrade 233.12 :open 230.66}
                 { :ticker "AAPL" :lastTrade 203.25 :open 204.50}
                 { :ticker "MSFT" :lastTrade 29.12  :open 29.08 }
                 { :ticker "ORCL" :lastTrade 21.90  :open 21.83 }])

portfolio

(nth portfolio 0)

(nth portfolio 3)

(first portfolio)
(rest portfolio)
(last portfolio)
```

  First and next are termed as sequence functions in Clojure, unlike other lisps, you can use first and next on other data structures too

