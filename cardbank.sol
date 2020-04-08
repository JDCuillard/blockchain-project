pragma solidity >=0.5.0 <0.6.0;

import "./ownable.sol";

contract Cardbank is Ownable{
    
    struct card {
        uint32 tokenid;
        uint32 cardid;
    }
    
    card[] public cards;
    
    mapping (uint => address) cardOwner;
    mapping (address => uint32) ownerCardCount;
    
    
    function getCardsByOwner(address _owner) external view returns (uint[] memory) {
        uint[] memory result = new uint[](ownerCardCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < cards.length; i++) {
          if (cardOwner[i] == _owner) {
            result[counter] = i;
            counter++;
          }
        }
        return result;
    }
}
    

