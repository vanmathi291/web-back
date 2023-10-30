const CartRouter = require("express").Router();
const CartModel = require("../Models/Cart.model");

/**
 * ROUTES NEEDED
 *
 * GET ALL CART
 * ADD A CART FOR USER AND A RESTAURANT
 * GET CART BY CART_ID, USER_ID
 */
CartRouter.get("/getAllCart", function (req, res, next) {
  CartModel.find()
    .then((response) => {
      if (response && response.length > 0) {
        return res.status(200).json({
          success: true,
          message: "Carts fetched successfully!!!",
          data: response,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "No Cart Found!!!",
          data: response,
        });
      }
    })
    .catch((error) => {
      return res.status(200).json({
        success: false,
        message: "No cart Found!!!",
        data: error,
      });
    });
});

/**
 * METHOD = POST
 * PATH = /createCart
 * INPUT = CART DATA
 * OUTPUT = CREATED CART DATA / ERROR
 */
CartRouter.post("/createCart", async function (req, res, next) {
  const { userId, restaurantId, foodItems, couponApplied, updatedOn } =
    req.body;
  let total = 0;

  if (!userId || !restaurantId) {
    return res.status(401).json({
      success: false,
      message: "Some data is missingy",
      error: "Restaurant or User Details is missing in request",
    });
  }
  if (foodItems.length > 0) {
    foodItems.forEach((food) => {
      total += food.price * food.quantity;
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Food Items is empty",
      error: "Food Items array is empty",
    });
  }
  const CartNew = new CartModel({
    userId,
    restaurantId,
    foodItems,
    couponApplied,
    cartTotal: total,
    updatedOn,
  });
  CartNew.save()
    .then((response) => {
      if (response && response._id) {
        return res.status(200).json({
          success: true,
          message: "Cart created successfully!!!",
          data: response,
        });
      }
    })
    .catch((error) => {
      return res.status(401).json({
        success: false,
        message: "Error creating cart",
        error: error,
      });
    });
});

/**
 * METHOD = PATCH
 * PATH = /updateCart
 * INPUT = CART DATA
 * OUTPUT = UPDATED CART DATA / ERROR
 */
CartRouter.patch("/updateCart", async function (req, res, next) {
  const { cartId, restaurantId, foodItems, couponApplied } = req.body;
  let total = 0;

  if (!restaurantId) {
    return res.status(401).json({
      success: false,
      message: "Some data is missingy",
      error: "User Details is missing in request",
    });
  }
  if (foodItems.length > 0) {
    foodItems.forEach((food) => {
      total += food.price * food.quantity;
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Food Items is empty",
      error: "Food Items array is empty",
    });
  }
  CartModel.findByIdAndUpdate(
    { _id: cartId },
    {
      $set: {
        foodItems,
        restaurantId,
        cartTotal: total,
        couponApplied,
        updateOn: Date.now(),
      },
    }
  )
    .then((response) => {
      if (response && response._id) {
        return res.status(200).json({
          success: true,
          message: "Cart updated successfully!!!",
          data: response,
        });
      }
    })
    .catch((error) => {
      return res.status(401).json({
        success: false,
        message: "Error updating cart",
        error: error,
      });
    });
});

module.exports = CartRouter;