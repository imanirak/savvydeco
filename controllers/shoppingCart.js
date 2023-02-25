const Products = require('../models/products');
const User = require('../models/user');
const ShoppingCart = require('../models/ShoppingCart');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');


// add a product to the users shopping cart
const addToCart = async (req, res) => {
    //localStorage.clear()
    // need to provide backend with productId
    // create an add to cart button passing product._id
    // POST form to /cart 
    // example on prodId for react transition
    try {
        const productId = req.body.productId;
        const price = req.body.price;
        const userId = localStorage.getItem('user');
       
          if (!localStorage.getItem('user')) {
            const guestUser = new User({
                name: 'Guest',
                email: 'guest@example.com',
              });
              await guestUser.save();
              localStorage.setItem('user', guestUser._id);
          }

        
        const product = await Products.findById(productId);

        if(!product){
            return res.status(404).json({message:"Product not found"});
        }


        if (!userId) {
            return res.status(404).json({message:"User not found"});
        }
        

        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            cart = {
                user: userId,
                items: [],
            };
        }


        const existingCartItemIndex = cart.items.findIndex(item => item.productId === productId);

        if(existingCartItemIndex !== -1){
            // add price func here
            
        } else {
            cart.items.push({
                productId: product._id,
                title: product.title,
                price: product.price
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
       

        

        res.render('carts/index',{cart});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"server error"})
    }
    
};


// remove a product from the users shopping cart
const removeFromCart = async (req, res) => {
        try {
            const productId = req.params.productId;
            const userId = localStorage.getItem('user');
           
            if (!localStorage.getItem('user')) {
                const guestUser = new User({
                    name: 'Guest',
                    email: 'guest@example.com',
                  });
                  await guestUser.save();
                  localStorage.setItem('user', guestUser._id);
            }
    
            const product = await Products.findById(productId);
    
            if(!product){
                return res.status(404).json({message:"Product not found"});
            }
    
            if (!userId) {
                return res.status(404).json({message:"User not found"});
            }
            
            let cart = JSON.parse(localStorage.getItem('cart'));
            if (!cart) {
                cart = {
                    user: userId,
                    items: [],
                };
            }
    
            const existingCartItemIndex = cart.items.findIndex(item => item.productId === productId);
    
            if(existingCartItemIndex !== -1){
                cart.items.splice(existingCartItemIndex, 1);
                localStorage.setItem('cart', JSON.stringify(cart));

                return res.redirect('/');
            } else {
                return res.status(404).json({message:"Item not found in cart"});
            }
            
        }
        catch(err){
            console.error(err);
            res.status(500).json({message:"server error"})
        }
    };


// get the users shopping cart
const getCart = async (req, res) => {

}


module.exports = {
    addToCart,
    removeFromCart,
    getCart
}