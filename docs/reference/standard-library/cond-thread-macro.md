## Clojure cond->

`cond->` and `cond->>` are versatile macros available since version 1.5, although its more of a nieche use, its really useful in that neiche

What is cond->?

Usage: (cond-> expr & clauses)

Takes an expression and a set of test/form pairs.

Threads expr (via ->) through each form for which the corresponding test expression is true.

Note that, unlike cond branching, cond-> threading does not short circuit after the first true test expression.

## Deconstruct

```clojure
(cond-> 10
  false inc)
;; => 10
```

In the above example 10 is the expr mentioned in the docstring and everything after it are the clauses. Each clause is a pair made up of a test and a form. In this example there is a single clause with the value false as the test the function inc as the form. Since the test evaluates to a false value the expression is not threaded into the form. As a result the original expression, 10, is returned.

Let’s look at an example with a truthy test.

```clojure
(cond-> 10
  true (- 2)
;;=> 8
```

Once again, 10 is the starting expression. The single clause has a test that evaluates to true so the expression is threaded into the first position of the form (- 2). The result is 8 and this is returned.

An example of a `cond->` with multiple clauses. Explanations are inline with the code.

```clojure
(cond-> 10 ; start with 10
  ;; test evaluates to true, so apply inc to 10. Current value is now 11.
  true inc

  ;; (zero? 1) evaluates to false, do not perform action. Current value stays 11.
  (zero? 1) (+ 2)

  ;; (pos? 4) evaluates to true, thread 11 into first position of form.
  (pos? 4) (- 5))
;; => 6 ; The result of (- 11 5) is 6.
```

If you understand the above example then you have a good grasp of cond->. But when is this functionality useful?

## When to use cond->?

Looking through the codebases I work on, I almost primarily see cond-> being used with the initial expression being a hash-map. It is being used in situations where we want to selectively assoc, update, or dissoc something from a map.

If cond-> did not exist you would accomplish those selective modifications with code similar to below.

```clojure
(if (some-pred? q)
  (assoc m :a-key :a-value)
  m)
```

Rewrite the above with cond->.

```clojure
(cond-> m
  (some-pred? q) (assoc :a-key :a-value))
```

If you’re not used to seeing cond-> the above transformation might seem like a step backwards. I know it felt that way to me when I first saw cond->. Give yourself time to get familiar with it and you’ll be glad you’re using it.

A meatier example of using cond-> is demonstrated below. Here we’re manipulating data structures designed for use with honeysql to generate SQL statements. We start with a base-query and selectively modify it based on incoming parameters.

```clojure
(defn query [req-params]
  (let [and-clause (fnil conj [:and])
        base-query {:select [:name :job]
                    :from [:person]}]
    (cond-> base-query
      (:job req-params) (update :where and-clause [:= :job (:job req-params)])
      (:name req-params) (update :where and-clause [:= :name (:name req-params)])
      (:min-age req-params) (update :where and-clause [:> :age (:min-age req-params)]))))
```

Hopefully this gives you a taste of cond->. I’ve found it to be quite useful. It has a place in every Clojure developer’s toolbox.
