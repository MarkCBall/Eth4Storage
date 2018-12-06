pragma solidity ^0.4.25;



//this isn't ideal because there is no constant anchor in the blockchain for the database to anchor _addToApproive
//reimpliment it to include a clientID

contract AccountMngmt {
    address owner;
    //an account exists when it has a balance
    struct Admin {address AdminAddr; uint Bal};
    mapping (uint => Admin) public Accts;
    //an account can be accessed by permissioned addresses
    struct User {address AcctID; bool IsAdmin; bool CanWrite; bool CanSpend;}
    mapping (address => Permission) public Permissions;
    
    constructor() public {
    owner = msg.sender;
    }
    
    //note that permissions need to be re-created manually after an ownership change
    function giveownership(uint _AcctId, address _newowner) public {
        require(Accts[AcctId].AdminAddr == msg.sender);
        Accts[AcctId].AdminAddr = _newowner

    }
    
    function approve(address _addToApproive){
        reqwuire
        Families[msg.sender].secondaryAccts.push(_addToApproive)
    }
    