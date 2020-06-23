## Matching sub-strings
`re-find` returns the first match within the string, using return values similar to re-matches.

`nil` is returned when the pattern does not find a match.

```eval-clojure
(re-find #"pump" "Halloween")
```
<!-- nil -->

A matching pattern without groups returns the matched string
```eval-clojure
(re-find #"e+" "Halloween")
```
<!-- "ee" -->

Match with groups returns a vector of results
```eval-clojure
(re-find #"s+(.*)(s+)" "success")
```
  <!-- ["success" "ucces" "s"] -->
