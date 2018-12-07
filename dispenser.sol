pragma solidity ^0.4.24;

contract ColdStaking {
    function DEBUG_donation() public payable;
}

contract Dispenser {

    event Send(uint indexed _time, uint indexed _value);
    event Deposit(uint indexed _value);

    uint public lastCall;
    uint public part = 1947 ether; // divide the reserve into parts and send out every 5 minutes. (33649865 ether / (60 * 288))
    ColdStaking cs;
    address public treasury = 0x3c06f218Ce6dD8E2c535a8925A2eDF81674984D9; // Callisto Staking Reserve address.
    address public coldStaking = 0xd813419749b3c2cDc94A2F9Cfcf154113264a9d6; // Callisto Cold Staking address.
    address public caller = 0xd2acF96E3325D85fc60dc6B6057621130e890Ceb; // dispenser caller address.

    modifier only_treasurer {
        require(msg.sender == treasury);
        _;
    }

    constructor() public {
        cs = ColdStaking(coldStaking);
    } 

    function kill () public only_treasurer {
        selfdestruct(treasury);
    }

    function deposit() public payable only_treasurer {
        emit Deposit(msg.value);
    }

    function() public {
        require(address(this).balance > 0); 
        require(msg.sender == caller); 
        require(now-lastCall >= 270);   // at least 270 seconds have passed since the last call.
        lastCall = now;
        uint _part = part;
        if (address(this).balance < part) _part = address(this).balance; // if not enough money, then send all that's left.
        cs.DEBUG_donation.value(_part)();
        emit Send(now, _part);
    }
}
