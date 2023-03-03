## String replace with regex pattern
`clojure.string/replace` takes a string, a pattern and a substring that will replace matching patterns.
```clojure
(clojure.string/replace "mississippi" #"i.." "obb")
```
<!-- "mobbobbobbi" -->

Groups can be referred to in the substring replacement

```clojure
(clojure.string/replace "mississippi" #"(i)" "$1$1")
```
   <!-- "miissiissiippii" -->

Replace with the value of a function applied to the match:

```clojure
(clojure.string/replace "mississippi" #"(.)i(.)"
     (fn [[_ b a]]
       (str (clojure.string/upper-case b)
            "--"
            (clojure.string/upper-case a))))
   "M--SS--SS--Ppi"
```

`clojure.string/replace-first` is a variation where just the first occurance is replaced.
