//LEGACY CONTRACTS - NEWER AT TOP
// "0x1e29f1A0FAC4c382b848508ed1537aB966f825dA";
// "0x4a36137D3423737Cde187B7aF074291302707fDd";

//this file contains the contract ABI and address

export var ContractAddress = "0xb54bed6bd6cc802c6b3d27bc52723776c439772a";

var ContractABI = [
  {
    constant: false,
    inputs: [
      { name: "_Acct", type: "uint256" },
      { name: "_UserNum", type: "uint256" }
    ],
    name: "allowWrite",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_Amount", type: "uint256" }],
    name: "ownerWithdraw",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_Acct", type: "uint256" },
      { name: "_UserNum", type: "uint256" }
    ],
    name: "disallowWrite",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_Acct", type: "uint256" }],
    name: "userCountsInAccount",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_newUserPrice", type: "uint256" }],
    name: "setUserPrice",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_Acct", type: "uint256" },
      { name: "_UserNum", type: "uint256" }
    ],
    name: "deleteUser",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "initialBal",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_Acct", type: "uint256" },
      { name: "_newowner", type: "address" }
    ],
    name: "giveOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "createAccount",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "userPrice",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "_Acct", type: "uint256" },
      { name: "_User", type: "uint256" }
    ],
    name: "usersOfAccount",
    outputs: [{ name: "", type: "address" }, { name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_newAccPrice", type: "uint256" }],
    name: "setAccPrice",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_Acct", type: "uint256" }],
    name: "addFunds",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "accPrice",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_Acct", type: "uint256" },
      { name: "_User", type: "address" }
    ],
    name: "approveViewer",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "accountCount",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_newInitialBal", type: "uint256" }],
    name: "setInitialBal",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_Acct", type: "uint256" },
      { name: "_User", type: "address" }
    ],
    name: "approveWriter",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "Accounts",
    outputs: [
      { name: "AdminAddr", type: "address" },
      { name: "Bal", type: "uint256" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  { payable: true, stateMutability: "payable", type: "fallback" }
];

export default ContractABI;
