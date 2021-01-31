import React from 'react';

function PostPreviewSkeleton() {
  return (
    <div className="bg-white py-6 px-6 my-6 md:my-12 shadow-md border border-gray-200 rounded-md">
      <div className="bg-gray-300 animate-pulse w-1/2 p-4 my-1" />
      <div className="flex justify-between">
        <div className="bg-gray-300 animate-pulse w-1/4 p-2" />
        <div className="bg-gray-300 animate-pulse w-1/4 p-2" />
      </div>
      <div className="bg-gray-300 animate-pulse w-full p-16 my-4" />
      <div className="bg-gray-300 animate-pulse w-2/12 p-2" />
    </div>
  );
}

export default PostPreviewSkeleton;
