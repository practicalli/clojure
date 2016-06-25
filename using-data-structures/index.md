# Using data structures


## Sequence abstractions

There are functions that work on all the built in datastructures in Clojure.

`first`
`second`
`rest`
`cons`


> **Fixme** This should be an introduction to this topic, with the content below being the different sections of that topic.


# Giving a data structure a name

  We have seen that defining things is as simple as giving a name to a value using the `def` function.

```clojure
(def person "Jane Doe")

;; Names are of course case sensitive, so Person is not the same as person
(def Person "James Doh")
```

Clojure uses dynamic typing, this means its trivial to mix and match different kinds of data.  Here we are defining a name for a vector, which contains numbers, a string and name of another def.

```clojure
(def my-data [1 2 3 "frog" person])

my-data
```

## Data structures are immutable, names are mutable

  You can dynamically re-define a name to points to a different value.

```
(def my-data [1 2 3 4 5 "frog" person])
```

the original value that defined my-data remains unchanged (its immutable), so anything using that value remains unaffected.  Essentially we are re-mapping my-data to a new value.

Lets define a name to point to a list of numbers

```
(def my-list '(1 2 3))
```

We are returned that list of numbers when we evaluate the name

```
my-list
```

We can use the cons function to add a number to our list, however because lists are immutable, rather than changing the original list, a new one is returned.  So if we want to keep on refering to our "changed" list, we need to give it a name

```
(def my-list-updated (cons 4 my-list))
```

As you can see we have not changed the original list

```
my-list
```

;; The new list does have the change though.

```
my-list-updated
```

You could therefore give the impression of mutable state by applying a function to data structure and redefining the original name to point to the resulting data structure.

> **Hint** In practice, the ability to redifine functions and data structures live helps you develop your application quickly in the REPL.  

> In production you typical do not redefine functions or data structures in a live running application.  That could be part of a new release of your application though.

```clojure
(def my-list (cons 5 my-list))
```

So now when we evaluate the original name, we get the updated list

```
my-list
```

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

## Return values not what they should be

  If you run a function over a data structure, you may not always get back the type of value you want.  It easy to wrap a function around to give you the desired value type.

> **Note** Use the `str` function to get a string from person, rather than a set of characters

```clojure
(first person)
(rest person)

(str (first person))

;; How do we return the rest of the string as a string ?
(str (rest person))
(map str (rest person))
(str (map str (rest person)))
(apply str (rest person))
```

You can get the value of this map

```
(def luke {:name "Luke Skywarker" :skill "Targeting Swamp Rats"})
(def darth {:name "Darth Vader"    :skill "Crank phone calls"})
(def jarjar {:name "JarJar Binks"   :skill "Upsetting a generation of fans"})

(get luke :skill)
```

## Set #{}
A Set is a collection that contains a unique set of elements.  As with all the other Clojure collections, a set can contain any valid types in Clojure.

```
(#{:a :b :c} :c)
(#{:a :b :c} :z)
```
You can pull out data from a Vector

```
([1 2 3] 1)

;; ([1 2 3] 1 2)  ;; wrong number of arguments, vectors behaving as a function expect one parameter

;; ((1 2 3) 1) ;; you cant treat lists in the same way, there is another approach - assoc
```

and there are lots of functions that work on data structures

```
(def evil-empire #{"Palpatine" "Darth Vader" "Boba Fett" "Darth Tyranus"})

(contains? evil-empire "Darth Vader")
```


# Scope

All def names are publicly available via their namespace.  As def values are immutable, then keeping things private is of less concern than languages built around Object Oriented design.

Private definitions syntax can be used to limit the access to def names to the namespace they are declared in.

To limit the scope of a def, add the :private true metadata key value pair.

```
(def ^{:private true} some-var :value)

(def ^:private some-var :value)
```

The second form is syntax sugar for the first one.

You could also define a macro for def-

