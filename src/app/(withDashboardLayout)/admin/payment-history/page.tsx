// src/pages/Payments.tsx
"use client";
import React from "react";

const Payments: React.FC = () => {
  return (
    <div className="mx-auto p-6 min-h-[100vh]">
      <h1 className="text-2xl font-bold mb-6">Payment History</h1>

      <div className="flex flex-col items-center  justify-center  p-6 bg-gray-100 theme-bg rounded-lg shadow">
        <img
          width={100}
          height={100}
          src="https://cdn-icons-png.flaticon.com/512/3175/3175777.png"
          className="mb-4"
        />
        <h2 className="text-xl font-semibold theme-text text-gray-700">
          No Payments Added
        </h2>
        <p className="text-gray-500 theme-bg">
          It seems like there are no payments recorded yet.
        </p>
      </div>
    </div>
  );
};

export default Payments;
