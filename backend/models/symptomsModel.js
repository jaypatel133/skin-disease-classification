const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let symptomsSchema = new Schema(
    {}, { strict: false }
    // {
        // user_id: Schema.Types.ObjectId,
        // disease_name: String,
        // symptoms: {type : Array , "default" : [] } ,
        // causes: { type : Array , "default" : [] },
        // When:  { type : Array , "default" : [] }
        
    // }
)

module.exports = mongoose.model('Symptom',symptomsSchema,'symptoms')