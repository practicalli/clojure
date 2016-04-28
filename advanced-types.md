# Advanced types 


> **Hint** Clojure has support for Java PrimitiveClojure has support for high-performance with Java primitive types in local contexts. All Java primitive types are supported: int, float, long, double, boolean, char, short, and byte.  In the extremely rare occasions where this is needed, it is added via metadata and therefore only adds to the existing code without rewriting it.

Rather than write this Java:

```java
static public float asum(float[] xs){
  float ret = 0;
  for(int i = 0; i < xs.length; i++)
    ret += xs[i];
  return ret;
}
```
you can write this Clojure:

```clojure
(defn asum [^floats xs]
  (areduce xs i ret (float 0)
    (+ ret (aget xs i))))
```
and the resulting code is exactly the same speed (when run with java -server).


### Some optimization tips for types

  All arguments are passed to Clojure fns as objects, so there's no point to putting non-array primitive type hints on fn args. Instead, use the let technique shown to place args in primitive locals if they need to participate in primitive arithmetic in the body.
   (let [foo (int bar)] ...) is the correct way to get a primitive local. Do not use ^Integer etc.
 
 Don't rush to unchecked math unless you want truncating operations. HotSpot does a good job at optimizing the overflow check, which will yield an exception instead of silent truncation. On a typical example, that has about a 5% difference in speed - well worth it. Also, people reading your code don't know if you are using unchecked for truncation or performance - best to reserve it for the former and comment if the latter.
 
 There's usually no point in trying to optimize an outer loop, in fact it can hurt you as you'll be representing things as primitives which just have to be re-boxed in order to become args to the inner call. The only exception is reflection warnings - you must get rid of them in any code that gets called frequently.
 
 Almost every time someone presents something they are trying to optimize with hints, the faster version has far fewer hints than the original. If a hint doesn't improve things in the end - take it out.
 
 Many people seem to presume only the unchecked- ops do primitive arithmetic - not so. When the args are primitive locals, regular + and * etc do primitive math with an overflow check - fast and safe.

  So, the simplest route to fast math is to leave the operators alone and just make sure the source literals and locals are primitive. Arithmetic on primitives yields primitives. If you've got a loop (which you probably do if you need to optimize) make sure the loop locals are primitives first - then if you accidentally are producing a boxed intermediate result you'll get an error on recur. Don't solve that error by coercing your intermediate result, instead, figure out what argument or local is not primitive.

