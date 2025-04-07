const contractAddress = "0x698124d547Bd7453C6A0fBFff4d5437e6C7617a1"; // Test contract address
const contractABI = [[{"inputs":[{"internalType":"address","name":"initialOwner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"player","type":"address"},{"indexed":false,"internalType":"uint256","name":"stage","type":"uint256"}],"name":"BribeUsed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"player","type":"address"},{"indexed":false,"internalType":"uint256","name":"stage","type":"uint256"},{"indexed":false,"internalType":"string","name":"stageData","type":"string"}],"name":"StageCompleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"player","type":"address"},{"indexed":false,"internalType":"uint256","name":"stage","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"burnedAmount","type":"uint256"},{"indexed":false,"internalType":"enum PrimeHeistGameTest.Route","name":"route","type":"uint8"}],"name":"StageFailed","type":"event"},{"inputs":[],"name":"bribe","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"player","type":"address"}],"name":"currentStage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"escape","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"player","type":"address"}],"name":"getSession","outputs":[{"internalType":"enum PrimeHeistGameTest.Tier","name":"tier","type":"uint8"},{"internalType":"uint256","name":"currentStage","type":"uint256"},{"internalType":"bool","name":"bribeUsed","type":"bool"},{"internalType":"uint256","name":"stake","type":"uint256"},{"internalType":"enum PrimeHeistGameTest.Route","name":"route","type":"uint8"},{"internalType":"string","name":"stageData","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"player","type":"address"}],"name":"isBribeAvailable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"progressStage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"player","type":"address"}],"name":"sessionActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"enum PrimeHeistGameTest.Tier","name":"_tier","type":"uint8"}],"name":"startSession","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    // Replace with the actual ABI of your contract
    // Example:
    {
        "constant": false,
        "inputs": [
            {
                "name": "_tier",
                "type": "uint8"
            }
        ],
        "name": "startSession",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    // Add other functions and events as needed
];

let web3;
let contract;
let account;

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            account = accounts[0];
            contract = new web3.eth.Contract(contractABI, contractAddress);
            document.getElementById('status').innerText = "Wallet connected: " + account;
        } catch (error) {
            console.error("User denied account access", error);
            document.getElementById('status').innerText = "Connection failed.";
        }
    } else {
        alert("Please install MetaMask!");
    }
}

async function startSession() {
    try {
        await contract.methods.startSession(0).send({ from: account });
        document.getElementById('status').innerText = "Session started!";
    } catch (error) {
        console.error("Error starting session", error);
        document.getElementById('status').innerText = "Error starting session.";
    }
}

// Add similar functions for other contract interactions
