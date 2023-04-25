# TicTacToe on the command line

[Tic-tac-toe](https://en.wikipedia.org/wiki/Tic-tac-toe) is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game

![TicTacToe game - winning line](https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Tic-tac-toe-game-1.svg/719px-Tic-tac-toe-game-1.svg.png)

<p style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/_eO7EsXO2XE?t=343" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>


The code for this section is published on GitHub at: [practicalli/tictactoe-cli](https://github.com/practicalli/tictactoe-cli/tree/solution-no-tests)

A [TicTacToe game](https://en.wikipedia.org/wiki/Tic-tac-toe) that you run on the command line.  The game takes input from a human player and the program is the second player.

![Clojure Games TicTacToe board winner X](/images/clojure-games-tictactoe-board-winner-x.png)

Output from the game appears in the REPL

```clojure
Current board:
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
X: Select your move (press a number between 1 and 9 then press enter)
Current board:
X | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
O: Select your move (press a number between 1 and 9 then press enter)
Current board:
X | O | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
X: Select your move (press a number between 1 and 9 then press enter)
Current board:
X | O | X
---------
4 | 5 | 6
---------
7 | 8 | 9
O: Select your move (press a number between 1 and 9 then press enter)
Current board:
X | O | X
---------
O | 5 | 6
---------
7 | 8 | 9
X: Select your move (press a number between 1 and 9 then press enter)
Current board:
X | O | X
---------
O | X | 6
---------
7 | 8 | 9
O: Select your move (press a number between 1 and 9 then press enter)
Current board:
X | O | X
---------
O | X | O
---------
7 | 8 | 9
X: Select your move (press a number between 1 and 9 then press enter)
Current board:
X | O | X
---------
O | X | O
---------
X | 8 | 9
Player  X  wins!
```

## References

* [TicTacToe game created by Brian Will](https://www.youtube.com/watch?v=vWSBGD96BHU).
