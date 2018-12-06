pragma solidity ^0.4.25;

contract AccountMngmt {
    address owner;
    //make accounts into an array
    struct Family {uint Balance; address[4] secondaryAccts
    //address Acct2; address Acct3; address Acct4; address Acct5;}
    mapping (address => Family) public Families;
    
    constructor() public {
    owner = msg.sender;
    }
    
    function giveownership(address _newowner) public {
        require(Families[msg.sender] > 0); //or address2-5 != 0
        Families[_newowner]=Families[msg.sender];
        delete Families[msg.sender];
        
        Families[_newowner} = Families[msg.sender]
    }
    
    function approve(address _addToApproive){
        reqwuire
        Families[msg.sender].secondaryAccts.push(_addToApproive)
    }
    
    
   
   
    
    //fallback function
    function() payable external{
        Families[msg.sender].Balance += msg.value;
    }
    
}