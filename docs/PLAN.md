# From Idea to MVP

## Idea

### Gameplay

- Tank puzzle game
- Clear obstacle and find a path to the enemy base

### UI

- Game boy like screen
- Use touch screen and keyboard to play

## MVP

- [x] Create a small map
- [x] Create a tank
- [x] Make the tank move around on the map
- [x] Make tank can shoot bullet
- [x] Make tank can shoot though walls one by one so it can walk pass it
- [x] Restart the game
- [x] Make tank reach a flag and end the game

## Building the MVP

### 1. Create a small map

- Used an array and apply use HTML/CSS class to represent different element:
  - 0 = road
  - 1 = boundary
  - 2 = wall can be broken and turn to road
  - Add/remove CSS class on each square on the gameMap

#### Design Decision: Use a 2D Array

- [Array for map, single dimensional or 2D (Reddit)](https://www.reddit.com/r/csharp/comments/whrum8/best_collection_to_work_with_2d_map/)
- I chose 2D array:
  - for future expansions
  - easier to work with coordinates directly (board[y][x])

#### Debugging the Game Map

```js
const squareTypeClassName = squareType[value] ?? "board__square--error";
```

- To catch typos or undefined square types, I added a fallback class for unknown values:
- This shows a red square on the board when there's an error in the game map.

#### DOM Storage for the Game Map

- I stored the <div> squares in an 2D array:
  - Access them across the game
  - Maintain a consistent game state

### 2. Create a tank / starting point for tank

- Add a .tank HTML/CSS class to one of square on the board
- Store the tank currentPosition in a global variable for now, so the currentPosition to start with is the starting position
- Keep track of the tank position in a global variable (game state)

### 3. Move a tank

- [x] Add/remove class tank on each square on the gameMap accordingly
- [x] Prevent walk past the boundary and wall
- [x] Prevent move from one edge of the board to the opposite
- [x] Prevent moving out of bounds (e.g., x < 0 or x >= row.length).
- [x] Move with click button, up, down, left and right button. Create event listener.
- [x] Move with keyboard, "w","a","s" and "d". Create event listener.
- [x] Prevent move into squares that currently have a bullet.

### 4. Make tank can shoot

#### shooting need a direction in the tank

- The tank needs fire direction to shoot in 4 direction
- [x] make one more key pad to decide the shooting direction. Create event listener.

### 5. Bullet

#### Bullet Mechanics

- Take CS (counter strike) game as a reference, every bullet should be it own object, independent to who shoot it.
- [x]It can reuse in other tank, make bullet Class.
- Each bullet destroy one wall and then disappears.
- Each bullet has its own state, and it will disappear after it hit something
- Since there's no external reference, the bullet is garbage collected automatically (no need to manually clean up).
  - To avoid memory leak or manually clean up, not going to track bullet position
- [x] need to make bullet movement visible, add/ remove class can happen very fast (made a help function, delay)

##### Bullet Creation & Movement

- A bullet is created with the current tank position coordinate
- The bullet move one square at a time, recursively calling its own .move() function to continue movement
- If the next square is out of bound, the bullet disappears (This is checked first to avoid accessing a non-existent DOM element)
- If the next square is a road, the bullet moves into that square
- If the next square is a wall, the wall is converted to a road, and the bullet disappears
- If the next square is boundary, the bullet disappear
- [x] Make condition inside bullet move function

#### Bullet Design Decision

- No need for a bullet pool or not even a bullet array in MVP
- Each bullet is self-contained and automatically collected after use.

#### Future development note

- Bullet vs. Bullet Collision: Bullets currently pass through each other.
  (Only one tank exists in the MVP — handling collisions can be added in future updates.)
- Bullet vs. Tank Interaction: In the future, add logic for destroying tanks when hit.
  (Currently not needed as there's only one tank in the MVP.)

### 6. Restart the game

- [x] Move Bullet Tank and GameMap into separate classes to better encapsulate and control their states.
- [x] Prevented player from firing or moving during reset — decided it's unnecessary for MVP as reset is fast.
- [x] Considered using an isResetting flag to manage input — skipped for now due to overengineering.

#### Reset Game State

- Game Board State
  - [x] Reset board state to its initial configuration
- Tank State

  - [x] Tank position reset to starting position
  - [x] Tank aim direction reset to up

- Bullet State
  - Initially planned to add a timeout to clear bullets during reset.
  - Later realized bullets are not tracked globally (they're cleared along with the DOM), so no explicit cleanup is required.

### 7. Make tank reach a flag and end the game

- [x] Added flag on the game map
- [x] Updated bullet logic to interact properly with the flag
- [x] Updated tank move logic
- [x] Displayed a modal when the tank reaches the flag, let player reset the game
- [x] Disabled controller input while the modal is active

#### Add flag on the gameMap

- Thinking ahead for future multiple level, more maps
- [x] Wrote a function to find the flag position (current one is efficient enough to handle a small to medium size map)
- [x] Implemented error handling to throw clear messages when:
  - No flag exists on the map
  - More than one flag is found
