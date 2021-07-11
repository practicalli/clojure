## Parsing data with `clojure.data.xml`

is there a way to get clojure.data.xml/parse to ignore leading indentation/whitespace when the input is pretty-printed? I don't have control over the input, not all input is indented, and I get it as a byte[] from a queue initially so I was trying to avoid processing as text to trim prior to parsing if there's some way to get it done by the parser.
4 replies
chucklehead  1 day ago
Alternatively, I guess I'd like to filter all elements of the form "\n        " in the :content of all tags in the parsed map. (various numbers of spaces and arbitrary levels of tag nesting) (edited)
alexmiller  23 hours ago
There are some parser options you can set on parse - I think of you set :coalescing to true maybe that does what you want?
chucklehead  12 hours ago
thanks, I tried :coalescing true but didn't seem to make a difference. currently using clojure.walk/postwalk to remove indentation strings from the parsed content, but not sure if there's a more idiomatic/performant way to go about it.
chucklehead  12 hours ago
current approach looks roughly like

```
(comment

  (->> (io/input-stream (rand-from-corpus))
              (xml/parse)
              (clojure.walk/postwalk #(cond (and (string? %) (re-matches #"^\n\s*$" %)) nil ; remove indentation
                                            (seq? %) (keep identity %) ; remove the nils created by removing indentation
                                            :else %))
              (xml/emit-str)))
```
