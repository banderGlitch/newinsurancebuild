import React from 'react';

const VehicleDetails: React.FC = () => {
    return (
        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-bold mb-4 text-center">Vehicle Details</h3>
            <div className="text-sm space-y-4">
                <div className="grid grid-cols-2 gap-x-4">
                    <span className="font-semibold">Vehicle Model:</span>
                    <span>Land Rover Defender</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                    <span className="font-semibold">Vehicle purchase date:</span>
                    <span>12-12-2020</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                    <span className="font-semibold">Vehicle Plate Number:</span>
                    <span>1HGCM82633A123456</span>
                </div>
            </div>
        </div>
        // <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
        //   <h3 className="text-lg font-bold mb-4 text-center">Vehicle Details</h3>
        //   <div className="text-sm space-y-4">
        //     <div className="flex justify-between">
        //       <span className="font-semibold">Vehicle Model:</span>
        //       <span>Land Rover Defender</span>
        //     </div>
        //     <div className="flex justify-between">
        //       <span className="font-semibold">Vehicle purchase date:</span>
        //       <span>12-12-2020</span>
        //     </div>
        //     <div className="flex justify-between">
        //       <span className="font-semibold">Vehicle Plate Number:</span>
        //       <span>1HGCM82633A123456</span>
        //     </div>
        //   </div>
        // </div>
        // <div className="w-full bg-white p-4 rounded-lg shadow-md mb-4">
        //   <h3 className="text-lg font-bold mb-2">Vehicle Details</h3>
        //   <div className="text-sm space-y-2">
        //     <p><strong>Vehicle Model:</strong> Land Rover Defender</p>
        //     <p><strong>Vehicle purchase date:</strong> 12-12-2020</p>
        //     <p><strong>Vehicle Plate Number:</strong> 1HGCM82633A123456</p>
        //   </div>
        // </div>
    );
};

export default VehicleDetails;
