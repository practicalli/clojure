# Split the bill

> #### TODO::work in progress, sorry

You are at a restaurant with a group of friends and relatives, having a reunion dinner after a year of not seeing each other.

Once the meal comes to an end, its time to pay the bill.  So how would you write code to split the bill?

Start with the simplest possible approach, with everyone paying the same.

## Create a new Clojure project
Use [Clojure CLI tools and clj-new](/clojure-tools/install/install-clojure.html#clojure-cli-tools-common-aliases) to create a new Clojure project.

```shell
clojure -A:new app practicalli/split-the-bill
```


```eval-clojure
(str "Create code to calculate the bill, including what each person should pay")
```

Tke a look at the [Who am I](/community-docs/docs/curriculum/who-am-i) section for ideas on how to model the bill.  Also look at [More Than Average](/community-docs/docs/curriculum/more-than-average) for ideas on how to write code to work out how to pay the bill.


### Paying what was ordered

As not everyone had eaten the same amount of food or arrived at the same time, then there was an ask for everyone to pay just what they ordered.

So create a collection to capture what each person ordered and create an itemised bill so each person knows what they should pay.



Define a detailed bill based on what each person ordered, then create an itemised bill based on each persons order

Now it was realised that what everyone ordered is not what everyone ate.  So now we need to take the order and create an itemised bill based on what everyone actually ate (lets suspend believe here a little and assume everyone knows exactly what they ate, and is honest about it).


Define a detailed bill based on what each person ordered, then create an itemised bill based on each person actually ate

## Spliting the bill with a Social Group
Extend the exercise by splitting bills over multiple events and activities with multiple people.
