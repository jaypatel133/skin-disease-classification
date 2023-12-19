const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        // user_id: Schema.Types.ObjectId,
        user: String ,
        email: String ,
        password: String,
        time: { type: Date, default: Date.now }
    }
)

module.exports = mongoose.model('User',userSchema)