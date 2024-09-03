import React from 'react';

const PolicyComponent: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      {/* <h3 className="text-lg font-bold mb-2">Policy:</h3> */}
      <table className="w-full">
        <tbody>
          <tr>
            <td className="font-semibold">Policy Id</td>
            <td className="text-right">IL2345</td>
          </tr>
          <tr>
            <td className="font-semibold">Status</td>
            <td className="text-right text-red-500 font-bold">InActive</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PolicyComponent;