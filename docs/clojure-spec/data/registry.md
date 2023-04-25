# Registry for unique and re-usable specifications

So far we have just use predicate functions directly in the code examples.

Using a registry, specs can be uniquely defined across the whole project. Defining a spec gives that spec a name that has a fully qualified namespace

Use the spec specific `def` function to bind a new spec name and fully qualified namespace and place it in the registry

```clojure
(spec/def :playing-card/suit  #{:club :diamond :heart :spade} )
```

```clojure
(spec/conform :playing-card/suit :diamond)
```

```clojure
(spec/def :show-cats/cat-bread #{:abyssinian :birman :chartreau :devon-rex
                        :domestic-short-hair :domestic-long-hair})
```

## Removing specs from the registry

Named specifications can be removed from the registry by binding the name to `nil`.

If specification names are to be refactored, then the original name should be set to `nil` and evaluated, before changing the name.  This will ensure stale specifications are not residing in the REPL.

Here is a named specification as an example

```clojure
(spec/def ::unwanted #{:abandoned})
```

The specification is evaluated in the REPL (above) and currently works.

```clojure
(spec/conform ::unwanted :abandoned)
```

Remove this specification from the registry by binding it to nil

```clojure
(spec/def ::unwanted nil)
```

Now the specification is unavailable

```clojure
(spec/conform ::unwanted :abandoned)
```

!!! HINT "Registry not persistent"
    Restarting the REPL will loose all specification names in the registry as it is not persistent across REPL sessions.
