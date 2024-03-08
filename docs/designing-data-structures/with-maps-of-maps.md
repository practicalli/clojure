# With Maps of Maps

!!! NOTE ""
    Define a collection of star-wars characters using a map of maps.  Each character should have an name that they are typically referred to, along with their fullname and skill


??? EXAMPLE ""
    ```clojure
    (def star-wars-characters
       {:luke   {:fullname "Luke Skywalker" :skill "Targeting Swamp Rats"}
        :vader  {:fullname "Darth Vader"    :skill "Crank phone calls"}
        :jarjar {:fullname "JarJar Binks"   :skill "Upsetting a generation of fans"}})
    ```

Now we can refer to the characters using keywords.  Using the get function we return all the information about Luke

??? EXAMPLE ""
    ```clojure
    (get star-wars-characters :luke)
    ```

    By wrapping the get function around our first, we can get a specific piece of information about Luke

    ```clojure
    (get (get star-wars-characters :luke) :fullname)
    ```

    There is also the get-in function that makes the syntax a little easier to read

    ```clojure
    (get-in star-wars-characters [:luke :fullname])
    (get-in star-wars-characters [:vader :fullname])
    ```

    Or you can get really concise by just talking to the map directly

    ```clojure
    (star-wars-characters :luke)
    (:fullname (:luke star-wars-characters))
    (:skill (:luke star-wars-characters))

    (star-wars-characters :vader)
    (:skill (:vader star-wars-characters))
    (:fullname (:vader star-wars-characters))
    ```

    And finally we can also use the threading macro to minimise our code further

    ```clojure
    (-> star-wars-characters
        :luke)

    (-> star-wars-characters
        :luke
        :fullname)

    (-> star-wars-characters
        :luke
        :skill)
    ```

!!! NOTE ""
    Create a slightly  data structure holding data around several developer events.  Each event should have a website address, event type, number of attendees, call for papers.


!!! EXAMPLE
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

    Call the data structure and see what it evaluates too, it should not be a surprise


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
