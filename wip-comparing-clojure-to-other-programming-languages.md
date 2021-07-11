# Comparing Clojure To Other Programming Languages

Clojure syntax is very small compared to most programming languages.  Being small helps keep the syntax simple and quick to learn.

## Functions instead of operators

Operators such as `+ - / *` are part of the additional syntax of many programming languages.  Using operators requires understanding of operator precedence (e.g. [JavaScript operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence))

Clojure does not have operators. Functions are defined in `clojure.core`  which take variable numbers of arguments


Instead of having to write 1+2+3+4 in most languages, Clojure uses a function call `(+ 1 2 3 4 5)`


As there are no operators, there are no operator precedence rules to learn or search for.  Precedence is managed by parens, `()`, just as any other Clojure code.
