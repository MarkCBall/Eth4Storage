const AccountMngmt = artifacts.require("./AccountMngmt.sol");
const assert = require("chai").assert;

let contractInstance;

const account1 = web3.eth.accounts[0]; // 0xa1f957427803596614c5de7669459b3e5ddbb77f
const account2 = web3.eth.accounts[1]; // 0x2100c7c4f16a6e3e86b7acef875f844f6cd9de0a

contract("AccountMngmt", accounts => {
  beforeEach(async () => {
    contractInstance = await AccountMngmt.deployed();
  });

  // createAccount tests
  it("Create an account and set it up with the correct address/balance", async () => {
    await contractInstance.createAccount({
      from: account1,
      value: 500000000000000000
    });

    const newAccountInfo = await contractInstance.Accounts(0);
    const accountCreated = newAccountInfo[0];
    const balance = newAccountInfo[1].toString(10);
    const initialBal = await contractInstance.initialBal();

    assert.equal(
      accountCreated,
      account1,
      "The address of the account created and the message sender don't match"
    );
    assert.equal(
      balance,
      initialBal,
      "The balance added doesn't match the initial balance variable value"
    );
  });

  // addFunds tests
  it("Add more funds and change the account's balance accordingly", async () => {
    const beforeInfo = await contractInstance.Accounts(0);
    const balanceBefore = beforeInfo[1].toString(10);

    await contractInstance.addFunds(0, {
      from: account1,
      value: 100000000000000000
    });

    afterInfo = await contractInstance.Accounts(0);
    balanceAfter = afterInfo[1].toString(10);

    assert.equal(
      Number(balanceBefore) + 100000000000000000,
      balanceAfter,
      "The balance before transaction plus the funds added aren't equal to the balance after transaction"
    );
  });

  // approveViewer/Writer tests
  it("Link a new user to an existing account, pay the associated fees", async () => {
    const beforeInfo = await contractInstance.Accounts(0);
    const balanceBefore = beforeInfo[1].toString(10);

    await contractInstance.approveWriter(0, account2);

    afterInfo = await contractInstance.Accounts(0);
    balanceAfter = afterInfo[1].toString(10);

    currUserPrice = await contractInstance.userPrice();

    newUserInfo = await contractInstance.usersOfAccount(0, 0);
    userAddress = newUserInfo[0];
    writePermission = newUserInfo[1];

    assert.equal(writePermission, true),
      "The user did not get write permission";
    assert.equal(
      userAddress,
      account2,
      "The new user and message sender's address do not match"
    );
    assert.equal(
      Number(balanceBefore) - currUserPrice,
      balanceAfter,
      "The account's new balance doesn't accurately reflect old balance subtract user fee"
    );
  });

  // disallowWrite test
  it("Remove a users permission to write data", async () => {
    beforeInfo = await contractInstance.usersOfAccount(0, 0);
    userAddressBefore = beforeInfo[0];
    priorWritePermission = beforeInfo[1];

    await contractInstance.disallowWrite(0, 0);

    afterInfo = await contractInstance.usersOfAccount(0, 0);
    userAddressAfter = afterInfo[0];
    postWritePermission = afterInfo[1];

    assert.equal(
      priorWritePermission,
      true,
      "Write permission isn't granted before it's restricted"
    );
    assert.equal(
      postWritePermission,
      false,
      "Write permission isn't restricted after"
    );
    assert.equal(
      userAddressBefore,
      userAddressAfter,
      "User address has changed while altering permission"
    );
  });

  // deleteUser test
  it("Delete a linked user from an account", async () => {
    beforeInfo = await contractInstance.usersOfAccount(0, 0);
    userAddressBefore = beforeInfo[0];

    await contractInstance.deleteUser(0, 0);

    afterInfo = await contractInstance.usersOfAccount(0, 0);
    userAddressAfter = afterInfo[0];

    assert.equal(userAddressBefore, account2, "Linked users don't match");
    assert.equal(
      userAddressAfter,
      0x0000000000000000000000000000000000000000,
      "User has not been successfully deleted"
    );
  });

  // giveOwnership test
  it("Transfer account ownership", async () => {
    const priorAccountInfo = await contractInstance.Accounts(0);
    const oldAccount = priorAccountInfo[0];

    await contractInstance.giveOwnership(0, account2);

    const postAccountInfo = await contractInstance.Accounts(0);
    const newAccount = postAccountInfo[0];

    assert.equal(
      oldAccount,
      account1,
      "Old ownership data doesnt match the owner that's transferring"
    );
    assert.equal(
      newAccount,
      account2,
      "Specified new account owner doesn't match actual new owner"
    );
  });
});
