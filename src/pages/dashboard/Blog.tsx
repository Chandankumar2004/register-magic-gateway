
import React from 'react';

const Blog = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-medium mb-2">Resume Writing Tips</h2>
            <p className="text-gray-600 mb-4">
              Learn how to create a resume that stands out to potential employers.
            </p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Read more →
            </button>
          </div>
        </div>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-medium mb-2">Interview Preparation</h2>
            <p className="text-gray-600 mb-4">
              Tips and tricks to help you prepare for your next job interview.
            </p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Read more →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
