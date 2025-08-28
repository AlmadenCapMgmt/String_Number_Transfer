import { expect } from "chai";
import hre from "hardhat";
const { ethers } = hre;

describe("HybridStorage", function () {
  let HybridStorage;
  let hybridStorage;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    HybridStorage = await ethers.getContractFactory("HybridStorage");
    [owner, addr1, addr2] = await ethers.getSigners();
    hybridStorage = await HybridStorage.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await hybridStorage.owner()).to.equal(owner.address);
    });

    it("Should return empty string initially", async function () {
      expect(await hybridStorage.getString()).to.equal("");
    });

    it("Should return zero number initially", async function () {
      expect(await hybridStorage.getNumber()).to.equal(0);
    });

    it("Should return empty values for getBoth initially", async function () {
      const [str, num] = await hybridStorage.getBoth();
      expect(str).to.equal("");
      expect(num).to.equal(0);
    });
  });

  describe("String Storage", function () {
    it("Should allow owner to set string", async function () {
      const testString = "Hello, World!";
      await hybridStorage.setString(testString);
      expect(await hybridStorage.getString()).to.equal(testString);
    });

    it("Should emit StringStored event when setting string", async function () {
      const testString = "Test Event";
      await expect(hybridStorage.setString(testString))
        .to.emit(hybridStorage, "StringStored")
        .withArgs(testString, owner.address);
    });

    it("Should not allow non-owner to set string", async function () {
      const testString = "Unauthorized";
      await expect(
        hybridStorage.connect(addr1).setString(testString)
      ).to.be.revertedWith("Only owner can call this function");
    });

    it("Should allow anyone to read string", async function () {
      const testString = "Public Read Test";
      await hybridStorage.setString(testString);
      expect(await hybridStorage.connect(addr1).getString()).to.equal(testString);
    });
  });

  describe("Number Storage", function () {
    it("Should allow owner to set number", async function () {
      const testNumber = 42;
      await hybridStorage.setNumber(testNumber);
      expect(await hybridStorage.getNumber()).to.equal(testNumber);
    });

    it("Should emit NumberStored event when setting number", async function () {
      const testNumber = 123;
      await expect(hybridStorage.setNumber(testNumber))
        .to.emit(hybridStorage, "NumberStored")
        .withArgs(testNumber, owner.address);
    });

    it("Should not allow non-owner to set number", async function () {
      const testNumber = 999;
      await expect(
        hybridStorage.connect(addr1).setNumber(testNumber)
      ).to.be.revertedWith("Only owner can call this function");
    });

    it("Should allow anyone to read number", async function () {
      const testNumber = 789;
      await hybridStorage.setNumber(testNumber);
      expect(await hybridStorage.connect(addr1).getNumber()).to.equal(testNumber);
    });

    it("Should handle large numbers", async function () {
      const largeNumber = ethers.parseEther("1000000"); // 1M ETH in wei
      await hybridStorage.setNumber(largeNumber);
      expect(await hybridStorage.getNumber()).to.equal(largeNumber);
    });
  });

  describe("Batch Operations", function () {
    it("Should allow owner to set both values at once", async function () {
      const testString = "Batch Test";
      const testNumber = 100;
      
      await hybridStorage.setBoth(testString, testNumber);
      
      expect(await hybridStorage.getString()).to.equal(testString);
      expect(await hybridStorage.getNumber()).to.equal(testNumber);
    });

    it("Should emit both events when using setBoth", async function () {
      const testString = "Event Test";
      const testNumber = 200;
      
      const tx = hybridStorage.setBoth(testString, testNumber);
      
      await expect(tx)
        .to.emit(hybridStorage, "StringStored")
        .withArgs(testString, owner.address);
        
      await expect(tx)
        .to.emit(hybridStorage, "NumberStored")
        .withArgs(testNumber, owner.address);
    });

    it("Should not allow non-owner to use setBoth", async function () {
      await expect(
        hybridStorage.connect(addr1).setBoth("Unauthorized", 500)
      ).to.be.revertedWith("Only owner can call this function");
    });

    it("Should allow anyone to read both values", async function () {
      const testString = "Both Values Test";
      const testNumber = 300;
      
      await hybridStorage.setBoth(testString, testNumber);
      
      const [str, num] = await hybridStorage.connect(addr1).getBoth();
      expect(str).to.equal(testString);
      expect(num).to.equal(testNumber);
    });
  });

  describe("Data Persistence", function () {
    it("Should maintain string value after setting number", async function () {
      const testString = "Persistent String";
      const testNumber = 456;
      
      await hybridStorage.setString(testString);
      await hybridStorage.setNumber(testNumber);
      
      expect(await hybridStorage.getString()).to.equal(testString);
      expect(await hybridStorage.getNumber()).to.equal(testNumber);
    });

    it("Should maintain number value after setting string", async function () {
      const testNumber = 789;
      const testString = "Another String";
      
      await hybridStorage.setNumber(testNumber);
      await hybridStorage.setString(testString);
      
      expect(await hybridStorage.getNumber()).to.equal(testNumber);
      expect(await hybridStorage.getString()).to.equal(testString);
    });

    it("Should update both values correctly with setBoth", async function () {
      // Set initial values
      await hybridStorage.setBoth("First", 111);
      
      // Update both values
      await hybridStorage.setBoth("Second", 222);
      
      const [str, num] = await hybridStorage.getBoth();
      expect(str).to.equal("Second");
      expect(num).to.equal(222);
    });
  });

  describe("Ownership", function () {
    it("Should transfer ownership", async function () {
      await hybridStorage.transferOwnership(addr1.address);
      expect(await hybridStorage.owner()).to.equal(addr1.address);
    });

    it("Should emit OwnershipTransferred event", async function () {
      await expect(hybridStorage.transferOwnership(addr1.address))
        .to.emit(hybridStorage, "OwnershipTransferred")
        .withArgs(owner.address, addr1.address);
    });

    it("Should not allow non-owner to transfer ownership", async function () {
      await expect(
        hybridStorage.connect(addr1).transferOwnership(addr2.address)
      ).to.be.revertedWith("Only owner can call this function");
    });

    it("Should not allow transfer to zero address", async function () {
      await expect(
        hybridStorage.transferOwnership(ethers.ZeroAddress)
      ).to.be.revertedWith("New owner cannot be zero address");
    });

    it("Should allow new owner to modify values after transfer", async function () {
      // Transfer ownership
      await hybridStorage.transferOwnership(addr1.address);
      
      // New owner should be able to set values
      await hybridStorage.connect(addr1).setString("New Owner String");
      await hybridStorage.connect(addr1).setNumber(999);
      
      expect(await hybridStorage.getString()).to.equal("New Owner String");
      expect(await hybridStorage.getNumber()).to.equal(999);
    });

    it("Should prevent old owner from modifying after transfer", async function () {
      // Transfer ownership
      await hybridStorage.transferOwnership(addr1.address);
      
      // Old owner should not be able to set values
      await expect(
        hybridStorage.setString("Old Owner Attempt")
      ).to.be.revertedWith("Only owner can call this function");
    });
  });

  describe("Edge Cases", function () {
    it("Should handle empty string", async function () {
      await hybridStorage.setString("");
      expect(await hybridStorage.getString()).to.equal("");
    });

    it("Should handle zero number", async function () {
      await hybridStorage.setNumber(0);
      expect(await hybridStorage.getNumber()).to.equal(0);
    });

    it("Should handle very long strings", async function () {
      const longString = "A".repeat(1000);
      await hybridStorage.setString(longString);
      expect(await hybridStorage.getString()).to.equal(longString);
    });

    it("Should handle maximum uint256 number", async function () {
      const maxNumber = ethers.MaxUint256;
      await hybridStorage.setNumber(maxNumber);
      expect(await hybridStorage.getNumber()).to.equal(maxNumber);
    });

    it("Should handle special characters in string", async function () {
      const specialString = "Hello 🌍! @#$%^&*()";
      await hybridStorage.setString(specialString);
      expect(await hybridStorage.getString()).to.equal(specialString);
    });
  });
});