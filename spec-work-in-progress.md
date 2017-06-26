I am having trouble writing a spec that has the following constraints:

```{:id 123
 :foo [{:id 456 :parent-id 123}
       {:id 789 :parent-id 123}]}
```
See that `:id` and `:parent-id` are required to have the same value. (edited)

Aha, a simple predicate `s/and`ed with `s/keys` would do nicely :duck:
```(s/and (s/keys :req-un [::id ::foo])
       (fn [{:keys [id foo]}]
         (every? #{id} (map :parent-id foo))))```



# Conform

## verbose use of s/conform

conform.clj

```clojure
(s/def ::button-template (s/cat :text string? :link (s/spec ::mb/link)))
(s/def ::button-attachment (s/keys :req [::action/text ::mb/link]))

(s/def ::button-ish (s/or ::button-template ::button-template
                          ::button-attachment ::button-attachment))

(defmulti ->button-attachment (fn [b]
                                {:pre [(s/valid? ::button-ish b)]}
                                (first (s/conform ::button-ish b))))
(defmethod ->button-attachment ::button-attachment [b] b)
(defmethod ->button-attachment ::button-template [[text link]]
  {::action/text text ::mb/link link})

(->button-attachment {::action/text "hi" ::mb/link [:link]})
(->button-attachment ["hi" [:link]])
(->button-attachment "hi")
```

