import { successResponseWithData } from "../../helpers/apiResponse.js";
import reviewModel from "../../models/Review/review.model.js";
import productModel from "../../models/Product/product.model.js";
import orderItemsModel from "../../models/Order/orderItemsModel.js";
export const addProductReview = async (req, res) => {
  try {
    const { userid, product, rating, comment,orderItemid } = req.body;

    console.log("req.body", req.body);

    const addproductreview = await reviewModel({
      userid,
      product: product,
      rating,
      comment: comment,
    }).save();

    const findProductDetail = await productModel.findById(product);

    const mdoifyRating = findProductDetail.rating + rating;
    const finalRating = mdoifyRating / 2;

    const newproduct = await productModel.findByIdAndUpdate(
      product,

      { rating: finalRating },
      { new: true }
    );

    const updateProduct=await orderItemsModel.findByIdAndUpdate(
        orderItemid,
       {
        reviewid: addproductreview._id  
       } , { new: true }
    )

    return successResponseWithData(
      res,
      "Review Added SucessFully",
      addproductreview
    );
  } catch (error) {
    console.log(error);
  }
};
