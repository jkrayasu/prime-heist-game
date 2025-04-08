const contractAddress = "0x698124d547Bd7453C6A0fBFff4d5437e6C7617a1"; // Test contract address
const contractABI = [
    

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
