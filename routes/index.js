const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Model
const User = require('../models/User')


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',(req,res)=>{
  const {userName,password} = req.body;


  bcrypt.hash(password,10).then((hash)=>{
    const user = new User({
      userName,
      password:hash
    });
  
    const promise = user.save();
  
    promise.then((data)=>{
      res.json(data);
    }).catch((err)=>{
      res.json(err);
    })
  })


})

router.post('/authenticate',(req,res)=>{
  const {userName,password} = req.body;

  User.findOne({
    userName
  },(err,user)=>{
    if(err)
      throw err;
    if(!user){
      res.json({
        status:false,
        message:"Auth failed. User not found"
      })
    }else{
      bcrypt.compare(password,user.password).then((result)=>{
        if(!result){
          res.json({
            status:false,
            message:"Parola yanlış."
          })
        }else{
          const payload = {
            userName
          };
          const token = jwt.sign(payload,req.app.get('api_secret_key'),{
            expiresIn:720 //12 Hours 
          });

          res.json({
            status:true,
            token
          })
          
        }
      })
    }
  })
})

module.exports = router;
