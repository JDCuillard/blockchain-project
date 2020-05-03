pragma solidity ^0.5.16;
import "./cardbank.sol";

contract Auction{
    Cardbank ContractAddress;
    address internal auction_owner;
    uint256 public auction_start;
    uint256 public auction_end;
    uint256 public highestBid;
    address internal highestBidder;

    enum time_line{
        DAY, HOUR, MIN
    }

    enum auction_state{
        CANCELLED,STARTED
    }

    struct card {
        uint tokenid;
        uint cardid;
    }

    card public MyCard;
    address[] bidders;

    mapping(address => uint) internal bids;

    auction_state public STATE;

    modifier an_ongoing_auction(){
        require(now <= auction_end);
        _;
    }

    modifier only_owner(){
        require(msg.sender==auction_owner);
        _;
    }

    function bid() public payable returns (bool){}
    function withdraw() public returns (bool){}
    function cancel_auction() external returns (bool){}

    event BidEvent(address indexed highestBidder, uint256 highestBid);
    event WithdrawalEvent(address withdrawer, uint256 amount);
    event CanceledEvent(string message, uint256 time);
    event Payment(address _from, address _to, uint amount);

}


contract MyAuction is Auction{


    function () external
    {

    }

    constructor (uint _auctionTime, uint8 timeFormat , address _owner, uint _CardId, uint _TokenId, address MainContractAddress) public {
        require(uint(time_line.MIN) >= timeFormat);
        // need to write funtion to check if card is owned by the owner
        auction_owner = _owner;
        auction_start=now;

        if(timeFormat == uint(time_line.DAY))
        {
            _auctionTime = _auctionTime * 1 days;
        }else
        if(timeFormat == uint(time_line.HOUR))
        {
            _auctionTime = _auctionTime * 1 hours;
        }else
        if(timeFormat == uint(time_line.MIN))
        {
            _auctionTime = _auctionTime * 1 minutes;
        }

        auction_end = auction_start + _auctionTime;
        STATE=auction_state.STARTED;
        MyCard.tokenid = _TokenId;
        MyCard.cardid = _CardId;

        ContractAddress = Cardbank(MainContractAddress);

    }


    function bid() public payable an_ongoing_auction returns (bool){
        require(bids[msg.sender] + msg.value > highestBid,"You can't bid, Make a higher Bid");
        highestBidder = msg.sender;
        highestBid = bids[msg.sender] + msg.value;
        if(bids[msg.sender]==0)
        {
            bidders.push(msg.sender);
        }
        bids[msg.sender] =  bids[msg.sender] + msg.value;

        emit BidEvent(highestBidder,  highestBid);

        return true;
    }

    function getMyBid() public view returns (uint){
        return bids[msg.sender];
    }

    function contractBalance() public view returns(uint){
        require(msg.sender == auction_owner);
        return address(this).balance;
    }

    function cancel_auction() external only_owner an_ongoing_auction returns (bool){
        STATE=auction_state.CANCELLED;
        auction_end = now;
        emit CanceledEvent("Auction Cancelled", now);
        return true;
    }

    function destruct_auction() external only_owner returns (bool){

        require(now > auction_end, "You can't destruct the contract,The auction is still open");
        for(uint i=0;i<bidders.length;i++)
        {
            assert(bids[bidders[i]]==0);
        }

        address payable _auction_owner = address(uint160(auction_owner));
        selfdestruct(_auction_owner);
        return true;

    }


    function withdraw() public returns (bool){
        require(now > auction_end ,"You can't withdraw, the auction is still open");
        require(msg.sender != highestBidder  ,"You can't withdraw, You won the Auction");

        uint amount;
        amount=bids[msg.sender];
        bids[msg.sender]=0;
        msg.sender.transfer(amount);
        emit WithdrawalEvent(msg.sender, amount);
        return true;
    }


    function buyCard() public
    {
        require(now > auction_end ,"You can't buy Card, the auction is still open");
        require(msg.sender == highestBidder, "Only highestBidder can buy the card");

        uint amount;
        amount=bids[msg.sender];
        bids[msg.sender]=0;
        address payable _auction_owner = address(uint160(auction_owner));
        _auction_owner.transfer(amount);

        ContractAddress._transfer(address(this), auction_owner, highestBidder, MyCard.cardid);
        emit Payment(msg.sender, _auction_owner, amount);
    }

    function numberOfBidders() public view returns(uint)
    {
        return bidders.length;
    }

    function get_owner() public view returns(address){
        return auction_owner;
    }

}
