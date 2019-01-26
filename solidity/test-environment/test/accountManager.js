const AccountManager = artifacts.require("./AccountManager.sol");
const assert = require("chai").assert;

let contractInstance;

contract("AccountManager", accounts => {
  beforeEach(async () => {
    contractInstance = await AccountManager.deployed({ from: accounts[0] });
  });

  // buy token test
  it("Buy 1000 tokens", async () => {
    await contractInstance.buyTokens(1000, {
      from: accounts[0],
      value: 500000000000000000
    });

    const newBalance = await contractInstance.balanceOf(accounts[0]);

    assert.equal(newBalance, 1000, "The balance of the account isn't 1000");
  });

  // create account test
  it("Spend 500 tokens to create an account", async () => {
    const accPrice = await contractInstance.accPrice();

    await contractInstance.createAccount({
      from: accounts[0],
      value: 0
    });

    const newAccount = await contractInstance.Accounts(0);

    const newBalance = await contractInstance.balanceOf(accounts[0]);

    assert.equal(
      newAccount,
      accounts[0],
      "The msg.sender address and first account address don't match"
    );
    assert.equal(
      1000 - accPrice,
      newBalance,
      "Token balance wasn't properly decremented"
    );
  });

  // add user to account test
  it("Spend 100 tokens to add a new user to an existing account", async () => {
    const beforeBal = await contractInstance.balanceOf(accounts[0]);

    await contractInstance.createUserInAccount(0, accounts[1], "0x00");

    const afterBal = await contractInstance.balanceOf(accounts[0]);

    const userPrice = await contractInstance.userPrice();

    const newUser = await contractInstance.userInfo(0, 0);

    assert.equal(
      accounts[1],
      newUser[0],
      "The new user and specified user to create do not match"
    );
    assert.equal(
      beforeBal - userPrice,
      afterBal,
      "The account's new token balance doesn't accurately reflect old balance subtract user price"
    );
  });

  // deleteUser test
  it("Delete a user from an account", async () => {
    beforeInfo = await contractInstance.userInfo(0, 0);

    await contractInstance.deleteUser(0, 0);

    afterInfo = await contractInstance.userInfo(0, 0);

    assert.equal(beforeInfo[0], accounts[1], "Linked users don't match");
    assert.equal(
      afterInfo[0],
      0x0000000000000000000000000000000000000000,
      "User has not been successfully deleted"
    );
  });

  // sell tokens test
  it("Sell 10 tokens", async () => {
    const priorBal = await contractInstance.balanceOf(accounts[0]);
    await contractInstance.sellTokens(10, { from: accounts[0] });
    const postBal = await contractInstance.balanceOf(accounts[0]);
    assert.equal(
      priorBal - postBal,
      10,
      "balance before subtract balance after doesn't match amount sold"
    );
  });
});
