# Matching with regex groups
`rematches` takes a pattern and compares it with a string.

If the pattern does not match the string then `nil` is returned to show the function returned a false value.

```eval-clojure
(re-matches #"pumpkin" "Halloween pumpkin")
 ```

If there is an exact match and there are no groups (parens) in the regex, then the matched string is returned.

```eval-clojure
(re-matches #"pumpkin" "pumpkin")
```

If the pattern matches but there are groups, a vector of matching strings is returned. The first element in the vector is the entire match. The remaining elements are the group matches.

```eval-clojure
(re-matches #"Halloween(.*)" "Halloween pumpkin")
```

<!-- ## Destructure regex result -->

<!-- (let [[_ fn ln] (re-matches #"(\w+)\s(\w+)" full-name)] -->
<!--   (if fn ;; successful match -->
<!--     (println fn ln) -->
<!--     (println "Unparsable name"))) -->
