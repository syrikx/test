
// serverjs

// [LOAD PACKAGES]
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

    //localhost 로컬 호스트
    //:27017  몽고디비 포트
    //local db 생성시 만든 폴더 명
    var databaseURL = 'mongodb://localhost/users';
    mongoClient.connect(databaseURL,
        function (err, db)
        {
            if (err)
            {
                console.log('db connect error');
                return;
            }
 
            console.log('db was connected : ' + databaseURL);
            database = db;          //이 구문까지 실행되었다면 ongoDB 에 연결된 것
        }
    );


// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]

var port = process.env.PORT || 3000;

// [CONFIGURE ROUTER]
var router = require('./routes')(app);

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});

app.engine('html', require('ejs').renderFile);

var users = db.collections("users");
var result = users.find({});
