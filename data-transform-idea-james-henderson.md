A lot of effort is expended creating data structures out of input data. For example, XML data is frequently parsed using zippers, but this can get very cumbersome and involve a lot of local variables for nested XML structures:

    (for [trade (xml-> doc :book :trade)] 
        {:trade-id (xml1-> trade :trade-id text) 
		 :sub-trades (for [sub-trade (xml-> trade :sub-trade)] 
		     {:sub-trade-id (xml1-> sub-trade :id text) 
			  :sub-trade-leg (xml1-> sub-trade :leg text)
			  :risk-measures (for [(xml-> sub-trade ...)] 
			                    ...)})})
								
Similarly, to create a nested data structure from flattened data is a
non-trivial task. This would either involve several queries to the
underlying data storage, one for each layer of nesting, or manually
grouping each layer from the complete, joined query. Even in Datomic,
where data is stored (or, at least, appears to be stored) as a graph
structure, flattened rows are returned. A Datomic equivalent of the
above code could look something like this :-

    (let [db (d/db conn)]
      (for [[trade trade-id] (d/q '[:find ?t ?tid :where [?t :type :trade]] db)]
        {:trade-id trade-id
         :sub-trades (for [[sub-trade sub-trade-id sub-trade-leg]
                           (d/q '{:find [?st ?stid ?leg]
                                  :in [$ ?t]
                                  :where [[?t :sub-trade ?st]
                                          [?st :sub-trade-id ?stid]
                                          [?st :sub-trade-leg ?leg]]}
                                db trade)]
                       {:sub-trade-id sub-trade-id
                        :sub-trade-leg sub-trade-leg})}))
	
We can remove a lot of this boilerplate, by using the existing Clojure
zipping idiom, and thinking of the zipping code as meta-data of the
desired data structure. 

Imagine how you would describe the structure of this data to a fellow
developer. If it were possible to read the code as a description of a
transformation, rather than having to decipher the transformation
algorithm, this code would be a lot more understandable.

The main idea of this change, therefore, is to introduce a new 'map'
construct into zip declarations. This will allow data transformations
such as these to be written declaratively, with the freedom of
implementation left to the underlying data storage.

The previous example would be represented thus :-

    (xml-> doc :book :trade
           {:trade-id ^:1 [:trade-id text]
		    :sub-trades [:sub-trade
			             {:sub-trade-id ^:1 [:id text]
						  :sub-trade-leg ^:1 [:leg text]}]})

In this example, when the zipper reaches a map clause, it would create
a deeper level of nesting in the resulting data structure, with the
keys as provided by the declaration. For example, the zipper would
navigate the ```:book``` and ```:trade``` edges, and then create a
map, with ```:trade-id``` and ```:sub-trades``` keys. The value of
```:trade-id``` in the resulting map would be obtaining by continuing
the original traversal along the ```:trade-id``` edge, and then
converting the contents into text in the same way as the existing zip
implementation. (```^:1``` is a declaration that there is only one
trade id for a given trade, similar to the behaviour of ```xml1->```)

Similarly, for the ```:sub-trades``` key, the zipper continues its
traversal along the ```:sub-trade``` edges. It is possible to add
deeper levels of nesting, as shown here by the two attributes,
```id``` and ```leg```, of a sub-trade.

As a complete example, this transformation would therefore transform
this XML :-

	<books>
		<book>
			<trade>
				<trade-id>1234</trade-id>
				<sub-trade>
					<sub-trade-id>1234A</sub-trade-id>
					<sub-trade-leg>1</sub-trade-leg>
				</sub-trade>
				<sub-trade>
					<sub-trade-id>1234B</sub-trade-id>
					<sub-trade-leg>2</sub-trade-leg>
				</sub-trade>
			</trade>
			<trade>
				<trade-id>88124</trade-id>
				<sub-trade>
					<sub-trade-id>88124A</sub-trade-id>
					<sub-trade-leg>1</sub-trade-leg>
				</sub-trade>
			</trade>
		</book>
		<book>
			<trade>
				<trade-id>EQ-125</trade-id>
				<sub-trade>
					<sub-trade-id>EQ-125_Oct</sub-trade-id>
					<sub-trade-leg>1</sub-trade-leg>
				</sub-trade>
				<sub-trade>
					<sub-trade-id>EQ-125_Dec</sub-trade-id>
					<sub-trade-leg>2</sub-trade-leg>
				</sub-trade>
			</trade>
		</book>
	</books>
	
into the following data structure :-
	
    [{:trade-id "1234"
      :sub-trades [{:sub-trade-id "1234A"
                    :sub-trade-leg "1"}
                   {:sub-trade-id "1234B"
                    :sub-trade-leg "2"}]}
     {:trade-id "88124" :sub-trades [{:sub-trade-id "88124A"
                                      :sub-trade-leg "1"}]}
     {:trade-id "EQ-125"
      :sub-trades [{:sub-trade-id "EQ-125_Oct"
                    :sub-trade-leg "1"}
                   {:sub-trade-id "EQ-125_Dec"
                    :sub-trade-leg "2"}]}]

ready for easy traversal using standard Clojure functions.
