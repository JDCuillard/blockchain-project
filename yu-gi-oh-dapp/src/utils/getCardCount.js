import store from "../redux/store";

export const CARD_COUNT = "CARD_COUNT"; // action type

// action creator (dispatch sends this to redux reducer)
function cardCount(data) {
  return {
    type: CARD_COUNT,
    payload: data
  };
}

//
//  set up the blockchain shadow contract, user address, and user zombie count.  Put into redux store.
//

async function getCardCount(CZ, userAddress) {
  // get number of zombies owned by the user account

  let userCards = (await CZ.methods // + convert a string to an integer
    .getCardsByOwner(userAddress)
    .call());


  let userCardCount = userCards.length;

  // do a binary search to estimate total zombie count.
  // It is a real shame that the Cryptozombies contract doesn't totally comply with ERC720 to include a function
  // that returns totalZombieount.


  // put state data into the REDUX store for easy access from other pages and components

  let data = {
    userCards,
    userCardCount          //EC7 shorthand for totalZombieCount:totalZombieCount because of same variable name
  };

  store.dispatch(cardCount(data));
}

export default getCardCount;
