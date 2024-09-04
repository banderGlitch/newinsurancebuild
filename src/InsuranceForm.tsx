import React, { useState } from 'react';



interface TelegramUser {
  auth_date: number;
  first_name: string
  hash :string;
  id: number;
  last_name?: string;
  username?:string
}

interface InsuranceFormProps {
  telegramUser: TelegramUser;
}


const InsuranceForm: React.FC<InsuranceFormProps> = ({telegramUser}) => {
  console.log("telegramuser--------------", telegramUser)
  console.log("telegramuser--------------", telegramUser)
  const [insuranceAmount, setInsuranceAmount] = useState<string>('');
  const [carMake, setCarMake] = useState<string>('');
  
  const [carModel, setCarModel] = useState<string>('');
  const [carYear, setCarYear] = useState<string>('');
  const [registrationNumber, setRegistrationNumber] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      insuranceAmount,
      carMake,
      carModel,
      carYear,
      registrationNumber,
    });
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold">Insurance Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Insurance Amount</label>
            <input
              type="number"
              value={insuranceAmount}
              onChange={(e) => setInsuranceAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter amount in INR"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Car Make</label>
            <input
              type="text"
              value={carMake}
              onChange={(e) => setCarMake(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter car make (e.g., Toyota)"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Car Model</label>
            <input
              type="text"
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter car model (e.g., Corolla)"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Car Year</label>
            <input
              type="number"
              value={carYear}
              onChange={(e) => setCarYear(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter car year (e.g., 2020)"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Registration Number</label>
            <input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter registration number"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InsuranceForm;
