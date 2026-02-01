// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/Panagram.sol";

contract DeployPanagram is Script {
    function run() external {
        address verifier = 0x7DA9C6cA3d2f8C485f28424802Ba5F94e19a3e0d;

        vm.startBroadcast();
        Panagram panagram = new Panagram(IVerifier(verifier));
        vm.stopBroadcast();

        console.log("Panagram deployed at:", address(panagram));
    }
}
