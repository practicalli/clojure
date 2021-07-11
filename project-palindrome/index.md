# Project Palendrome

In this section we will create a simple Clojure project using Leiningen and build up a palendrome checker step by step.

We will start with the simplest possible thing we can create and steadily add 

# What is a palendrome**

For this project it is assumed that a palendrome is a string of characters from the English alphabet and not any other language or an alphanumeric sequence.

It is assumed that a palendrome is at least 3 characters long, meaning a single character cannot be a palendrome.  If a single character was a palendrome, then any valid sequence would contain at least as many palindromes as characters in that sequence.



## Task set

Write an algorithm to find the 3 longest unique palindromes in a string. For the 3 longest palindromes, report the palindrome, start index and length in descending order of length. Any tests should be included with the submission. 

For example, the output for string, "sqrrqabccbatudefggfedvwhijkllkjihxymnnmzpop" should be: 

```
Text: hijkllkjih, Index: 23, Length: 10
Text: defggfed, Index: 13, Length: 8 
Text: abccba, Index: 5 Length: 6
```


* Check for a palindrome
* Generate a series of palindromes
