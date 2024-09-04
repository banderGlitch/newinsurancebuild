import React from 'react';
import LandRover from '../../assets/rangerover.png'

const VehicleDetailsComponent: React.FC = () => {
  const vehicle = {
    model: 'Land Rover Defender',
    purchaseDate: '12-12-2020',
    vin: '1HGCM82633A123456',
    color: 'Bronze',
    plateNumber: 'KA01MN0100',
    imageUrl: LandRover, 
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full flex flex-col items-center">
    {/* Vehicle Details */}
    <div className="w-full text-left space-y-2">
      <div className="flex justify-between">
        <p className="text-sm font-semibold">Vehicle Model:</p>
        <p className="text-sm">{vehicle.model}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm font-semibold">Vehicle purchase date:</p>
        <p className="text-sm">{vehicle.purchaseDate}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm font-semibold">VIN:</p>
        <p className="text-sm">{vehicle.vin}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm font-semibold">Color:</p>
        <p className="text-sm">{vehicle.color}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm font-semibold">Plate number:</p>
        <p className="text-sm">{vehicle.plateNumber}</p>
      </div>
    </div>

    {/* Vehicle Image with Shadow */}
    <div className="mt-4 w-full">
      <img
        src={vehicle.imageUrl}
        alt={vehicle.model}
        className="rounded-lg w-full h-40 object-cover shadow-md"
      />
    </div>
  </div>
  );
};

export default VehicleDetailsComponent;