```
(defmacro def- [item value]
  `(def ^{:private true} ~item ~value)
)
```

You would then use this macro as follows:

```
(def- private-definition "This is only accessible in the namespace")
```

# Be Lazy and get more done

Seqs are an interface for logical lists, which can be lazy.  "Lazy" means that a seq can define an infinite series, like so:

```
(range 4)

(range) ; => (0 1 2 3 4 ...) (an infinite series)
```

So we dont blow up our memory, just get the values we want

```
(take 4 (range)) ;  (0 1 2 3)
```

Clojure (and Lisps in general) tend to evaluate at the last possible moment

Use cons to add an item to the beginning of a list or vector

```
(cons 4 [1 2 3]) ; => (4 1 2 3)
(cons 4 '(1 2 3)) ; => (4 1 2 3)
```

Use conj to add an item to the beginning of a list, or the end of a vector

```
(conj [1 2 3] 4) ; => [1 2 3 4]
(conj '(1 2 3) 4) ; => (4 1 2 3)
```

## Changing data structures does not change the original data structure

Lets define a name for a data structure

```
(def name1 [1 2 3 4])
```

when we evaluate that name we get the original data we set

```
name1
```

Now we use a function called conj to adds (conjoin) another number to our data structure

```
(conj name1 5)
```

This returns a new value without changing the original data structre

```
name1
```

We cant change the original data structure, it is immutable.  Once it is set it cant be changed. However, if we give a name to the resultl of changing the original data structure, we can refer to that new data structure

```
(def name2(conj name1 5))
```

Now name2 is the new data structure, but name1 remains unchanged

```
name2
name1
```

So we cannot change the data structure, however we can achieve something that looks like we have changed it.  We can re-assign the original name to the result of changing the original data structure

```
(def name2(conj name1 5))
```

Now name1 and name2 are the same result

```
name2
name1
```

> **Hint** An analogy (thanks to Chris Ford) 

> You have the number 2.  If you add 1 to 2, what value is the number 2?
> The number 2 is still 2 no mater that you add 1 to it, however, you get the value 3 in return


Use concat to add lists or vectors together
```
(concat [1 2] '(3 4)) ; => (1 2 3 4)
```

Use filter, map to interact with collections

```
(map inc [1 2 3]) ; => (2 3 4)
(filter even? [1 2 3]) ; => (2)
```

Use reduce to reduce them

```
(reduce + [1 2 3 4])
; = (+ (+ (+ 1 2) 3) 4)
; => 10
```

Reduce can take an initial-value argument too

```
(reduce conj [] '(3 2 1))
; = (conj (conj (conj [] 3) 2) 1)
; => [3 2 1]
```


# Destructuring

Destructuring is a form of pattern matching that is common in Clojure.  Destructuring allow you to pull out the specific elelments from a collection.

Destructuring is commonly used with the `let` method for creating local bindings (locally scoped names).

```
(let [[a b c & d :as e] [1 2 3 4 5 6 7]]
  [a b c d e])

(let [[[x1 y1][x2 y2]] [[1 2] [3 4]]]
  [x1 y1 x2 y2])

;; with strings
(let [[a b & c :as str] "asdjhhfdas"]
  [a b c str])

;; with maps
(let [{a :a, b :b, c :c, :as m :or {a 2 b 3}}  {:a 5 :c 6}]
  [a b c m])
```

It is often the case that you will want to bind same-named symbols to the map keys. The :keys directive allows you to avoid the redundancy:

```
(let [{fred :fred ethel :ethel lucy :lucy} m] )
```

This can be written in a shorter form as follows:

```
(let [{:keys [fred ethel lucy]} m] )
```

As of Clojure 1.6, you can also use prefixed map keys in the map destructuring form:

```
(let [m {:x/a 1, :y/b 2}
      {:keys [x/a y/b]} m]
  (+ a b))
```

As shown above, in the case of using prefixed keys, the bound symbol name will be the same as the right-hand side of the prefixed key. You can also use auto-resolved keyword forms in the :keys directive:

```
(let [m {::x 42}
      {:keys [::x]} m]
  x)
```
