// myThrottle and myDebounce

// myThrottle

// Suppose we want to limit how frequently a function can be called.A throttle function allows us to specify a minimum time interval that must pass between invocations.This can be especially useful if the function does something computationally expensive.It is also sometimes used for games to limit how often a player can trigger some event.

// Write your own myThrottle(interval) function on the Function.prototype.myThrottle should take an interval as an argument and return a "throttled" version of the original function that can only be invoked every interval milliseconds.In order to accomplish this, declare a variable, tooSoon, outside of the scope of the returned function.Your returned function should close over the tooSoon variable and:

// do nothing if tooSoon is true
// if tooSoon is false:
// set tooSoon to true
// use setTimeout to set tooSoon back to false after interval milliseconds
// invoke the original function with the original arguments.
// function func (num1, num2) {
//     return num1 + num2;
// }
// let throttledFunc = func.myThrottle(3000) 

Function.prototype.myThrottle = function (interval) {
    // declare a variable, tooSoon, outside of the scope of the returned function.Your returned function should close over the tooSoon variable and:
    let tooSoon = false;
    return (...args) => {
        if (!tooSoon) {
          // debugger;
            tooSoon = true;
            setTimeout(() => {tooSoon = false}, interval);
            this(...args);
        }
    };
  };

// Once you think you have it working, try the following example code:

// class Neuron {
//     fire() {
//         console.log("Firing!");
//     }
// }

// const neuron = new Neuron();

// When we create a new Neuron,
// we can call #fire as frequently as we want

// The following code will try to #fire the neuron every 10ms. Try it in the console:
// let interval = setInterval(() => {
//     neuron.fire();
// }, 10);

// // You can use clearInterval to stop the firing:
// clearInterval(interval);

// // Using Function#myThrottle, we should be able to throttle
// // the #fire function of our neuron so that it can only fire
// // once every 500ms:

// neuron.fire = neuron.fire.myThrottle(2000);
// interval = setInterval(() => {
//     neuron.fire();
// }, 10);


// This time, if our Function#myThrottle worked correctly,
// the Neuron#fire function should only be able to execute
// every 500ms, even though we're still trying to invoke it
// every 10ms!

// If we want this behavior for ALL neurons, we can do the same logic in the constructor:

// class Neuron {
//     constructor() {
//         this.fire = this.fire.myThrottle(500);
//     }

//     fire() {
//         console.log("Firing!");
//     }
// }


// myDebounce

// Like myThrottle, a debounce function is another way of restricting function invocations.In a debounced function, the specified interval represents how much time must pass without the debounced function being invoked, before the original function is invoked automatically.Essentially, each time the debounced function is invoked, it resets a countdown(setTimeout).If the countdown completes before the debounced function is invoked again, it will invoke the original function.To better understand debounced functions, consider the following example:

// We have a SearchBar class that stores a query string.Every time the user calls SearchBar#type with a letter, the new letter is added to the query, and the search function is invoked to "search" for the query:

    class SearchBar {
        constructor() {
            this.query = "";

            this.type = this.type.bind(this);
            this.search = this.search.bind(this);
        }

        type(letter) {
            this.query += letter;
            this.search();
        }

        search() {
            console.log(`searching for ${this.query}`);
        }
    }
// Below, we create a new SearchBar, and write a function that will "type" all of the characters in the string "hello world".Test out the following code:

const searchBar = new SearchBar();

const queryForHelloWorld = () => {
    searchBar.type("h");
    searchBar.type("e");
    searchBar.type("l");
    searchBar.type("l");
    searchBar.type("o");
    searchBar.type(" ");
    searchBar.type("w");
    searchBar.type("o");
    searchBar.type("r");
    searchBar.type("l");
    searchBar.type("d");
};

queryForHelloWorld();

// When we run the queryForHelloWorld function, we "type" each character in the string "hello world", and execute a new search every time a new character is added.This is a good way to show "live" results to our user(they don't have to press enter or click a button), but executing a search every time can be incredibly inefficient. A much better solution would be to execute a search whenever we think the user has stopped (or paused) typing. A common way to achieve this functionality is by making a debounced version of our function:

// Function#myDebounce accepts an interval as an argument and returns a "debounced" function
//     when the debounced function is invoked, it sets a timeout that will invoke the original function after interval milliseconds have elapsed
// if the debounced function is invoked early, it resets the timeout
// Write your own myDebounce function on the Function.prototype.It should take an interval as an argument and return a "debounced" version of the original function.Using Function#myDebounce, we should be able to make SearchBar#search only execute once it hasn't been executed for at least 500ms:

// // Assign searchBar.search to the returned debounced version
// searchBar.search = searchBar.search.myDebounce(500);
// Try running the queryForHelloWorld function again.This time, you should only see the search for the last query.This is because every subsequent call to the debounced search function resets the timeout - only the last call will end up being invoked.In effect, we've prevented any wasteful searches by only searching once the user stops "typing" for at least 500ms!