//  SPDX-License-Identifier: MLT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract SwordToken is ERC721, Ownable {
    constructor (string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    uint256 COUNTER;

    uint256 fee = 0.01 ether;

    struct Sword {
        string name;
        uint256 id;
        uint256 dna;
        uint8 level;
        uint8 rarity;
    }

    Sword[] public swords;

    event NewSword(address indexed owner, uint256 id, uint256 dna);

    //Helpers
    //randomness is not that secure -- look into keccak hash
    function _createRandomNum(uint256 _mod) internal view returns(uint256) {
        uint256 randomNum = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
        return randomNum % _mod;
    }

    function updateFee(uint256 _fee) external onlyOwner(){
            fee = _fee;
    }

    function withdraw() external payable onlyOwner() {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    //Creation
    function _createSword(string memory _name) internal{
        uint8 randRarity = uint8(_createRandomNum(100));
        uint256 randDna = _createRandomNum(10**16);
        Sword memory newSword = Sword(_name, COUNTER, randDna, 1, randRarity);
        swords.push(newSword);
        _safeMint(msg.sender, COUNTER); //--this doesn't emit in events
        emit NewSword(msg.sender, COUNTER, randDna); //--this doesn't emit in events
        COUNTER++;
    }

    function createRandomSword(string memory _name) public payable {
        require(msg.value == fee, "The fee is not correct");
        _createSword(_name);
    }

    //Getters
    function getSwords() public view returns(Sword[] memory){
        return swords;
    }

    function getOwnerSwords(address _owner) public view returns (Sword[] memory) {
        //going through all the swords and check the ones the user has
        //use ERC721 balanceOf
        Sword[] memory result = new Sword[](balanceOf(_owner));
        uint256 counter = 0;
        for(uint256 i = 0; i < swords.length; i++){
            if(ownerOf(i) == _owner){
                result[counter] = swords[i];
                counter++;
            }
        }
        return result;
    }
}