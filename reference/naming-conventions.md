# Naming Conventions

# Kebab-case

Kebab-case is the naming convention for all Clojure function names than contain more than one word

Examples
```
clj-time
string-parser
display-name
```

# Predicates

Examples of predicate naming conventions from `clojure.core`

```
contains?
empty?
every?
not-empty?
null?
```


# Converting functions

When a function takes values in one format or type and converts them to another

Examples

```
md->html

map->Record-name  ; map factory function of a record -- creates a new record from a map
->Record-name     ; positional factory function of a record -- creates a new record from a list of values
```
