let mongoose = require('mongoose'),
    express = require('express'),
    Router = express.Router();
const bcrypt = require('bcrypt');
let User = require('../models/userModel');

Router.route('/register').post(async(req,res) =>{
  
        const {user,email,password} = req.body;

        if(!user || !password || !email)
        {
            return res.status(400).json({'message':'Enter all detail'});
        }
        const duplicate = await User.findOne({user}).exec();
        if (duplicate) return res.sendStatus(409);

        const hashedPwd = await bcrypt.hash(password, 10);

        await User.create({user,email,password:hashedPwd}, (error,data)=>{
            if(error)
            {
                // res.status(500).json({ 'message': error });
                console.log(error);
            }else{
                res.status(201).json({ 'success': `New user ${user} created!` });
            }
        })
});

Router.route('/login').post(async(req,res) =>{
  
    const {user,password} = req.body;

    if(!user || !password)
    {
        return res.status(400).json({'message':'Enter all detail'});
    }
    const findUser = await User.findOne({user}).exec();
    if (!findUser) return res.sendStatus(409);

    const match = await bcrypt.compare(password, findUser.password);

    if (match) {
        res.status(201).json({ 'success': `loged in` });
    }else
    {
        res.sendStatus(401);
    }

});


module.exports = Router;