'use strict';
const assert = require('assert');
const Todo = require('./todo');
const todo = new Todo();
let testsCompleted = 0;

function deleteTest() {
  todo.add('Delete Me');
  assert.equal(todo.length, 1, '1 item should exist');
  todo.deleteAll();
  assert.equal(todo.length, 0, 'No items should exist');
  testsCompleted++;
}

function addTest () {
  todo.deleteAll();
  todo.add('Added');
  assert.notEqual(todo.length, 0, '1 item should exist');
  testsCompleted++;
}

function doAsyncTest(cb) { // cb store arrow function:
  // () => {
  //   console.log(`Completed ${testsCompleted} tests`);
  // }

  todo.doAsync(value => { // If everything works then function will send true because in setTimeout(cb, 2000, true); will return true on finish
    // console.log('Ruslan value start');
    // console.log(value);
    // console.log('Ruslan value end');
    assert.ok(value,'Callback should be passed true');
    testsCompleted++;

    // console.log('Ruslan cb start');
    // console.log(cb.toString());
    // console.log('Ruslan cb end');
    cb();
  });
}

function throwsTest(cb) {
  assert.throws(todo.add, /requires/); // Call todo.add without arguments.
  // This will call an error: Todo.prototype.add requires an item
  // assert.throws check error message with 'requires' word
  testsCompleted++;
}

deleteTest();
addTest();
throwsTest();
doAsyncTest(() => {
  console.log(`Completed ${testsCompleted} tests`);
});

