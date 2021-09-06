const vows = require('vows');
const assert = require('assert');
const Todo = require('./../todo');

console.log('Ruslan 1');

vows.describe('Todo').addBatch({
  'when adding an item': {
    topic: () => {
      console.log('Ruslan 2');
      const todo = new Todo();
      todo.add('Feed my cat');
      return todo;
    },
    'it should exist in my todos': (er, todo) => {
      console.log('Ruslan 3');
      assert.equal(todo.length, 1);
    }
  }
}).export(module);

