var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost;
var db;

MongoClient.connect(url, function (err, database) {
   if (err) {
      console.error('MongoDB 연결 실패', err);
      return;
   }

   db = data;
});

var movies = db.collections('books');
// Promise Based  
  movies.insert({ title:'스타워즈7', director:'JJ 에이브럼스', year:2015}).then(function(results) {
     // console.log('== Resolved\n', results);
     console.log('Promise Based Insert Result : ', results);
  }, function(err) {
     console.log('== Rejected\n', err);      
  });
