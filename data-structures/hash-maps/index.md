# Data Structures: Hash-maps

Associative collection of key value pairs

Useful for defining self-describing structured data (assuming meaningful key names are used)

A map is a key / value pair data structure.  Keys are usually defined using a keyword, although they can be strings or anything else.

Keywords point to themselves, so using them for the keys makes it very easy to get values out of the map, or for updating existing values in the map.

> **Note** Explore creating maps

```clojure
{:key "value"}
{:key :value}
{"key" "value"}
("key" :value)
(:meaining-of-life 42)
{:a 1 :b 2 :c 3}
{:monday 1 :tuesday 2 :wednesday 3 :thursday 4 :friday 5 :saturday 6 :sunday 7}
{1 "Monday" 2 "Tuesday" 3 "Wednesday" 4 "Thursday" 5 "Friday" 6 "Saturday" 7 "Sunday"}
```

> #### Hint::Comma characters are treated as white-space
> The comma character is rarely used in Clojure hash-maps as it is ignored by Clojure.  When coming from other languages, it may be initially comforting to include commas.


## Nested data models

nested maps to create a hierachy or path for data.  This can add more context to the overall design

various types of data


> #### Hint::One data structure to rule them all
> It is preferred to have a single data structure to model the data of a system, which is them used by all the functions of that system.  An example is in the state used for an application, e.g. [Practicalli website practicalli.data namespace](https://github.com/practicalli/practicalli.github.io/blob/live/src/practicalli/data.cljs)
>
> If there is no logical connection between data across a system, then data should be grouped into one structure per namespace as a minimal approach.


## Example use: Data sets

A collection of maps which have the same form, e.g. a vector of hash-maps with the same keys

Example: meteorological recordings

```clojure
(def recording-station-876WA
 [{:timestamp "2021-12-01T12:00" :location {:latitude 24.3453434 :longitude 10.348888} :temperature 12.4 :rainfail 0.1 :uv-level 0.4}
  {:timestamp "2021-12-01T12:10" :location {:latitude 24.3453434 :longitude 10.348888} :temperature 12.6 :rainfail 0.1 :uv-level 0.45}
  {:timestamp "2021-12-01T12:00" :location {:latitude 24.3453434 :longitude 10.348888} :temperature 12.9 :rainfail 0.1 :uv-level 0.5}])
```

Providing a collection of consistent hash-map data structures is very easy to work with in Clojure.

`reduce`, `filter` and `map` functions can easily process this form of data as part of algorithms to interpret the meaning from a data set.

As each recording station creates the same types of data, then they can be merged by including the recording station id in the map
