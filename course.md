I / ASYNC AND AWAIT VS PROMISES
      why use async await or promise first  , the objectif is to be able to access a object that may not be accessible right away and wait for it to be accessible before we can use it. for example, when we fetch data from an API, we need to wait for the response before we can use the data.

      1) Async and await are a syntax on top of promises that allow us to write asynchronous code in a more synchronous way.
      
      async = this function always return a promise, even if you return a non-promise value. The returned promise will be resolved with the value you return.
      
      await = this keyword can only be used inside an async function. It makes the function pause until the promise is resolved, and then it returns the resolved value.
      
      2) The main difference between async/await and promises is that async/await allows us to write asynchronous code in a more synchronous way, making it easier to read and understand. With promises, we have to use .then() and .catch() to handle the resolved and rejected values, which can lead to callback hell if we have multiple nested promises.
      
      NB: i use ## to comment cause it create a heading in markdown and it make it more readable. and cause this a markdown file, not a javascript file, so i can use whatever i want to comment down the code.
      
## Exemple of Promise 
      fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
      
      ""Explanation =
## We fetch data from an API using promises
      fetch('https://api.example.com/data')
## then we make the respinse en json
        .then(response => response.json())
## then we log the data
        .then(data => console.log(data))
## we catch any error that occurs during the fetch or the json parsing
        .catch(error => console.error(error));


## Exemple of Async/Await
      async function fetchData() {
        try {
          const response = await fetch('https://api.example.com/data');
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }
Explanation 

## We define an async function called fetchData
      async function fetchData() {
## we use try catch to handle any error that may occur during the fetch or the json parsing
        try {
## we fetch data from an API and wait for the response to be resolved
          const response = await fetch('https://api.example.com/data');
## we make the response en json and wait for the json parsing to be resolved
          const data = await response.json();
## we log the data
          console.log(data);
## we catch any error that occurs during the fetch or the json parsing
        } catch (error) {
          console.error(error);
        }
      }



II ) Fetch and Axios 


1) Fetch is a built-in JavaScript function that allows us to make HTTP requests. It returns a promise that resolves to the response of the request. Axios is a popular third-party library that also allows us to make HTTP requests, but it has some additional features and a different syntax.


## Exemple of fetch
      function fetchData(){
        const response  = await fetch("api");
        const data = await response.json();
        console.log(data);
      }


FETCH return a promise of a response
important = fetch only rejects network error and it does not reject for HTTP error status codes (like 404 or 500). So we need to check the response status code to handle errors properly with res.ok.
AXIOS in other hand, it rejects for both network errors and HTTP error status codes, so we can handle errors in the catch block without checking the response status code.
## Exemple of Axios
import axios from 'axios';

      async function fetchData() {
        try {
          const response = await axios.get('https://api.example.com/data');
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }


CONCLUSION = both are good if u want to not have depedencies on third party library and yo want build in function use fetch , but has to handle some parsing and res.ok by yourself , and in the other hand if you want to have a more powerful and easy to use library with more features and you don't mind having a dependency on a third party library, then axios is a good choice.



III) Array Method (Map filter and Reduce)


 Map, filter and reduce are all array methods that allow us to manipulate arrays in different ways.

  1)map  = transform each element of an array and return a new array with the transformed elements. It takes a callback function as an argument, which is called for each element in the array.

## Exemple of map 

  const nums [1,2,3];
  const squares = nums.map(n =>n*n );
  console.log(squares); // [1,4,9]

so the point is to create a new variables names squares and multiply each element inside nums by hymself and return a new array with the squared values.
map(n => n * n) the first n represent the current element in the array and the second n represent the same element but we can do whatever we want with it, in this case we multiply it by itself to get the square of the number.


2) filter = create a new array with all elements that pass the test implemented by the provided function. It takes a callback function as an argument, which is called for each element in the array.
## Exemple of filter 

  const nums [1,2,3,4,5];
  const evenNums = nums.filter(n => n % 2 === 0);
  console.log(evenNums); // [2,4

so the point is to create a new cariables names evenums and filter all the even number inside the nums array ( n % 2 === 0 if it s equal to true then it is a even number else is not false and no include it inside the new array evenNums)


3) reduce = apply a function against an accumulator and each element in the array (from left to right) to reduce it to a single value. It takes a callback function as an argument, which is called for each element in the array, and an optional initial value for the accumulator.
## Exemple of reduce
  const nums [1,2,3,4,5];
  //here acc is the accumulator and n is the current element in the array and the initial value of the accumulator is 0
  
  (acc , n) => acc + n , O
  
  acc = accumulator 
  n = current element in the array
  acc + n = operation we do acc the accumulator to the current element n and return the new value of the accumulator
  0 = represent the initial value of the accumulator acc
  
  const sum = nums.reduce((acc, n) => acc + n, 0);
  console.log(sum); // 15

so the point is to create a new variable named sum and use reduce to sum all the numbers inside the nums array. The reduce method takes a callback function with two parameters: the accumulator (acc) and the current element (n). The initial value of the accumulator is 0. The callback function adds the current element (n) to the accumulator (acc) and returns the new value of the accumulator. After iterating through all the elements in the array, the final value of the accumulator will be the sum of all the numbers in the array, which is 15 in this case.


4) Try and catch (easy one)


    this is a error handling function that allows us to handle errors in a more elegant way. It consists of two blocks: the try block and the catch block. The try block contains the code that we want to execute, and the catch block contains the code that we want to execute if an error occurs in the try block.the .catch() in promise is similar to the catch block in try and catch, it allows us to handle errors that may occur during the execution of the promise. The main difference is that try and catch is used for synchronous code, while .catch() is used for asynchronous code with promises. In async/await, we can use try and catch to handle errors in a more elegant way, instead of using .catch() with promises.

