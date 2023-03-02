const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
 //   id: String,
  googleId: String ,
    name: String,
    email: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
    ref: 'products'
}],
shoppingCart: [{
    type: mongoose.Schema.Types.ObjectId,
ref: 'ShoppingCart'
}],
    // timestamps:true
});


const user = mongoose.model("user", userSchema);

module.exports = user;