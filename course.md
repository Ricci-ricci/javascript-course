# JavaScript + React Course Notes (Clean, Correct, Professional)

These notes are written to be:
- **Correct** (examples run with minimal changes)
- **Structured** (easy to scan)
- **Practical** (the reasons behind features, not just syntax)

---

## Table of contents

1. [Async JavaScript: Promises vs Async/Await](#1-async-javascript-promises-vs-asyncawait)
2. [Fetch vs Axios](#2-fetch-vs-axios)
3. [Try/Catch](#3-trycatch)
4. [Array methods: map / filter / reduce](#4-array-methods-map--filter--reduce)
5. [Closures](#5-closures)
6. [Basic OOP (Classes, private fields)](#6-basic-oop-classes-private-fields)
7. [Event Loop: Call Stack / Web APIs / Microtasks / Macrotasks](#7-event-loop-call-stack--web-apis--microtasks--macrotasks)
8. [React (Professional Level)](#8-react-professional-level)
   - [Component structure](#component-structure)
   - [Props](#props)
   - [Props drilling](#props-drilling)
   - [Lifting state](#lifting-state)
   - [`useState`](#usestate)
   - [`useEffect`](#useeffect)
   - [`useContext`](#usecontext)
   - [Controlled forms](#controlled-forms)
   - [Basic optimization: `useMemo` / `useCallback`](#basic-optimization-usememo--usecallback)
   - [Clean component architecture](#clean-component-architecture)

---

## 1) Async JavaScript: Promises vs Async/Await

### Why async exists
Some values are not available immediately (network, disk, timers). JavaScript can keep running while those operations complete, and then resume work when results are ready.

### Promises
A `Promise` represents a value that will be available **in the future** (or an error).

**Promise flow:**
- `then(...)` runs when it resolves
- `catch(...)` runs when it rejects
- `finally(...)` runs in either case

```/dev/null/course.md#L1-20
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((res) => {
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    return res.json();
  })
  .then((data) => {
    console.log("Todo:", data);
  })
  .catch((err) => {
    console.error("Request failed:", err);
  });
```

### Async/Await
`async/await` is syntax built on Promises.

- `async function` always returns a Promise
- `await` pauses within the async function until the Promise resolves (or throws on reject)

```/dev/null/course.md#L21-46
async function fetchTodo() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

    const data = await res.json();
    console.log("Todo:", data);
    return data;
  } catch (err) {
    console.error("Request failed:", err);
    throw err; // rethrow if caller needs to handle it
  }
}

fetchTodo();
```

### Which should you use?
- Use **async/await** for most app code (cleaner control flow).
- Use **Promise chains** when it reads better or when you want to avoid `try/catch` blocks.

---

## 2) Fetch vs Axios

### Fetch (built-in)
- Available in browsers (and modern Node versions)
- `fetch()` resolves the Promise for HTTP errors (like 404/500). It only rejects on **network** failures.
- You must check `res.ok` yourself.

```/dev/null/course.md#L47-75
async function fetchWithFetch() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  if (!res.ok) {
    // fetch does NOT reject automatically on 404/500
    throw new Error(`HTTP error: ${res.status}`);
  }

  return res.json();
}
```

### Axios (third-party)
- Rejects on non-2xx status codes by default
- Automatically parses JSON
- Has interceptors, request cancellation utilities, etc.

```/dev/null/course.md#L76-105
import axios from "axios";

async function fetchWithAxios() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
  return res.data;
}
```

### Conclusion
- Use **fetch** if you prefer zero dependencies and are fine handling `res.ok` + parsing.
- Use **axios** if your app benefits from built-in features (interceptors, consistent error handling, etc.).

---

## 3) Try/Catch

### What it does
`try/catch` handles exceptions:
- synchronous errors
- async errors *inside `async` functions* (via `await`)

```/dev/null/course.md#L106-131
try {
  JSON.parse("{bad json}");
} catch (err) {
  console.error("Parsing failed:", err.message);
}
```

**In async/await:**
```/dev/null/course.md#L132-155
async function example() {
  try {
    const res = await fetch("https://example.com");
    // ...
  } catch (err) {
    console.error("Async error:", err);
  }
}
```

---

## 4) Array methods: map / filter / reduce

### `map` (transform items)
Returns a new array with the same length.

```/dev/null/course.md#L156-170
const nums = [1, 2, 3];
const squares = nums.map((n) => n * n);
console.log(squares); // [1, 4, 9]
```

### `filter` (keep some items)
Returns a new array with items that match the condition.

```/dev/null/course.md#L171-186
const nums = [1, 2, 3, 4, 5];
const evens = nums.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4]
```

### `reduce` (fold into one value)
Accumulates array into one value (sum, object, map, etc.)

```/dev/null/course.md#L187-214
const nums = [1, 2, 3, 4, 5];

const sum = nums.reduce((acc, n) => {
  return acc + n;
}, 0);

console.log(sum); // 15
```

**Rule of thumb:**
- `map` → transform
- `filter` → select
- `reduce` → aggregate/build something (sum, object, grouping, etc.)

---

## 5) Closures

### What a closure is
A closure is when a function “remembers” variables from the scope where it was created, even after that outer function has returned.

```/dev/null/course.md#L215-246
function makeCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const c1 = makeCounter();
console.log(c1()); // 1
console.log(c1()); // 2

const c2 = makeCounter();
console.log(c2()); // 1 (separate closure)
```

Closures are used heavily in:
- React hooks
- event handlers
- encapsulating private state
- factories

---

## 6) Basic OOP (Classes, private fields)

### Idea
OOP groups data (state) and behavior (methods) together.

Modern JS supports **private fields** using `#`.

```/dev/null/course.md#L247-292
class BankAccount {
  #balance = 0;

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount <= 0) throw new Error("Amount must be positive");
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const acc = new BankAccount("Richie");
acc.deposit(100);
acc.withdraw(30);
console.log(acc.getBalance()); // 70
```

---

## 7) Event Loop: Call Stack / Web APIs / Microtasks / Macrotasks

### Mental model
JavaScript runs your code in a **single thread** using the **Call Stack**. Async work runs in the runtime (browser/Node) and schedules callbacks back into JS.

### Key parts
1. **Call Stack (sync code)**
2. **Runtime / Web APIs** (timers, events, networking)
3. **Queues**
   - **Microtasks**: Promise callbacks (`then/catch/finally`), `queueMicrotask`
   - **Macrotasks**: timers, UI events, message events

### Important rule
When the call stack is empty:
1) Run **all microtasks**  
2) Then run **one macrotask**  
3) Repeat  

```/dev/null/course.md#L293-330
console.log("A");

setTimeout(() => console.log("timeout"), 0);

Promise.resolve().then(() => console.log("promise"));

console.log("B");

// Output:
// A
// B
// promise
// timeout
```

---

# 8) React (Professional Level)

React builds UI with **components**. UI updates happen when **state** changes. You should aim for:
- predictable data-flow
- small reusable components
- clarity over cleverness
- performance only when needed (measure first)

---

## Component structure

A very common professional split:

### Container / Feature component
- owns state
- performs effects (fetch, subscriptions)
- decides what to render

### Presentational component
- renders UI
- receives data and callbacks via props
- ideally pure and easy to test

---

## Props

Props are how data flows **down** the component tree.

```/dev/null/course.md#L331-356
function Greeting({ name }) {
  return <h1>Hello {name}</h1>;
}

function App() {
  return <Greeting name="Richie" />;
}
```

Important: props are read-only. Don’t mutate them.

---

## Props drilling

Props drilling happens when you pass props through many intermediate components that don’t use them.

Is it always bad? No.
- A small amount is often simpler than adding context too early.
- It becomes painful when many levels forward the same “plumbing props”.

Solutions:
- Lift state up to the nearest common parent
- Use context for cross-cutting values (theme/auth/locale)
- Use composition patterns (`children`) when appropriate

---

## Lifting state

If multiple siblings need the same state, store it in the nearest common ancestor and pass it down as props.

```/dev/null/course.md#L357-405
import { useState } from "react";

function Parent() {
  const [query, setQuery] = useState("");

  return (
    <>
      <SearchBox query={query} onQueryChange={setQuery} />
      <Results query={query} />
    </>
  );
}

function SearchBox({ query, onQueryChange }) {
  return (
    <input
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      placeholder="Search..."
    />
  );
}

function Results({ query }) {
  return <div>Results for: {query}</div>;
}
```

---

## `useState`

### What it is
Local state for a component instance.

### Rules
- Never mutate arrays/objects in state.
- Use functional updates when next state depends on previous state.

```/dev/null/course.md#L406-444
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function inc() {
    setCount((prev) => prev + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={inc}>Increment</button>
    </div>
  );
}
```

---

## `useEffect`

### What it is
Runs after render to synchronize with something outside React:
- fetch data
- subscribe/unsubscribe
- timers
- manual integrations

### Correct pattern for fetching
- handle loading/error states
- avoid setting state after unmount

```/dev/null/course.md#L445-510
import { useEffect, useState } from "react";

function User({ userId }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | loaded | error

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    async function load() {
      setStatus("loading");
      try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const data = await res.json();
        if (!cancelled) {
          setUser(data);
          setStatus("loaded");
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setStatus("error");
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (!userId) return <p>Enter a userId</p>;
  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Something went wrong.</p>;
  if (!user) return null;

  return <div>User: {user.name}</div>;
}
```

---

## `useContext`

### What it is
Context lets you share values across a subtree without passing props through every layer.

Use cases:
- auth user
- theme
- language/locale
- feature flags

Professional tips:
- Avoid one mega-context updated frequently (causes many rerenders).
- Split contexts by concern.
- Wrap usage in a custom hook that enforces “must be in provider”.

```/dev/null/course.md#L511-580
import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = useMemo(() => {
    return {
      user,
      login: async () => setUser({ id: 1, name: "Anna" }),
      logout: () => setUser(null),
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
```

---

## Controlled forms

A controlled input is one where React state is the source of truth (`value` / `checked` driven by state).

Why it matters:
- validation
- conditional disabling
- serialization on submit
- predictable behavior

```/dev/null/course.md#L581-660
import { useState } from "react";

function SignupForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    newsletter: false,
  });

  function update(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log("Submit:", form);
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        placeholder="Email"
      />

      <input
        value={form.password}
        type="password"
        onChange={(e) => update("password", e.target.value)}
        placeholder="Password"
      />

      <label>
        <input
          type="checkbox"
          checked={form.newsletter}
          onChange={(e) => update("newsletter", e.target.checked)}
        />
        Subscribe
      </label>

      <button type="submit">Create account</button>
    </form>
  );
}
```

---

## Basic optimization: `useMemo` / `useCallback`

### The professional rule
Only optimize when you have evidence (Profiler / slow renders).

### `useMemo`
Memoizes a **computed value** so it’s only recomputed when dependencies change.

```/dev/null/course.md#L661-704
import { useMemo, useState } from "react";

function Products({ items }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => item.name.toLowerCase().includes(q));
  }, [items, query]);

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {filtered.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </>
  );
}
```

### `useCallback`
Memoizes a **function reference** so children don’t receive a new function each render.

Useful when:
- passing callbacks to `React.memo`-wrapped children
- dependencies need stable identity

```/dev/null/course.md#L705-758
import { memo, useCallback, useState } from "react";

const ChildButton = memo(function ChildButton({ onClick }) {
  console.log("Child render");
  return <button onClick={onClick}>Increment</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  const inc = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div>
      <p>{count}</p>
      <ChildButton onClick={inc} />
    </div>
  );
}
```

---

## Clean component architecture

### Goals
- Predictable data flow
- Testable components
- Minimal coupling
- UI separated from business logic
- Easy refactors

### Practical patterns

#### A) Colocate logic in custom hooks
Put fetching, derivations, and event logic into hooks:
- `useUsers()`
- `useCart()`
- `useAuth()`

This keeps components declarative.

#### B) Keep “state ownership” clear
- UI-only state (modal open, input text): `useState` in the component
- Shared screen state: lift to the page/container
- Cross-app concerns: context or a store

#### C) Avoid “God components”
If a component has:
- data fetching + table + form + validation + routing logic
Split it.

Example split:
- `UsersPage` (container)
- `UsersView` (presentational)
- `useUsersModel` (hook)

---

## React professional mental model (summary)

1. Use `useState` for local UI state.
2. Lift state to share it.
3. Use props as default.
4. Use context for cross-cutting values (auth/theme).
5. Use `useEffect` for side effects and synchronization (not for “deriving state”).
6. Optimize with `useMemo`/`useCallback` only when needed.
7. Keep components small; pull logic into hooks; structure by features.

---