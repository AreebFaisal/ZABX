// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ZABxToken {
function transfer(address to, uint256 amount) external returns (bool);
function balanceOf(address account) external view returns (uint256);
function totalSupply() external view returns (uint256);
}

contract PublicPoSBlockchain {


// Variables
mapping(address => uint256) public balances;
address[] public validators;
uint256 public validatorCount;
uint256 public validatorThreshold;
uint256 public blockTime;
uint256 public blockNumber;
uint256 public genesisBlock;
uint256 public totalSupply;
uint256 public networkReward;
address public owner;
address public erc20TokenAddress; // Address of the deployed ERC-20 token contract
uint256 public constant MAX_TRANSACTIONS_PER_BLOCK = 50;
uint256 public constant BLOCK_TIMEOUT = 8 seconds;
uint256 private lastTransactionTimestamp;

modifier onlyOwner() {
require(msg.sender == owner, "Only owner can perform this action.");
_;
}

struct Block {
uint256 blockNumber;
uint256 timestamp;
bytes32 prevBlockHash;
bytes32 blockHash;
uint256 transactionCount; // Number of transactions in the block
bool isFinalized; // Flag indicating if the block is finalized
Transaction[] transactions; // List of transactions in the block
BlockSignature[] signatures; // Signatures of the validators for the block
}
struct BlockSignature {
address validator;
bytes signature;
}


mapping(uint256 => Block) public blocks;

struct Transaction {
    address sender;
    address recipient;
    uint256 amount;
}

mapping(uint256 => Transaction[]) public transactions;

// Events
event BlockDetails(
uint256 blockNumber,
uint256 timestamp,
bytes32 prevBlockHash,
bytes32 blockHash,
uint256 transactionCount,
bool isFinalized,
Transaction[] transactions,
BlockSignature[] signatures

);


event Deposit(address indexed account, uint256 amount);
event Withdrawal(address indexed account, uint256 amount);
event NewValidator(address indexed validator);
event ValidatorRemoved(address indexed validator);
event BlockMined(uint256 blockNumber, bytes32 blockHash);
event TransactionSent(address indexed sender, address indexed recipient, uint256 amount);

constructor(address _erc20TokenAddress) {
balances = mapping(address => uint256);
ZABxToken zabxToken = ZABxToken(_erc20TokenAddress);
totalSupply = zabxToken.totalSupply(); // Set the total supply of the blockchain to be equal to the total supply of the ZABxToken
validatorThreshold = 50;
blockTime = block.timestamp;
networkReward = totalSupply / 100; // 1% of total supply
validators.push(msg.sender);
validatorCount = 1;
genesisBlock = block.number;
owner = msg.sender;
erc20TokenAddress = _erc20TokenAddress; // Set the address of the deployed ERC-20 token contract
}
// Modifier to check if the sender is a validator
  modifier onlyValidator() {
        require(isValidator(msg.sender), "Only validators can perform this action.");
        _;
    }

         function mineBlockIfTimeout() external {
        if (block.timestamp >= lastTransactionTimestamp + BLOCK_TIMEOUT && transactions[blockNumber].length > 0) {
            mineBlock();
        }
    }
    // Deposit tokens into the blockchain
     function deposit(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        require(ZABxToken(erc20TokenAddress).transfer(msg.sender, amount), "Token transfer failed"); // Transfer ERC-20 tokens to the sender
        emit Deposit(msg.sender, amount);
    }
    
    // Withdraw tokens from the blockchain
   function withdraw(uint256 amount) external {
        require(balances[msg.sender] + networkReward >= amount, "Insufficient balance");
        balances[msg.sender] += amount;
        require(ZABxToken(erc20TokenAddress).transferFrom(msg.sender, address(this), amount), "Token transfer failed"); // Transfer ERC-20 tokens to the contract
        emit Withdrawal(msg.sender, amount);
    }
    
  // Add a new validator
function addValidator(address validator) external onlyValidator {
    require(!isValidator(validator), "Address is already a validator");
    require(validatorCount < validatorThreshold, "Validator count exceeds threshold");
    validators.push(validator);
    validatorCount++;
    emit NewValidator(validator);
}
modifier atLeastOneValidator() {
        require(validatorCount > 1, "At least one validator required");
        _;
    }

    
    // Remove a validator
function removeValidator(address validator) external onlyValidator atLeastOneValidator {
        require(isValidator(validator), "Address is not a validator");
        require(validatorCount > validatorThreshold, "Cannot remove validators below the threshold");
        for (uint256 i = 0; i < validators.length; i++) {
            if (validators[i] == validator) {
                validators[i] = validators[validators.length - 1];
                validators.pop();
                validatorCount--;
                emit ValidatorRemoved(validator);
                break;
            }
        }
    }

    
    // Check if an address is a validator
    function isValidator(address validator) public view returns (bool) {
        for (uint256 i = 0; i < validators.length; i++) {
            if (validators[i] == validator) {
                return true;
            }
        }
        return false;
    }

 function mineBlock() internal onlyValidator {
        require(block.timestamp >= blockNumber + blockTime, "Block time has not elapsed");

        bytes32 blockHash = calculateBlockHash(blockNumber, block.timestamp, blocks[blockNumber - 1].blockHash, bytes32(0));
        uint256 reward = networkReward / validatorCount;
        balances[msg.sender] += reward;

        // Select the validator with the highest stake to mine the block
        address selectedValidator = address(0);
        uint256 highestStake = 0;
        for (uint256 i = 0; i < validators.length; i++) {
            address validator = validators[i];
            if (balances[validator] > highestStake) {
                highestStake = balances[validator];
                selectedValidator = validator;
            }
        }

        // Ensure that the selected validator is the message sender
        require(msg.sender == selectedValidator, "Only selected validator can mine the block");

        blockNumber++;
        blocks[blockNumber] = Block(blockNumber, block.timestamp, blocks[blockNumber - 1].blockHash, blockHash, transactions[blockNumber].length, true, transactions[blockNumber], BlockSignature(msg.sender, bytes("signature")));

        emit BlockMined(blockNumber, blockHash);
    }
    }

    function calculateBlockHash(uint256 _blockNumber, uint256 _timestamp, bytes32 _prevBlockHash, bytes32 _blockHash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_blockNumber, _timestamp, _prevBlockHash, _blockHash));
    }

 function sendTransaction(address recipient, uint256 amount) external {
        require(recipient != address(0), "Invalid recipient address");
        require(amount > 0, "Invalid amount");

        // Deduct the amount from the sender's balance
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;

        // Add the amount to the recipient's balance
        balances[recipient] += amount;

        // Add the transaction to the current block
        Transaction memory transaction = Transaction(msg.sender, recipient, amount);
        transactions[blockNumber].push(transaction);

        emit TransactionSent(msg.sender, recipient, amount);

        // Update the last transaction timestamp
        lastTransactionTimestamp = block.timestamp;

        // Check if the transaction limit is reached
        if (transactions[blockNumber].length >= MAX_TRANSACTIONS_PER_BLOCK) {
            mineBlock(calculateBlockHash);
        }
    }

function sendTransactionFromContract(address sender, address recipient, uint256 amount) external onlyValidator {
        require(sender != address(0), "Invalid sender address");
        require(recipient != address(0), "Invalid recipient address");
        require(amount > 0, "Invalid amount");

        // Deduct the amount from the sender's balance
        require(balances[sender] >= amount, "Insufficient balance");
        balances[sender] -= amount;

        // Add the amount to the recipient's balance
        balances[recipient] += amount;

        // Check if the transaction limit is reached
        if (transactions[blockNumber].length >= 50) {
            mineBlock(calculateBlockHash);
        }

        // Add the transaction to the current block
        Transaction memory transaction = Transaction(sender, recipient, amount);
        transactions[blockNumber].push(transaction);

        emit TransactionSent(sender, recipient, amount);
    }
function printChain() external onlyOwner {
    for (uint256 i = genesisBlock; i <= blockNumber; i++) {
        Block memory blockData = blocks[i];
        emit BlockDetails(
            blockData.blockNumber,
            blockData.timestamp,
            blockData.prevBlockHash,
            blockData.blockHash,
            blockData.transactionCount,
            blockData.isFinalized,
            blockData.transactions,
            blockData.signatures
        );
    }
}
