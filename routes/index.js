module.exports = function(app, Book, User)
{

    app.get('/',function(req,res){
        sess = req.session;
        //console.log(sess.username);
        res.render('index.ejs', {
                userid: sess.userid,
                username: sess.username,
                usersigned: sess.usersigned,
                email: sess.email,
                sequence_id : sess.sequence_id
            });
    });

    app.get('/login_test', function(req, res){
        sess = req.session;
        sess.username = "syrikx";
        res.redirect('/test3');
    });

    app.get('/api/logout', function(req, res){
        sess = req.session;
        if(sess.id){
            req.session.destroy(function(err){
                if(err){
                    console.log(err);
                }else{
                    res.redirect('/');
                }
            })
        }else{
            res.redirect('/');
        }
    })


    app.get('/edulist',function(req,res){
        res.render('edulist.html');
     });

    app.get('/test', function (req, res) {
        var token = "AAAANhh4ufACJv9dfVGeGQuVTaz5fPF_vGCnyEPqXAfLwCN2J8ECa6rVvB7p1REyIsRc_qrzzuvCzyPPtBNrHwcty3w";
        var header = "Bearer " + token; // Bearer 다음에 공백 추가
        var api_url = 'https://openapi.naver.com/v1/nid/me';
        var request = require('request');
        var options = {
            url: api_url,
            headers: {'Authorization': header}
        }
        request.get(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
                res.end(body);
            } else {
                console.log('error');
                if(response != null) {
                    res.status(response.statusCode).end();
                    console.log('error = ' + response.statusCode);
                }
            }
        });
    });

    app.get('/test2', function (req, res) {
        var token = "6EK_C6MC9e-9apPuWIqcsVaOV3BcG57bKuafAQo9dNsAAAFs3hYv6A";
        var header = "Bearer " + token; // Bearer 다음에 공백 추가
        var api_url = 'https://kapi.kakao.com/v2/user/me';
        var request = require('request');
        var options = {
          url: api_url,
          headers: {'Authorization': header}
        };
        request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
          res.end(body);
          //          res.end(JSON.stringfy(body, undefined, 4));
        } else {
          console.log('error');
          if(response != null) {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
          }
         }
        });
    });
    
    app.get('/test3',function(req,res){
        var sess = req.session;
        console.log(sess.username);
        res.render('test.ejs', {
        })
    });

    app.get('/callback',function(req,res){
        //res.render('index.ejs')
        res.render('callback.ejs')
     });

    app.get('/member',function(req,res){
        res.render('index2.ejs')
     });

    // GET ALL USERS
    app.get('/api/users', function(req,res){
        User.find(function(err, users){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(users);
        })
    });

    // GET SINGLE BOOK
    app.get('/api/books/:book_id', function(req, res){
        Book.findOne({_id: req.params.book_id}, function(err, book){
            if(err) return res.status(500).json({error: err});
            if(!book) return res.status(404).json({error: 'book not found'});
            res.json(book);
        })
    });

    // GET BOOK BY AUTHOR
    app.get('/api/books/author/:author', function(req, res){
        Book.find({author: req.params.author}, {_id: 0, title: 1, published_date: 1},  function(err, books){
            if(err) return res.status(500).json({error: err});
            if(books.length === 0) return res.status(404).json({error: 'book not found'});
            res.json(books);
        })
    });

    // LOGIN

    app.post('/api/login', function(req, res){
        console.log(req.body);
        var id = req.body.id;
        var name = req.body.name;
        var email = req.body.email;
        sess = req.session;
        User.findOne({email:email}).exec(function(err, user) {
            if (user){
                console.log("exist");
                // console.log(user);
                sess.usersigned = true;
                sess.userid = id;
                sess.username = name;
                sess.email = email;
                sess.sequence_id = user.sequence_id;
                res.redirect('/');
            }else{
                console.log("not exist");
                sess.usersigned = false;
                sess.userid = id;
                sess.username = name;
                sess.email = email;
                sess.sequence_id = 999999
                res.redirect('/api/signup');
            }
        });
    });

    app.get('/api/signup', function(req, res){
        sess = req.session;
        res.render('signup.ejs', {
            userid: sess.userid,
            username: sess.username,
            usersigned: sess.usersigned,
            email: sess.email
        });
    })

    app.get('/api/login', function(req, res){
        console.log(req.User);
    })

    app.get('/api/signup_succeed', function(req, res){
        console.log(req.User);
        // sess = req.session;
        res.render('after_signup.ejs', {reg_error:false})
    });

    app.get('/api/signup_failed', function(req, res){
        console.log(req.User);
        sess = req.session;
        res.render('after_signup.ejs', {reg_error:true})
    });

    app.post('/', function(req, res){
        console.log(req.db);
        var email = req.body.email;
        User.findOne({email:email}).exec(function(err, user) {
            if (user){
                console.log("exist");
                console.log(user);
                res.redirect('/');
                //res.render('index2.ejs', {ttLoginStatus:true, userName:user.name, userEmail:user.email});
                //res.render('index.ejs', {user:user});
                //location.replace('/member');
                //res.render('index_member.ejs')
            }else{
                console.log("not exist");
                res.render('notsigned.ejs')
                //location.replace('/');
                //res.render('index.ejs', {ttLoginStatus:false});
                //res.render('index.ejs', {user:user});
                //res.render('index_notmember.ejs')
                //location.replace('/notmember');
            }
        });
    });

    app.post('/member', function(req, res){
        res.json("member");
    });

    app.post('/notmember', function(req, res){
        res.json("notmember");
    });

    // CREATE USER
    app.post('/api/users', function(req, res){
        var user = new User();
        user.username = req.body.username;
        user.email = req.body.email;
        user.telnumber = req.body.telnumber;
        user.kakaoid = req.body.kakaoid;
        user.naver_id = req.body.naver_id;
        user.kakao_id = req.body.kakao_id;
        user.gender = req.body.gender;
        user.birthday = req.body.birthday;
        user.sequence_id = req.body.sequence_id;
        user.affiliate = req.body.affiliate;
        user.homepage = req.body.homepage;

        user.save(function(err){
            if(err){
                console.error(err);
                // res.json({message: '이미 등록된 네이버/카카오ID 혹은 이메일 주소 입니다.'});
                // res.redirect('/views/signup.ejs', {reg_error:true})
                res.redirect('signup_failed')
                // res.json({message: '이미 등록된 네이버/카카오ID 혹은 이메일 주소 입니다.'});
                // res.json({message: '홈페이지로 redirect 합니다.'});
                return;
            }

            console.log("User Created");
            res.redirect('signup_succeed')
            //res.json({message: '회원가입을 성공적으로 완료하였습니다.'});
            //res.json({result: 1});

        });
    })

    app.post('/api/usersNaver', function(req, res){
        var user = new User();
        user.key_id = "N_"+req.body.naver_id;
        user.naver_id = req.body.naver_id;
        user.kakao_id = req.body.kakao_id;
        user.name = req.body.name;
        user.tel = req.body.tel;
        user.email = req.body.email;

        user.save(function(err){
            if(err){
                console.error(err);
                // res.json({message: '이미 등록된 네이버/카카오ID 혹은 이메일 주소 입니다.'});
                // res.redirect('/views/signup.ejs', {reg_error:true})
                res.redirect('signup_failed')
                //res.json({message: '이미 등록된 네이버/카카오ID 혹은 이메일 주소 입니다.'});
                //res.json({message: '홈페이지로 redirect 합니다.'});
                return;
            }

            console.log("User Created");
            res.redirect('signup_succeed')
            //res.json({message: '회원가입을 성공적으로 완료하였습니다.'});
            //res.json({result: 1});

        });
    });

    // UPDATE THE BOOK
    app.put('/api/books/:book_id', function(req, res){
        Book.update({ _id: req.params.book_id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'book not found' });
            res.json( { message: 'book updated' } );
        })
    /* [ ANOTHER WAY TO UPDATE THE BOOK ]
            Book.findById(req.params.book_id, function(err, book){
            if(err) return res.status(500).json({ error: 'database failure' });
            if(!book) return res.status(404).json({ error: 'book not found' });

            if(req.body.title) book.title = req.body.title;
            if(req.body.author) book.author = req.body.author;
            if(req.body.published_date) book.published_date = req.body.published_date;

            book.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'book updated'});
            });

        });
    */
    });

    // DELETE BOOK
    app.delete('/api/books/:book_id', function(req, res){
        Book.remove({ _id: req.params.book_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });

            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "book not found" });
            res.json({ message: "book deleted" });
            */

            res.status(204).end();
        })
    });
     
}
