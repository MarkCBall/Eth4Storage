pragma solidity ^0.4.25;
    
contract AccountMngmt {
    
    //STATE ERC20 based 
    // string public symbol;// string public  name;// uint8 public decimals;
    uint _totalSupply;
    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;
    //STATE user management
    address public owner;
    Account[] public Accounts;
    struct Account {address AdminAddr; uint Bal; User[] Users;}
    struct User {address UserAddy; byte Permissions;}
    uint public accPrice;//price to make an account
    uint public userPrice;//price to add a user
    
    //ERC20 events
    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    
    //constructor function
    constructor() public {
        owner = msg.sender;
        // currency unit is wei
        accPrice = 50000000000000000;
        userPrice = 10000000000000000;
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

    //ERC20 functions - need to complete
    function totalSupply() public view returns (uint){
        return _totalSupply;
    }
    function balanceOf(address tokenOwner) public view returns (uint balance){
        return balances[tokenOwner];
    }
    function allowance(address tokenOwner, address spender) public view returns (uint remaining){
        return allowed[tokenOwner][spender];
    }
    function transfer(address to, uint tokens) public returns (bool success){
        require(balances[msg.sender] >= tokens , "You don't have that many tokens");
        balances[msg.sender] -= tokens;
        balances[to] += tokens;
        emit Transfer(msg.sender, to, tokens);
        return true;
    }
    function approve(address spender, uint tokens) public returns (bool success){
        allowed[msg.sender][spender] += tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }
    function transferFrom(address from, address to, uint tokens) public returns (bool success){
        require(balances[from] >= tokens, "You are attempting to transfer more tokens than the user has");
        require(allowed[from][to] >= tokens, "You were not approved for that much");
        balances[from] -= tokens;
        allowed[from][msg.sender] -= tokens;
        balances[to] += tokens;
        emit Transfer(from, to, tokens);
        return true;
    }

    //bonding curve functions - need to do math to figure out #tokens given #eth -- // need to add events to buy and sell tokens
    function priceAdjusted(uint s, uint b) public pure returns (uint){
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
        uint equivEth = priceAdjusted(_totalSupply,numTokens)*numTokens;
        require(msg.value >= equivEth, "You didn't send enough Eth");
        balances[msg.sender]+=numTokens;
        _totalSupply+=numTokens;
    }
    function sellTokens(uint numTokens) public{
        uint equivEth = priceAdjusted(_totalSupply,numTokens)*numTokens;
        require(balances[msg.sender]>=numTokens, "You are trying to sell more tokens than you have");
        balances[msg.sender] -= numTokens;
        _totalSupply -= numTokens;
        msg.sender.transfer(equivEth);
        //make it so eth isnt withdrawn instantly to prevent someone from using a service and withdrawing instantly. Delay by 100, 1000 blocks?//create a mapping (address -> WithdrawableEth)//struct WithdrawableEth {timestamp, amount of eth}
    }
    



    // Account[] public Accounts;
    // struct Account {address AdminAddr; uint Bal; User[] Users;}
    // struct User {address UserAddy; byte Permissions;}

    function createAccount() public {
        require(balances[msg.sender] >= accPrice, "You do not have enough funds to create an account");
        //require()//this eth address doesn't already have an account//require that this address doesn't have an account//indicate that this address has an account now//OR can an address have multiple accounts?
        0x0000000000000000000000000000000000000000.transfer(accPrice);
        Accounts.length++;
        uint acctN = Accounts.length-1;
        Accounts[acctN].AdminAddr = msg.sender;
    }

    function createUserInAccount(uint _Acct, address _User, byte _Permissions) public{
        require(Accounts[_Acct].AdminAddr == msg.sender, "You must be the account admin to approve viewers");
        require(balances[msg.sender] >= userPrice, "Not enough funds!");
        Accounts[_Acct].Users.length++;
        uint numUsersInAcct = Accounts[_Acct].Users.length-1;
        //can the two lines below be optimized?
        Accounts[_Acct].Users[numUsersInAcct].UserAddy = _User;
        Accounts[_Acct].Users[numUsersInAcct].Permissions = _Permissions;
    }

    function modifyUserPermissions(uint _Acct, uint _UserNum, byte _Permissions) public{
        require(Accounts[_Acct].AdminAddr == msg.sender, "You must be the account admin to change user permissions");
        Accounts[_Acct].Users[_UserNum].Permissions = _Permissions;
    }

    function deleteUser(uint _Acct, uint _UserNum) public {
        require(Accounts[_Acct].AdminAddr == msg.sender, "You must be the account admin to delete users");
        delete Accounts[_Acct].Users[_UserNum];
    }



    // View functions- do we need more
    function usersOfAccount(uint _Acct, uint _UserNum) public view returns(address, byte){
        return (Accounts[_Acct].Users[_UserNum].UserAddy,Accounts[_Acct].Users[_UserNum].Permissions );
    }
    function accountCount() public view returns(uint) {
        return Accounts.length;
    }
    function userCountsInAccount(uint _AcctNum) public view returns(uint) {
        return Accounts[_AcctNum].Users.length;
    }

    // Fallback
    function() external payable {
        revert("You must call a function to interact with this contract");
    }
}