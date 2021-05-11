import React, { Component } from "react";
import SimpleStorageContract from "./contracts/OZUKUNToken.json";
import getWeb3 from "./getWeb3";
//import Web3 from 'ethereum/web3';

import "./App.css";

class App extends Component {
  state = { storageValue2: 0,v_acct: null,v_smart_con_addr: null,storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      
      
      
  
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts(); 
      
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      
      const initial_balance=await instance.methods.balanceOf(accounts[0]).call();
      
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance ,storageValue: initial_balance});

      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;
    console.log("is here !!!");
    // Stores a given value, 5 by default.
    const inp_value=document.getElementById("input_eth").value*1000000000;
    console.log(accounts[0]);

    //await contract.methods.set(inp_value).send({ from: accounts[0] });
    // Get the value from the contract to prove it worked.
    //const response1 = await contract.methods.get().call();
    //const response1=await contract.methods.getAcct().call();
    

    const load_up2={  
      //to: '0x8c028478f395E503D3C6505CB179E193b9d39904',
      from: accounts[0],
      //gas: 50000, gasPrice: 1e6 ,
      //value : 3   
    };


    await contract.methods.passTransfer().send(load_up2);
    
    const response1=await contract.methods.balanceOf(accounts[0]).call();
    const response2=await contract.methods.balanceOf('0xcB41eFBfcC89068EeDa8fBDafE4B914204C9b506').call();
  
    console.log(response2);
    console.log("here here");
    this.setState({ storageValue: response1 ,storageValue2:response2 });
    /*const smart_con_addr = await contract.methods.getConAdd().call();
    const acct= await contract.methods.getAcct().call();
    
    
    const eth_amount=document.getElementById("input_eth").value*10000000000000000000;
    const rcv_address=document.getElementById("input_rcv").value;
    
    
    // Update state with the result.
    this.setState({ storageValue: response1 , v_smart_con_addr: smart_con_addr , v_acct: acct });
    
   
    const load_up={  
      //to: '0x8c028478f395E503D3C6505CB179E193b9d39904',
      from: accounts[0],
      //gas: 50000, gasPrice: 1e6 ,
      value : eth_amount   
    };

    console.log(accounts);


    await contract.methods.sendEth(rcv_address).send(load_up);
    
    */
  
   

     
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">

        <div>The stored value is: {this.state.storageValue}</div><br></br>
        <div>The smart_contract address is: {this.state.v_smart_con_addr}</div><br></br>
        {/* <div>The account address is: {this.state.v_acct}</div><br></br> */}
        
        {/* reciever address 0xB702824Eac822c62614c9F912b341B65E5313bf6 */}

        <div className="App-input" >
          
          <div>Reciever account address :</div>
          <input type="text" id="input_rcv"  ></input>

          <div>Sender account address and ETH amount :</div>
          <input type="text" id="input" value={this.state.accounts[0]} ></input>
          <input type="text" id="input_eth" value={this.state.storageValue2}  className="App-input-eth"  ></input>
          <div><button type="submit"  onClick={()=>this.runExample()}>Submit</button></div>

        </div>
      </div>
    );
  }
}

export default App;
