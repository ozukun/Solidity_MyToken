pragma solidity 0.8.0;

//import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract  OZUKUNToken is ERC20 {
    constructor() ERC20( "OZUKUN", "OZK") public {
        _mint(msg.sender, 100);
    }


   function getAcct() public view returns(uint256){
    uint256 xx=totalSupply();
    return xx;
  }

   function passTransfer()  public payable{
     transfer(0xcB41eFBfcC89068EeDa8fBDafE4B914204C9b506,3);
   }

}


// comment line
