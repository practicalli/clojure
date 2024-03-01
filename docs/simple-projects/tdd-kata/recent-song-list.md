# TDD Kata Recent Song-list

![Song List banner](https://github.com/practicalli/graphic-design/blob/live/code-challenges/songs-playlist.png?raw=true){loading=lazy}

Create a recent song list to hold a unique set of songs that have been played.

The most recently played song is at the start of the list, the least recently played song is the last in the list.

* A recently-used-list is initially empty.
* Songs in the list are unique, so repeatedly played songs should only appear once in the list
* Songs can be looked up by index, which counts from zero.
* The song list can be transitory (starting from empty each time) or persistent within a REPL session (examples use a transitory approach)

Optional extras:

* Empty song names are not allowed.
* Add a limit to the number of songs the list contains, with the least recently added items dropped when that limit is reached.

## Create Project

Create a new project using clj-new

```shell
clojure -T:project/create practicalli/song-list
```

## Run REPL

Start a Clojure REPL via [a Clojure editor](/clojure/clojure-editors/) or via the command line from the root of the project directory

!!! EXAMPLE "Start rich terminal UI Clojure REPL"
    ```shell 
    clojure -M:repl/rebel
    ```

## Unit Tests

`clojure.test` library is part of Clojure standard library and is the most common way to write unit tests in Clojure

Open `test/playground/song_list_test.clj` file in your editor and update the namespace definition to include `clojure.test`

!!! EXAMPLE "Require clojure.test namespace"
    ```clojure title="test/playground/song_list_test.clj"
    (ns practicalli.song-list-test
      (:require [clojure.test :refer [deftest is testing]]
                [playground.song-list :as song-list]))
    ```

## Run Tests

Evaluate the `practicalli.song-list` and `practicalli.song-list-test` namespaces to load their code into the REPL

Call the `run-tests` function in the REPL to get a report back on all of the tests in our current namespace (`song-list`)

=== "Kaocha test runner"
    [:fontawesome-solid-book-open: Practicall Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) provides the `:test/run` alias to run the Kaocha test runner.

    !!! EXAMPLE "Kaocha test runner"
        Open a command line in the root directory of the project and run the following command.
        ```shell
        clojure -X:test/run
        ```
    Kaocha runs all the tests, stopping should a test fail.

    !!! EXAMPLE "Kaocha test runner with file watch"
        Use the `:test/watch` alias to automatically run tests when ever a file is saved
        ```shell
        clojure -X:test/run
        ```

=== "clojure.test runner"
    Evaluate the project code and evaluate the `run-tests` function from `clojure.test` from within the REPL
    !!! EXAMPLE "clojure.test runner"
        ```clojure
        (run-tests)
        ```

## Test song-list exists

Write a test to see if a recent song list exists.

This is an opportunity to think about what kind of data structure you want to use to hold your recent song list.

> Try write the code first and then check that code with the examples provided (click to expand each code example box)

??? EXAMPLE "Test song-list exists"
    A simple test that checks for a `recent-songs` list
    ```clojure title="src/playground/song_list.clj"
    (deftest song-list-exists-test
      (testing "Does a recent song list exist"
        (is (vector? song-list/recent-songs))))
    ```
    `recent-songs` should be defined in `src/playground/recent-song-list.clj` before running the test, otherwise a compilation error will be returned.


## Define a recent song list

Edit `src/playground/song_list.clj` and define a name for the collection of recent songs

Use an empty collection to start with.  Which collection type will you use though (hash-map `{}`, list `()`, set `#{}`, vector `[]`)?

??? EXAMPLE "recent-songs collection"
    Define a recent-song name for an empty vector
    ```clojure title="src/playground/song_list.clj"
    (def recent-songs [])
    ```
??? HINT "Test First Approach"
    For a strict test first approach, a `recent-songs` name (symbol) would be defined that returns `false` or a falsy value, e.g. `nil`

    A name (symbol) must be defined for use in the test so that the Clojure code can compile


## Test song-list is empty

The recent song list should be empty to start with.

??? EXAMPLE "Check song list is empty"
    A simple test that compares an empty vector with the value of `recent-songs`
    ```clojure title="src/playground/song_list.clj"
    (deftest song-list-empty-test
      (testing "Is song list empty if we haven't added any songs"
        (is
         (= [] song-list/recent-songs))))
    ```

    Here is the same test using the `empty?` function instead of the `=` function.

    ```clojure title="src/playground/song_list.clj"
    (deftest song-list-empty-test
      (testing "Is song list empty if we haven't added any songs"
        (is
         (empty? song-list/recent-songs))))
    ```
    Either of these tests could replace the test that the song list exists, as these tests would fail if the song list did not exist.


## Test adding a song to the list

Add a song to the collection, for example `Tubular Bells - Mike Oldfield`

??? EXAMPLE "Test adding a song to the list"
    ```clojure title="test/playground/song_list_test.clj"
    (deftest add-songs-test

      (testing "add song returns a song list with entries"
        (is
         (not (empty?
               (add-song "Barry Manilow - Love on the rocks" song-list/recent-songs)))))

      (testing "add multiple song returns a song list with entries"
        (is
         (not (empty?
               (->> song-list/recent-songs
                 (add-song "Mike Oldfield - Tubular Bells Part 1")
                 (add-song "Barry Manilow - Love on the rocks")
                 (add-song "Phil Colins - Sususudio" )))))))
    ```

    Other songs are avialbe and Practicalli makes no recommendation as to what songs should be used or listened too.


## Function to add song

Create a function to add a song to the start of the song list.

??? EXAMPLE "Function to add song to list"
    The `add-song` function takes the name of a song and the song list to which it will be added.

    A Thread-last macro `->>` is used to pass the song list over two functions.

    The `song-list` is first passed to the `remove` expression as its last argument.  This expression will remove any occurrence of the new song we want to add from the `song-list`.

    The results of the `remove` expression are then passed to the `cons` expression as its last argument.  The `cons` expression simply adds the new song to the start of the list, making it the most recent song.

    ```clojure title="src/playground/song_list.clj"
    (def recent-songs [])

    (defn add-song [song song-list]
      (cons song song-list))
    ```

    `recent-songs` is passed into the `add-song` function as an argument, `song-list` to keep the design of `add-song` function pure (no side-effects).  This design also provides greater scope to using the `add-song` function, as any song list can be added to, rather than hard-coding `recent-songs` list.


## Test song added to top of list

As the song list shows recently played songs, new songs added should be at the top of the list.

The list should not contain duplicate entries for a song.


??? EXAMPLE "Test songs added to top of list"
    ```clojure title="test/playground/song_list_test.clj"
    (deftest recently-added-song-first-test
    
      (testing "most recent song should be first in the list when empty list"
        (is (=
             (first (add-song "Daft Punk - Get Lucky" recent-songs))
             "Daft Punk - Get Lucky")))
    
      (testing "most recent song should be first in list when adding multiple songs"
        (is (=
             (first
              (->> recent-songs
                   (add-song "Daft Punk - Get Lucky")
                   (add-song "Pharrell Williams - Happy")))
             "Pharrell Williams - Happy")))
    
      (testing "most recent song should be first in list when adding a repeated song"
        (is (=
             (first
              (->> recent-songs
                   (add-song "Pharrell Williams - Happy")
                   (add-song "Daft Punk - Get Lucky")
                   (add-song "Pharrell Williams - Happy")))
             "Pharrell Williams - Happy")))
    
      (testing "most recent song should be first in list when adding a repeated song"
        (is (not=
             (last
              (->> recent-songs
                   (add-song "Pharrell Williams - Happy")
                   (add-song "Daft Punk - Get Lucky")
                   (add-song "Pharrell Williams - Happy")))
             "Pharrell Williams - Happy"))))
    ```


## Add song to start of list

Create a function to add a song to the start of the song list.

??? EXAMPLE "Function to add song to list"
    The `add-song` function takes the name of a song and the song list to which it will be added.

    A Thread-last macro `->>` is used to pass the song list over two functions.

    The `song-list` is first passed to the `remove` expression as its last argument.  This expression will remove any occurrence of the new song we want to add from the `song-list`.

    The results of the `remove` expression are then passed to the `cons` expression as its last argument.  The `cons` expression simply adds the new song to the start of the list, making it the most recent song.

    ```clojure title="src/playground/song_list.clj"
    (def recent-songs [])

    (defn add-song [song song-list]
      (->> song-list
           (remove #(= song %))
           (cons song)))
    ```

    `recent-songs` is passed into the `add-song` function as an argument, `song-list` to keep the design of `add-song` function pure (no side-effects).  This design also provides greater scope to using the `add-song` function, as any song list can be added to, rather than hard-coding `recent-songs` list.

