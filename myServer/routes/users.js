var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {


  //console.log(JSON.parse("[{"key":0,"own":"0x3f040ef68e211d265a705f2066a33756c938615f","SubUserAddys":[]},{"key":1,"own":"0x396e328532ac99c238730ff4b7d185d7a9920c1c","SubUserAddys":[{"key":0,"val":"0x396e328532AC99C238730Ff4B7D185D7A9920C1C"},{"key":1,"val":"0x0F7Cd2D9F4CEc1f7E01f880315Fd56101095fF87"},{"key":2,"val":"0x24c73c0E61F7F3F62B89A5BD521f30e6804Ea86B"}]},{"key":2,"own":"0x0f7cd2d9f4cec1f7e01f880315fd56101095ff87","SubUserAddys":[{"key":0,"val":"0x0F7Cd2D9F4CEc1f7E01f880315Fd56101095fF87"}]}]"))


  let accounts=[
    {
        key:0,
        own:'0x3f040ef68e211d265a705f2066a33756c938615f',
        SubUserAddys:[
        ]
    }
    ,
    {
        key:1,
        own:'0x396e328532ac99c238730ff4b7d185d7a9920c1c',
        SubUserAddys:[
            {key:0,val:"0x396e328532AC99C238730Ff4B7D185D7A9920C1C"},
            {key:1,val:"0x0F7Cd2D9F4CEc1f7E01f880315Fd56101095fF87"},   
            {key:2,val:"0x24c73c0E61F7F3F62B89A5BD521f30e6804Ea86B"}
        ]
    },
    {
        key:2,
        own:'0x0f7cd2d9f4cec1f7e01f880315fd56101095ff87',
        SubUserAddys:[
            {key:0,val:"0x0F7Cd2D9F4CEc1f7E01f880315Fd56101095fF87"}, 
        ]
    }
]
console.log("XXXXXXXXX")
console.log(accounts)
console.log(JSON.stringify(accounts))
console.log(JSON.parse(JSON.stringify(accounts)))



  res.send(JSON.stringify(accounts));
});

module.exports = router;
