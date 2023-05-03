import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";

export const Test = (req,res)=>{

    res.json({
        success:true,
        message:"Testing the API",
    })
};


export const login = async (req,res,next)=>{

    try {
        const {email,password} = req.body;
        // console.log(email , password);
    
        const user = await User.findOne({email}).select("+password");
    
        // console.log(user);
        if(!user) return next(new ErrorHandler("Invalid Email or Password!" , 404));
    
        const isMatch = await bcrypt.compare(password , user.password)
        
        if(!isMatch) return next(new ErrorHandler("Invalid Email or Password!" , 404));
    
    
        sendCookie(user,res,`Welcome back, ${user.name}`,200)
        
    } catch (error) {
        next(error);

    }
}
export const logout = (req,res,next)=>{

    res.status(200).cookie("token","",{
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV ==="Development" ? "lax" : "none",
        secure:process.env.NODE_ENV ==="Development" ? false : true,
    }).json({
        success:true,
        Message:"Logout",
    })
}
export const newUser = async (req,res)=>{

    try {
        const {name,email,password} = req.body;
        let user = await User.find({email});
    
        // console.log(user);
    
        if(user.length != 0) return next(new ErrorHandler("User already Exist", 404));
    
        const hashPassword = await bcrypt.hash(password,10);
        user = await User.create({name,email,password:hashPassword});
    
        sendCookie(user,res,"Registered Successfully",201);
    } catch (error) {
        next(error);

    }
}

export const viewAll = async (req,res)=>{

}


export const getUserById = (req,res)=>{

    res.status(200).json({
        success:true,
        user : req.user ,
    })

};

// export const updateUserById = async (req,res)=>{

//     const {id} = req.params;
//     // console.log(req.params);

//     const user = await User.findById({_id:id});
//     res.json({
//         success:true,
//         message:"Update Database"
//     })
// };
// export const deleteUserById = async (req,res)=>{

//     const {id} = req.params;
//     // console.log(req.params);

//     const user = await User.findById({_id:id});
//     res.json({
//         success:true,
//         message : "Data Deleted"
//     })
// };


