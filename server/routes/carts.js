const router = require('express').Router();
const cartCtrl = require('../controllers/shoppingCart.js');


router.post('/cart', cartCtrl.addToCart);
router.get('/cart', cartCtrl.getCart);
router.get('/cart/delete/:productId', cartCtrl.removeFromCart);

module.exports = router;