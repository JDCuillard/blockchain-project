pragma solidity >=0.5.0 <0.6.0;

import "./cardbank.sol";
import "./ownable.sol";

contract Store is Cardbank{
    
    uint nonce = 0;
    uint tokenid = 0;
    uint packCost = 1 ether;
    
    uint[2] pack0 = [1,2];
    
    uint[40] pack1 =    [89631139,45231177,32274490,46986414,91152256,4614116,77007920,63102017,11868825,86318356,
                        83887306,4206964,50045299,40374923,40374923,90963488,34460851,36121917,2863439,37313348,
                        75356564,15401633,57305373,40826495,39004808,18710707,22910685,44287299,85705804,59197169,
                        46130346,24094653,72842870,74677422,76211194,72302403,10202894,54652250,7089711,55444629];
                        
    
    //Purchase the desired pack indicated by the _packNumber argument. Ether is sent to the contract itself. 
    function purchasePack(uint _packNumber) external payable{
        require(msg.value == packCost);
        require(_packNumber == 1);
        
        if (_packNumber == 1){
            unpackCards(pack1);
        }
    }
    
    
    //Generates 5 pseudorandom numbers used to index into an array of cards
    function pickFiveRandom() internal returns(uint[5] memory){
         
         uint[5] memory randomNums;
         
         for(uint i = 0; i < 5; i++){
             uint random = uint(keccak256(abi.encodePacked(now, msg.sender, nonce))) % 39;
             randomNums[i] = random;
             nonce++;
         }
         return randomNums;
    }
    
    
    
    //Uses the pseudorandom numbers to select 5 cards from pack and add them to cardbank
    function unpackCards(uint[40] memory pack) internal{
        
        uint[5] memory randomNums = pickFiveRandom();
        
        for (uint i = 0; i < 5; i++){
            uint cardid = pack[randomNums[i]];
            _createNewCard(tokenid, cardid);
            tokenid++;
        }
    }

    
    
    function getContractBalance() external view onlyOwner returns(uint){
        return address(this).balance;
        
    }
}