const Products = require('../models/products')
const User = require('../models/user');
const multer = require('multer')

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Init Upload
  const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('myImage');

// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }


// RENDER THE NEW PRODUCT FORM
function newProd(req,res){
        res.render("products/new",{user:req.user})
};

// POST THE DETAILS OF NEW PRODUCT FORM TO HOME
function create(req,res){
        console.log('this is the req.user',req.user)
        let newProd = new Products({
            title:req.body.title,
            shortdes:req.body.shortdes,
            longdes:req.body.longdes,
            seller: req.user
        })
        
        newProd.save()
        
        
        upload(req, res, (err) => {
            if(err){
                res.render('index', {
                    msg: err
                });
            } else {
                if(req.file == undefined){
                    res.render('index', {
                        msg: 'Error: No File Selected!'
                    });
                } else {
                    
                    
                    User.findById(newProd.seller).exec(function (err, foundUser) {
                        if (err) res.send(err);
                        console.log('this is the found user',foundUser)
                        console.log('this is newProdId',newProd._id)
                        foundUser.products.push(newProd._id); 
                        foundUser.save(); 

                    res.render('/', {
                      msg: 'File Uploaded!',
                      file: `uploads/${req.file.filename}`,
                      user:req.user
                    });
                  }
                    )}
              
                }
            })

        }
        
            
            
            

            // res.redirect('/')
    
    // RENDER THE PRODUCT ID PAGE
    function prodId(req,res){
        Products.findById(req.params.id, function (err,foundProduct){
            console.log(req.params)
            if (err) {console.log(err)}
            else {
    
                const context = {
                    product:foundProduct,
                    user:req.user
                }
                console.log(foundProduct)
                res.render ('products/prodId',context)
            }
        })
    }

    function prodEdit(req,res){Products.findById(req.params.id, (err, foundProduct) => {
        console.log('this is req:',req.params.id)
        if (err) res.send(err);
    
        const context = { 
            product: foundProduct,
            user:req.user
        }
    
        res.render("products/edit", context)
    });
    };
    


module.exports = {
    newProd,
    create,
    prodId,
    prodEdit
}