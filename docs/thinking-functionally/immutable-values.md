# Immutable values

> **Fixme** work in progress

Values in Clojure include numbers, characters and strings.  When you use functions on these values they do not change, instead a new value is returned.

Lets look at a simple example with a number:

```clojure
(def two-little-ducks 22)

(inc two-little-ducks)
;; => 23

two-little-ducks
;; => 22
```

Another example with a string:

```clojure
(def message "Strings are immutable")

(str message "," " " "you cant change them")
;; => "Strings are immutable, you cant change them"

message
;; => "Strings are immutable"
```

 > **Fixme** Add an exercise

<!--sec data-title="Reveal answer" data-id="answer001" data-collapse=true ces-->
<!--endsec-->
