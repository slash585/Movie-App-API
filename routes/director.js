const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

const Director = require('../models/Director');


router.get('/', function(req, res, next) {
  const promise = Director.aggregate([
    {
      $lookup:{
        from:'movies',
        localField:'_id',
        foreignField:'directorId',
        as:'movies'
      }    
    },
    {
      $unwind:{
        path:'$movies',
        preserveNullAndEmptyArrays:true
      }
    },
    {
      $group:{
        _id:{
          _id:'$_id',
          name:'$name',
          surname:'$surname',
          bio:'$bio'
        },
        movies:{
          $push:'$movies'
        }
      }
    },
    {
      $project:{
        _id:'$_id._id',
        name:'$_id.name',
        surname:'$_id.surname',
        movies:'$movies'
      }
    }
  ])

  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err)
  })
});

/*	{
  $match: {
    '_id': mongoose.Types.ObjectId(req.params.director_id)
  }
},*/

router.get('/:director_id', function(req, res, next) {
  const promise = Director.aggregate([
    {
      $match: {
        '_id':mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup:{
        from:'movies',
        localField:'_id',
        foreignField:'directorId',
        as:'movies'
      }    
    },
    {
      $unwind:{
        path:'$movies',
        preserveNullAndEmptyArrays:true
      }
    },
    {
      $group:{
        _id:{
          _id:'$_id',
          name:'$name',
          surname:'$surname',
          bio:'$bio'
        },
        movies:{
          $push:'$movies'
        }
      }
    },
    {
      $project:{
        _id:'$_id._id',
        name:'$_id.name',
        surname:'$_id.surname',
        movies:'$movies'
      }
    }
  ])

  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err)
  })
});





router.post('/', function(req, res, next) {
  const director = new Director(req.body);
  const promise = director.save();

  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err)
  })
});


module.exports = router;
