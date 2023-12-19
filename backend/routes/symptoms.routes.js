let mongoose = require('mongoose'),
    express = require('express'),
    Router = express.Router();
let symptoms = require('../models/symptomsModel.js');

Router.route('/get/:disease_name').get((req,res)=>{
    console.log(req.params);
    symptoms.find(req.params,(error,data)=>{
        if(error)
        {
            console.log(error)
        }else{
            console.log(data)
            res.json(data)
        }
    })
});

Router.route('/').get((req,res)=>{
    symptoms.find({},(error,data)=>{
        if(error)
        {
            console.log(error)
        }else{
            console.log(data)
            res.json(data)
        }
    })
});

module.exports = Router;
