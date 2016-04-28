# Show me the docs

  Clojure functions are documented by adding a string to the function definition.  This **doc string** can then be viewed by the function `doc`.
  
> **Note** View the documentation for three common functions used in clojure

```clojure
(doc doc)

(doc apply)

(doc cons)
```

  Here is the doc string for `doc`

![Documentation for the function doc](../images/clojure-playground-doc-doc.png)

## Writing your own documentation 

```clojure
(defn my-function 
  "I must practice writing clear and meaningful documentation for my functions"
  [arguments]
  (str "I should wrie better functions too"))
```
![Documentation for the my-function function](../images/clojure-playground-doc-my-function.png)

## And the is source code too 

  You can also see the source code of Clojure functions, using the function called `source` 
  
  ```clojure
  (source map)
  
  (source doc)
  
  (source source)
  ```

![Source code for the function source](../images/clojure-playground-source-source.png)
  
 > **Hint** As the documentaiton for a function is part of its definition, by looking at the source of a function you also get the documentation.
 
 > Any Clojure aware development tool should also show you at least the syntax of using the function as you type it.
