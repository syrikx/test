const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

//Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

var movies = db.collection('movies');
movies.insertOne({ title:'인터스텔라', director:'JJ 에이브럼스', year:2015}).then(function(results) {
     // console.log('== Resolved\n', results);
     //console.log('Promise Based Insert Result : ', results);
  }, 
     function(err) {
     console.log('== Rejected\n', err);      
  });
movies.find().toArray(function (err, docs) {
   console.log('== Find ALL, toArray');
   console.log(docs);
});

// Query
movies.find({ title: '인터스텔라' }).toArray(function (err, docs) {
   console.log('== Find 인터스텔라');
   console.log(docs);
});
//  client.close();
});

