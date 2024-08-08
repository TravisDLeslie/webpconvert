import React from 'react';

const BestPracticesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Handle backdrop click to close the modal
  const handleBackdropClick = (e) => {
    // Ensure the click is on the backdrop, not the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackdropClick} // Add click handler on the backdrop
    >
      <div className="relative bg-white p-8 rounded-xl border shadow-lg">
        <button 
          className="absolute top-2 right-2 text-lg font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <div>
          <h3 className="text-lg font-bold mb-4">Best Practices</h3>
          <p className="text-xs">Between words use “-”, no spaces, use only lowercase letters</p>
          <div className='mb-2 mt-6'>
          <p className="text-sm ">Good Example:</p>
          <p className='text-sm font-medium'>best-coffee-beans.webp</p>
          </div>
          <div className='mt-6'>
          <p className="text-sm">Bad Example: </p>
          <p className='text-sm font-medium'>best_coffee_beans.webp</p>
          <p className='text-sm font-normal'>or</p>
          <p className='text-sm font-medium'>best coffee beans.jpg</p>
          </div>
          <div className='mt-6 text-sm font-medium'>
            <p>Instead of image1.jpg<br />use fresh-strawberry-pie.jpg.</p>
          </div>
          <div className='mt-6 text-sm font-medium'>
            <p>chocolate-chip-cookie-recipe.jpg is better than <br /> recipe_for_making_chocolate_chip_cookies_at_home.jpg</p>
          </div>
          <div className='mt-6 text-sm font-medium'>
            <p> Avoid using spaces, and special characters (!, @, #, $, %, ^, &, *, (, ), etc.)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestPracticesModal;
