const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  foodItems: {
    type: Array,
    required: true,
  },
  couponApplied: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    default:null,
  },
  cartTotal: {
    type: String,
    required: false,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  updateOn: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("cart", CartSchema);