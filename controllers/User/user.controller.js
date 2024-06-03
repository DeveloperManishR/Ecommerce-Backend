import { compairPassword, hashingPassword } from "../../helpers/authHelper.js";
import userModel from "../../models/User/user.model.js";
import {
  ErrorResponse,
  notFoundResponse,
  successResponse,
  successResponseWithData,
} from "../../helpers/apiResponse.js";
import jwt from "jsonwebtoken";

export const RegisterUser = async (req, res) => {
  try {
    const { fname, lname, email, password, phoneno, role, dob } = req.body;

    const checkEmail = await userModel.findOne({ email });
    console.log("test",checkEmail)

    if (checkEmail) {
      return ErrorResponse(res, "User already exists");
    }

    const hashedPassword = await hashingPassword(password);

    const user = await new userModel({
      fname,
      lname,
      email,
      password: hashedPassword,
      phoneno,
      profilePic:"",
      role,
      dob,
    }).save();

    return successResponseWithData(res, "User Register Sucessfully", user);
  } catch (error) {
    console.log(error);
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return notFoundResponse(res, "email not found");
    }

    const match = await compairPassword(password, user.password);
    if (!match) {
      return ErrorResponse(res, "Password Wrong");
    }

    const additionalData = {
      fname: user.fname,
      lname: user.lname,
      phoneno: user.phoneno,
      email: user.email,
      role:user.role
    };

    console.log("additionalData",additionalData)
    const jwtPayload = { _id: user._id, ...additionalData };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return successResponseWithData(res, "Login successfully", {
      user: {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phoneno: user.phoneno,
        role:user.role
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllusers = async (req, res) => {
  try {
    const allUsers = await userModel.find({ role: "USER" });
    if (allUsers.length == 0) {
      return successResponse(res, "No Users Found");
    }

    const userDeatils = allUsers.map((item) => {
      return {
        user: {
          id: item._id,
          fname: item.fname,
          lname: item.lname,
          email: item.email,
          phone: item.phoneno,
        },
      };
    });
    return successResponseWithData(res,"Users Fetch SucessFully", userDeatils);
  } catch (error) {
    console.log(error);
    return ErrorResponse(res, "Error searching for Users: " + error.message);
  }
};

export const getUser = async (req, res) => {
  try {
    
    const id = req.params.id;
    const user = await userModel.findById(id);

    if (!user) {
      return ErrorResponse(res, "User id was Wrong");
    }

    return successResponse(res, user);
  } catch (error) {
    console.log(error);
  }
};

export const updateProfilePic=async(req, res)=>{
  console.log("req.files",req.files)
 // const uploadedImages = req.files ? req.files.map((file) => file.path) : [];
// console.log("req",req.file.path)

 const uploadedImage=req.file.path

 const userid = req.userid;


 console.log("userid",userid)
 console.log("upload",uploadedImage)



 
 // console.log("uploadedImages",uploadedImages)
}
