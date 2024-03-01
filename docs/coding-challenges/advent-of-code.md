## Advent Of Code

![Advent of Code](/images/advent-of-code.png)

[Advent of Code](https://adventofcode.com/) is the annual coding challenge with a festive theme.  Each day there is a new challenge in two parts, the first fairly easy the second a little more involved.  The challenges are an investment of your time to complete them all, although even trying just a few is enough to help you think in different ways.

Every programming language requires regular practice to maintain your skills.  A full time developer role gives lots of opportunities to practice every day, however, its often focused in around solving problems within a specific business domain, with little time to explore others.  The Advent of Code puts you in a different domain, so its great for extending your coding experiences.

Solving challenges in a different language is another great way to extend your experiences, so here are some tips and examples for solving the advent of code in Clojure.

## Solving challenges

* Keep the solution as simple as possible.  Its very easy to over-complicate the solution and end up simply confusing yourself.
* Don't try and make the perfect solution.  Write something that works, this will give you a nice ego boost.  Then you can experiment with the code and see if you can improve your approach.
* Break down the problem into the simplest thing you can solve first.  Trying to solve a problem all at once will quickly have you going around in circles.
* Keep all the code and make notes.  I use a a design journal in my projects to document my thinking process, capture decisions that worked and those that didn't work for this project.  The journal is a great way to cement learning from solving the challenge.
* Challenges are only accessible from their day of the month onwards.  There is a count-down clock displayed on the next challenge to open, so you know when it will be available.  Don't feel pressured to keep up with the challenges though, enjoy the experience and have fun, you will learn more that way.

![Advent Of Code 2019 Day 1 challenge snippet](https://raw.githubusercontent.com/practicalli/graphic-design/live/code-challenges/advent-of-code-2019-day1.png)

## Coding video

A video guide to solving the first challenge of Advent of Code from 2018, trying out different solutions at increasing levels of abstraction.  With each level of abstraction it helps to think in a more functional way.

<p style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/opM7fU7IAV8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>

## Creating a project for the challenge

```shell
clojure -T:project/create :template lib practicalli.advent-of-clojure-code/2019
```

Create a new Clojure file for each of the daily challenges.  It makes sense to keep both parts of each day in the same file.

!!! EXAMPLE "Practicalli Advent Of Code solutions repository"
    [practicalli/advent-of-clojure-code-2019](https://github.com/practicalli/advent-of-clojure-code-2019)

## Useful Resources And Examples

Videos and code solutions to many challenges from 2019 and past years.

* [fdlk/advent-2019](https://github.com/fdlk/advent-2019) - example Clojure solutions to the advent of code
* [Awesome Advent Of Code](https://github.com/Bogdanp/awesome-advent-of-code) - a collection of solutions in various languages
* [Advent of Code 2018 video walk-through of Clojure solutions by Tim Pote](https://potetm.com/videos.html) and [GitHub repository](https://github.com/potetm/advent-of-code)

[#adventofcode channel in the Clojurians slack channel](https://clojurians.slack.com/messages/adventofcode) discusses challenges and solutions, especially during December when the challenge takes place.
