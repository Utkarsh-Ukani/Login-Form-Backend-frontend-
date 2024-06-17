import { Schema,model } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
    {
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        password:{
            type:String,
            required:true,
            minLength:[8,'password must be greater or equal to 8 characters']
        }
    },
    {
        timestamps:true
    }
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.isCorrectPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
            _id:this._id,
            fullname:this.fullname,
            email:this.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRY
        }
    )
}

export const User = model('User',userSchema)