var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/Nelp';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', function(err) {
   console.log('Error : ', err);
});
db.on('open', function() {
   console.log('Open Event');
});

var MovieScheme = mongoose.Schema({
  title : String,
  director : String,
  year : Number,
  synopsis : String
});
var Movie = mongoose.model('Movie', MovieScheme);

// Promise Based
  // notDefined는 스키마에 정의된 항목이 아니다. - 저장 안됨
  var starwars = new Movie({title:'스타워즈7', director:'JJ 에이브럼스', year:2015, notDefined:true});
  starwars.save().then(function(product) {
     console.log('Save Resolved : ', product);
  }, function rejected(err) {
     console.log('Save Rejected : ', err);
  });   

// Movie.create({title:'아바타', director:'제임스 카메론', year:2010})
  Movie.findOne({title:'아바타'}).exec(function(err, docs) {
     console.log(docs);
  });
Movie.findOne({title:'아바타'}).exec(function(err, doc) {
      if ( doc ) {
         doc.title = 'Avata';
         doc.save(function(err, product) {
            console.log('Modify and Save : ', product);
         });         
      }
      if ( !doc ){
	console.log('No title like that.');
	}
   });
