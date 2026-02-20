const numbers = [1, 2, 3, 4, 5];

const sum = (array) => {
  //declare a variable total 0
  let total = 0;
  //loop through everythings
  for (let i = 0; i < array.length; i++) {
    //on the first loop 0 = 0 + array at position 1
    // on the second loop it becomes 1 + array at position 2
    // on the third lopp it become (position 1 + position 2) + position 3 and so on
    total = total + array[i];
  }
  //return the total
  return total;
};
sum(numbers);

const max = (array) => {
  //stock the first array as max and then use it to compare with the other
  let max = array[0];
  //loop through everythings
  for (let i = 1; i < array.length; i++) {
    //at first it loop at the second position and compare to the max which is at 0 position
    // if it s superior then stock the array at second at max else don t do anything and keep max array[0]
    //
    if (array[i] > max) {
      max = array[i];
    }
  }
  return;
};
max(numbers);

const fruits = ["apple", "banana", "apple", "orange", "banana"];

const count = (array) => {
  //we create a object variable to stock everythings and all the result
  const result = {};
  //we loop through everythings
  for (let i = 0; i < array.length; i++) {
    //first we stock the array that is being looped at i position in item
    item = array[i];
    //then we check if it s inside the result variable or not with the result[item]
    if (result[item]) {
      //if it s already there then add a count + 1 like "banana" = 1 inside then add 1
      result[item] = result[item] + 1;
    } else {
      //else just give  result[item] = 1 result[item] = 1;
    }
  }
  return result;
};
count(fruits);
//remove id
const removeId = (array, idToRemove) => {
  return array.filter((item) => item.id !== idToRemove);
};
//remode id but with loop
const removeIdLoop = (array, idToRemove) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].id !== idToRemove) {
      result.push(i);
    }
  }

  return result;
};

cart = [
  { id: 1, name: "Shoes", price: 50, quantity: 2 },
  { id: 2, name: "Hat", price: 20, quantity: 1 },
];

const getId = () => {
  return cart.map((item) => item.id);
};
