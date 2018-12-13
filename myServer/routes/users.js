var express = require('express');
var router = express.Router();
var cors = require('cors')




/* GET users listing. */
router.get('/',cors(), function(req, res, next) {
  

//route add account
  function addUserToAccount(AcctN,addy){
    
    //pause 1 mins
    //if contract.users(addy).accountNumber !=0
      //add to database -- go to AcctN and add addy at max(key)+1 

   
  }

 
  function deleteUserFromAccount(AcctN, addy){
    //wait 2 mins --> check BC that addy doesn't have a linked AcctN
      //go to acctN and deletes based on addy

  }
  

  let accounts=[
    {
        key:0,
        //own:'0x3f040ef68e211d265a705f2066a33756c938615f',
        SubUserAddys:[
        ]
    }
    ,
    {
        key:1,
        //own:'0x396e328532ac99c238730ff4b7d185d7a9920c1c',
        SubUserAddys:[
            {key:0,val:"0x396e328532AC99C238730Ff4B7D185D7A9920C1C"},
            {key:1,val:"0x0F7Cd2D9F4CEc1f7E01f880315Fd56101095fF87"},   
            {key:2,val:"0x24c73c0E61F7F3F62B89A5BD521f30e6804Ea86B"}
        ]
    },
    {
        key:2,
        //own:'0x0f7cd2d9f4cec1f7e01f880315fd56101095ff87',
        SubUserAddys:[
            {key:0,val:"0x0F7Cd2D9F4CEc1f7E01f11112222211111111111111111"}, 
        ]
    }
]

  res.json(JSON.stringify(accounts));

});

module.exports = router;
