import { User } from "../models/user.model.js";



const signup = async(req,res)=>{
    const {fullname,email,password,confirmPassword} = req.body;

    if(!fullname || !email || !password || !confirmPassword){
        res.status(400).json({
            success:false,
            message:'All fields are required'
        })
    }

    if(password!==confirmPassword){
        res.status(400).json({
            success:false,
            message:'Password and ConfirmPassword are different'
        })
    }

    const existedUser = await User.findOne({email});
    if(existedUser){
        res.status(400).json({
            success:false,
            message:'User already existed'
        })
    }

    const user = await User.create({
        fullname,
        email,
        password
    })

    const cretedUser = await User.findById(user._id).select('-password')

    return res.status(200).json({
        success:true,
        message:'User created successfully',
        cretedUser
    })
}

const login = async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400).json({
            success:false,
            message:'All fields are required'
        })
    }

    const user = await User.findOne({email});
    if(!user){
        res.status(401).json({
            success:false,
            message:'user does not exist for given email id'
        })
    }

    const isPasswordValid = await user.isCorrectPassword(password)
    if(!isPasswordValid){
        res.status(401).json({
            success:false,
            message:' incorrect Password'
        })
    }

    const {accessToken} = await user.generateAccessToken()

    user.password = undefined;

    const options = {
        httpOnly:true,
        secure:true
    }

    return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .json({
            success:true,
            message:'user logged in successfully',
            user
        })
}

export {
    signup,
    login
} 