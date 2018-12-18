var express = require('express');
var router = express.Router();
var cors = require('cors')




/* GET users listing. */
router.get('/',cors(), function(req, res, next) {
    let reqHData = (JSON.parse(req.headers.data));
    let date = reqHData.date;
    let dateSignature = reqHData.dateSignature


    console.log(dateSignature,"     ",date)


    //calculate the account address that send the request and console.log it
    
//consolelog the time since the string was created
//check if the user is authorized, if so
    //send the user a string with it's address and how long ago it signed the string



    res.json(JSON.stringify("Helloooo"));

});

module.exports = router;
