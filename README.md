# Game

https://edpau.github.io/no_game/

## Key learn

- State management

## Practice

- Git branch when make new features

## Check no memory leak in Task Manager

## Into

- recreate childhood game Battle City

## Idea

### Gameplay

- tank puzzle game
- clear obstacle and find a path to the enemy base

### unique feature after MVP

- tank need to turn gun barrel to the right direction before it can move
- tank speed will affect by the ammo qty
- Have random mine in the map (surprise element)

### UI

- Game boy like screen
- can use touch screen or keyboard to play

## MVP

- [x] Create a small map
- [x] Create a tank
- [x] Make the tank move around on the map
- [x] Make tank can shoot bullet
- [x] Make tank can shoot though walls one by one so it can walk pass it
- [x] Restart the game
- [ ] Make tank reach a flag and end the game

### Create a small map

- use array, use class to represent different element
- 0 = road
- 1 = boundary
- 2 = wall can be broken and turn to road

[T-rex run in JavaScript! (Super simple!!!)](https://www.youtube.com/watch?v=OnkimGiEkb4)
[The Alternative Guide to Building Tetris with JavaScript - Video for The Ultra Beginner](https://www.youtube.com/watch?v=w1JJfK09ujQ)
[https://www.youtube.com/watch?v=q2ViNbRwr5U&t=818s](https://www.youtube.com/watch?v=q2ViNbRwr5U&t=818s)

- I learnt basic game mechanism, collision, game map, what is the logic of planning a game

[Array for map, single dimensional or 2D](https://www.reddit.com/r/csharp/comments/whrum8/best_collection_to_work_with_2d_map/)

- I chose 2D array for future expansions

- [Casting object keys to numbers](https://www.reddit.com/r/typescript/comments/z61u2d/is_there_a_way_to_avoid_explicitly_casting_object/)

```js
const squareTypeClassName = squareType[value] ?? "board__square--error";
```

- debug error in map, "board\_\_square--error" if typo on the gameMap, I can see red dot on the map

```js
const squareTypeClassName = squareType[value] ?? "board__square--error";
```

I think as constant may be better.

#### add/remove class on each square on the gameMap

- I need to store the divs in a array, so i can access them globally, game state .

### Create a tank / starting point for tank

- add tank class to one of square of the board div
- Store the tank currentPosition in a global variable for now, so the currentPosition to start with is the starting position
- keep track of the tank position, global variable, game state

### move a tank

- [x] add add/remove class tank on each square on the gameMap
- [x] cannot walk past the boundary and wall
- [x] cannot go from one end of the side to the other side of the map
- [x] cannot go past the map, cannot go pass the start of the array and the length of the array. i.e. move between x-axis = 0, x.rowLength().
- [x] move with click button, up, down, left and right button
- [x] move with keyboard, "w","a","s" and "d"
- [x] cannot move to the square if there is a bullet

### Make tank can shoot

#### shooting need a direction in the tank

- need tank aim direction to shoot in 4 direction
- [x] make one more key pad to decide the shooting direction

#### bullet

- take CS (counter strike) game as a reference, every bullet should be it own object, independent to who shoot it.
- it can reuse in other tank
- [x] make bullet class
- one bullet destroy one wall
- [x] make condition inside bullet move function
- After it hit something, turn it to null, trigger garbage collect?
- each bullet has its own state, and it will disappear after it hit something,
  if we keep track of its own position, how can we clean it, to avoid memory leak (MVP, I am not tracking the position outside the object, so no need to clean up, it will be cleaned up by JS)
  I think the same logic can apply to tank, what happen if it get destroyed. (develop it later)
- what if two bullet hit each other? pass though to keep it simple. (only one tank in MVP, develop it later)
- [x] need to make bullet movement visible, add/ remove class can happen very fast (made a help function, delay)

- later i need to upgrade it what happen it hit another tank

##### How bullet move

- bullet travel one square
- bullet created on the tank square
- if the next square is out of bound, function disappear, this need to be first check as other check will need to access the div class, cannot access if not exist
- if the next square is a floor, then it can move up
- if the next square is a wall, function change wall to floor, then function disappear bullet
- if the next square is boundary, function disappear bullet

- need to fix tank can walk into bullet

#### Finding on bullet

- for a simple set up in MVP, I don't need a bullet pool or not even a bullet array, my bullet is an object on its own. Once it hit the wall, there is no reference outside the object, so it will be garbage collected

### Restart the game

- [x] move Bullet Tank and GameMap to their own class, so I can easy control their state
- [x] Player should not able to fire or move tank when the game is in reset state (no need, overengineering for now, the reset is fast)
- [x] use isReseting state to control the keypad (no need, overengineering for now, the reset is fast)

#### Reset Game State

1. board state reset

### [x]Tank State

1. [x]Tank position reset to starting position
2. [x]Tank aim direction reset to up

### Bullet State

1. [x]I am not tracking the bullet state, so I need a time out to clear all the bullet in the game, and not let user to shoot the bullet when the state is restarting. (Later I found out I removed the gameMap and not holding the bullet state, I don't need to make a time out)

## Game State

1. board state

### Tank State

1. Tank position
2. Tank aim direction

// -------------------------------------------

## After MVP

### Refactor logic, make code easy to read

```js
board pos add class function general function later

 function boardPosAddClass(pos: Pos){
     const x
}
```

- [ ] tank can move in different speed
- [ ] limited the ammo in the tank
- [ ] update tank movement- tank need to turn gun barrel to the right direction before it can move

### add computer tank

### move a tank

- continues movement, not one click one move
- move in different speed

### Extra

- start with static enemy, shooting
- random tank come out
- the camera angle move along with the tank
- mini map

### UI

- mirror keyboard input to key pad
- When the direction is selected, the selected fire direction will have a different color

## Things to try

- separate out map css, so i can change it easily afterward?

## Todo at last

- [ ] Make a game name
- [ ] Change index.html title
- [ ] Change index.html fibicon
- [ ] add back accessibility on button
- [ ]what if fire player too fast, need to slow down each shoot. Need to slow down clicking the screen or keyboard

## Deadline : Apr 16th

## Learning

### TS- Casting object keys to numbers

#### Problem:

I want to make an object and call the object with number

```js
// will not work, object key is string
const squareClassNames: { number: string } = {
  0: "board__square--floor",
  1: "board__square--boundary",
  2: "board__square--wall",
};
```

#### Solution:

[Casting object keys to numbers](https://www.reddit.com/r/typescript/comments/z61u2d/is_there_a_way_to_avoid_explicitly_casting_object/)

```js
const squareClassNames: Record<number, string> = {
  0: "board__square--floor",
  1: "board__square--boundary",
  2: "board__square--wall",
};
```

When to use each?

- ✅ Use an object when:
  You have a static set of known keys, like tile types
  You want fast, clean access (squareClassNames[value])
  You're not dynamically adding/removing key-value pairs
- ✅ Use a Map when:
  You need true key types (e.g. objects, references, symbols)
  You’re going to add/remove entries dynamically
  You're dealing with lots of lookups and want guaranteed key type integrity

But it is better to do this

### Bullet, how it get garbage collected after it hit something

#### Problem- I want to make each bullet as an own object, I can track it with its own position, and when it get hit, it will be destroyed

- Understanding Memory Management and Garbage Collection in JavaScript (https://medium.com/%40aayushpatniya1999/understanding-memory-management-and-garbage-collection-in-javascript-%EF%B8%8F-27e2723f9a2)

Use Object Pooling:

```js
// Example of object pooling using a pool array
const pool = [];

function createObject() {
  if (pool.length > 0) {
    return pool.pop(); // Reusing an existing object from the pool
  } else {
    return {}; // Creating a new object if the pool is empty
  }
}

function releaseObject(obj) {
  // Resetting object state
  obj.property1 = null;
  obj.property2 = null;
  // Returning the object to the pool
  pool.push(obj);
}
```

[Object pools in high performance javascript?](https://stackoverflow.com/questions/8410667/object-pools-in-high-performance-javascript)

- “Pools are a trade-off: they help in performance-critical cases, but add complexity. Don’t assume you need one unless your game proves you do.”

[Particle Pool for JavaScript Game Engines](https://www.youtube.com/watch?v=9dp0mAc2vvY)

- reuse the particle in the pool

[JavaScript game; bullets in array; when I shoot, ALL bullets in array refire from wherever the player is
](https://stackoverflow.com/questions/16617525/javascript-game-bullets-in-array-when-i-shoot-all-bullets-in-array-refire-fro)

[How to Shoot Bullets in JavaScript - Game Dev](https://www.youtube.com/watch?v=i7FzA4NavDs)

- const index = bulletLis.indexOf(bullet)
- bullets.splice(index, 1) to remove

### Solution

- no need to use

## Further study

### TS Record

```js
const squareClassNames: Record<number, string> = {
  0: "board__square--floor",
  1: "board__square--boundary",
  2: "board__square--wall",
};
```

### re-render

When re-render whole map happen?

- add class won't cause re-render happen.

## Link

[Two-Dimensional (2D) Arrays in JavaScript](https://www.youtube.com/watch?v=a7JAvQeqB8g)
[Using Two-Dimensional Arrays to Build a Walkable Game Map (in React!)](https://dev.to/raquii/using-two-dimensional-arrays-to-build-a-walkable-game-map-in-react-22e7)

## Question

### error handle

which one to use?

```JS
if (!btnUpEl || !btnDownEl || !btnLeftEl || !btnRightEl || !btnFireEl) {
  throw new Error("Cannot find controller elements");
}
```

or
more explicit and also know which one is missing, use an object:

```JS
const controllerEls = {
  up: btnUpEl,
  down: btnDownEl,
  left: btnLeftEl,
  right: btnRightEl,
  fire: btnFireEl,
};

for (const [key, el] of Object.entries(controllerEls)) {
  if (!el) {
    throw new Error(`Cannot find controller button: ${key}`);
  }
}
```

### How a senior plan my game, what is the different?

# TODO at last in MVP

- [ ] fix tank class, change shooting direction
- [ ] fix squareClassNames type, change it to type not use Record, change to as constant

## Log

4/8

- After I have bullet shoot out and move at one direction, "up", I found it hard to navigate my code, main.ts became too long.
- I design to refactor my code, before I build new features.
- I moved Bullet.ts and created type.ts to store all the type.
- I made Tank class, later can use in CPU Tank
- I realized after refactor function to Tank class, the function is more simple, it is more easy to control the tank state. It is inside its own scope.

4/9

- [x] refactor: extract gameMap data and board rendering logic to GameMap.ts
- [x] Restart state, 
- [ ] make Flag and end game
- [ ] update error handle in element in ts

# TODO today

## Quick idea

- use enum for direction?
- update error handle for element
