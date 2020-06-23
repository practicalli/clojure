# Common Regular Expression patterns
Common string formats used in software development and examples of regular expressions to check their correctness.

## Username Regular Expression Pattern
A 8 to 24 character passwords that can include any lower case character or digit (number).  Only the underscore and dash special characters can be used.

```eval-clojure
(re-matches #"^[a-z0-9_-]{8,24}$" "good-username")
```

Breakdown the regex pattern:
```
^[a-z0-9_-]{8,24}$

^                    # Start of the line
  [a-z0-9_-]         # Match characters and symbols in the list, a-z, 0-9 , underscore , hyphen
             {8,24}  # Length at least 8 characters and maximum length of 24
$                    # End of the line
```


## Password Regular Expression Pattern
A password should be 8 to 24 character string with at least one digit, one upper case letter, one lower case letter and one special symbol, `@#$%`.

```eval-clojure
(re-matches #"((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,24})" "G00d @ username")
```

The order of the grouping formulas does not matter

Breakdown the regex pattern:
```
((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,24})

(			# Start of group
  (?=.*\d)		#   must contains one digit from 0-9
  (?=.*[a-z])		#   must contains one lowercase characters
  (?=.*[A-Z])		#   must contains one uppercase characters
  (?=.*[@#$%])		#   must contains one special symbols in the list "@#$%"
              .		#     match anything with previous condition checking
                {8,24}	#        length at least 8 characters and maximum of 24
)			# End of group
```

`?=` means apply the assertion condition, which is meaningless by itself and works in combination with others.


