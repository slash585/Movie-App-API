const mongoose = require('mongoose');

module.exports = ()=>{
    mongoose.connect('mongodb+srv://movie-app-user:Laserjet..123@mongodb01.9xdpe.mongodb.net/deneme-mongo?retryWrites=true&w=majority');

    mongoose.connection.on('open',()=>{
        console.log('MongoDb Connected');
    });

    mongoose.connection.on('error',(err)=>{
        console.log('MongoDb Error',err);
    });

    mongoose.Promise = global.Promise;
}