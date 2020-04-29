import React, { Component } from "react";
import getWeb3 from "./utils/getWeb3";
import initBlockchain from "./utils/initBlockchain";
import getZombieCount from "./utils/getZombieCount";

import { HashRouter, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { Provider } from "react-redux";

import TopBar from "./components/TopBar";

import Greeting from "./pages/Greeting";
import MyCards from "./pages/MyCards";
import ListPacks from "./pages/ListPacks";
import CardPack from "./pages/cardPack";

import ZombieInventory from "./pages/ZombieInventory";
import AttackZombie from "./pages/AttackZombie";
import FeedOnKitty from "./pages/FeedOnKitty";
import ChangeName from "./pages/ChangeName";
import LevelUp from "./pages/LevelUp";
import TransferZombie from "./pages/TransferZombie";

import store from "./redux/store";

//
//  This is the main application page; routing is handled to render other pages in the application

class App extends Component {
  // define a state variable for important connectivity data to the blockchain
  // this will then be put into the REDUX store for retrieval by other pages


  // **************************************************************************
  //
  // React will call this routine only once when App page loads; do initialization here
  //
  // **************************************************************************

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3(); // from utils directory;  connect to metamask
      const data = await initBlockchain(web3);  // get contract instance and user address
      await getZombieCount(data.CZ, data.userAddress);  // get user count and total count of zombies
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );

      console.log(error);
    }
  };

  // **************************************************************************
  //
  // main render routine for App component;
  //      contains route info to navigate between pages
  //
  // **************************************************************************

  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Container>
            <TopBar state={this.state} />
            <div>
              <Route exact path="/" component={Greeting} />
              <Route exact path="/myCards" component={MyCards} />
              <Route exact path="/ListPacks" component={ListPacks} />
              <Route exact path="/cardPack1" component={CardPack} />
              <Route exact path="/ZombieInventory" component={ZombieInventory} />
              {/* routes used in zombie action modal */}
              <Route exact path="/AttackZombie" component={AttackZombie} />
              <Route exact path="/FeedOnKitty" component={FeedOnKitty} />
              <Route exact path="/ChangeName" component={ChangeName} />
              <Route exact path="/LevelUp" component={LevelUp} />
              <Route exact path="/TransferZombie" component={TransferZombie} />
            </div>
          </Container>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
