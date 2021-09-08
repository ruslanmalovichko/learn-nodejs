const assert = require('assert');
describe('todo tests', () => {
  it('todo list test', async () => {
    await browser.url('/');
    console.log('Ruslan 1');
    await browser.getTitle().then(title => assert.equal(title, 'My to-do list'));
    console.log('Ruslan 2');
  });
});

