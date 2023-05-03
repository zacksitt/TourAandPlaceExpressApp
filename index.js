const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const placeCtrl = require("./controllers/placeController")
const tourCtrl = require("./controllers/tourController")

require("./db/mongoose")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res) => {
    res.send({msg:"Places and Tours API v1,"});
})

//Place
app.post("/places",placeCtrl.get)
app.post("/places/tree",placeCtrl.getPlaceTree)
app.get("/place/:id",placeCtrl.getPlace)
app.post("/place",placeCtrl.createAndUpdate)
app.put("/place",placeCtrl.createAndUpdate)
app.delete("/place/:id",placeCtrl.delete)
app.post('/import-place-data',placeCtrl.importData)

//Tour
app.post("/tours",tourCtrl.get)
app.get("/tour/:id",tourCtrl.getTour)
app.get("/tours/:place",tourCtrl.getTourByPlace)
app.post("/tour",tourCtrl.createAndUpdate)
app.put("/tour",tourCtrl.createAndUpdate)
app.delete("/tour/:id",tourCtrl.delete)

app.listen(8081, () => {
    console.log("Server is listening on port 8081")
});
