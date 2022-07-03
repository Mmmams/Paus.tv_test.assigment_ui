import React from 'react';

export const LoaderModal = () => {
  return (
    <div className='flex items-center justify-center w-screen h-screen bg-black/500 z-10'>
      {/* <div className="flex items-center justify-center z-20">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> */}
      <div className='flex justify-center items-center'>
        <div
          className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full'
          role='status'
        >
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    </div>
  );
};
