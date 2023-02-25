const router = require('express').Router();
const cartCtrl = require('../controllers/ShoppingCart.js');

//router.get('/cart', cartCtrl.getCart);
router.post('/cart', cartCtrl.addToCart);
router.delete('/cart/delete/:productId', cartCtrl.removeFromCart);

module.exports = router;