we have a lot of example in the async and await and fetch axios example


5) Closure


 it is when a function remember the variables that were in scope when the function was created, even if the function is executed outside of that scope. This allows us to create functions that can access and manipulate variables that are not in their immediate scope.


## Exemple of closure


  function makeCounter(){
    let count = 0;
    return function(){
      count += 1;
      return count;
    }
  }
  const c1 = makeCounter();
  console.log(c1()); // 1
  console.log(c1()); // 2

so here the make counter increment the count 0 to 1 with the count += 1 and return the new value of count, and since the inner function is a closure it can access the count variable even after the makeCounter function has finished executing. So when we call c1() it will return 1 and when we call it again it will return 2 because the count variable is still in scope and can be modified by the inner function.


6) Basic OOP (Object - oriented Programming)

so the ideas of basic oop is to create objects that have properties and methods that can manipulate those properties. We can use classes to create objects and define their properties and methods.

it s like creating a lot of variables and functions that are related to each other and put them inside a class to create an object that can manipulate those variables and functions.

example  = 

class BankAccount {
  #balance = 0; // private field (modern JS)

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("amount must be positive");
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const acc = new BankAccount("Richie");
acc.deposit(100);
console.log(acc.getBalance()); // 100


Explanation = 

class BankAccount {
## balance is the balance we use the # to make it private and we can only access it through the methods of the class, this is a new feature in javascript that allow us to create private properties and methods in a class.
    #balance = 0;
  ## here the constructor is a special method that is called when we create a new instance of the class, it is used to initialize the properties of the class. In this case we are initializing the owner property with the value passed as an argument when we create a new instance of the BankAccount class.
    constructor(owner) {
      this.owner = owner;  
    }
  ## this serve as the function to check if the amount is positive and if it is not we throw an error, if it is we add the amount to the balance.
    deposit(amount){
    if(amount <= 0){
    throw new Error("Amount must be positive");
    }
    this.#balance += amount;
    }
  ## this is used to return the current balance of the account, since the balance is private we can only access it through this method.
    getBalance(){
    return this.#balance;
    }
}
## how to use it we initialise a new instance of the BankAccount class with the name "Richie" and we call the deposit method to add 100 to the balance, then we call the getBalance method to get the current balance and log it to the console.
const acc = new BankAccount("Richie");
acc.deposit(100);
const balance = acc.getBalance();
console.log(balance); // 100










for a brief conclusion on how code work there is multoply way a code goes in javascript

a console.log is run sync

VII) The Event Loop (Call Stack / Web APIs / Microtasks / Macrotasks)

JavaScript executes your code on a single thread (one thing at a time) using the Call Stack.
“Asynchronous” work is possible because the runtime (Browser or Node.js) can do some work outside the JS engine, then schedule callbacks back into JS.

1) Call Stack (synchronous code)
This is where normal JavaScript runs immediately, line by line:
- console.log
- math / variables
- if / for / while
- calling functions normally

When people say “console.log is sync”, they mean: when execution reaches console.log on the stack, it prints right now (it doesn’t get queued like a timer callback).

2) Web APIs (Browser) / Runtime APIs (Node)
These are not the JS engine itself.
In the browser, “Web APIs” include things like:
- setTimeout / setInterval
- DOM events (click, submit, etc.)
- fetch (network requests)

In Node.js it’s similar, but implemented via Node’s runtime (libuv + OS):
- timers
- networking
- file system I/O

When you call something like setTimeout or fetch, the JS engine registers the operation with the runtime, and your JS continues running. When the operation completes, the runtime schedules a callback to be executed later by JS.

3) Queues: Microtasks vs Macrotasks
When the Call Stack becomes empty, the Event Loop decides what to run next.

A) Microtask queue (high priority)
Examples:
- Promise handlers: .then(), .catch(), .finally()
- queueMicrotask(...)

Important rule:
- After the current synchronous code finishes, JS will drain ALL microtasks before moving on to the next macrotask.

B) Macrotask queue (task queue) (lower priority)
Examples:
- setTimeout / setInterval callbacks
- DOM event callbacks (click, message, etc.)

Important rule:
- The event loop takes one macrotask, runs it to completion, then drains microtasks again.

4) The Event Loop (scheduler)
A simple way to remember the order:
1. Run synchronous code (Call Stack)
2. When stack is empty: run ALL microtasks
3. Run the next macrotask
4. Repeat

Example (order of execution)
console.log("A");

setTimeout(() => console.log("timeout"), 0);

Promise.resolve().then(() => console.log("promise"));

console.log("B");

Output order:
A
B
promise
timeout

Why?
- "A" and "B" are synchronous (Call Stack)
- Promise .then() is a microtask (runs before timers)
- setTimeout is a macrotask (runs after microtasks)

Where fetch fits
- fetch() starts the request in the runtime (Web APIs).
- When the Promise resolves, the .then() / awaited continuation is scheduled as a microtask.
- Also remember: fetch usually rejects only on network errors; HTTP 404/500 still resolve the fetch Promise, so you must check response.ok (unless you use axios, which rejects on non-2xx by default).

Node note (quick)
Node has extra details (phases) and process.nextTick() (very high priority), but the main mental model still holds:
Call Stack -> Microtasks (Promises) -> Macrotasks (timers/I/O callbacks) -> loop
