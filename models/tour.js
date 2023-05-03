const mongoose = require('mongoose')
const tourSchema = mongoose.Schema({

    slug: {
        type:String,
        required:true,
    },
    place_id: {
        type:String,
        required:true,
    },
    images: {
        type:Object
      },
    languages: {
        type:Object
    },
    cover_url: {
        type:String
    },
    duration: {
        type:String
    },
    sku: {
        type:String
    },
    name: {
        type:Object,
        require:true
    },
    price: {
      type: Number
    },
    content: {
        type: Object
    },
    description: {
        type: Object
    },
    metadata: {
        type: Object
    },
    itineary: {
        type: Object
    }
 });

 tourSchema.pre('save', async function (next) {
    console.log("Pre save tour");
    next()
})

const Tour = mongoose.model('tours', tourSchema)
module.exports = Tour
 