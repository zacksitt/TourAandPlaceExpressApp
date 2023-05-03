
var mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;
const Tour = require("../models/tour");
const Place = require('../models/place');

exports.get = async (req,res) => {
    
    try {
        let tours = await Tour.find();
        res.send({status:1,tours})
    } catch (err) {
        res.send({
            status:0,
            err:err.message
        })
    }

}
exports.getTourByPlace = async (req,res) => {
    
    try {

        let place = await Place.findOne({slug:req.params.place});
        let tours = await Tour.find({place_id:place._id.toString()})
        let childPlaces = await Place.findOne({parent:place._id.toString()});

        let placeTour = {
            place:place.slug,
            cover_url:place.cover_url,
            code:place.code,
            geo:place.geo,
            tours,
            child_places:childPlaces
        };
        res.send({status:1,tour:placeTour})

    } catch (err) {
        res.send({
            status:0,
            err:err.message
        })
    }

}
exports.getTour = async (req,res) => {

    try {
        let tour = await Tour.find({_id: new ObjectId(req.params.id)})
        res.send({status:1,tour});
    } catch (err) {
        res.send({
            status:0,
            err:err.message
        })
    }
   
}

exports.createAndUpdate = async (req,res) => {

    try {
        let message = "Created tour successfully";

        if(req.body.id){
            await Tour.updateMany({_id:new ObjectId(req.body.id)},{$set:req.body});
            message = "Updated tour successfully";
        }else{
            await Tour.create(req.body)
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

        await Tour.deleteOne({_id:new ObjectId(req.params.id)})
        res.send({status:1,message:"Deleted tour successfully!!!"})
    } catch (err) {
        res.send({
            status:0,
            err:err.message
        })
    }
}