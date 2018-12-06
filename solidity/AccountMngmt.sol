pragma solidity ^0.4.25;



//this isn't ideal because there is no constant anchor in the blockchain for the database to anchor _addToApproive
//reimpliment it to include a clientID

contract AccountMngmt {
    address owner;
    //an account exists when it has a balance
    mapping (address => uint) public AcctBalances;
    //an account can be accessed by permissioned addresses
    struct Permission {address LinkedAcct; bool CanWrite; bool CanSpend;}
    mapping (address => Permission) public Permissions;
    
    constructor() public {
    owner = msg.sender;
    }
    
    //note that permissions need to be re-created manually after an ownership change
    function giveownership(address _newowner) public {
        require(AcctBalances[msg.sender] > 0);
        Acct
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