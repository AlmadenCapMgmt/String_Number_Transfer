// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract HybridStorage {
    // Private variables to store the data
    string private storedString;
    uint256 private storedNumber;
    
    // Public variable to track the contract owner
    address public owner;
    
    // Events emitted when data is stored
    event StringStored(string indexed value, address indexed sender);
    event NumberStored(uint256 indexed value, address indexed sender);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    // Modifier to restrict access to owner-only functions
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    // Constructor sets the deployer as the initial owner
    constructor() {
        owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
    }
    
    // Function to store a new string (owner-only)
    // @param newString The string value to store
    function setString(string memory newString) public onlyOwner {
        storedString = newString;
        emit StringStored(newString, msg.sender);
    }
    
    // Function to store a new number (owner-only)
    // @param newNumber The number value to store
    function setNumber(uint256 newNumber) public onlyOwner {
        storedNumber = newNumber;
        emit NumberStored(newNumber, msg.sender);
    }
    
    // Function to store both string and number at once (owner-only)
    // @param newString The string value to store
    // @param newNumber The number value to store
    function setBoth(string memory newString, uint256 newNumber) public onlyOwner {
        storedString = newString;
        storedNumber = newNumber;
        emit StringStored(newString, msg.sender);
        emit NumberStored(newNumber, msg.sender);
    }
    
    // Function to retrieve the stored string (public access)
    // @return The currently stored string
    function getString() public view returns (string memory) {
        return storedString;
    }
    
    // Function to retrieve the stored number (public access)
    // @return The currently stored number
    function getNumber() public view returns (uint256) {
        return storedNumber;
    }
    
    // Function to retrieve both stored values (public access)
    // @return The currently stored string and number
    function getBoth() public view returns (string memory, uint256) {
        return (storedString, storedNumber);
    }
    
    // Function to transfer ownership to a new address (owner-only)
    // @param newOwner The address to transfer ownership to
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        address previousOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(previousOwner, newOwner);
    }
}