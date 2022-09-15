const bcrypt = require("bcryptjs");
const jwt= require("jsonwebtoken");

const User = require("./user.model.");
const { validateUserSchema } = require("./user.service");




const signuUp = async (req,res) => {

    try {
        const {error, value} = validateUserSchema(req.body);
        
        if(error && error.details) {
            res.status(500).json({msg: 'cant signup dude!'})
        }

        const user = await User.create(value);
        return res.json(user);
        
    } catch (error) {
        return res.status(500).json(error)
    }
    
}



const login =  async (req,res) => {

    try {
        const {error, value} = validateUserSchema(req.body);
        
        if(error && error.details) {
            res.status(500).json({msg: 'cant login dude!'})
        }

        const user = await User.findOne({email: value.email})

        if(!user) {
            return res.status(401).json('401 (Unauthorized)')
        }

        const matched = await bcrypt.compare(value.password, user.password)

        if(!matched) {
            return res.status(401).json('401 (Unauthorized)')
        }

        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: '1d'})

        return res.json({success:true, token })
        
    } catch (error) {
        return res.status(401).json(error)
    }

}

const testroute = (req, res) => {
    return res.json(req.user)
}





module.exports = {
   signuUp,
   login,
   testroute
}