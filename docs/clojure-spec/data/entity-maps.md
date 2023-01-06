# Entity maps
An entity map is a Specification for a Clojure hash-map of key-value pairs.

A hash-map is a very effective way to express information in Clojure.  The key should be a descriptive label to express meaning of the value it is associated with.  Without the keys describing the meaning, it is harder for a developer to understand the data.

```eval-clojure
{:account-id 12345 :user-name "jenny1999" :name "Jenny Jetpack" :address "42 Meaning place, Earth" :social-security "ABC-123-45-6789"}
```

A hash-map contains any number of key-value pairs, keys are used for efficient lookup so there is no concern over ordering.  Passing a hash-map as an argument to a function reduces refactoring required as the signature of the function remains the same and functions can be selective as to which key-value pairs they use.

For these reasons, hash-maps are a very common data structure to pass data between functions.

## Defining entity maps
The Clojure Spec `keys` function is used to create a specification for a hash-map of key-value pairs.

`keys` creates a specification from required keys, `:req`, and optional keys `:opt`.

To define the specification for a player in an online game, first the individual specifications that make up the player hash-map are created.
```clojure
(spec/def ::account-id uuid?)
(spec/def ::name string?)
(spec/def ::score int?)
(spec/def ::profile string?)
(spec/def ::games-played #{:vectron :utrazap :avakato})
```

Those specifications are composed together to create a specification for the player

```clojure
(spec/def
  ::player-account
  (spec/keys :req [::account-id ::name ::score]
             :opt [::profile ::games-played]))
```

For a hash-map to meet the `::player-account` specification it must contain the `:req` keys with values that conform to the individual specifications.  The hash-map can also include any key-value pairs that conform to the `:opt` specifications.

If any keys are in the map that do not appear in either `:req` or `:opt` then that hash-map does not conform to the `::player-account` specification.


## Example: covid19-dashboard
The `coronavirus-cases-data` function takes a hash-map of values to make that function easier to extend without breaking existing calls

Default values can be used if no value is passed as an argument. Extra values can be ignored without breaking the code.

```clojure
(defn fun-name
  [csv location date])

(defn coronavirus-cases-data
  "Extract and transform cases data for specific locations and date"
  [{:keys [csv-file locations date]}]
  #_(-> (extract-data-from-csv csv-file)
        (data-set-remove-locations locations)
        (data-set-specific-date date)))

(coronavirus-cases-data
  {:csv-file  "data-sets/uk-coronavirus-cases.csv"
   :locations #{"Nation" "Country" "Region"}
   :date      "2020-04-30"})
```

Define the individual keys for the hash-map

```clojure
(spec/def ::csv-file string?)
(spec/def ::locations set?)
(spec/def ::date string?)
```

```clojure
(spec/def ::cases-data
  (spec/keys :req [::csv-file ::locations ::date]))
```
