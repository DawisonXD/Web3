const SwordToken = artifacts.require('SwordToken');

module.exports = function (deployer) {
	deployer.deploy(SwordToken, 'SwordTokens', 'SWORDS');
};
