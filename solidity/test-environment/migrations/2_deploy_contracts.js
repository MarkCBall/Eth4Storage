var AccountMngmt = artifacts.require("./AccountMngmt.sol");

module.exports = function(deployer) {
  deployer.deploy(AccountMngmt);
};
