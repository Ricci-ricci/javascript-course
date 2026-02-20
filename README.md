# JavaScript Course Notes & Practice (Exercises)

This repository is a small JavaScript learning space with:
- Markdown **course notes** explaining key JS concepts (async, promises, fetch/axios, array methods, closures, basic OOP, etc.)
- A **practice script** with small logic exercises (summing arrays, max, counting items, filtering by id, mapping ids, etc.)

## Contents

- `course.md` — lesson-style notes and examples on JavaScript fundamentals
- `javascriptLogic.js` — practice implementations and small algorithms

## What you’ll learn (from `course.md`)

### 1) Async/Await vs Promises
- Why async exists: real-world tasks like network calls don’t complete immediately.
- `async` functions always return a Promise.
- `await` pauses inside an `async` function until a Promise resolves (or throws if it rejects).
- Promise chaining via `.then()` / `.catch()` vs `async/await` readability.

### 2) Fetch vs Axios
- `fetch` is built-in (browser / modern Node) and returns a Promise of a `Response`.
- Important behavioral detail: `fetch` typically **does not reject on HTTP errors** like `404`/`500`; you must check `response.ok`.
- Axios (third-party) usually **rejects on non-2xx responses** and provides `response.data` convenience.

### 3) Array methods
- `map`: transform each element, returns a new array (same length)
- `filter`: keep elements passing a test, returns a new array (subset)
- `reduce`: fold an array into a single value (sum/object/etc.)

### 4) Error handling (`try/catch`)
- `try/catch/finally` for synchronous code
- `try/catch` with `await` for async flows
- `.catch()` for Promise-based flows

### 5) Closures
- Functions can “remember” variables from their creation scope.
- Enables private state patterns like counters, memoization, callback factories, etc.

### 6) Basic OOP
- Using `class`, `constructor`, methods, and private fields (e.g. `#balance`)
- Encapsulation via methods (`deposit`, `getBalance`) guarding internal state

## What’s in `javascriptLogic.js`

This file contains small practice utilities and patterns, including:

- `sum(array)` — loops through an array and returns the total
- `max(array)` — attempts to find the maximum value (note: see “Known issues” below)
- `count(array)` — attempts to count occurrences of strings in an array (note: see “Known issues” below)
- `removeId(array, idToRemove)` — removes objects by id using `filter`
- `removeIdLoop(array, idToRemove)` — loop-based variant (note: see “Known issues” below)
- `getId()` — maps `cart` items to a list of ids using `map`

The file is meant as a sandbox: try rewriting these using `map/filter/reduce`, add tests, and fix edge cases.

## How to run

### Option A: Node.js
From the repo root:
1. Make sure Node is installed.
2. Run:
   - `node javascriptLogic.js`

### Option B: Copy snippets
You can copy/paste examples from `course.md` into your browser console or a Node REPL.

## Suggested exercises

1. Rewrite `sum()` using `reduce()`.
2. Fix `max()` to correctly return the max.
3. Fix `count()` to correctly build a frequency object.
4. Fix `removeIdLoop()` so it returns objects rather than indexes.
5. Make `getId(cart)` accept `cart` as a parameter instead of using a global.
6. Add basic argument validation (empty arrays, wrong types).

## Known issues / improvements to make

The current practice code intentionally has some rough edges you can improve:

- `max(array)` currently returns nothing (`return;`) instead of returning the computed value.
- `count(array)` is missing key parts:
  - `item` should be declared (`const item = ...`)
  - the `else` branch should set `result[item] = 1`
- `removeIdLoop(array, idToRemove)` pushes the index `i` rather than the object `array[i]`.
- Some variables (`cart`) are created without `const`/`let` (implicit globals). Prefer `const cart = ...`.
- `getId()` depends on an outer `cart`. Prefer `getId(cart)`.

If you treat this as a learning repo, fixing these is a great way to practice debugging and clean code.

## Contributing / next steps

If you want to extend this repo, good additions would be:
- A `package.json` with scripts (lint/test/run)
- Basic unit tests (Jest/Vitest) for each function in `javascriptLogic.js`
- More exercises covering:
  - string manipulation
  - object transformations with `reduce`
  - async request patterns with fetch/axios (mocked)

---
If you want, tell me whether you’re running this in **Node** or the **browser**, and I can propose a clean folder structure (`src/`, `notes/`, `tests/`) and a set of progressive exercises.