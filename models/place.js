const mongoose = require('mongoose')
// const validator = require('validator')

const placeSchema = mongoose.Schema({
    
    slug: {
      type:String,
      required:true,
    },
    is_published: {
        type:Number,
        required:true,
    },
    cover_url: {
        type:String,
      },
    type_of_place: {
        type:String,
        required:true,
    },
    type_of_place: {
        type:String,
    },
    code: {
        type:String,
    },
    parent: {
        type:String,
    },
    geo: {
        type:String,
    },
    place_view: {
        type:Number,
    },
    name_of_place: {
        type:Object,
        required:true,
      },
    description: {
        type:Object
    },
    content: {
        type:Object
    },
    metadata: {
        type:Object
    },
    faqs_of_places: {
        type:Object
    }
 });
 placeSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    console.log("Pre save place");
    next()
})

const Place = mongoose.model('places', placeSchema)
module.exports = Place
 