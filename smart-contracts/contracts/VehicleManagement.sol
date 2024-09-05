// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.24;
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

/** 
 * @title VehicleManagement
 * @dev Implements vehicle registration process for users
 */
contract VehicleManagement is Ownable {

    // state variables
    struct Vehicle {
        uint256 vehicleId;
        address owner;
        bytes32 model;
        uint256 purchaseDate;
        bytes32 vin;
        bytes32  color;
        bytes32 plateNumber;
        uint256 createdAt;
        uint256 updatedAt;
    }

    Vehicle[] public vehicles;

    // mappings
    mapping(uint256 => Vehicle) public vehicle; 
    mapping(address => Vehicle[]) public userVehicleMap; 

    // Events
    event VehicleRegistered(uint256 indexed vehicleId, address owner, bytes32 model);

    /** 
     * @dev Intialize VehicleManagement
     */
    constructor() Ownable(msg.sender){}

    // Register Vehicle
    function registerVehicle(bytes memory data) public {
        (  uint256 vehicleId,
        address owner,
        bytes32 model,
        uint256 purchaseDate,
        bytes32 vin,
        bytes32  color,
        bytes32 plateNumber,
        uint256 createdAt,
        uint256 updatedAt) = abi.decode(data, (uint256, address,bytes32,uint256,bytes32,bytes32,bytes32,uint256,uint256));
        //create policy
        Vehicle memory _vehicle;
        _vehicle.vehicleId = vehicleId;
        _vehicle.owner = owner;
        _vehicle.model = model;
        _vehicle.purchaseDate = purchaseDate;
        _vehicle.vin = vin;
        _vehicle.color = color;
        _vehicle.plateNumber = plateNumber;
        _vehicle.createdAt = createdAt;
        _vehicle.updatedAt = updatedAt;
        vehicle[vehicleId] = _vehicle;
        // map user address with vehicle
        Vehicle[] storage existingVehicle = userVehicleMap[owner];
        existingVehicle.push(_vehicle);    
        userVehicleMap[owner] = existingVehicle;
        emit VehicleRegistered(vehicleId, owner, model);
    }

    function getVehicleByAccount() public view returns (Vehicle[] memory){
        console.log("msg.sender: ", msg.sender);
        return userVehicleMap[msg.sender];
    }

    function getVehicleByVehicleId(uint256 vehicleId) public view returns (Vehicle memory){
        return vehicle[vehicleId];
    }

    
}