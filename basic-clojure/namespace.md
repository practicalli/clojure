# Namespace

  A namespace in Clojure is used to manage the logical seperation of code, usually along features of the application, service or library you are developing.  A namespace contains data structures and functions, limiting their scope to that function.
  
  Unless otherwise defined, any function can call any other function in the namespace by just the function name.  The same is true for any naed data structures, they can be called from anywhere in the namespace with just their name.

> **Hint** Remember that Clojure is evaluated from top to bottom, so if you are calling a named function or data structure, it must have had its definition evaluated first.

## Including another namespace 

  `require` or `:require` is used to enable access to the functions & named datastructures in another namespace than the current one.  
  
```clojure 
(ns my-namespace.core 
  :require [clojure.java.io])
  
(defn read-the-file [filename]
  (line-seq (clojure.java.io/reader filename)))

(read-the-file "project.clj")
```

  The `reader` funciton can be accessed, however, we still need to include the fully qualified namespace path, `clojure.java.io`.
  
  If the namespace has a long name, you can provide an alias (please use names that keep the code readable)

```clojure 
(ns my-namespace.core 
  :require [clojure.java.io :as java-io])
  
(defn read-the-file [filename]
  (line-seq (java-io/reader filename)))  

(read-the-file "project.clj")
```

Or if you are going to use the function multiple times in the current namespace, you could also include that function directly using `:refer`, no longer requiring any kind of namespace qualifier

```clojure 
(ns my-namespace.core 
  :require [clojure.java.io :refer [reader]])
  
(defn read-the-file [filename]
  (line-seq (reader filename)))  

(read-the-file "project.clj")
```

## Adding multiple namespaces 

If you are going to add multiple namespaces, you can do so with just one `:require` statement

Here is an example namespace expression with multiple require statements from the [duct](https://github.com/weavejester/duct) web framework template 

```clojure 
(ns duct-test.main
  (:require [clojure.java.io :as io]
            [com.stuartsierra.component :as component]
            [duct.middleware.errors :refer [wrap-hide-errors]]
            [meta-merge.core :refer [meta-merge]]
            [duct-test.config :as config]
            [duct-test.system :refer [new-system]]))
```

> **Hint** You may see `use` or `:use` as an alternative approach.  While this will work, it also includes everything from the other namespace into your current one.  This is seen as a bad practice, especially when writing libraries, as you can end up including a great many unused functions into the namespace.

> As Clojure is typically composed of many libraries, its prudent to only include the specific things you need from another namespace.  This also helps reduce conflicts when including multiple libraries in your project.

> You can use the `:exclude` keyword with `:use` to avoid including specific functions from the required namespace.
  

## External libraries 

  To use a library that is not part of your project you also need to include it as a dependency.  You can do this using the `:dependencis` section of the  Leiningen project file.

```clojure
(defproject duct-test "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [org.clojure/clojurescript "1.7.122"]
                 [com.stuartsierra/component "0.3.0"]
                 [compojure "1.4.0"]
                 [duct "0.4.4"]
                 [environ "1.0.1"]])
```
