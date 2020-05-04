export const Kadena_Address = '0xC7CDa21e8132ec2C1509436F3feb007a0F2fCF68';

export const Kadena_ABI =   [
  {
    "constant": false,
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
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
    "constant": false,
    "inputs": [
      {
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "hospitalName",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "country",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "city",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "ipfs",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "time",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "pending",
        "type": "bool"
      },
      {
        "indexed": false,
        "name": "registered",
        "type": "bool"
      }
    ],
    "name": "RegisterHospital",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "Admin",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "applicant",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "registeredAs",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "status",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "time",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "pending",
        "type": "bool"
      },
      {
        "indexed": true,
        "name": "registrationStatus",
        "type": "bool"
      },
      {
        "indexed": false,
        "name": "rating",
        "type": "uint256"
      }
    ],
    "name": "Registration",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "ownerNeed",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "eventId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "hospital",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "title",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "item",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "borrow",
        "type": "bool"
      },
      {
        "indexed": false,
        "name": "endDate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "ipfs",
        "type": "string"
      }
    ],
    "name": "NeedAHand",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "ownerGive",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "eventId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "hospital",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "title",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "item",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "borrow",
        "type": "bool"
      },
      {
        "indexed": false,
        "name": "endDate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "ipfs",
        "type": "string"
      }
    ],
    "name": "GiveAHand",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "pledgedBy",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "sender",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "receiver",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "date",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "eventId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "item",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "committed",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "pledgeTo",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "endDate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "borrow",
        "type": "bool"
      },
      {
        "indexed": false,
        "name": "addedRating",
        "type": "uint256"
      }
    ],
    "name": "Pledged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "takenBy",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "receiver",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "sender",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "date",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "eventId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "item",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "received",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "tookFrom",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "endDate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "borrow",
        "type": "bool"
      },
      {
        "indexed": false,
        "name": "addedRating",
        "type": "uint256"
      }
    ],
    "name": "Taken",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "Pause",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "Unpause",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipRenounced",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_hospitalName",
        "type": "string"
      },
      {
        "name": "_country",
        "type": "string"
      },
      {
        "name": "_city",
        "type": "string"
      },
      {
        "name": "_ipfs",
        "type": "string"
      }
    ],
    "name": "registerHospital",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_applicant",
        "type": "address"
      },
      {
        "name": "_accepted",
        "type": "bool"
      }
    ],
    "name": "register",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "getHospitalStatus",
    "outputs": [
      {
        "name": "_hospitalName",
        "type": "string"
      },
      {
        "name": "_country",
        "type": "string"
      },
      {
        "name": "_city",
        "type": "string"
      },
      {
        "name": "_ipfs",
        "type": "string"
      },
      {
        "name": "_pending",
        "type": "bool"
      },
      {
        "name": "_registered",
        "type": "bool"
      },
      {
        "name": "_time",
        "type": "uint256"
      },
      {
        "name": "_rating",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_title",
        "type": "string"
      },
      {
        "name": "_category",
        "type": "string"
      },
      {
        "name": "_item",
        "type": "string"
      },
      {
        "name": "_amount",
        "type": "uint256"
      },
      {
        "name": "_borrow",
        "type": "bool"
      },
      {
        "name": "_minimumAmount",
        "type": "uint256"
      },
      {
        "name": "_endDate",
        "type": "uint256"
      },
      {
        "name": "_ipfs",
        "type": "string"
      }
    ],
    "name": "callForHelp",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_title",
        "type": "string"
      },
      {
        "name": "_category",
        "type": "string"
      },
      {
        "name": "_item",
        "type": "string"
      },
      {
        "name": "_amount",
        "type": "uint256"
      },
      {
        "name": "_borrow",
        "type": "bool"
      },
      {
        "name": "_minimumAmount",
        "type": "uint256"
      },
      {
        "name": "_endDate",
        "type": "uint256"
      },
      {
        "name": "_ipfs",
        "type": "string"
      }
    ],
    "name": "provideAssistance",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "provideAssistanceDetails",
    "outputs": [
      {
        "name": "title",
        "type": "string"
      },
      {
        "name": "category",
        "type": "string"
      },
      {
        "name": "item",
        "type": "string"
      },
      {
        "name": "amount",
        "type": "uint256"
      },
      {
        "name": "committed",
        "type": "uint256"
      },
      {
        "name": "borrow",
        "type": "bool"
      },
      {
        "name": "minimum",
        "type": "uint256"
      },
      {
        "name": "endDate",
        "type": "uint256"
      },
      {
        "name": "ipfs",
        "type": "string"
      },
      {
        "name": "owner",
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
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "callForHelpDetails",
    "outputs": [
      {
        "name": "title",
        "type": "string"
      },
      {
        "name": "category",
        "type": "string"
      },
      {
        "name": "item",
        "type": "string"
      },
      {
        "name": "amount",
        "type": "uint256"
      },
      {
        "name": "committed",
        "type": "uint256"
      },
      {
        "name": "borrow",
        "type": "bool"
      },
      {
        "name": "minumum",
        "type": "uint256"
      },
      {
        "name": "endDate",
        "type": "uint256"
      },
      {
        "name": "ipfs",
        "type": "string"
      },
      {
        "name": "owner",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_eventId",
        "type": "uint256"
      },
      {
        "name": "_commit",
        "type": "uint256"
      }
    ],
    "name": "pledge",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_eventId",
        "type": "uint256"
      },
      {
        "name": "_take",
        "type": "uint256"
      }
    ],
    "name": "take",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "needsOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256[]"
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
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "assistsOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getNeededCount",
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
    "name": "getAssistCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]