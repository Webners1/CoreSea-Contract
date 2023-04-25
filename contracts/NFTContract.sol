// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract C2DAOPASS is ERC721, Ownable {
    bytes32 public merkleRoot;
    uint256 public maxSupply;
    uint256 public price;
    uint256 public whiteListPrice;
    uint256 public publicSaleStart;
    uint256 public publicSaleEnd;
    uint256 public whitelistSaleStart;
    uint256 public whitelistSaleEnd;
    bool public publicSaleActive;
    bool public whitelistSaleActive;
    mapping(address => bool) public whitelisted;

    constructor(bytes32 _merkleRoot, uint256 _maxSupply, uint256 _price, uint256 _publicSaleStart, uint256 _publicSaleEnd, uint256 _whitelistSaleStart, uint256 _whitelistSaleEnd) ERC721("C2 DAO PASS", _symbol) {
        merkleRoot = _merkleRoot;
        maxSupply = _maxSupply;
        price = _price;
        whiteListPrice = _whiteListPrice;
        publicSaleStart = _publicSaleStart;
        publicSaleEnd = _publicSaleEnd;
        whitelistSaleStart = _whitelistSaleStart;
        whitelistSaleEnd = _whitelistSaleEnd;
        publicSaleActive = false;
        whitelistSaleActive = false;
    }

    function mint(bytes32[] calldata _proof, uint256 _tokenId) external payable {
        require(msg.value == publicSaleActive?  price : whiteListPrice, "Invalid price");
        require(totalSupply() < maxSupply, "Max supply reached");
        require(publicSaleActive || whitelisted[msg.sender], "Not eligible for sale");
        require(block.timestamp >= publicSaleStart && block.timestamp <= publicSaleEnd, "Public sale not active");
        require(MerkleProof.verify(_proof, merkleRoot, keccak256(abi.encodePacked(msg.sender))), "Invalid proof");
        _safeMint(msg.sender, _tokenId);
    }

    function addWhitelist(address[] calldata _addresses) external onlyOwner {
        for (uint256 i = 0; i < _addresses.length; i++) {
            whitelisted[_addresses[i]] = true;
        }
    }

    function removeWhitelist(address[] calldata _addresses) external onlyOwner {
        for (uint256 i = 0; i < _addresses.length; i++) {
            whitelisted[_addresses[i]] = false;
        }
    }

    function setPrice(uint256 _price) external onlyOwner {
        price = _price;
    }

    function setPublicSaleActive(bool _active) external onlyOwner {
        publicSaleActive = _active;
    }

    function setWhitelistSaleActive(bool _active) external onlyOwner {
        whitelistSaleActive = _active;
    }

    function setPublicSaleStart(uint256 _start) external onlyOwner {
        publicSaleStart = _start;
    }

    function setPublicSaleEnd(uint256 _end) external onlyOwner {
        publicSaleEnd = _end;
    }

    function setWhitelistSaleStart(uint256 _start) external onlyOwner {
        whitelistSaleStart = _start;
    }

    function setWhitelistSaleEnd(uint256 _end) external onlyOwner {
        whitelistSaleEnd = _end;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
