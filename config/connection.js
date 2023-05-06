const { MongoClient }  = require('mongodb');

const url = 'your server link';
const client = new MongoClient(url);


const dbName = 'myProject';

async function main() {
  
  await client.connect();
  console.log('Connected successfully to server');
 

  return client;
}


  module.exports = client;
