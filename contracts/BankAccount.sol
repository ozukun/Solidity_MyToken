// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract BankAccount {
  uint storedData;
  
  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

  function getConAdd() public view returns(address){
    return  address(this);
  }

  function getAcct() public view returns(address){
    return msg.sender;
  }
  
  function sendEth(address payable rcv_addr) public  payable
  {
    address payable aa=rcv_addr;
    uint256 x=msg.value;
    aa.transfer(x);  // 123
  }

}
