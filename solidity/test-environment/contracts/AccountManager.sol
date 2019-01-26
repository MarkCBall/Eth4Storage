pragma solidity ^0.5.0;

contract ERC20Interface {

    //string public constant symbol;
    //string public constant name;
    //uint8 public constant decimals;
    
    uint totalSupply;
    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;

    //events
    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    
    event TokensBought(address indexed buyer, uint TokenAmount, uint weiAmount);
    event TokensSold(address indexed seller, uint TokenAmount, uint weiAmount);

    //functions
    function getTotalSupply() public view returns (uint){
        return totalSupply;
    }
    function balanceOf(address tokenOwner) public view returns (uint balance){
        return balances[tokenOwner];
    }
    function allowance(address tokenOwner, address spender) public view returns (uint remaining){
        return allowed[tokenOwner][spender];
    }
    function transfer(address to, uint tokens) public returns (bool success){
        require(balances[msg.sender] >= tokens,"You don't have that many tokens");
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

    function() external payable {
        revert("You must call a function to interact with this contract");
    }
}

contract Token is ERC20Interface {

    function avgPriceBetween(uint low, uint high) public pure returns (uint){
        //if there is no range, the price is the original price function
        if (high==low)
            return (low*low);
        //average price between low and high --> integral at high minus integral at low / (high-low)
        return (high**3-low**3)/3/(high-low);
    }
    function buyTokens(uint numTokens) public payable{
        uint equivEth = avgPriceBetween(ERC20Interface.totalSupply,ERC20Interface.totalSupply+numTokens)*numTokens;
        uint ethFee = equivEth * 101/100; //1% fee to buy tokens
        require(msg.value >= ethFee, "You didn't send enough Eth");
        ERC20Interface.balances[msg.sender] += numTokens;
        ERC20Interface.totalSupply += numTokens;
        msg.sender.transfer(msg.value - ethFee);
        emit ERC20Interface.TokensBought(msg.sender, numTokens, ethFee);
    }
    function sellTokens(uint numTokens) public{
        uint equivEth = avgPriceBetween(ERC20Interface.totalSupply-numTokens,ERC20Interface.totalSupply)*numTokens;
        require(ERC20Interface.balances[msg.sender]>=numTokens, "You cannot sell more tokens than you have");
        ERC20Interface.balances[msg.sender] -= numTokens;
        ERC20Interface.totalSupply -= numTokens;
        msg.sender.transfer(equivEth);
        emit ERC20Interface.TokensSold(msg.sender, numTokens, equivEth);
    }

    function() external payable {
        revert("You must call a function to interact with this contract");
    }
}

contract AccountManager is ERC20Interface, Token {

    address public owner;
    
    uint public accPrice; //price to create an account
    uint public userPrice; //price to add user to an account
    
    Account[] public Accounts;
    struct Account {address AdminAddr; User[] Users;}
    struct User {address UserAddy; byte Permissions;}
    
    constructor() public {
        owner = msg.sender;
        accPrice = 500;
        userPrice = 100;
    }
    
    // checks that msg.sender is the account owner/admin 
    modifier onlyAccountAdmin (uint _Acct) {
        require(Accounts[_Acct].AdminAddr == msg.sender, "You must be the account admin");
        _;
    }
    
    // --------------------
    // Setter functions
    // --------------------
    function setAccPrice(uint _newAccPrice) public {
        require(msg.sender == owner, "You must be the owner to change the account price.");
        accPrice = _newAccPrice;
    }
    function setUserPrice(uint _newUserPrice) public {
        require(msg.sender == owner, "You must be the owner to change the user price.");
        userPrice = _newUserPrice;
    }
    
    // --------------------
    // App logic functions
    // --------------------
    // create new account for msg.sender
    function createAccount() public {
        require(ERC20Interface.balanceOf(msg.sender) >= accPrice, "You do not have enough funds to create an account");
        ERC20Interface.transfer(0x0000000000000000000000000000000000000000, accPrice);
        Accounts.length++;
        uint acctN = Accounts.length-1;
        Accounts[acctN].AdminAddr = msg.sender;
    }
    // pass account#, user address & permissions to add a user to an account
    function createUserInAccount(uint _Acct, address _User, byte _Permissions) public onlyAccountAdmin(_Acct) {
        require(ERC20Interface.balances[msg.sender] >= userPrice, "Not enough funds!");
        ERC20Interface.transfer(0x0000000000000000000000000000000000000000, userPrice);
        Accounts[_Acct].Users.length++;
        uint numUsersInAcct = Accounts[_Acct].Users.length-1;
        Accounts[_Acct].Users[numUsersInAcct].UserAddy = _User;
        Accounts[_Acct].Users[numUsersInAcct].Permissions = _Permissions;
    }
    // pass account#, user# & permissions to change users permissions 
    function modifyUserPermissions(uint _Acct, uint _UserNum, byte _Permissions) public onlyAccountAdmin(_Acct) {
        Accounts[_Acct].Users[_UserNum].Permissions = _Permissions;
    }
    // pass account# & user# to delete user from account
    function deleteUser(uint _Acct, uint _UserNum) public onlyAccountAdmin(_Acct) {
        delete Accounts[_Acct].Users[_UserNum];
    }
    
    // --------------------
    // View functions 
    // --------------------
    // pass account# & user# to return user address and permissions
    function userInfo(uint _Acct, uint _UserNum) public view returns(address, byte){
        return (Accounts[_Acct].Users[_UserNum].UserAddy,Accounts[_Acct].Users[_UserNum].Permissions);
    }
    // returns total # of accounts
    function numAccounts() public view returns(uint) {
        return Accounts.length;
    }
    // pass account# to return # of users in account
    function numUsersInAccount(uint _AcctNum) public view returns(uint) {
        return Accounts[_AcctNum].Users.length;
    }

    function() external payable {
        revert("You must call a function to interact with this contract");
    }
}