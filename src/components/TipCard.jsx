import React from 'react';

const TipCard = ({ icon, title, description, borderColor }) => {
  // Define a style object for the card
  const cardStyle = {
    borderColor: borderColor,
    borderWidth: '0 0 4px 0',
    borderStyle: 'solid',
    width: '305px',
    height: '220px',
    backgroundColor: 'white',
  };

  return (
    <div
      className="tip-card rounded-xl shadow-md transition-transform duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-lg"
      style={cardStyle}
    >
      <div className="flex flex-col justify-center items-start p-4 h-full">
        <img src={icon} alt={title} className="md:h-16 md:w-16 mb-2" />
        <div>
          <p className="font-semibold text-gray-700 mt-4 mb-2">{title}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TipCard;
