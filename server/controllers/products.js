const Products = require('../models/products')
const User = require('../models/user');
const multer = require('multer')
const fs = require('fs');
const path = require('path');
const Image = require('../models/images');

// RENDER THE NEW PRODUCT FORM
function newProd(req, res) {
    res.render("products/new", { user: req.user })
};


/* ====== IMAGE UPLOAD  ====== */ 
// Set The Storage Engine
const Storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req, file, cb){
    cb(null,file.originalname);
  }
});
 

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

  // Init Upload
  const upload = multer({
    storage: Storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  })


function create(req, res) {
  /**
   * Uploads a new product to the database.           
   * @param {Request} req - the request object           
   * @param {Response} res - the response object           
   * @returns None           
   */
  upload.single('image')(req, res, function(err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: 'Error uploading image.' });
    }

    let newProd = new Products({
      title: req.body.title,
      shortdes: req.body.shortdes,
      longdes: req.body.longdes,
      seller: req.user,
      price: req.body.price,
      image: null
    });



    newProd.save(function(err, prod) {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error creating product.' });
      }

      /**
       * Creates a new Image object from the given file.       
       * @param {File} file - the file to create the Image object from.       
       * @returns {Image} - the new Image object.       
       */
      if (req.file) {
        let newImage = new Image({
          name: req.file.originalname,
          image: {
            data: req.file.buffer,
            contentType: req.file.mimetype
          },
          filepath: req.file.path
        });

        /**
         * Saves the image to the server.           
         * @param {Error} err - the error that occurred during the save.           
         * @param {Image} image - the image that was saved.           
         * @returns None           
         */
        newImage.save(function(err, image) {
          if (err) {
            console.log(err);
            return res.status(500).send({ message: 'Error creating image.' });
          }

          /**
           * Updates the product with the image ID.           
           * @param {string} id - the id of the product to update           
           * @param {string} imageId - the id of the image to update to           
           * @returns None           
           */
          Products.findByIdAndUpdate(newProd._id, { image: image._id }, function(err) {
            if (err) {
              console.log(err);
              return res.status(500).send({ message: 'Error updating product with image.' });
            }

            /**
             * Finds a product by its ID and populates its image.           
             * @param {string} id - the ID of the product to find.           
             * @returns None           
             */
            Products.findById(newProd._id).populate('image').exec(function(err, product) {
              if (err) {
                console.log(err);
                return res.status(500).send({ message: 'Error populating image into product.' });
              }

              res.redirect('/');
            });
          });
        });
      } else {
        /**
         * We should create an error page 404 try again,
         *  in case of failures to redirect too.
         */
        res.redirect('/');
      }
    });
  });
}


// RENDER THE PRODUCT ID PAGE
function prodId(req, res) {
    Products.findById(req.params.id, function (err, foundProduct) {

        if (err) { console.log(err) }
        else {

            User.findById(foundProduct.seller, function (err, foundSeller) {
                const context = {
                    product: foundProduct,
                    seller: foundSeller,
                    user: req.user
                }
                res.render('products/prodId', context)


            })

        }
    })
}


//EDIT PRODUCT
function prodEdit(req, res) {
    Products.findById(req.params.id, (err, foundProduct) => {

        if (err) res.send(err);

        const context = {
            product: foundProduct,
            user: req.user
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
}