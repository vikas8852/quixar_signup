const mongoose=require('mongoose')
const{Schema}=mongoose;
const JWT=require('jsonwebtoken')
const userSchema=new Schema({
    name:{
        type:String,
        require:[true,'user name is Require'],
        minLength:[5,'Name must be at leat 5 char'],
        maxLength:[50,'Name must be less than 50 char'],
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        select:false
    },
    forgotPasswordToken:{
        type:String
    },
    forPasswordExpiryDate:{
        type:Date
    }
},{
    timestamps:true
});
// Instance methods
userSchema.methods = {
    jwtToken() {
        return JWT.sign(
            { id: this._id, email: this.email },
            process.env.SECRET || 'default-secret', // Ensure a fallback is provided
            { expiresIn: '24h' }
        );
    }
}
//const token=userModel.jwtToken();

const userModel=mongoose.model('user',userSchema);
module.exports=userModel;