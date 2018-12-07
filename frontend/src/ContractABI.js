//this file contains the contract ABI and address

//var ContractABI = [{"constant":false,"inputs":[{"name":"_Amount","type":"uint256"}],"name":"ownerWithdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_Acct","type":"uint256"},{"name":"_User","type":"address"}],"name":"deleteUser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_Acct","type":"uint256"},{"name":"_newowner","type":"address"}],"name":"giveOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"numAccts","outputs":[{"name":","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":","type":"address"}],"name":"Users","outputs":[{"name":"AcctId","type":"uint256"},{"name":"CanWrite","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"createAccount","outputs":[{"name":","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_Acct","type":"uint256"},{"name":"_User","type":"address"}],"name":"disallowWrite","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_Acct","type":"uint256"},{"name":"_User","type":"address"}],"name":"approveViewer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_Acct","type":"uint256"},{"name":"_User","type":"address"}],"name":"approveWriter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":","type":"uint256"}],"name":"Accounts","outputs":[{"name":"AdminAddr","type":"address"},{"name":"Bal","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]
// WHATS WRONG WITH THE ABOVE ONE?
var ContractABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Acct",
				"type": "uint256"
			},
			{
				"name": "_User",
				"type": "address"
			}
		],
		"name": "approveViewer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Acct",
				"type": "uint256"
			},
			{
				"name": "_User",
				"type": "address"
			}
		],
		"name": "approveWriter",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "createAccount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Acct",
				"type": "uint256"
			},
			{
				"name": "_User",
				"type": "address"
			}
		],
		"name": "deleteUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Acct",
				"type": "uint256"
			},
			{
				"name": "_User",
				"type": "address"
			}
		],
		"name": "disallowWrite",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Acct",
				"type": "uint256"
			},
			{
				"name": "_newowner",
				"type": "address"
			}
		],
		"name": "giveOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Amount",
				"type": "uint256"
			}
		],
		"name": "ownerWithdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Accounts",
		"outputs": [
			{
				"name": "AdminAddr",
				"type": "address"
			},
			{
				"name": "Bal",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numAccts",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "Users",
		"outputs": [
			{
				"name": "AcctId",
				"type": "uint256"
			},
			{
				"name": "CanWrite",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];


export var ContractAddress = "0x7023aCfD191cf652db0168d67bF6652f9e4aBA72";



//export ContractAddress;

export default ContractABI;