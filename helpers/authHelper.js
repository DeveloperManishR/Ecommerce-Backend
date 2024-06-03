import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken"
export const hashingPassword = async (password)=>{
    try{
        const saltRound = 10
        const hashedPassword = await bcrypt.hash(password,saltRound)
        return hashedPassword
    }
    catch(err){
        console.log(err)
    }
}

export const compairPassword =  async(password,hashedPassword) =>{
    return bcrypt.compare(password,hashedPassword)
}

export const  CheckHeaderToken=async(req,res,next)=>{
    try {
        //console.log(req.headers);
        const token = req.headers.Authorization || req.headers.authorization;

        const jwtData = {
            expiresIn: process.env.EXPIRES_IN,
        };

        const decoded = jwt.verify(token, process.env.JWT_SECRET, jwtData);
      
        req.userid = decoded._id
        req.token = token;
        //console.log(decoded, "jwt verified")
        next();


    } catch (error) {
        console.error('Error:', error.message);
        return res.status(401).json({
            status: 0,
            message: 'You do not have any authorization access',
        });
    }
}
