# Designing Data Structures

Some common design guides for data structures in Clojure 

# The Basics design approach 

Most data structures in Clojure seem to be created from either vectors or maps or a combination of both.  Sets are used where uniqueness of values is important and lists are often used for their lazy properties.

**Vectors** are the most flexible data structure in Clojure and support none-sequential access as they are indexed.

**Maps** are really useful for defining semantic meaning to your data structures, helping you create data structures that express the context of the model they represent.  Maps give you unordered, arbitrary index arrangement. Access is iteration of key/value pairs or getting a value for a given key.

**Lists** give you sequential, one-at-a-time arrangement. They allow for efficient iteration, lazy generation, and stack discipline.

**Sets** give you unordered, unique constraint arrangement. Access is iteration of elements or checking containment.
