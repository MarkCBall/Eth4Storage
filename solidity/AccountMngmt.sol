pragma solidity ^0.4.25;
    
contract AccountMngmt {
    
    //STATE ERC20 based 
    // string public symbol;// string public  name;// uint8 public decimals;
    uint totalSupply;
    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;
    //STATE user management
    Account[] public Accounts;
    struct Account {address AdminAddr; uint Bal; User[] Users;}
    struct User {address UserAddy; bool CanWrite;}
    uint public accPrice;//price to make an account
    uint public userPrice;//price to add a user
    
    //ERC20 events
    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    
    //constructor function
    constructor() public {
        owner = msg.sender;
        // currency unit is wei
        accPrice = 500000000000000000;
        userPrice = 100000000000000000;
    }

    //SETTER FUNCTIONS
    function setAccPrice(uint _newAccPrice) public {
        require(msg.sender == owner, "You must be the owner to change the account price.");
        accPrice = _newAccPrice * 1 wei;
    }
    function setUserPrice(uint _newUserPrice) public {
        require(msg.sender == owner, "You must be the owner to change the user price.");
        userPrice = _newUserPrice * 1 wei;
    }
    function setInitialBal(uint _newInitialBal) public {
        require(msg.sender == owner, "You must be the owner to change the initial balance.");
        initialBal = _newInitialBal * 1 wei;
    }

    //ERC20 functions - need to complete
    function totalSupply() public view returns (uint){
        return totalSupply;
    }
    function balanceOf(address tokenOwner) public view returns (uint balance){
        return balances(tokenOwner);
    }
    function allowance(address tokenOwner, address spender) public view returns (uint remaining){
        return allowed(tokenOwner(spender));
    }
    function transfer(address to, uint tokens) public returns (bool success){
        
    }
    function approve(address spender, uint tokens) public returns (bool success){
        
    }
    function transferFrom(address from, address to, uint tokens) public returns (bool success){
        
    }

    //bonding curve functions - need to do math to figure out #tokens given #eth -- // need to add events to buy and sell tokens
    function priceAdjusted(uint s, int b){
    //let p = Price of tokens in eth/token
    //let s = Total current supply of tokens
    //let e = Total ethereum in the smart contract
    //let b = the number of tokens to buy
    //the price for a token will be the total supply^2
    //p=s^2
    //The integral of p=s^2 is e= ⅓ supply^3
    //The number of eth needed to buy b tokens is given by:
    // (1 / 3)(s+b)^3 - (1 / 3)(s)^3
    //refactored to s^2+b^2 /3+sb
    //The average price to buy b tokens is number of eth needed divided by b
    //NOTE THIS FAILS DUE TO ROUNDING ERRORS AND FRONT RUNNING CONCERNS
    return (s*b +   s*s + (b*b/3))/b;
    }
    function buyTokens(uint numTokens) public payable{
        uint equivEth = priceAdjusted(totalSupply,numTokens)*numTokens;
        assert (msg.val >= equivEth)
        balances(msg.sender)+=numTokens;
        totalSupply+=numTokens;
    }
    function sellTokens(uint numTokens) public{
        uint equivEth = priceAdjusted(totalSupply,numTokens)*numTokens;
        assert(balances(msg.sender)>=numTokens);
        balances(msg.sender) -= numTokens;
        totalSupply -= numTokens;
        msg.sender.send(equivEth);
        //make it so eth isnt withdrawn instantly to prevent someone from using a service and withdrawing instantly. Delay by 100, 1000 blocks?//create a mapping (address -> WithdrawableEth)//struct WithdrawableEth {timestamp, amount of eth}
    }
    
    //user management functions - need to review
    function approveViewer(uint _Acct, address _User) public {
        //ensure message sender is admin of the account and has sufficient balance
        require(Accounts[_Acct].AdminAddr == msg.sender, "You must be the account admin to approve viewers");
        require(Accounts[_Acct].Bal >= userPrice, "Not enough funds!");
        //fees not thought through

        //add the user linked to the account
        Accounts[_Acct].Users.length++;
        uint numUsersInAcct = Accounts[_Acct].Users.length-1;
        Accounts[_Acct].Users[numUsersInAcct].UserAddy = _User;
    }
    function approveWriter(uint _Acct, address _User) public {
        //ensure message sender is admin of the account
        require(Accounts[_Acct].AdminAddr == msg.sender, "You must be the account admin to approve viewers");
        require(Accounts[_Acct].Bal >= userPrice, "Not enough funds!");
        //fees not thought through

        //add user to the account
        Accounts[_Acct].Users.length++;
        uint numUsersInAcct = Accounts[_Acct].Users.length-1;
        Accounts[_Acct].Users[numUsersInAcct].UserAddy = _User;
        //give write permission
        Accounts[_Acct].Users[numUsersInAcct].CanWrite = true;
    }
    function disallowWrite(uint _Acct, uint _UserNum) public {
        //ensure message sender is admin of the account
        require(Accounts[_Acct].AdminAddr == msg.sender, "You must be the account admin to disallow writers");
        //remove user’s write access
        Accounts[_Acct].Users[_UserNum].CanWrite = false;
        //fees not thought through
    }
    function allowWrite(uint _Acct, uint _UserNum) public {
        //ensure message sender is admin of the account
        require(Accounts[_Acct].AdminAddr == msg.sender, "You must be the account admin to allow writers");
        //give the user write access
        Accounts[_Acct].Users[_UserNum].CanWrite = true;
        //fees not thought through
    }
    function deleteUser(uint _Acct, uint _UserNum) public {
        //ensure message sender is admin of the account
        require(Accounts[_Acct].AdminAddr == msg.sender, "You must be the account admin to delete users");
        //delete the user
        delete Accounts[_Acct].Users[_UserNum];
    }

    // View functions- do we need more
    function usersOfAccount(uint _Acct, uint _User) public view returns(address, bool){
        return (Accounts[_Acct].Users[_User].UserAddy,Accounts[_Acct].Users[_User].CanWrite );
    }
    function accountCount() public view returns(uint) {
        return Accounts.length;
    }
    function userCountsInAccount(uint _Acct) public view returns(uint) {
        return Accounts[_Acct].Users.length;
    }

    // Fallback
    function() external payable {
        revert("You must call a function to interact with this contract");
    }
}