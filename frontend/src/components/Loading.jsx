import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white border border-gray-300 shadow-xl rounded-md w-80">
        {/* Top bar */}
        <div className="bg-gray-100 px-3 py-2 flex items-center justify-between rounded-t-md border-b">
          <span className="text-sm font-semibold text-gray-700">Loading</span>
          <div className="space-x-1">
            <span className="w-3 h-3 bg-red-500 rounded-full inline-block"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
          </div>
        </div>

        {/* Loader Body */}
        <div className="px-6 py-8 flex flex-col items-center justify-center space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-gray-700">Loading...</p>
          </div>
          <p className="text-xs text-gray-500">Please wait while your content loads.</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
