
import React from 'react';

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Home</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-medium mb-2">Welcome</h2>
          <p className="text-gray-600">
            Welcome to your dashboard. Here you can manage your profile, view available jobs, read blog posts, and more.
          </p>
        </div>
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-medium mb-2">Recent Jobs</h2>
          <p className="text-gray-600">
            Check out the latest job postings tailored to your qualifications.
          </p>
        </div>
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-medium mb-2">Profile Completion</h2>
          <p className="text-gray-600">
            Complete your profile to increase your chances of finding the perfect job.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
