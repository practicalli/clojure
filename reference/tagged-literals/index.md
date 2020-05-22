# Tagged Literals
Frequently used value types are afforded a "tagged literal" syntax. It is similar to a constructor, but this special syntax makes it de/serializable and easier to read at the REPL.

Tagged literals start with a # followed by a symbol and a literal:

`#js [...]`- [JavaScript array literal](https://github.com/cljs/api/blob/master/docfiles/syntax/js-literal.md)

`#js {...}` - [JavaScript object literal](https://github.com/cljs/api/blob/master/docfiles/syntax/js-literal.md)

`#inst "..."` - [JavaScript date literal](https://github.com/cljs/api/blob/master/docfiles/syntax/inst-literal.md)

`#uuid "..."` - [UUID literal](uuid.md)

`#queue [...]` - [queue literal](https://github.com/cljs/api/blob/master/docfiles/syntax/queue-literal.md)
