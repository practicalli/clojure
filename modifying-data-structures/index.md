# Modifying data structures

Wait, I thought you said that data structures were immutable!  So how can we change them then?

Yes, lists, vectors, maps and sets are all immutable.  However, you can get a new data structure that has the changes you want. To make this approach efficient, the new data structure contains only the new data and links back to the existing data structure for shared data elements.

We will see some of the most common functions that work with data structures in this secion.  In actuality, everything can be considered a function that works on a data structure though, as that is the language design of clojure.
