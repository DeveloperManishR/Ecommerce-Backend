import {
    ErrorResponse,
    successResponse,
    successResponseWithData,
} from "../../helpers/apiResponse.js";
import addressModel from "../../models/Address/address.model.js";


export const AddAddress = async (req, res) => {
    const userid = req.userid;

    try {

        const { name, phone, street, state, city,zipcode } = req.body;

        

        const addnewAddress = await new addressModel({
            userid,
            name, phone, street, state, city,zipcode
        }).save()
        return successResponseWithData(res, "Address Added Sucessfully", addnewAddress);
    } catch (error) {
      console.log("ereerere",error)
    }
}

export const GetAllAddress = async (req, res) => {
    const userid = req.userid;

     try {
        const addressItems = await addressModel
          .find({ userid: userid })

        return successResponseWithData(res, "All address", addressItems);
      } catch (error) {
        console.log(error);
      }
}