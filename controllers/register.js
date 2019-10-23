var express = require('express');
var userModel = require('./../models/user-model');

var router = express.Router();


router.get('/adduser', function(request, response){
	response.render('register/adduser');
});

router.get('/userList', function(request, response){
		
		userModel.getAll(function(results){
			if(request.cookies['username'] != null){
				response.render('register/index', {register: results});		
			}else{
				response.redirect('/logout');
			}
		});	
});

router.get('/edit/:id', function(request, response){

	userModel.getById(request.params.id, function(result){
		response.render('register/edit', result);
	});
	
});

router.post('/edit/:id', function(request, response){

	var user = {
		username: request.body.username,
		password: request.body.password,
		id: request.params.id
	};

	userModel.update(user, function(status){
		
		if(status){
			response.redirect('/register/userlist');
		}else{
			response.redirect('/register/edit/'+request.params.id);
		}
	});
	
});

router.get('/delete/:id', function(request, response){

	userModel.getById(sql, function(result){
		response.render("register/delete", {user: result[0]});
	})
});

router.post('/delete/:id', function(request, response){

	userModel.delete(sql, function(status){	
		if(status){
			response.redirect("/register/userList");
		}else{
			response.redirect("/register/delete/"+request.params.id);	
		}
	})
});

router.get('/details/:id', function(request, response){

	userModel.getById(request.params.id, function(result){
		response.render("register/details", result);
	})
});

module.exports = router;



