
var mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;
const axios = require("axios")
const Place = require("../models/place")

exports.get = async (req,res) => {
    
    try {

        let page    = req.body.page || 1;
        let limit   = req.body.limit || 10;
        let skip  = limit * (page - 1);
        let places  = await Place.find()
                            .limit(limit)
                            .skip(skip);

        res.send({status:1,places})
    } catch (err) {
        res.send({
            status:0,
            err:err.message
        })
    }

}

exports.getPlace = async (req,res) => {

    try {
        let place = await Place.find({_id: new ObjectId(req.params.id)})
        res.send({status:1,place});
    } catch (err) {
        res.send({
            status:0,
            err:err.message
        })
    }
   
}
exports.getPlaceTree = async (req,res) => {

    try {

        let page    = req.body.page || 1;
        let limit   = req.body.limit || 10;
        let skip  = limit * (page - 1);
        let places  = await Place.find()
                                 .limit(limit)
                                 .skip(skip);

        console.log("places",places);

        let allPlaces = [];

        for (const place of places) {

            let childPlaces = await Place.findOne({parent:place._id.toString()});
            console.log("child places",childPlaces);

            let placeObj = {
                "id":place.id,
                "slug": place.slug,
                "is_published":place.is_published,
                "cover_url":place.cover_url,
                "type_of_place":place.type_of_place,
                "code":place.code,
                "parent":place.parent,
                "geo": place.geo,
                "place_view":place.place_view,
                "name_of_place":place.name_of_place,
                "description":place.description,
                "content":place.content,
                "metadata":place.metadata,
                "faqs_of_places":place.faqs_of_places,
                "child_places":childPlaces
            }

            allPlaces.push(placeObj);
        }

        res.send({
            "status":1,
            "places":allPlaces
        })    

    } catch (error) {

        res.send({
            status:1,
            msg:"Failed to get place data",
            err: error.message
        });
    }
    
}
exports.createAndUpdate = async (req,res) => {

    try {
        let message = "Created place successfully";

        if(req.body.id){
            await Place.updateMany({_id:new ObjectId(req.body.id)},{$set:req.body});
            message = "Updated place successfully";
        }else{
            await Place.create(req.body)
        }
        
        res.send({status:1,message});
    } catch (err) {
        res.send({
            status:0,
            err:err.message
        })
    }
    
}

exports.delete = async (req,res) => {
    
    try {
        await Place.deleteOne({_id:new ObjectId(req.params.id)})
        res.send({status:1,message:"Deleted place successfully!!!"})
    } catch (err) {
        res.send({
            status:0,
            err:err.message
        })
    }
}
exports.importData = async (req,res) => {
    
    insertData();
    res.send({status:1,"msg":"Imported data from api"})
}

async function insertData(){

    const cities = await axios.get('https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json');
    
    await Place.deleteMany({is_published:0});
    for (const city of cities.data) {
        let place = {
            "slug": city.country,
            "is_published":0,
            "cover_url":"N/A",
            "type_of_place":"country",
            "code":"N/A",
            "parent":"N/A",
            "geo": city.lat + "," + city.lng,
            "place_view":0,
            "name_of_place":{"en":city.name},
            "description":{},
            "content":{},
            "metadata":{},
            "faqs_of_places":{}
        }
        await Place.create(place);
        console.log("Inserted new place!!!");
    }
}