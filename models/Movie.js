const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    directorId:Schema.Types.ObjectId,
    title:{
        type:String,
        required:true,
        maxlength:[15,'`{PATH}` alanı (`{VALUE}`), (`{MAXLENGHT}`) karakterden küçük olmalıdır.'],
        minlength:[3,'`{PATH}` alanı (`{VALUE}`), (`{MİNLENGHT}`) karakterden küçük olmalıdır.']
    },
    category:{
        type:String,
        maxlength:30,
        minlength:1
    },
    country:{
        type:String,
        maxlength:30,
        minlength:1
    },
    year:{
        type:Number,
        max:2040,
        min:1900
    },
    imdbScore:{
        type:Number,
        max:10,
        min:0
    },
    Date:{
        type:Date,
        default:Date.now()
    }
    
});

module.exports = mongoose.model('movie',MovieSchema);