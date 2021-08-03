// function asyncFunction(callback) {
//   setTimeout(callback, 200);
// }

let asyncVariable = (callback) => { // Get console.log in callback and variable color = blue
  setTimeout(callback, 200); // Wait 200, we have color = blue. Run console.log
  // callback();
}

let color = 'blue';

(color => {
  asyncVariable(() => { // Call asyncVariable and send it callback with console.log. Create variable color and send color = blue
    console.log(`The color is ${color}`);
  });
})(color);

color = 'green';

