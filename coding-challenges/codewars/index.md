# CodeWars
Coding challenges in various languages with ranking scoreboard, experience levels and voting on solutions.  Many of the challenges tend toward mathematics, so may require some background research before solving them.

## Requirements
Codewars is a web browser based system in which you can write code and run tests.  Sample unit tests are provided with each challenge, so its all self-contained.

Create a free account and select the language you wish to attempt challenges in.  Two simple coding tests will need to be completed in order to access that specific language.

## Challenges Dashboard
After logging in, the dashboard suggests a challenge for you at a suitable level.  8 kyu is the easiest level, the smaller the number the harder the challenge.

![Clojure code challenges - Codewars suggested challenge](/images/clojure-code-challenges-codewars-suggested-challenge.png)

## Tackling a challenge
Read the instructions and take a look at the sample tests.

Many of the challenges have only a very basic explanation, so always review the sample unit tests to help with the understanding.  The sample tests are not necessarily the full suite of tests run when testing your solution, so there may be undocumented edge cases to solve

The source and test code can be copied into a new project, as has been done with the [practicalli/codewars-guides solutions](https://github.com/practicalli/codewars-guides)

```shell
clojure -M:new lib practicalli/readability-is-king
```

Update the solution window with your solution and use the **TEST** button to run the sample unit tests.

The **ATTEMPT** button will run all the unit tests for the challenge, which may be more than the sample tests.  If the attempt passes all the tests then the solution can be submitted an other solutions reviewed.

![Clojure code challenges - Codewars training with example challenge](/images/clojure-code-challenges-codewars-training-example.png)


## Tracking progress
View your profile page to track your progress and revisit kata challenges already completed.

![Clojure code challenges - Codewars profile dashboard](/images/clojure-code-challenges-codewars-profile.png)


## References
* [practicalli/codewars-guide](https://github.com/practicalli/codewars-guides) - a repository of code solutions to Codewars challenges, each challenge is its own Clojure CLI (deps.edn) project.
* [YouTube: CodeWars video guides](https://www.youtube.com/playlist?list=PLpr9V-R8ZxiCsYNLH9Wlt6L6L4Wk5GcTS)
* [Unofficial Free Code Camp Clojure Challenges](https://www.codewars.com/collections/unofficial-fcc-challenges-basic-algorithm-scripting)
