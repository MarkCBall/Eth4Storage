var express = require('express');
var router = express.Router();
var cors = require('cors')

var ethUtil =require('ethereumjs-util')


//put this into a controller file!!!
function addressFromSigs(originalString,signedString){
    //code below from https://www.toptal.com/ethereum/one-click-login-flows-a-metamask-tutorial
    const msgBuffer = ethUtil.toBuffer(originalString);
    const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
    const signatureBuffer = ethUtil.toBuffer(signedString);
    const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
    const publicKey = ethUtil.ecrecover(
        msgHash,
        signatureParams.v,
        signatureParams.r,
        signatureParams.s
    );
    const addressBuffer = ethUtil.publicToAddress(publicKey);
    const address = ethUtil.bufferToHex(addressBuffer);
    return address
}


/* GET users listing. */
router.get('/',cors(), function(req, res, next) {
    let reqHData = (JSON.parse(req.headers.data));
    let originalString = reqHData.date;
    let signedString = reqHData.dateSignature

    let address = addressFromSigs(originalString,signedString)


    console.log("processing response from "+address)

    
    //query data in database under address key and return it



    res.json(JSON.stringify("Helloooo to "+address));

});

router.post('/',cors(),function(req,res,next){
    let originalString = req.body.date;
    let signedString = req.body.dateSignature
    let address = addressFromSigs(originalString,signedString)
    console.log("processing response from "+address)

    console.log( req.body.input_text  )
    
    res.end()
});

module.exports = router;
