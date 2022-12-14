const mongoose  = require("mongoose");
const bcrypt = require("bcryptjs");



const {Schema} = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true
    }

});


UserSchema.pre('save', async function() {
    if(this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
    }
  });

module.exports = mongoose.model('User', UserSchema);
