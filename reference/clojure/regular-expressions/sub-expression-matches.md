# Sub-expression Matches


| Pattern | Description                                                                                     |
|---------|-------------------------------------------------------------------------------------------------|
| ^       | Matches beginning of line.                                                                      |
| $       | Matches end of line.                                                                            |
| .       | Matches any single character except newline. Using m option allows it to match newline as well. |
| [...]   | Matches any single character in brackets.                                                       |
| [^...]  | Matches any single character not in brackets                                                    |
| \A      | Beginning of entire string                                                                      |
| \z      | End of entire string                                                                            |
| \Z      | End of entire string except allowable final line terminator.                                    |
| re*     | Matches 0 or more occurrences of preceding expression.                                          |
| re+     | Matches 1 or more of the previous thing                                                         |
| re?     | Matches 0 or 1 occurrence of preceding expression.                                              |
| re{     | n} Matches exactly n number of occurrences of preceding expression.                             |
| re{     | n,} Matches n or more occurrences of preceding expression.                                      |
| re{     | n, m} Matches at least n and at most m occurrences of preceding expression.                     |
| a|b     | b Matches either a or b.                                                                        |
| (re)    | Groups regular expressions and remembers matched text.                                          |
| (?:     | re) Groups regular expressions without remembering matched text.                                |
| (?>     | re) Matches independent pattern without backtracking.                                           |
| \w      | Matches word characters.                                                                        |
| \W      | Matches nonword characters.                                                                     |
| \s      | Matches whitespace. Equivalent to [\t\n\r\f].                                                   |
| \S      | Matches nonwhitespace.                                                                          |
| \d      | Matches digits. Equivalent to [0-9].                                                            |
| \D      | Matches nondigits.                                                                              |
| \A      | Matches beginning of string.                                                                    |
| \Z      | Matches end of string. If a newline exists, it matches just before newline.                     |
| \z      | Matches end of string.                                                                          |
| \G      | Matches point where last match finished.                                                        |
| \n      | Back-reference to capture group number "n"                                                      |
| \b      | Matches word boundaries when outside brackets. Matches backspace (0x08) when inside brackets.   |
| \B      | Matches nonword boundaries.                                                                     |
| \n,     | \t, etc. Matches newlines, carriage returns, tabs, etc.                                         |
| \Q      | Escape (quote) all characters up to \E                                                          |
| \E      | Ends quoting begun with \Q                                                                      |
