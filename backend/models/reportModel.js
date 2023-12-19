const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let reportSchema = new Schema(
    {
        // user_id: Schema.Types.ObjectId,
        user_id: String ,
        name: String ,
        time: { type: Date, default: Date.now },
        image: String
    }
)

module.exports = mongoose.model('Report',reportSchema)