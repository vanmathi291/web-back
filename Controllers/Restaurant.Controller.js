const RestaurantRouter = require("express").Router();
const RestaurantsModel = require("../Models/Restaurants.model");

/**
 * ROUTES NEEDED
 *
 * GET ALL RESTAURANTS
 * ADD A RESTAURANT
 * GET RESTAUARNT BY RESTAURANT ID
 */
RestaurantRouter.get("/getAllRestaurant", function (req, res, next) {
  RestaurantsModel.find()
    .then((response) => {
      if (response.length > 0) {
        res.status(200).json({
          success: true,
          message: "Restaurants fetched successfully!!!",
          data: response,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "No restaurants found!!!",
          data: response,
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "Bad request!!!",
        error: error,
      });
    });
});

/**
 * METHOD = POST
 * PATH = /createRestaurant
 * INPUT = RESTAURANT DATA
 * OUTPUT = CREATED RESTAURANT DATA / ERROR
 */
RestaurantRouter.post("/createRestaurant", async function (req, res, next) {
  const {
    name,
    cuisine,
    foodTypes,
    branch,
    address,
    contactNumber,
    defaultRating,
  } = req.body;
  const RestaurantNew = new RestaurantsModel({
    name: name,
    cuisine: cuisine,
    foodTypes: foodTypes,
    branch: branch,
    address: {
      city: address.city,
      state: address.state,
      area: address.area,
      country: address.country,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      pincode: address.pincode,
    },
    contactNumber: contactNumber,
    defaultrating: defaultRating,
  });
  RestaurantNew.save()
    .then((response) => {
      if (response && response._id) {
        return res.status(200).json({
          success: true,
          message: "Restaurant creatd successfully!!!",
          data: response,
        });
      }
    })
    .catch((error) => {
      return res.status(401).json({
        success: false,
        message: "Error creating restaurant",
        error: error,
      });
    });
});

module.exports = RestaurantRouter;