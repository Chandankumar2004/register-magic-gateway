
import React from 'react';

const Jobs = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Jobs</h1>
      </div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-medium mb-2">Frontend Developer</h2>
          <p className="text-gray-600 mb-2">
            Company XYZ • Remote • Full-time
          </p>
          <p className="text-gray-600 mb-4">
            We are looking for a skilled frontend developer to join our team and help build modern web applications.
          </p>
          <div className="flex gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              React
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              TypeScript
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Tailwind CSS
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-medium mb-2">Backend Developer</h2>
          <p className="text-gray-600 mb-2">
            Company ABC • New York • Full-time
          </p>
          <p className="text-gray-600 mb-4">
            Join our backend team to design and develop robust APIs and services for our growing platform.
          </p>
          <div className="flex gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Node.js
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Express
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              MongoDB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
