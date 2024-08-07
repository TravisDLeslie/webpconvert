import React from 'react';
import LeftArrowIcon from '../assets/icons/leftarrow.svg';  // Replace with the path to your left arrow icon
import RightArrowIcon from '../assets/icons/rightarrow.svg'; // Replace with the path to your right arrow icon

const TipCard = ({
  icon,
  title,
  description,
  borderColor,
  onLeftArrowClick,
  onRightArrowClick,
  disableLeft,
  disableRight,
}) => {
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
        <div className="flex items-center justify-between w-full mb-2">
          {/* Icon */}
          <img src={icon} alt={title} className="md:h-16 md:w-16" />

          {/* Arrows Container (Hidden on desktop) */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              onClick={onLeftArrowClick}
              disabled={disableLeft} // Disable if first card
            >
              <img
                src={LeftArrowIcon}
                alt="Left Arrow"
                className="w-4 h-4 text-gray-300"
              />
            </button>
            <button
              className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              onClick={onRightArrowClick}
              disabled={disableRight} // Disable if last card
            >
              <img
                src={RightArrowIcon}
                alt="Right Arrow"
                className="w-4 h-4 text-gray-300"
              />
            </button>
          </div>
        </div>

        <div>
          <p className="font-semibold text-gray-700 mt-4 mb-2">{title}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TipCard;
