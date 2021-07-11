# Reference: Functions

We left off last chapter with a question: what are verbs, anyway? When you evaluate (type :mary-poppins), what really happens?

user=> (type :mary-poppins)
clojure.lang.Keyword
To understand how type works, we’ll need several new ideas. First, we’ll expand on the notion of symbols as references to other values. Then we’ll learn about functions: Clojure’s verbs. Finally, we’ll use the Var system to explore and change the definitions of those functions.

Let bindings
We know that symbols are names for things, and that when evaluated, Clojure replaces those symbols with their corresponding values. +, for instance, is a symbol which points to the verb #<core$_PLUS_ clojure.core$_PLUS_@12992c>.

user=> +
#<core$_PLUS_ clojure.core$_PLUS_@12992c>
When you try to use a symbol which has no defined meaning, Clojure refuses:

user=> cats

CompilerException java.lang.RuntimeException: Unable to resolve symbol: cats in this context, compiling:(NO_SOURCE_PATH:0:0)
But we can define a meaning for a symbol within a specific expression, using let.

user=> (let [cats 5] (str "I have " cats " cats."))
"I have 5 cats."
The let expression first takes a vector of bindings: alternating symbols and values that those symbols are bound to, within the remainder of the expression. “Let the symbol cats be 5, and construct a string composed of "I have ", cats, and " cats".

Let bindings apply only within the let expression itself. They also override any existing definitions for symbols at that point in the program. For instance, we can redefine addition to mean subtraction, for the duration of a let:

user=> (let [+ -] (+ 2 3))
-1
But that definition doesn’t apply outside the let:

user=> (+ 2 3)
5
We can also provide multiple bindings. Since Clojure doesn’t care about spacing, alignment, or newlines, I’ll write this on multiple lines for clarity.

user=> (let [person   "joseph"
             num-cats 186]
         (str person " has " num-cats " cats!"))
"joseph has 186 cats!"
When multiple bindings are given, they are evaluated in order. Later bindings can use previous bindings.

user=> (let [cats 3
             legs (* 4 cats)]
         (str legs " legs all together"))
"12 legs all together"
So fundamentally, let defines the meaning of symbols within an expression. When Clojure evaluates a let, it replaces all occurrences of those symbols in the rest of the let expression with their corresponding values, then evaluates the rest of the expression.

Functions
We saw in chapter one that Clojure evaluates lists by substituting some other value in their place:

user=> (inc 1)
2
inc takes any number, and is replaced by that number plus one. That sounds an awful lot like a let:

user=> (let [x 1] (+ x 1))
2
If we bound x to 5 instead of 1, this expression would evaluate to 6. We can think about inc like a let expression, but without particular values provided for the symbols.

(let [x] (+ x 1))
We can’t actually evaluate this program, because there’s no value for x yet. It could be 1, or 4, or 1453. We say that x is unbound, because it has no binding to a particular value. This is the nature of the function: an expression with unbound symbols.

user=> (fn [x] (+ x 1))
#<user$eval293$fn__294 user$eval293$fn__294@663fc37>
Does the name of that function remind you of anything?

user=> inc
#<core$inc clojure.core$inc@16bc0b3c>
Almost all verbs in Clojure are functions. Functions represent unrealized computation: expressions which are not yet evaluated, or incomplete. This particular function works just like inc: it’s an expression which has a single unbound symbol, x. When we invoke the function with a particular value, the expressions in the function are evaluated with x bound to that value.

user=> (inc 2)
3
user=> ((fn [x] (+ x 1)) 2)
3
We say that x is this functions argument, or parameter. When Clojure evaluates (inc 2), we say that inc is called with 2, or that 2 is passed to inc. The result of that function invocation is the function’s return value. We say that (inc 2) returns 3.

Fundamentally, functions describe the relationship between arguments and return values: given 1, return 2. Given 2, return 3, and so on. Let bindings describe a similar relationship, but with a specific set of values for those arguments. let is evaluated immediately, whereas fn is evaluated later, when bindings are provided.

