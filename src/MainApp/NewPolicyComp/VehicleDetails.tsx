import React from 'react';

const VehicleDetails: React.FC = () => {
    return (
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-4 mb-4">
        <h3 className="text-sm font-semibold mb-3">Vehicle Details</h3> {/* Reduced font size for the heading */}
        <div className="flex justify-between mb-2">
          <span className="text-xs text-gray-600">Vehicle Model:</span> {/* Reduced font size */}
          <span className="text-xs font-medium">Land Rover Defender</span> {/* Reduced font size */}
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-xs text-gray-600">Vehicle purchase date:</span> {/* Reduced font size */}
          <span className="text-xs font-medium">12-12-2020</span> {/* Reduced font size */}
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-xs text-gray-600">VIN:</span> {/* Reduced font size */}
          <span className="text-xs font-medium">1HGCM82633A123456</span> {/* Reduced font size */}
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-xs text-gray-600">Color:</span> {/* Reduced font size */}
          <span className="text-xs font-medium">Bronze</span> {/* Reduced font size */}
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-gray-600">Plate number:</span> {/* Reduced font size */}
          <span className="text-xs font-medium">KA01MN0100</span> {/* Reduced font size */}
        </div>
      </div>
    );
};

export default VehicleDetails;
