const mongoose = require("mongoose");

const RestaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cuisine: {
    type: Array,
    required: false,
  },
  foodType: {
    type: Array,
    required: false,
  },
  branch: {
    type: String,
    required: false,
  },

  address: {
    addressLine1:{
        type:String,
        required:true,
    },
    addressLine2:{
        type:String,
        required:true,
    },

    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },

  contactNumber: {
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
  defaultRating: {
    type: Number,
    required: false,
  },
});
module.exports = mongoose.model("restaurants", RestaurantSchema);