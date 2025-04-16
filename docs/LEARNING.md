## Learning

### 1. Using enum for Direction (Reused in Tank, Bullet, and Main)

#### Problem:

I originally used string literals (e.g. "up", "down") directly for movement direction. This approach:

- Is prone to typos ("rigth" won't throw)
- Makes refactoring hard
- Doesn’t provide autocomplete or type safety

#### Solution:

Use a TypeScript enum to define directions centrally, and import it wherever needed (Tank, Bullet, Main).

```ts
// game/types.ts
export enum Direction {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}
```

Then reuse it:

```ts
import { Direction } from "../game/types";

// Reuse in Tank
this.#fireDirection = Direction.UP;
tank.move(Direction.LEFT);

// Reuse in Bullet
bullet.move(Direction.RIGHT);
```

- Why this is better:
  - Safer: avoids bugs from invalid strings
  - Reusable: shared across modules without duplication
  - Maintainable: changing "up" to "north" later only requires one update
  - Autocomplete: helps in IDEs when typing Direction.
- When to use this pattern:
  - When you have a limited set of related options (like "directions", "status", or "types")
  - When those values are reused in multiple files

### 2. Bullet, how it get garbage collected after it hit something

#### Problem:

I want to make each bullet as an own object, I can track it with its own position, and when it get hit, it will be destroyed

- [Understanding Memory Management and Garbage Collection in JavaScript](https://medium.com/%40aayushpatniya1999/understanding-memory-management-and-garbage-collection-in-javascript-%EF%B8%8F-27e2723f9a2)

Research on Using Object Pooling:

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

[JavaScript game; bullets in array; when I shoot, ALL bullets in array refire from wherever the player is](https://stackoverflow.com/questions/16617525/javascript-game-bullets-in-array-when-i-shoot-all-bullets-in-array-refire-fro)

[How to Shoot Bullets in JavaScript - Game Dev](https://www.youtube.com/watch?v=i7FzA4NavDs)

- const index = bulletLis.indexOf(bullet)
- bullets.splice(index, 1) to remove

### Solution

- Bullets are not tracked globally (they're cleared along with the DOM), so no explicit cleanup is required.

### 3. Refactor Logic for Better Code Readability & Structure

#### Problem:

- As the game grew, especially after implementing bullet movement, the main.ts file became too long and difficult to navigate.
- Managing state and logic directly in the main script made it harder to scale and debug the code.

### Solution

- Refactored core entities into separate classes: Tank, Bullet, and GameMap
- Extracted types into a separate types.ts file to ensure type reuse and clarity
- Encapsulated logic within classes to keep related data and behavior together:
  - Tank movement and firing logic are now inside the Tank class
  - Bullet movement logic and conditions live within the Bullet class
- State management became easier — each class manages its own internal state without polluting global scope
- Code is now easier scale and test
- Modular code structure makes it easier to build additional features later

### 4. Error handling during class construction (with UI fallback)

#### Problem:

- I want my game to fail early when the GameMap is missing a flag.
- I want to show a visible error in the UI and also log it to the console, without crashing silently or leaving a blank screen.

```js
// This will throw and break everything:
this.#flag = this.flagPos(gameMap); // throws if invalid
this.#board = this.create(...); // never runs
```

#### Solution:

Wrap the risky logic in a try/catch inside the constructor:

```js
try {
  this.#flag = this.flagPos(gameMap);
} catch (error) {
  // Dev only message
  console.error("Map initialization failed:", error);

  const errorMsg = document.createElement("div");
  errorMsg.textContent = (error as Error).message;
  errorMsg.style.color = "red";
  boardEl.appendChild(errorMsg);

  throw error; // the game still crash after showing the reason
}
```

When to use this?
Use this pattern if:
You want to catch errors early
You want to see clear messages when level data is wrong

### 5. Prevent double-tap zoom on iOS with touch-action in ios

```css
button,
a {
  touch-action: manipulation;
}
```

### 6. Prevent text selection in game-container in ios

```css
.game-container {
  width: 90%;
  max-width: 450px;
  user-select: none;
}
```

### 7. Module State Sharing in JavaScript (I didn't use this solution)

#### Problem:

I refactored gameActive into a separate state.ts file but mistakenly treated it as a normal variable, causing updates to not reflect across modules.

[Need a better way to share variables among modules](https://www.reddit.com/r/learnjavascript/comments/1dv0qnp/need_a_better_way_to_share_variables_among_modules/)

#### Solution:

I can replace the direct variable export with a module that exposes getter and setter functions. This ensures consistent shared state across all importing modules, since changes made via the setter are reflected wherever the getter is used.

```js
export const gameState = { active: true };

export function setGameActive(value: boolean) {
  gameState.active = value;
}
```

### 8. Error Handling for Missing DOM Elements

#### Problem:

If any controller elements are missing in the DOM (e.g. buttons for movement, firing, reset), the game could silently fail or throw confusing errors later in the logic.

#### Solution:

Manually check each required element at the beginning and throw a descriptive error message if any are null. This ensures early failure with a clear explanation during development.

```js
if (
  !btnUpEl ||
  !btnDownEl ||
  !btnLeftEl ||
  !btnRightEl ||
  !btnFireEl ||
  !btnFDUpEl ||
  !btnFDDownEl ||
  !btnFDLeftEl ||
  !btnFDRightEl ||
  !btnResetEl ||
  !btnModalResetEl
) {
  throw new Error(
    `Cannot find controller elements: btnUpEl => ${btnUpEl}, btnDownEl => ${btnDownEl}, btnLeftEl => ${btnLeftEl}, btnRightEl => ${btnRightEl}, 
    btnFireEl => ${btnFireEl}, btnFDUpEl => ${btnFDUpEl}, btnFDDownEl => ${btnFDDownEl}, btnFDLeftEl => ${btnFDLeftEl}, btnFDRightEl => ${btnFDRightEl}, 
    btnResetEl => ${btnResetEl}, btnModalResetEl => ${btnModalResetEl} `
  );
}
```

### 9. TS- Casting object keys to numbers

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

- Use an object when:
  You have a static set of known keys, like tile types
  You want fast, clean access (squareClassNames[value])
  You're not dynamically adding/removing key-value pairs
- Use a Map when:
  You need true key types (e.g. objects, references, symbols)
  You’re going to add/remove entries dynamically
  You're dealing with lots of lookups and want guaranteed key type integrity

### 10. TS Record

```js
const squareClassNames: Record<number, string> = {
  0: "board__square--floor",
  1: "board__square--boundary",
  2: "board__square--wall",
};
```

## References

- [T-rex run in JavaScript! (Youtube)](https://www.youtube.com/watch?v=OnkimGiEkb4)
- [The Alternative Guide to Building Tetris with JavaScript - Video for The Ultra Beginner (Youtube)](https://www.youtube.com/watch?v=w1JJfK09ujQ)
- [https://www.youtube.com/watch?v=q2ViNbRwr5U&t=818s (Youtube)}](https://www.youtube.com/watch?v=q2ViNbRwr5U&t=818s)

From these videos, I learned

- Basic game mechanism,
- Collision detection,
- Game map setup
- The logic behind game planning
