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

/// POST THE DETAILS OF NEW PRODUCT FORM TO HOME
function create(req,res){
  let newProd = new Products({
      title:req.body.title,
      shortdes:req.body.shortdes,
      longdes:req.body.longdes,
      seller: req.user
  })

  console.log(req.user)
  newProd.save()

  User.findById(newProd.seller).exec(function (err, foundUser) {
      if (err) res.send(err);

      
      console.log('this is the found user',foundUser)
      foundUser.products.push(newProd._id); 
      foundUser.save(); 

      

  });
  res.redirect('/')
}
    
    // RENDER THE PRODUCT ID PAGE
    function prodId(req,res){
        Products.findById(req.params.id, function (err,foundProduct){
        
            if (err) {console.log(err)}
            else {

    User.findById(foundProduct.seller, function (err, foundSeller){
      const context = {
        product:foundProduct,
        seller: foundSeller,
        user:req.user
    }
    console.log(foundProduct)
    res.render ('products/prodId',context)


    })
              
            }
        })
    }


    //EDIT PRODUCT
    function prodEdit(req,res){Products.findById(req.params.id, (err, foundProduct) => {
 
        if (err) res.send(err);
    
        const context = { 
            product: foundProduct,
            user:req.user
        }
    
        res.render("products/edit", context)
    });
    };
    

//UPDATE PRODUCT AFTER EDIT

const prodUpdate = (req, res) => {
  Products.findByIdAndUpdate(
      req.params.id,
      { 
          $set: {

              ...req.body,
          },
      },
      { new: true },

      (err, updatedProduct) => {
          if (err) res.send(err);
          res.redirect(`/products/${updatedProduct._id}`);
      }
  );
}



// delete

const prodDestroy = (req, res) => {
  Products.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
      if (err) res.send(err);
  

      User.findById(deletedProduct.seller, (err, foundSeller) => {


          foundSeller.products.remove(deletedProduct);
          foundSeller.save();

          res.redirect(`/users/${foundSeller._id}`)
      })
  })
}


module.exports = {
    newProd,
    create,
    prodId,
    prodEdit,
    prodUpdate,
    prodDestroy,
    upload,

}