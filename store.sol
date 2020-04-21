pragma solidity >=0.5.0 <0.6.0;

import "./cardbank.sol";
import "./ownable.sol";

contract Store is Cardbank{
    
    uint nonce = 0;
    uint tokenid = 0;
    uint packCost = 1 ether;
    
    
    uint[40] pack1 =    [89631139,45231177,32274490,46986414,91152256,4614116,77007920,63102017,11868825,86318356,
                        83887306,4206964,50045299,40374923,40374923,90963488,34460851,36121917,2863439,37313348,
                        75356564,15401633,57305373,40826495,39004808,18710707,22910685,44287299,85705804,59197169,
                        46130346,24094653,72842870,74677422,76211194,72302403,10202894,54652250,7089711,55444629];
                        
    uint[40] pack2 =    [77585513,90908427,49587034,1248895,98299011,34694160,60866277,22359980,16227556,43711255,
                        79106360,42599677,31477025,4266839,30655537,3134241,78193831,6104968,67049542,66927994,
                        24294108,51345461,24128274,27125110,84620194,10992251,21015833,79870141,32269855,4042268,
                        31447217,23615409,5265750,83994646,22959079,93108433,23171610,2311603,98139712,31477025];
                        
    uint[40] pack3 =    [69140098,3573512,46821314,31709826,31987274,67371383,87303357,86281779,12953226,21888494,
                        57882509,29549364,82432018,19827717,18605135,21598948,94163677,5494820,33550694,69954399,
                        95220856,65475294,28358902,90147755,53530069,22419772,58818411,21297224,58696829,84080939,
                        57579381,32541773,67105242,66989694,41855169,40133511,77527210,40916023,45894482,44072894];
                        
    uint[40] pack4 =    [65403020,39674352,66073051,2468169,65957473,91345518,63012333,90407382,31812496,53890795,
                        25773409,52768103,84550200,87340664,50823978,83228073,55001420,18590133,18378582,53776525,
                        44762290,98045062,17655904,80161395,10035717,56433456,82828051,45311864,82705573,18190572,
                        44595286,71983925,44472639,70861343,79649195,26566878,52550973,51838385,51616747,50593156];
    
    //Purchase the desired pack indicated by the _packNumber argument. Ether is sent to the contract itself. 
    function purchasePack(uint _packNumber) external payable{
        require(msg.value == packCost);
        require(_packNumber > 0 && _packNumber < 5);
        
        if (_packNumber == 1){
            unpackCards(pack1);
        }
        else if (_packNumber == 2){
            unpackCards(pack2);
        }
        else if (_packNumber == 3){
            unpackCards(pack3);
        }
        else{
            unpackCards(pack4);
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

    function changePackCost(uint _newPrice) external onlyOwner{
        packCost = _newPrice;
    }
    
    
    function getContractBalance() external view onlyOwner returns(uint){
        return address(this).balance;
        
    }
}