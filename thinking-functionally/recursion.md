# Recursion

> **Fixme** work in progress

Recursion is used greatly in Clojure to iterate through data and as anything can be treated as data in Clojure you can understand why.

# Recursively calling the same function

Lets iterate though a collection using recursion by writing a function that calls itsefl

```clojure
(defn recursively-use-a-collection [collection]
  (println (first collection))
  (if (empty? collection)
    (print-str "no more values to process")
    (recursively-use-a-collection  (rest collection))))

(recursively-use-a-collection [1 2 3])
```


# Further recursion examples 

Other functions to consider
* every
* accumulating / accumulative
* keep
