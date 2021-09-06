'use strict';
const memdb = require('..');
const assert = require('assert');

describe('memdb', () => {
  console.log('Ruslan 1');

  beforeEach(() => {
    console.log('Ruslan before it, inside memdb');
    memdb.clear();
  });

  console.log('Ruslan 2');

  describe('syncronous .saveSync(doc)', () => {
    console.log('Ruslan 3');
    it('should save the document', () => {
      console.log('Ruslan 7');
      const pet = { name: 'Tobi' };
      // console.log(pet);
      memdb.saveSync(pet);
      const ret = memdb.first({ name: 'Tobi' });
      // console.log(ret);
      assert(ret == pet);
    });
  });

  console.log('Ruslan 4');

  describe('.first(obj)', () => {
    console.log('Ruslan 5');
    it('should return the first matching doc', () => {
      console.log('Ruslan 8');
      const tobi = { name: 'Tobi' };
      const loki = { name: 'Loki' };
      memdb.saveSync(tobi);
      memdb.saveSync(loki);
      let ret = memdb.first({ name: 'Tobi' });
      assert(ret == tobi);
      ret = memdb.first({ name: 'Loki' });
      assert(ret == loki);
    });

    it('should return null when no doc matches', () => {
      console.log('Ruslan 9');
      const ret = memdb.first({ name: 'Manny' });
      assert(ret == null);
    });
  });
});

describe('asyncronous .save(doc)', () => {
  console.log('Ruslan 6');
  it('should save the document', (done) => { // we added "done" argument, so mocha knows its async function and will wait "done()"
    const pet = { name: 'Tobi' };
    memdb.save(pet, () => {
      const ret = memdb.first({ name: 'Tobi' });
      assert(ret == pet);
      done();
    });
  });
});

