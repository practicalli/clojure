# A Vector of Maps

Vectors are good for holding any information whether that be simple values or other collections.

Maps are good for defining data with semantic meaning, using the keys to express the context of the values.

!!! NOTE ""
    Define a simple data structure for a collection of stocks in a portfolio.  This would contain a collection of stock information, with each stock holding the ticker name, last trading monetary value and opening monetary value.

??? EXAMPLE ""
    This is a vector of maps, as there will be one or more company stocks to track.  Each map represents the stock information for a company.

    ```clojure
    (def portfolio [ { :ticker "CRM"  :lastTrade 233.12 :open 230.66}
                     { :ticker "AAPL" :lastTrade 203.25 :open 204.50}
                     { :ticker "MSFT" :lastTrade 29.12  :open 29.08 }
                     { :ticker "ORCL" :lastTrade 21.90  :open 21.83 }])
    ```

    We can get the value of the whole data structure by referring to it by name

    ```clojure
    portfolio
    ```

    As the data structure is a vector (ie. array like) then we can ask for a specific element by its position in the array using the `nth` function

    Lets get the map that is the first element (again as a vector has array-like properties, the first element is referenced by zero)

    ```clojure
    (nth portfolio 0)
    ```

    The vector has 4 elements, so we can access the last element by referencing the vector using 3

    ```clojure
    (nth portfolio 3)
    ```

    As portfolio is a collection, also known as a sequence, then we can use a number of functions that provide common ways of getting data from a data structure

    ```clojure
    (first portfolio)
    (rest portfolio)
    (last portfolio)
    ```

    We can get specific information about the share in our portfolio, or as the keys in each map are defined with Clojure keywords, we can also use the keywords to return the specific values they pair with.

    ```clojure
    (get (second portfolio) :ticker)
    ;; => "AAPL"

    (:ticker (first portfolio))
    ;; => "CRM"
    ```

    If we want to get specific share information across the whole portfolio, then we can simply `map` the `:ticker` keyword over each share in portfolio

    ```clojure
    (map :ticker portfolio)
    ;; => ("CRM" "AAPL" "MSFT" "ORCL")

    (mapv :ticker portfolio)
    ;; => ["CRM" "AAPL" "MSFT" "ORCL"]
    ```
