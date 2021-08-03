// function asyncFunction(callback) {
//   setTimeout(callback, 200);
// }

let asyncVariable = (callback) => { // Get console.log in callback
  setTimeout(callback, 200); // Wait 200, color will be changed with green. Run console.log
  // callback();
}

let color = 'blue';
// asyncFunction(() => {
//   console.log(`The color is ${color}`);
// });
asyncVariable(() => { // Call asyncVariable and send it callback with console.log
  console.log(`The color is ${color}`);
});
color = 'green';

