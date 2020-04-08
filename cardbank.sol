pragma solidity >=0.5.0 <0.6.0;

import "./ownable.sol";

contract Cardbank is Ownable{
    
    struct card {
        uint32 tokenid;
        uint32 cardid;
    }
    
    card[] public cards;
    
    mapping (uint32 => address) cardOwner;
    
}
