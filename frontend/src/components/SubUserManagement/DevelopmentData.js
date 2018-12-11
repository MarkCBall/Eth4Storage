
//THIS SHOULD BE MOVED TO AN ONLINE DATABASE HOSTED BY OUR SERVER
//The subUserAddys fields can not be found on the database as the account numbers are mapping keys


// accounts:[
//     {key:0, own:"addy1", bal:0., expanded:false},
// ], 




var DevelopmentData = [
    {
        key:0,
        //AcctAddy:'0xbb3d3e7ba8200b9e656e8f9b750412c53cca7dae',
        SubUserAddys:[
            {key:0,val:'test'},
            {key:1,val:'ahh'}
        ]
    },
    {
        key:1,
        //AcctAddy:'0x22dce447732ef5ad523db7e6abda46ba8a9d0781',
        SubUserAddys:[
            {key:0,val:'garbage'},
            {key:1,val:"0x396e328532AC99C238730Ff4B7D185D7A9920C1C"},
            {key:2,val:'is'},
            {key:3,val:'stored'},
            {key:4,val:'here'}
        ]
    },
    {
        key:2,
        //AcctAddy:'0xbb3d3e7ba8200b9e656e8f9b750412c53cca7dae',
        SubUserAddys:[]
    },
    {
        key:3,
        //AcctAddy:'0x3f040ef68e211d265a705f2066a33756c938615f',
        SubUserAddys:[
            {key:0,val:'justonething'}
        ]
    }
]


export default DevelopmentData;