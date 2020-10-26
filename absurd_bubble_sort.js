// absurdBubbleSort

const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// In this exercise, we write a method called absurdBubbleSort(arr, sortCompletionCallback).Instead of using the traditional >, we'll prompt the user to perform each comparison for us.

// First, write a method askIfGreaterThan(el1, el2, callback) which prompts the user to compare two elements.The user can type in "yes" or "no": if the user indicates that el1 > el2, askIfGreaterThan should call callback with true.Else, it should call callback with false.

//     You'll want to set up a global reader variable (use readline.createInterface). askIfGreaterThan should use the question method.
function askIfGreaterThan(el1, el2, callback) {
  reader.question(`Is ${el1} greater than ${el2}?: `, function(answer) { 
    return answer === 'yes' ?  callback(true) : callback(false);  
  });
}
// reader.close;
// askIfGreaterThan(2, 5, (boolean) => { 
//   boolean === true ? console.log('congrats') : console.log('failure');
//   reader.close; 
// });
// Test it out.Make sure you can ask for input and that the input passes to the callback correctly.

//     Next, write a method innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop).This recursive function should:
function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if (i < arr.length - 1) {
    debugger
    askIfGreaterThan(arr[i], arr[i+1], function(isGreaterThan){
        if (isGreaterThan) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            madeAnySwaps = true;
        };
      innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
    });
  } else {
    debugger
    outerBubbleSortLoop(madeAnySwaps);
    return arr
  };
};
//     If i < arr.length - 1, it should call askIfGreaterThan, asking the user to compare arr[i] and arr[i + 1].
// For a callback to askIfGreaterThan, pass in an anonymous helper function.This should:
// Take in a single argument: isGreaterThan; askIfGreaterThan will pass either true or false as this argument.
// Perform a swap of elements in the array if necessary.
// Call innerBubbleSortLoop again, this time for i + 1. It should pass madeAnySwaps.Update madeAnySwaps if you did swap.
// Call outerBubbleSortLoop if i == (arr.length - 1).It should receive madeAnySwaps as an argument.
// This method should now perform a single pass of bubble sort.Test out innerBubbleSortLoop, passing in dummy variables.For example, instead of actually writing the outerBubbleSortLoop method, pass in a dummy method that console.logs "In outer bubble sort".

// function outerBubbleSortLoop (boolean) {
//   console.log(boolean);
//   reader.close;
// }

// let arr = [3, 4, 1, 2]
// innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);


// This idea(testing methods on their own by passing in dummy arguments) is crucial to understand larger chunks of code that you write.Don't be embarrassed to test out methods after you've only written one line of them.It's very bad software practice to write many lines of code before testing anything, especially if you're a junior developer.

//     Lastly, write a method absurdBubbleSort(arr, sortCompletionCallback).Define a function outerBubbleSortLoop inside of absurdBubbleSort.It should:
function absurdBubbleSort(arr, sortCompletionCallback) {
    function outerBubbleSortLoop(madeAnySwaps) {
        if (madeAnySwaps) {
            innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
        } else {
            sortCompletionCallback(arr);
        }
    };
    outerBubbleSortLoop(true);
}
// If madeAnySwaps == true, call innerBubbleSortLoop.It should pass in arr, an index of 0, and false to indicate that no swaps have been made.For a callback to innerBubbleSortLoop, pass outerBubbleSortLoop itself.
// If madeAnySwaps == false, sorting is done! call sortCompletionCallback, passing in arr, which is now sorted!
// To kick things off, absurdBubbleSort should call outerBubbleSortLoop(true).This will call the first inner loop to be run.

//     Here's a code skeleton:

// const readline = require("readline");

// const reader = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// // Write this first.
// function askIfGreaterThan(el1, el2, callback) {
//     // Prompt user to tell us whether el1 > el2; pass true back to the
//     // callback if true; else false.
// }

// // Once you're done testing askIfGreaterThan with dummy arguments, write this.
// function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
//     // Do an "async loop":
//     // 1. If (i == arr.length - 1), call outerBubbleSortLoop, letting it
//     //    know whether any swap was made.
//     // 2. Else, use `askIfGreaterThan` to compare `arr[i]` and `arr[i +
//     //    1]`. Swap if necessary. Call `innerBubbleSortLoop` again to
//     //    continue the inner loop. You'll want to increment i for the
//     //    next call, and possibly switch madeAnySwaps if you did swap.
// }

// // Once you're done testing innerBubbleSortLoop, write outerBubbleSortLoop.
// // Once you're done testing outerBubbleSortLoop, write absurdBubbleSort.

// function absurdBubbleSort(arr, sortCompletionCallback) {
//     function outerBubbleSortLoop(madeAnySwaps) {
//         // Begin an inner loop if you made any swaps. Otherwise, call
//         // `sortCompletionCallback`.
//     }

//     // Kick the first outer loop off, starting `madeAnySwaps` as true.
// }

absurdBubbleSort([3, 2, 1], function (arr) {
    console.log("Sorted array: " + JSON.stringify(arr));
    reader.close();
});