## Hexadecimal Color Code Regular Expression Pattern
The string must start with a `#`symbol , follow by a letter from `a` to `f`, `A` to `Z` or a digit from `0` to `9` with a length of exactly 3 or 6.` This regular expression pattern is very useful for the Hexadecimal web colors code checking.

```eval-clojure
(re-matches #"^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$" "#FFAABB")
```

Breakdown the regex pattern:
```
^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$

^		 #start of the line
 #		 #  must constains a "#" symbols
 (		 #  start of group #1
  [A-Fa-f0-9]{3} #    any strings in the list, with length of 3
  |		 #    ..or
  [A-Fa-f0-9]{6} #    any strings in the list, with length of 6
 )		 #  end of group #1
$		 #end of the line
```


## Email Regular Expression Pattern
The account side of an email address starts with `_A-Za-z0-9-\\+` optional follow by `.[_A-Za-z0-9-]`, ending with an `@` symbol.

The  domain starts with `A-Za-z0-9-`, follow by first level domain, e.g `.org`, `.io` and `.[A-Za-z0-9]` optionally follow by a second level domain, e.g. `.ac.uk`, `.com.au` or  `\\.[A-Za-z]{2,}`, where second level domain must start with a dot `.` and length must equal or more than 2 characters.

```eval-clojure
(re-matches
  #"^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$"
  "jenny.jenn@jetpack.com.au")
```
> Double escaping is not required in the Clojure syntax.

Breakdown the regex pattern:
```
^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$

^			#start of the line
  [_A-Za-z0-9-]+	#  must start with string in the bracket [ ], must contains one or more (+)
  (			#  start of group #1
    \\.[_A-Za-z0-9-]+	#     follow by a dot "." and string in the bracket [ ], must contains one or more (+)
  )*			#  end of group #1, this group is optional (*)
    @			#     must contains a "@" symbol
     [A-Za-z0-9]+       #        follow by string in the bracket [ ], must contains one or more (+)
      (			#	   start of group #2 - first level TLD checking
       \\.[A-Za-z0-9]+  #        follow by a dot "." and string in the bracket [ ], must contains one or more (+)
      )*		#	   end of group #2, this group is optional (*)
      (			#	   start of group #3 - second level TLD checking
       \\.[A-Za-z]{2,}  #        follow by a dot "." and string in the bracket [ ], with minimum length of 2
      )			#	   end of group #3
$			#end of the line
```


## Image File name and Extension Regular Expression Pattern
A file extension name is 1 or more characters without white space, follow by dot `.` and string end in `jpg` or `png` or `gif` or `bmp`.  The file name extension is case-insensitive.

Change the combination `(jpg|png|gif|bmp)` for other file extension.

```eval-clojure
(re-matches #"(?i)([^\s]+(\.(jpg|png|gif|bmp))$)")
```

> #### Hint::in-line modifiers not supported in JavaScript
> The REPL above uses ClojureScript, hosted on JavaScript. JavaScript does not support in-line modifier flags such as `(?i)` for a case insensitive pattern.  In-line flags will be [converted by the ClojureScript reader if they are the first element in the literal regular expression pattern](https://stackoverflow.com/a/23187290/1762872), or if the `js/RegExp` function is used to create the regular expression.


Breakdown the regex pattern:
```
([^\s]+(\.(?i)(jpg|png|gif|bmp))$)

(			#Start of the group #1
 [^\s]+			#  must contains one or more anything (except white space)
       (		#    start of the group #2
         \.		#	follow by a dot "."
         (?i)		#	ignore the case sensitive checking
             (		#	  start of the group #3
              jpg	#       contains characters "jpg"
              |		#       ..or
              png	#       contains characters "png"
              |		#       ..or
              gif	#       contains characters "gif"
              |		#       ..or
              bmp	#       contains characters "bmp"
             )		#	  end of the group #3
       )		#     end of the group #2
  $			#  end of the string
)			#end of the group #1
```


## IP Address Regular Expression Pattern
An IP address comprises of 4 groups of numbers between 0 and 255, with each group separated by a dot.

Example IP address are: `192.168.0.1`, `127.0.0.1`, `192.120.240.100`

```eval-clojure
(re-matches
  #"^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$"
  "192.168.0.1")
```

Breakdown the regex pattern:
```
^([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.
([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])$

^		#start of the line
 (		#  start of group #1
   [01]?\\d\\d? #    Can be one or two digits. If three digits appear, it must start either 0 or 1
        #    e.g ([0-9], [0-9][0-9],[0-1][0-9][0-9])
    |		#    ...or
   2[0-4]\\d	#    start with 2, follow by 0-4 and end with any digit (2[0-4][0-9])
    |           #    ...or
   25[0-5]      #    start with 2, follow by 5 and end with 0-5 (25[0-5])
 )		#  end of group #2
  \.            #  follow by a dot "."
....            # repeat with 3 time (3x)
$		#end of the line
```

## Time Format Regular Expression Pattern
Time in 12-Hour Format Regular Expression Pattern.  The 12-hour clock format start beween 0-12, then a semi colon, `:`, follow by `00-59`.  The pattern ends with `am` or `pm`.

```eval-clojure
(re-matches #"(?i)(1[012]|[1-9]):[0-5][0-9](\s)?(am|pm)" "12:59am")
```

Breakdown the regex pattern:
```
(1[012]|[1-9]):[0-5][0-9](\\s)?(?i)(am|pm)

(				#start of group #1
 1[012]				#  start with 10, 11, 12
 |				#  or
 [1-9]				#  start with 1,2,...9
)				#end of group #1
 :				#    follow by a semi colon (:)
  [0-5][0-9]			#   follow by 0..5 and 0..9, which means 00 to 59
            (\\s)?		#        follow by a white space (optional)
                  (?i)		#          next checking is case insensitive
                      (am|pm)	#            follow by am or pm
```

## Time in 24-Hour Format Regular Expression Pattern
The 24-hour clock format start between 0-23 or 00-23, then a semi colon `:` and follow by 00-59.

```eval-clojure
(re-matches #"(([01]?[0-9]|2[0-3]):[0-5][0-9])" "23:58")
```

Breakdown the regex pattern:
```
([01]?[0-9]|2[0-3]):[0-5][0-9]

(				#start of group #1
 [01]?[0-9]			#  start with 0-9,1-9,00-09,10-19
 |				#  or
 2[0-3]				#  start with 20-23
)				#end of group #1
 :				#  follow by a semi colon (:)
  [0-5][0-9]			#    follow by 0..5 and 0..9, which means 00 to 59
```

## Date Format (dd/mm/yyyy) Regular Expression Pattern
Date format in the form `dd/mm/yyyy`. Validating a leap year and if there is 30 or 31 days in a month is not simple though.

```eval-clojure
(re-matches #"(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/((19|20)\d\d)" "20/02/2020")
```

Breakdown the regex pattern:
```
(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/((19|20)\\d\\d)

(			#start of group #1
 0?[1-9]		#  01-09 or 1-9
 |                      #  ..or
 [12][0-9]		#  10-19 or 20-29
 |			#  ..or
 3[01]			#  30, 31
)           #end of group #1
  /			#  follow by a "/"
   (			#    start of group #2
    0?[1-9]		#	01-09 or 1-9
    |			#	..or
    1[012]		#	10,11,12
    )			#    end of group #2
     /			#	follow by a "/"
      (			#	  start of group #3
       (19|20)\\d\\d	#       19[0-9][0-9] or 20[0-9][0-9]
       )		#	  end of group #3
```


<!-- ## HTML tag Regular Expression Pattern -->
<!-- HTML code uses tags to define structure of content. HTML tag, start with an opening tag “<" , follow by double quotes "string", or single quotes 'string' but does not allow one double quotes (") "string, one single quote (') 'string or a closing tag > without single or double quotes enclosed. At last , end with a closing tag “>” -->


<!-- ```eval-cloure -->
<!-- (re-matches -->
<!--   #"<("[^"]*"|'[^']*'|[^'">])*>" -->
<!--   "<body><h1>Title</h1><p>Loreum ipsum</p></body>") -->
<!-- ``` -->

<!-- Breakdown the regex pattern: -->
<!-- ``` -->
<!-- <("[^"]*"|'[^']*'|[^'">])*> -->

<!-- <       #start with opening tag "<" -->
<!--  (		#   start of group #1 -->
<!--    "[^"]*"	#	only two double quotes are allow - "string" -->
<!--    |		#	..or -->
<!--    '[^']*'	#	only two single quotes are allow - 'string' -->
<!--    |		#	..or -->
<!--    [^'">]	#	cant contains one single quotes, double quotes and ">" -->
<!--  )		#   end of group #1 -->
<!--  *		# 0 or more -->
<!-- >		#end with closing tag ">" -->
<!-- ``` -->

<!-- ## HTML links Regular Expression Pattern -->
<!-- HTML A tag Regular Expression Pattern -->

<!-- (?i)<a([^>]+)>(.+?)</a> -->

<!-- (		#start of group #1 -->
<!--  ?i		#  all checking are case insensive -->
<!-- )		#end of group #1 -->
<!-- <a              #start with "<a" -->
<!--   (		#  start of group #2 -->
<!--     [^>]+	#     anything except (">"), at least one character -->
<!--    )		#  end of group #2 -->
<!--   >		#     follow by ">" -->
<!--     (.+?)	#	match anything -->
<!--          </a>	#	  end with "</a> -->

<!-- ## Extract HTML link Regular Expression Pattern -->

<!-- \s*(?i)href\s*=\s*(\"([^"]*\")|'[^']*'|([^'">\s]+)); -->

<!-- \s*			   #can start with whitespace -->
<!--   (?i)			   # all checking are case insensive -->
<!--      href		   #  follow by "href" word -->
<!--         \s*=\s*		   #   allows spaces on either side of the equal sign, -->
<!--               (		   #    start of group #1 -->
<!--                "([^"]*")   #      only two double quotes are allow - "string" -->
<!--                |	   #	  ..or -->
<!--                '[^']*'	   #      only two single quotes are allow - 'string' -->
<!--                |           #	  ..or -->
<!--                ([^'">]+)   #     cant contains one single / double quotes and ">" -->
<!--           )		   #    end of group #1 -->




## Reference:

* https://mkyong.com/regular-expressions/10-java-regular-expression-examples-you-should-know
