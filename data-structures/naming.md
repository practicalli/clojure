# Naming data structures

  We have seen that defining things is as simple as giving a name to a value using the `def` function.  It is the same for the Clojure data structures and any other values.

```clojure
(def people ["Jane Doe" "Samuel Peeps"])
```

Names are of course case sensitive, so Person is not the same as person

```clojure
(def Person "James Doh" "Sam Stare")
```

Clojure uses dynamic typing, this means its trivial to mix and match different kinds of data.  Here we are defining a name for a vector, which contains numbers, a string and name of another def.

```clojure
(def my-data [1 2 3 "frog" person])

my-data
```

## Data structures are immutable, names are mutable

  You can dynamically re-define a name to points to a different value.  
  
> **Hint** This re-definition (or rebinding) of names to new values is typically used only during the development of your code, especially in REPL driven development.

```
(def my-data [1 2 3 4 5 "frog" person])
```

The original value that defined my-data remains unchanged (its immutable), so anything using that value remains unaffected.  Essentially we are re-mapping my-data to a new value.

Lets define a name to point to a list of numbers

```
(def my-list '(1 2 3))
```

We are returned that list of numbers when we evaluate the name

```
my-list
```

We can use the cons function to add a number to our list, however because lists are immutable, rather than changing the original list, a new one is returned.  So if we want to keep on refering to our "changed" list, we need to give it a name

```
(def my-list-updated (cons 4 my-list))
```

As you can see we have not changed the original list

```
my-list
```

;; The new list does have the change though.

```
my-list-updated
```

You could therefore give the impression of mutable state by applying a function to data structure and redefining the original name to point to the resulting data structure.

> **Hint** In practice, the ability to redifine functions and data structures live helps you develop your application quickly in the REPL.  

> In production you typical do not redefine functions or data structures in a live running application.  That could be part of a new release of your application though.

```clojure
(def my-list (cons 5 my-list))
```

So now when we evaluate the original name, we get the updated list

```
my-list
```

# Naming Scope

All def names are publicly available via their namespace.  As def values are immutable, then keeping things private is of less concern than languages built around Object Oriented design.

Private definitions syntax can be used to limit the access to def names to the namespace they are declared in.

To limit the scope of a def, add the :private true metadata key value pair.

```
(def ^{:private true} some-var :value)

(def ^:private some-var :value)
```

The second form is syntax sugar for the first one.

You could also define a macro for def-

```
(defmacro def- [item value]
  `(def ^{:private true} ~item ~value)
)
```

You would then use this macro as follows:

```
(def- private-definition "This is only accessible in the namespace")
```
