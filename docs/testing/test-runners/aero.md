# Aero

[juxt/aero](https://github.com/juxt/aero) is used to read the kaocha configuration, so reader literals such as #env, #merge, #ref, and #include can be used.

Set up [profiles for different stages of the development workflow](https://juxt.pro/blog/aero.html), dev, test, prod, etc.  Each profile has a different configuration making it very easy to switch

```clojure
{:port 8000
 :database #profile {:prod "datomic:dev://localhost:4334/my-prod-db2"
                     :test "datomic:dev://localhost:4334/my-test-db"
                     :default "datomic:dev://localhost:4334/my-db"}
 :known-users [{:name "Alice"} {:name "Betty"}]}
```

Then in application startup function or a component lifecycle library (mount, component, integrant) read in a specific profile

```clojure
(aero.core/read-config "config.edn" {:profile :prod})
```
