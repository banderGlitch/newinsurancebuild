import React, { useState } from 'react';

interface Vehicle {
  model: string;
  purchaseDate: string;
  vin: string;
  color: string;
  imageUrl: string; // Assuming each vehicle has an image
}

const VehicleDetailsComponent: React.FC = () => {
  const vehicles: Vehicle[] = [
    {
      model: 'Land Rover Defender',
      purchaseDate: '12-12-2020',
      vin: '1HGCM82633A123456',
      color: 'Bronze',
      imageUrl: '/path/to/image1.jpg', // Replace with actual image paths
    },
    {
      model: 'Tesla Model S',
      purchaseDate: '01-01-2022',
      vin: '5YJSA1E26FFP67890',
      color: 'Red',
      imageUrl: '/path/to/image2.jpg', // Replace with actual image paths
    },
  ];

  const [currentVehicleIndex, setCurrentVehicleIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentVehicleIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : vehicles.length - 1
    );
  };

  const handleNext = () => {
    setCurrentVehicleIndex((prevIndex) =>
      prevIndex < vehicles.length - 1 ? prevIndex + 1 : 0
    );
  };

  const currentVehicle = vehicles[currentVehicleIndex];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* <h3 className="text-lg font-bold mb-2">Vehicle Details:</h3> */}
      <div className="flex justify-between items-center mb-2">
        <button onClick={handlePrevious} className="text-blue-500 text-lg">
          &lt; {/* Smaller left arrow */}
        </button>
        <div className="w-full px-2">
          <div className="overflow-y-auto max-h-40">
            <p className="mb-2"><strong>Vehicle Model:</strong> {currentVehicle.model}</p>
            <p className="mb-2"><strong>Vehicle purchase date:</strong> {currentVehicle.purchaseDate}</p>
            <p className="mb-2"><strong>VIN:</strong> {currentVehicle.vin}</p>
            <p className="mb-2"><strong>Color:</strong> {currentVehicle.color}</p>
            <img src={currentVehicle.imageUrl} alt={currentVehicle.model} className="mt-4 rounded-lg w-full h-40 object-cover" />
          </div>
        </div>
        <button onClick={handleNext} className="text-blue-500 text-lg">
          &gt; {/* Smaller right arrow */}
        </button>
      </div>
    </div>
    // <div className="bg-white p-4 rounded-lg shadow-md">
    //   <h3 className="text-lg font-bold mb-2">Vehicle Details:</h3>
    //   <div className="flex justify-between items-center mb-2">
    //     <button onClick={handlePrevious} className="text-blue-500">
    //       &lt; {/* Left arrow */}
    //     </button>
    //     <div className="w-full px-2">
    //       <div className="overflow-y-auto max-h-40">
    //         <p className="mb-2"><strong>Vehicle Model:</strong> {currentVehicle.model}</p>
    //         <p className="mb-2"><strong>Vehicle purchase date:</strong> {currentVehicle.purchaseDate}</p>
    //         <p className="mb-2"><strong>VIN:</strong> {currentVehicle.vin}</p>
    //         <p className="mb-2"><strong>Color:</strong> {currentVehicle.color}</p>
    //         <img src={currentVehicle.imageUrl} alt={currentVehicle.model} className="mt-4 rounded-lg w-full h-40 object-cover" />
    //       </div>
    //     </div>
    //     <button onClick={handleNext} className="text-blue-500">
    //       &gt; {/* Right arrow */}
    //     </button>
    //   </div>
    // </div>
  );
};

export default VehicleDetailsComponent;