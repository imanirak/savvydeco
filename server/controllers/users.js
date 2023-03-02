const Express = require('express');
const user = require('../models/user');
const userDb = require('../models/user');
const Products = require('../models/products');

function index(req,res){
    userDb.find({}, function(err, users){
        res.render('users/index'), {users, user: req.user}
		
    });

}

const oneUser = (req, res) => {
	userDb.findById(req.params.id, (err, foundUser) => {
		if (err) res.send(err);

		const context = { user: foundUser };
		res.render("index", context);
	});
};

function updateUser(req,res){
    userDb.findById(req.params.id, function (err,user){
     
        if (err) {console.log(err)}
        else {            
            Products.find({seller:user.id},function(err,products){
                if (err){
                    console.log("There was an error:",err)
                }
                else {
                    res.render('users/show',{
                        products, user
                        })
                }
            })
        }
    })
}

module.exports = {
   index,
   oneUser,
   updateUser,
}