There’s a shorthand for writing functions, too: #(+ % 1) is equivalent to (fn [x] (+ x 1)). % takes the place of the first argument to the function. You’ll sometime see %1, %2, etc. used for the first argument, second argument, and so on.

user=> (let [burrito #(list "beans" % "cheese")]
         (burrito "carnitas"))
("beans" "carnitas" "cheese")
Since functions exist to defer evaluation, there’s no sense in creating and invoking them in the same expression as we’ve done here. What we want is to give names to our functions, so they can be recombined in different ways.

user=> (let [twice (fn [x] (* 2 x))]
         (+ (twice 1)
            (twice 3)))
8
Compare that expression to an equivalent, expanded form:

user=> (+ (* 2 1)
          (* 2 3))
The name twice is gone, and in its place is the same sort of computation–(* 2 something)–written twice. While we could represent our programs as a single massive expression, it’d be impossible to reason about. Instead, we use functions to compact redundant expressions, by isolating common patterns of computation. Symbols help us re-use those functions (and other values) in more than one place. By giving the symbols meaningful names, we make it easier to reason about the structure of the program as a whole; breaking it up into smaller, understandable parts.

This is core pursuit of software engineering: organizing expressions. Almost every programming language is in search of the right tools to break apart, name, and recombine expressions to solve large problems. In Clojure we’ll see one particular set of tools for composing programs, but the underlying ideas will transfer to many other languages.

Vars
We’ve used let to define a symbol within an expression, but what about the default meanings of +, conj, and type? Are they also let bindings? Is the whole universe one giant let?

Well, not exactly. That’s one way to think about default bindings, but it’s brittle. We’d need to wrap our whole program in a new let expression every time we wanted to change the meaning of a symbol. And moreover, once a let is defined, there’s no way to change it. If we want to redefine symbols for everyone–even code that we didn’t write–we need a new construct: a mutable variable.

user=> (def cats 5)
#'user/cats
user=> (type #'user/cats)
clojure.lang.Var
def defines a type of value we haven’t seen before: a var. Vars, like symbols, are references to other values. When evaluated, a symbol pointing to a var is replaced by the var’s corresponding value:

user=> user/cats
5
def also binds the symbol cats (and its globally qualified equivalent user/cats) to that var.

user=> user/cats
5
user=> cats
5
When we said in chapter one that inc, list, and friends were symbols that pointed to functions, that wasn’t the whole story. The symbol inc points to the var #'inc, which in turn points to the function #<core$inc clojure.core$inc@16bc0b3c>. We can see the intermediate var with resolve:

user=> 'inc
inc ; the symbol
user=> (resolve 'inc)
#'clojure.core/inc ; the var
user=> (eval 'inc)
#<core$inc clojure.core$inc@16bc0b3c> ; the value
Why two layers of indirection? Because unlike the symbol, we can change the meaning of a Var for everyone, globally, at any time.

user=> (def astronauts [])
#'user/astronauts
user=> (count astronauts)
0
user=> (def astronauts ["Sally Ride" "Guy Bluford"])
#'user/astronauts
user=> (count astronauts)
2
Notice that astronauts had two distinct meanings, depending on when we evaluated it. After the first def, astronauts was an empty vector. After the second def, it had one entry.

If this seems dangerous, you’re a smart cookie. Redefining names in this way changes the meaning of expressions everywhere in a program, without warning. Expressions which relied on the value of a Var could suddenly take on new, possibly incorrect, meanings. It’s a powerful tool for experimenting at the REPL, and for updating a running program, but it can have unexpected consequences. Good Clojurists use def to set up a program initially, and only change those definitions with careful thought.

Totally redefining a Var isn’t the only option. There are safer, controlled ways to change the meaning of a Var within a particular part of a program, which we’ll explore later.

Defining functions
Armed with def, we’re ready to create our own named functions in Clojure.

user=> (def half (fn [number] (/ number 2)))
#'user/half
user=> (half 6)
3
Creating a function and binding it to a var is so common that it has its own form: defn, short for def fn.

user=> (defn half [number] (/ number 2))
#'user/half
Functions don’t have to take an argument. We’ve seen functions which take zero arguments, like (+).

user=> (defn half [] 1/2)
#'user/half
user=> (half)
1/2
But if we try to use our earlier form with one argument, Clojure complains that the arity–the number of arguments to the function–is incorrect.

user=> (half 10)

ArityException Wrong number of args (1) passed to: user$half  clojure.lang.AFn.throwArity (AFn.java:437)
To handle multiple arities, functions have an alternate form. Instead of an argument vector and a body, one provides a series of lists, each of which starts with an argument vector, followed by the body.

user=> (defn half
         ([]  1/2)
         ([x] (/ x 2)))
user=> (half)
1/2
user=> (half 10)
5
Multiple arguments work just like you expect. Just specify an argument vector of two, or three, or however many arguments the function takes.

user=> (defn add
         [x y]
         (+ x y))
#'user/add
user=> (add 1 2)
3
Some functions can take any number of arguments. For that, Clojure provides &, which slurps up all remaining arguments as a list:

user=> (defn vargs
         [x y & more-args]
         {:x    x
          :y    y
          :more more-args})
#'user/vargs
user=> (vargs 1)

ArityException Wrong number of args (1) passed to: user$vargs  clojure.lang.AFn.throwArity (AFn.java:437)
user=> (vargs 1 2)
{:x 1, :y 2, :more nil}
user=> (vargs 1 2 3 4 5)
{:x 1, :y 2, :more (3 4 5)}
Note that x and y are mandatory, though there don’t have to be any remaining arguments.

To keep track of what arguments a function takes, why the function exists, and what it does, we usually include a docstring. Docstrings help fill in the missing context around functions, to explain their assumptions, context, and purpose to the world.

(defn launch
  "Launches a spacecraft into the given orbit by initiating a
   controlled on-axis burn. Does not automatically stage, but
   does vector thrust, if the craft supports it."
  [craft target-orbit]
  "OK, we don't know how to control spacecraft yet.")
Docstrings are used to automatically generate documentation for Clojure programs, but you can also access them from the REPL.

user=> (doc launch)
-------------------------
user/launch
([craft target-orbit])
   Launches a spacecraft into the given orbit by initiating a
   controlled on-axis burn. Does not automatically stage, but
   does vector thrust, if the craft supports it.
nil
doc tells us the full name of the function, the arguments it accepts, and its docstring. This information comes from the #'launch var’s metadata, and is saved there by defn. We can inspect metadata directly with the meta function:

(meta #'launch)
{:arglists ([craft target-orbit]), :ns #<Namespace user>, :name launch!, :column 1, :doc "Launches a spacecraft into the given orbit.", :line 1, :file "NO_SOURCE_PATH"}
There’s some other juicy information in there, like the file the function was defined in and which line and column it started at, but that’s not particularly useful since we’re in the REPL, not a file. However, this does hint at a way to answer our motivating question: how does the type function work?

How does type work?
We know that type returns the type of an object:

user=> (type 2)
java.lang.long
And that type, like all functions, is a kind of object with its own unique type:

user=> type
#<core$type clojure.core$type@39bda9b9>
user=> (type type)
clojure.core$type
This tells us that type is a particular instance, at memory address 39bda9b9, of the type clojure.core$type. clojure.core is a namespace which defines the fundamentals of the Clojure language, and $type tells us that it’s named type in that namespace. None of this is particularly helpful, though. Maybe we can find out more about the clojure.core$type by asking what its supertypes are:

user=> (supers (type type))
#{clojure.lang.AFunction clojure.lang.IMeta java.util.concurrent.Callable clojure.lang.Fn clojure.lang.AFn java.util.Comparator java.lang.Object clojure.lang.RestFn clojure.lang.IObj java.lang.Runnable java.io.Serializable clojure.lang.IFn}
This is a set of all the types that include type. We say that type is an instance of clojure.lang.AFunction, or that it implements or extends java.util.concurrent.Callable, and so on. Since it’s a member of clojure.lang.IMeta it has metadata, and since it’s a member of clojure.lang.AFn, it’s a function. Just to double check, let’s confirm that type is indeed a function:

user=> (fn? type)
true
What about its documentation?

user=> (doc type)
-------------------------
clojure.core/type
([x])
  Returns the :type metadata of x, or its Class if none
nil
Ah, that’s helpful. type can take a single argument, which it calls x. If it has :type metadata, that’s what it returns. Otherwise, it returns the class of x. Let’s take a deeper look at type’s metadata for more clues.

user=> (meta #'type)
{:ns #<Namespace clojure.core>, :name type, :arglists ([x]), :column 1, :added "1.0", :static true, :doc "Returns the :type metadata of x, or its Class if none", :line 3109, :file "clojure/core.clj"}
Look at that! This function was first added to Clojure in version 1.0, and is defined in the file clojure/core.clj, on line 3109. We could go dig up the Clojure source code and read its definition there–or we could ask Clojure to do it for us:

user=> (source type)
(defn type 
  "Returns the :type metadata of x, or its Class if none"
  {:added "1.0"
   :static true}
  [x]
  (or (get (meta x) :type) (class x)))
nil
Aha! Here, at last, is how type works. It’s a function which takes a single argument x, and returns either :type from its metadata, or (class x).

We can delve into any function in Clojure using these tools:

user=> (source +)
(defn +
  "Returns the sum of nums. (+) returns 0. Does not auto-promote
  longs, will throw on overflow. See also: +'"
  {:inline (nary-inline 'add 'unchecked_add)
   :inline-arities >1?
   :added "1.2"}
  ([] 0)
  ([x] (cast Number x))
  ([x y] (. clojure.lang.Numbers (add x y)))
  ([x y & more]
     (reduce1 + (+ x y) more)))
nil
Almost every function in a programming language is made up of other, simpler functions. +, for instance, is defined in terms of cast, add, and reduce1. Sometimes functions are defined in terms of themselves. + uses itself twice in this definition; a technique called recursion.

At the bottom, though, are certain fundamental constructs below which you can go no further. Core axioms of the language. Lisp calls these "special forms”. def and let are special forms (well–almost: let is a thin wrapper around let*, which is a special form) in Clojure. These forms are defined by the core implementation of the language, and are not reducible to other Clojure expressions.

user=> (source def)
Source not found
Some Lisps are written entirely in terms of a few special forms, but Clojure is much less pure. Many functions bottom out in Java functions and types, or, for CLJS, in terms of Javascript. Any time you see an expression like (. clojure.lang.Numbers (add x y)), there’s Java code underneath. Below Java lies the JVM, which might be written in C or C++, depending on which one you use. And underneath C and C++ lie more libraries, the operating system, assembler, microcode, registers, and ultimately, electrons flowing through silicon.

A well-designed language isolates you from details you don’t need to worry about, like which logic gates or registers to use, and lets you focus on the task at hand. Good languages also need to allow escape hatches for performance or access to dangerous functionality, as we saw with Vars. You can write entire programs entirely in terms of Clojure, but sometimes, for performance or to use tools from other languages, you’ll rely on Java. The Clojure code is easy to explore with doc and source, but Java can be more opaque–I usually rely on the java source files and online documentation.

Review
We’ve seen how let associates names with values in a particular expression, and how Vars allow for mutable bindings which apply universally. and whose definitions can change over time. We learned that Clojure verbs are functions, which express the general shape of an expression but with certain values unbound. Invoking a function binds those variables to specific values, allowing evaluation of the function to proceed.

Functions decompose programs into simpler pieces, expressed in terms of one another. Short, meaningful names help us understand what those functions (and other values) mean.

Finally, we learned how to introspect Clojure functions with doc and source, and saw the definition of some basic Clojure functions. The Clojure cheatsheet gives a comprehensive list of the core functions in the language, and is a great starting point when you have to solve a problem but don’t know what functions to use.

We’ll see a broad swath of those functions in Chapter 4: Sequences.

