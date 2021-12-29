# Clojure syntax
  Clojure is perceived as having an abundance of `()`, the symbols that represent a list.

  As Clojure is a LISP (List Processing) language then everything is written in the form of a list.  This makes Clojure very powerful and also easier to read.

  Using a list structure also demonstrates the data-centric nature of Clojure.  Every item in the list has a value, with the first item evaluated by a function call.

> #### Hint::Parens everywhere
> The seemingly abundance of `()` can be confusing until its realized there are fewer "special characters" in Clojure than other languages.  Clojure aware editors support matching parens, adding a closed paren when typing an open paren, ensuring it is easy to write correctly formed Clojure.
>
> Syntax differences are a trivial reason to avoid trying Clojure.  Syntax aware editors significantly reduce typing by automatically closing parenthesis and eliminating errors due to missing delimiters (ie. no more errors due to missing ; in C-based languages)


## Prefix notation
  Instead of having a mix of notations like in many other languages, Clojure uses pre-fix notation entirely.

  In Clojure operators are applied uniformly and there is no room for ambiguity:
```clojure
    (+ 1 2 3 5 8 13 21)
    (+ 1 2 (- 4 1) 5 (* 2 4) 13 (/ 42 2))
    (str "Clojure" " uses " "prefix notation")
```
  In Java and other C-based languages you have to explicitly add operators everywhere and there can be a mixture of notations

```java
    (1 + 2 + 3 + 5 + 8 + 13 + 21);
    (1 + 2 + (- 4 1) + 5 + (* 2 4) + 13 + (/ 42 2));
    StringBuffer description = new StringBuffer("C-based languages" + " mix " + "notation");
    x+=1;
    x++;
    x--;
    x+=y;
    x-=y;
    x*=y;
    x/=y;
```

# References
* [Clojure Style Guide](https://github.com/bbatsov/clojure-style-guide)
