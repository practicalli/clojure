# Destructuring

Destructuring is a form of pattern matching that is common in Clojure.  Destructuring allow you to pull out the specific elements from a collection.

Destructuring is commonly used with the `let` method for creating local bindings (locally scoped names).

```clojure
(let [[a b c & d :as e] [1 2 3 4 5 6 7]]
  [a b c d e])

(let [[[x1 y1][x2 y2]] [[1 2] [3 4]]]
  [x1 y1 x2 y2])

;; with strings
(let [[a b & c :as str] "asdjhhfdas"]
  [a b c str])

;; with maps
(let [{a :a, b :b, c :c, :as m :or {a 2 b 3}}  {:a 5 :c 6}]
  [a b c m])
```

It is often the case that you will want to bind same-named symbols to the map keys. The :keys directive allows you to avoid the redundancy:

```clojure
(let [{fred :fred ethel :ethel lucy :lucy} m] )
```

This can be written in a shorter form as follows:

```clojure
(let [{:keys [fred ethel lucy]} m] )
```

As of Clojure 1.6, you can also use prefixed map keys in the map destructuring form:

```clojure
(let [m {:x/a 1, :y/b 2}
      {:keys [x/a y/b]} m]
  (+ a b))
```

As shown above, in the case of using prefixed keys, the bound symbol name will be the same as the right-hand side of the prefixed key. You can also use auto-resolved keyword forms in the :keys directive:

```clojure
(let [m {::x 42}
      {:keys [::x]} m]
  x)
```
