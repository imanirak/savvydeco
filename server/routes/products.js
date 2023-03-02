
const router = require('express').Router();
const productsCtrl = require('../controllers/products');


router.get('/products/:id',productsCtrl.prodId)
router.get('/new', productsCtrl.newProd);
router.post('/',productsCtrl.create);
router.get("/products/:id/edit", productsCtrl.prodEdit);
router.put("/products/:id", productsCtrl.prodUpdate);
router.delete("/products/:id", productsCtrl.prodDestroy);


module.exports=router;
