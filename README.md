# See current Live version on

- [maze-game live](https://devops-project-44881.firebaseapp.com/)

## Team

- [Jakab Ádám](https://github.com/Chadyka) | [Jankelic Iván](https://github.com/yankela1227) | [Hankóczki Döme](https://github.com/hdome)

### [Recursive backtracking algorithm (wiki article)](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_implementation) in action:
- [Testing graph traversal (preview link)](https://devops-project-44881--node-movement-testing-n3szp9sr.web.app/)
  - hit the spacebar to move the yellow **current node**
  - light blue nodes have not yet been visited, dark blues have been visited
  - point is to traverse each node, if the **current node** gets trapped, then move back to a node that has sibling nodes not yet visited
  - This way, every node is traversed and when the **current node** is trapped and backtracks
  - When every node is visited, the game logs the path array too the console

- [Graph traversal and making the maze (preview link)](https://devops-project-44881--maze-generator-j3fq9cr8.web.app/):
  - a path is made with the algorithm above
  - this path is then passed as an array of strings
  - a function traverses this path and breaks the walls (*removes borders*)
  - hit the start game button to regenerate the maze and see the ***MAGIC***
  - And this way an actual maze is born ***TA-DAA!***
