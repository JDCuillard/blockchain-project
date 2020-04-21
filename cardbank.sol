pragma solidity >=0.5.0 <0.6.0;

import "./ownable.sol";
import "./Auction.sol";
import "./safemath.sol";

contract Cardbank is Ownable{
    using SafeMath for uint256;
    event Transfer(address _from, address _to, uint _tokenId);

    struct Card {
        uint tokenid;
        uint cardid;
    }

    //All cards are stored here
    Card[] public cards;


    mapping (uint => address) cardOwner;
    mapping (address => uint) ownerCardCount;

    //All Auction cards are stored here
    Card[] public CardsAtAuction;
    mapping (address => uint) auctionCardOwnerToId;

    // All Auction contract address are stored here
    address[] newContracts;

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

    // Return the cards on Auction
    function cardsOnAuction() external view returns (uint[] memory) {
        uint[] memory result = new uint[](CardsAtAuction.length);
                uint counter = 0;
                for (uint i = 0; i < CardsAtAuction.length; i++) {
                    if(CardsAtAuction[i].cardid != uint(-1))
                    {
                        result[counter] = CardsAtAuction[i].cardid;
                        counter++;
                    }
                }
                return result;
    }

    // Sends the index of card of particular owner
    function cardUniqueID(uint _CardId, address _owner) private view returns (uint ID)
    {

       for (uint i = 0; i < cards.length; i++) {
          if (cardOwner[i] == _owner && cards[i].cardid == _CardId) {
            return i;
          }
        }
    }

    // checks if card is owner by the user
    function cardOwnedByUser(uint _CardId, address _owner) private view returns (bool found)
    {
        bool foundID = false;
        for (uint i = 0; i < cards.length; i++) {
          if (cardOwner[i] == _owner && cards[i].cardid == _CardId) {
            foundID = true;break;
          }
        }
        return foundID;

    }

    // Create Auction Contract
    function createAuctionContract(uint _auctionTime, uint8 timeFormat , address _owner, uint _CardId, uint _TokenId) public{
        require(cardOwnedByUser(_CardId, _owner) == true, "You don't Own that card");
        address newContract = address(new MyAuction(_auctionTime, timeFormat , _owner, _CardId, _TokenId, address(this)));
        uint id = CardsAtAuction.push(Card(_TokenId, _CardId)) - 1;
        auctionCardOwnerToId[_owner] = id;
        newContracts.push(newContract);
    }

    // Removes address from the newContract array
    function removeContracAddress(uint index) internal
    {
        for (uint i = index; i<newContracts.length-1; i++){
            newContracts[i] = newContracts[i+1];
        }
        delete newContracts[newContracts.length-1];
        newContracts.length--;
    }

    // Removes the Cards from the Auction
    function removeCardFromAuction(uint index) private
    {
        for (uint i = index; i<CardsAtAuction.length-1; i++){
            CardsAtAuction[i] = CardsAtAuction[i+1];
        }
        delete CardsAtAuction[CardsAtAuction.length-1];
        CardsAtAuction.length--;
    }

    // Give Addresses of contract
    function giveMeAddresses() public view returns(address[] memory)
    {
        address[] memory result = new address[](newContracts.length);
                uint counter = 0;
                for (uint i = 0; i < newContracts.length; i++) {
                        result[counter++] = newContracts[i];
                }

                return result;
    }

    // transfer card only via created auction contract
    function _transfer(address contractaddress, address _from, address _to, uint256 _CardId) external {
        bool flagAddressFound = false;
        uint i;
        for (i = 0; i < newContracts.length; i++) {
            if(newContracts[i] == contractaddress)
                {
                    flagAddressFound = true;
                    break;
                }
        }
        require(flagAddressFound==true, "Only Contract Can Do the Transfer");

        // need to check _transfer only happens from
        ownerCardCount[_to] = ownerCardCount[_to].add(1);
        ownerCardCount[_from] = ownerCardCount[_from].sub(1);

        cardOwner[cardUniqueID(_CardId, _from)] = _to;
        CardsAtAuction[auctionCardOwnerToId[_from]].cardid = uint(-1);
        CardsAtAuction[auctionCardOwnerToId[_from]].tokenid = uint(-1);

        removeContracAddress(i);

        removeCardFromAuction(auctionCardOwnerToId[_from]);
        emit Transfer(_from, _to, _CardId);
    }

}
    

