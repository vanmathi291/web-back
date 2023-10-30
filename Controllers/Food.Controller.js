const FoodRouter = require("express").Router();
const FoodModel = require("../Models/Food.model");

/**
 * ROUTES NEEDED
 *
 * GET ALL RESTAURANTS
 * ADD A RESTAURANT
 * GET RESTAUARNT BY RESTAURANT ID
 */
FoodRouter.get("/getAllFoods/:restaurantId", function (req, res, next) {
    const {restaurantId} =req.params;
  
    if (!restaurantId){
        return res.status(401).json({
            success:false,
            message:"Restaurant id is missing",
            error:"Bad request",
        });
    }
    FoodModel.find({restaurantId:restaurantId})
    .then((response)=>{
        if(response && response.length > 0){
            return res.status(200).json({
                success:true,
                message:"Food items fetched successfully!!!",
                data:response,
            });
        }else {
            return res.status(200).json({
                success:true,
                message:"No Food Items Found!!!",
                data:response,
            });
        }
    })
    .catch((error)=>{
        return res.status(200).json({
            success:true,
            message:"No Food Items Found!!!",
            data:error,
        });
    });
    });
/**
 * METHOD = POST
 * PATH = /createRestaurant
 * INPUT = RESTAURANT DATA
 * OUTPUT = CREATED RESTAURANT DATA / ERROR
 */
FoodRouter.post("/createFood", async function (req, res, next) {
  const {
    restaurantId,
    foodName,
    foodDescription,
    foodType,
    foodCategory,
    actualPrice,
    offerDetails,
  } =req.body;
  const FoodNew = new FoodModel({
      
    restaurantId,
    foodName,
    foodDescription,
    foodType,
    foodCategory,
    actualPrice,
    offerDetails,
  });
  FoodNew.save()
    .then((response) => {
      if (response && response._id) {
        return res.status(200).json({
          success: true,
          message: "Food creatd successfully!!!",
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

module.exports = FoodRouter;