# Clojure syntax - brackets everywhere

  Clojure is percieved as having an abundance of `()`, the symbols that represent a list.  
  
  As Clojure is a LISP (List Processing) language then everything is written in the form of a list.  This makes Clojure very powerful and also easier to read.

  Using a list structure also demonstrates the data-centric nature of Clojure.  Every item in the list has a value, with the first item evaluated by a function call.

> **Comment** The seemingly abundance of `()` does put some people off until they realise there are fewer "special characters" in Clojure than in other C-based langauges (Java, C#, C, etc).  A good editor will also match brackets for you as you type, making it easy to write Clojure.

> Syntax differences seems a very trivial reason to avoid learning Clojure.  Any Clojure or Lisp aware editor will significantly reduce your typing by automatically closing brakets, eliminating errors due to missing delimiters (ie. no more errors due to missing ; in C-based languages)


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
    StringBuffer mystring = new StringBuffer("C-based languages" + " mix " + "notation");
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
