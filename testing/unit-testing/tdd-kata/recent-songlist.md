# Test Driven Development Kata - Recent Songlist

> #### TODO::work in progress, sorry

Create a recent song list to hold a unique set of songs that have been played.

The most recently played song is at the start of the list, the least recently played song is the last in the list.

* A recently-used-list is initially empty.
* Songs in the list are unique, so repeatedly played songs should only appear once in the list
* Songs can be looked up by index, which counts from zero.

Optional extras:

* Empty song names are not allowed.
* Add a limit to the number of songs the list contains, with the least recently added items dropped when that limit is reached.


## Add two files to the playground project
Create a new project using clj-new

```shell
clojure -A:new app practicalli/recent-songlist
```

## Using `clojure.test`
We are writing our tests with the `clojure.test` library

Open `test/playground/recent-song-list-test.clj` file in your editor and update the namespace definition to include `clojure.test`


```eval-clojure
(ns practicalli.recent-songlist-test
  (:require [clojure.test :refer [deftest is testing]]
            [playground.recent-song-list :as SUT]))
```


### Run Tests
At any time we can call the `run-tests` function in the REPL to get a report back on all of the tests in our current namespace (`recent-song-list`)

```eval-clojure
(run-tests)
```

The Cognitect Labs test runner is included in the project by default and can be run from the command line in the root directory of the project.

```shell
clojure -A:test:runner
```


## Define a recent song list
> In the source file, `src/playground/recent-song-list.clj`, define a name for your collection of recent songs
>
> You can use an empty collection to start with.  Which collection type will you use though?

<!--sec data-title="Reveal answer..." data-id="answer000" data-collapse=true ces-->

```eval-clojure
(def recent-songs [])
```

<!--endsec-->

> ####Note::Write a test to check a song-list exists
> Write a test to see if a recent song list exists.
>
> This is an opportunity to think about what kind of data structure you want to use to hold your recent song list.

<!--sec data-title="Suggested test..." data-id="answer001" data-collapse=true ces-->

A simple test that checks for a `recent-songs` list, checking

```clojure
(deftest song-list-exists-test
  (testing "Does a recent song list exist"
    (is (vector? recent-songs))))
```

<!--endsec-->

> ####Note::Write a test to check the song-list is empty
> The recent song list should be empty to start with.

<!--sec data-title="Suggested test..." data-id="answer002" data-collapse=true ces-->

A simple test that compares an empty vector with the value of `recent-songs`

```clojure
(deftest song-list-empty-test
  (testing "Is song list empty if we haven't added any songs"
    (is
     (= [] recent-songs))))
```
Here is the same test using the `empty?` function instead of the `=` function.

```clojure
(deftest song-list-empty-test-2
  (testing "Is song list empty if we haven't added any songs"
    (is
     (empty? recent-songs))))
```

> ####Hint::
> You could use either of these tests to replace the song list exists test, as these tests would fail if the song list did not exist.

<!--endsec-->


> #### Note::Write a test to add a song to the list
> Add a song to the collection, for example `Tubular Bells - Mike Oldfield`


<!--sec data-title="Suggested test..." data-id="answer003" data-collapse=true ces-->

```clojure
(deftest adding-songs-test

  (testing "add song returns a song list with entries"
    (is
     (not (empty?
           (add-song "Barry Manilow - Love on the rocks" recent-songs)))))

  (testing "add multiple song returns a song list with entries"
    (is
     (not (empty?
           (->> recent-songs
             (add-song "Barry Manilow - Love on the rocks")
             (add-song "Phil Colins - Sususudio" )))))))

```

<!--endsec-->




<!--sec data-title="Suggested Code Solution..." data-id="answer009" data-collapse=true ces-->

This suggested solution defines our recent songs as an empty vector.

The `add-song` function takes the name of a song and the song list to which it will be added.

A Thread-last macro `->>` is used to pass the song list over two functions.

The `song-list` is first passed to the `remove` expression as its last argument.  This expression will remove any occurrence of the new song we want to add from the `song-list`.

The results of the `remove` expression are then passed to the `cons` expression as its last argument.  The `cons` expression simply adds the new song to the start of the list, making it the most recent song.

```clojure
(def recent-songs [])

(defn add-song [song song-list]
  (->> song-list
       (remove #(= song %))
       (cons song)))
```
<!--endsec-->
