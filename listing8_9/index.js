const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

  // the following code examples can be pasted here...

  console.log('Client ready');
  const article = {
    title: 'I like cake 6',
    content: 'It is quite good 6.'
  };

  try {
    // await collection.insertOne(article);
    await collection.insertOne(article).then(result => {
      console.log('Ruslan-1');
      // console.log(result.insertedId);
      console.log(result);
      console.log('Ruslan-2');
      // console.log(article._id);
      console.log(article);
      console.log('Ruslan-3');
    });
  }
  catch (error) {
    if (error instanceof MongoServerError) {
      console.log(`Error worth logging: ${error}`); // special case for some reason
    }
    throw error; // still want to crash
  }

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

