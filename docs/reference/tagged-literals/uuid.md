# uuid tag literal
A universally unique identifier (UUID).

    #uuid "8-4-4-4-12" - numbers represent the number of hex digits
    #uuid "97bda55b-6175-4c39-9e04-7c0205c709dc" - actual example

Representing UUIDs with #uuid rather than just a plain string has the following benefits:

    the reader will throw an exception on malformed UUIDs
    its UUID type is preserved and shown when serialized to edn.



## Creating UUIDs - Clojure
In Clojure, call the randomUUID method of the java.util.UUID class

```
(java.util.UUID/randomUUID)
```

This returns a UUID tagged literal.

```clojure
(java.util.UUID/randomUUID)
;; => #uuid "44f3ffd7-6702-4b8a-af25-11bee4b5ec4f"
```

Looking at the type we can see its a Java object from the java.util.UUID class:

```clojure
(type (java.util.UUID/randomUUID))
;; => java.util.UUID
```

## Creating UUIDs - ClojureScript
Randomly generate a UUID in ClojureScript:

`cljs.core/random-uuid`

To label a value as a UUID:

`cljs.core/uuid`


> #### Hint::uuid does not validate the value
> The [ClojureScript documentation](https://github.com/cljs/api/blob/master/docfiles/cljs.core/uuid.md) states that uuid? does not perform validation.

## Testing for a uuid

`uuid?` tests a given value and returns true if it is a uuid tagged literal value.

`tagged-literal?` is the more general function for any tagged values.
