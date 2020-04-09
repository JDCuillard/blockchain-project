pragma solidity >=0.5.0 <0.6.0;

import "./ownable.sol";

contract Cardbank is Ownable{
    
    struct Card {
        uint tokenid;
        uint cardid;
    }
    
    //All cards are stored here
    Card[] public cards;
    
    mapping (uint => address) cardOwner;
    mapping (address => uint32) ownerCardCount;
    
    
    function _createNewCard(uint _tokenid, uint _cardid ) internal{
        uint id = cards.push(Card(_tokenid, _cardid)) -1;
        cardOwner[id] = msg.sender;
        ownerCardCount[msg.sender]++;
    }
    
    
    //Returns an array of card IDs owned by an account
    function getCardsByOwner(address _owner) external view returns (uint[] memory) {
        uint[] memory result = new uint[](ownerCardCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < cards.length; i++) {
          if (cardOwner[i] == _owner) {
            result[counter] = cards[i].cardid;
            counter++;
          }
        }
        return result;
    }
}
    

