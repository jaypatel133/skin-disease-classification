let mongoose = require('mongoose'),
    express = require('express'),
    Router = express.Router();
let report = require('../models/reportModel.js');
let symptoms = require('../models/symptomsModel.js');
let temp2 = {};


Router.route('/Create').post((req,res) =>{


    //image upload part
    if(req.files === null)
    {
      return res.status(400).json({msg:'No file uploaded'});
    }
  
  
    const file =  req.files.file;
    console.log(file);
    file.mv(`${__dirname}/../frontend/public/uploads/${file.name}`,err=>{
        if(err) {
        console.error(err);
        return res.status(500).send(err);
        }

        

        // res.json({fileName: file.name,filePath: `/upload/${file.name}`});
    })

    delete req.body.files

    console.log(req.body)

    report.create(req.body, (error,data)=>{
        if(error)
        {
            // return next(error)
            console.log(error)
        }else{
            console.log('new rep created')
            console.log(data)
            res.json(data)

        }
    })
    
});

Router.route('/get/:user_id').get((req,res)=>{
    console.log(req.params);
    report.find(req.params,(error,data)=>{
        if(error)
        {
            console.log(error)
        }else{
            console.log(data)
            data=data.reverse()
            res.json(data)
        }
    })
});

Router.route('/get').get((req,res)=>{

    report.findOne({name:"InProcess"},(error,data)=>{
        if(error)
        {
            console.log(error)
        }else{
            console.log(data)
            res.json(data)
        }
    })
});

Router.route('/edit/:id').get((req,res)=>{
    report.findById(req.params.id,(error,data)=>{
        if(error)
        {
            console.log(error)
        }else{
            console.log('selected')
            res.json(data)

            // symptoms.find({
            //     disease_name:data.name},(error,data2)=>{
            //     if(error)
            //     {
            //         console.log(error)
            //     }else{
            //         // console.log(data)
            //         // console.log(data2)
            //         temp2=Object.assign({},data,data2[0]);
            //         console.log(temp2)
            //         res.json(data2)
            //         // res.json(data2)
            //     }
            // })



        }
    })
});

Router.route('/update/:id').get((req,res)=>{
    report.findByIdAndUpdate(req.params.id,
        {
            $set:req.body
        },(error,data)=>{
        if(error)
        {
            console.log(error)
        }else{
            console.log('updated data')
            console.log(data)
            res.json(data)
        }
    })
});

Router.route('/updateName/:id/:name').get((req,res)=>{

    report.findByIdAndUpdate(req.params.id,
        {
           name: req.params.name
        },(error,data)=>{
        if(error)
        {
            console.log(error)
        }else{
            console.log('updated data')
            console.log(data)
            res.json(data)
        }
    })
});

Router.route('/delete/:id').get((req,res)=>{
    report.findByIdAndRemove(req.params.id,
        {
            $set:req.body
        },(error,data)=>{
        if(error)
        {
            console.log(error)
        }else{
            console.log('deleted data')
            console.log(data)
            res.json(data)
        }
    })
});

module.exports = Router;