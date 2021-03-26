// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/AccessControl.sol";

import "./../interfaces/IAdministered.sol";

abstract contract Administered is IAdministered {
    modifier onlyAdmin {
        require(isAdmin[msg.sender], "Administrated: UNAUTHORIZED");
        _;
    }

    /// @notice The owner who can manage access permissions of this store.
    address public override owner;

    /// @notice A mapping of admins.
    mapping(address => bool) public override isAdmin;

    function appointAdmin(address account) external override {
        require(
            msg.sender == owner,
            "Administrated::appointAdmin: UNAUTHORIZED"
        );
        isAdmin[account] = true;
    }

    function revokeAdmin(address account) external override {
        require(
            msg.sender == owner,
            "Administrated::revokeAdmin: UNAUTHORIZED"
        );
        isAdmin[account] = false;
    }

    /**
        @notice Set ownership over this contract if it hasn't yet been claimed.
        @dev This can only be done once.
        @param _owner The address to set as the owner.
    */
    function setOwnership(address _owner) external override {
        require(
            owner == address(0),
            "Administrated::setOwnership: ALREADY_SET"
        );
        owner = _owner;
        isAdmin[_owner] = true;
    }
}