# Examples of using Clojure Spec



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


--------------------------------------------------------

trying to create a spec for data that works for both qualified and unqualified keys. Here is the spec. Am I doing it right, or is there a more idiomatic way to do it

(s/def :contact/id uuid?)
(s/def :contact/first-name string?)
(s/def :contact/last-name string?)
(s/def :contact/email string?)(s/def ::contact-item
  (s/keys
   :req [:contact/id :contact/first-name :contact/last-name :contact/email]))
(s/def ::contact-item-un
  (s/keys
   :req-un [:contact/id :contact/first-name :contact/last-name :contact/email]))(s/def ::contact
  (s/or :qualified ::contact-item
        :unqualified ::contact-item-un))

alexmiller  16:29
Seems ok to me
16:29
I guess I’d wonder if you could transform the data first to have one spec instead
v  17:07
@alexmiller that’s true but then I’d have to call that function everywhere I need to transform.
ikitommi:palm_tree:  18:57
something like this, @deadghost

(require '[spec-tools.core :as st])
(require '[clojure.spec.alpha :as s])(s/def ::my-keyword
  (st/spec
    {:spec simple-keyword?
     :decode/string (fn [_ x] (keyword (str (namespace x) "-" (name x))))}))(st/coerce
  ::my-keyword
  :foo/bar
  st/string-transformer)
; => :foo-bar


I'm interested in transforming the k, not the v. (s/def :my/keyword ...) :my/keyword -> :my-keyword.
deadghost  1 day ago
The frontend can want odd formats or completely different keys sometimes.
deadghost  1 day ago
{:my/keyword "foo"} -> {:my-keyword "foo"}
ikitommi:palm_tree:  1 day ago
Looking at the code, spec-tools doesn't have an easy way to transform s/keys keys, just s/map-of keys. PR welcome, or you could look either https://github.com/wilkerlucio/spec-coerce or other spec coercion libs
wilkerlucio/spec-coerce
Coerce by leveraging your specs
Stars
182
Language
Clojure
<https://github.com/wilkerlucio/spec-coerce|wilkerlucio/spec-coerce>wilkerlucio/spec-coerce | 20 Jul 2017 | Added by GitHub
deadghost  1 day ago
Thanks, I'll see what can be done



alexmiller  19:14
in my experience, fighting the fight for a canonical representation inside your own program is worth the battle




---------------------------------------

How do I write the specs for a function with map destructured arguments, e.g.,:

(defn budget-item-type
  [{:transaction/keys [amount]}]
  (if (ma/positive? amount) :expense :income))
(s/fdef budget-item-type
  :args (s/keys* :req-un [::specs/money])
  :ret #{:expense :income})

Thanks!
alexmiller  03:09
destructuring really doesn't change how your spec something - from the function perspective you're just receiving a map
03:10
In this case here, your args spec is expecting a kwarg style sequence, not a map though. you either want the function to be a varargs (by using &) or to wrap your spec in s/cat.
