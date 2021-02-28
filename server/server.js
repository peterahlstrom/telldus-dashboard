var express = require("express");
var TelldusAPI = require("telldus-live");
var cors = require("cors");
var config = require("./config.json");

var app = express();
var PORT = config.PORT;

app.use(cors());

var cloud = new TelldusAPI.TelldusAPI({
    publicKey: config.publicKey,
    privateKey: config.privateKey
})
    .login(config.token, config.tokenSecret, function (err, user) {
    if (!!err)
        return console.log("login error: " + err.message);
    console.log("Login for " + user.firstname + " " + user.lastname + " successful!");
})
    .on("error", function (err) {
    console.log("background error: " + err.message);
});
app.get("/", function (req, res) {
    res.end("It works!");
});
app.get("/sensors", function (req, res) {
    cloud.getSensors(function (err, sensors) {
        if (!!err)
            return console.log("getSensors: " + err.message);
        res.send(sensors);
    });
});
app.get("/sensor/:sensorId", function (req, res) {
    var sensorId = { id: req.params.sensorId };
    console.log(sensorId);
    cloud.getSensorInfo(sensorId, function (err, sensor) {
        if (!!err)
            return console.log("getSensors error: " + err.message);
        res.send(sensor);
    });
});
app.get("/history/:sensorId", function (req, res) {
    var sensorId = { id: req.params.sensorId };
    console.log("Sensor id: " + sensorId.id + " - From: " + req.query.from + ", To: " + req.query.to);
    cloud.getSensorHistory(sensorId, req.query.from, req.query.to, function (err, sensor) {
        if (!!err)
            return console.log("getSensorsHistory error: " + err.message);
        res.send(sensor);
    });
});
app.listen(PORT, function () {
    console.log("Lstening to port " + PORT);
});
