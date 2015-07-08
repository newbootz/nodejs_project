//dependencies




var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));	

app.get('/contactlist', function (req, res)
{
	console.log("I received a GET request")

	db.contactlist.find(function (err, docs)
	{
		console.log(docs);
		res.json(docs);
	});

	// person1 = {
	// 	name: 'Tim',
	// 	email: 'tim@email1.com',
	// 	number: '(111) 111-1111'
	// };

	// person2 = {
	// 	name: 'Emily',
	// 	email: 'emily@email2.com',
	// 	number: '(222) 222-2222'
	// };

	// person2 = {
	// 	name: 'Emily',
	// 	email: 'emily@email2.com',
	// 	number: '(222) 222-2222'
	// };

	// person3 = {
	// 	name: 'John',
	// 	email: 'john@email3.com',
	// 	number: '(333) 333-3333'
	// };

	// var contactlist = [person1, person2, person3];
	// res.json(contactlist);



});

// app.post('/contactlist', function (req, res)
// {
// 	console.log(req.body);
// 	db.contactlist.insert(req.body, function (err, doc)
// 	{
// 		res.json(doc);
// 	})
// });


/*
fixes the glitch problem, for post
*/
app.post('/contactlist',function(req,res){
    db.contactlist.insert({name: req.body.name, email: req.body.email, number: req.body.number},function(err, doc){
        res.json(doc);
    });
});


// app.delete('/contactlist/:id', 
// 	function(req, res)
// 	{
// 		var id = req.params.id;
// 		console.log(id);
// 		//something is wrong here
// 		db.contactlist.remove( {_id: mongojs.ObjectId(id) }, 
// 			function(err, doc)
// 			{
// 				//send the item that we are removing back to the controller
// 				res.json(doc);
// 			}
// 		);

// 	}
// );


app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/contactlist/:id', function (req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});


app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  //outputs the updated value for name on the command line
  console.log(req.body.name);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    //the content that you want to update the db with
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
    	//respond with the json of the doc that we updated
      res.json(doc);
    }
  );
});





app.listen(3000);
console.log("Server running on port 3000");











