// src/components/SwipeableTipCards.js

import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import TipCard from './TipCard';

const SwipeableTipCards = ({ tips }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);

  const handleSwipedLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tips.length);
  };

  const handleSwipedRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? tips.length - 1 : prevIndex - 1
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipedLeft,
    onSwipedRight: handleSwipedRight,
    preventScrollOnSwipe: true,
    trackMouse: true, // Enables swipe on desktop with mouse drag
  });

  useEffect(() => {
    // Automatically start hint animation on load
    const hintTimeout = setTimeout(() => {
      setHintVisible(false);
    }, 1000); // 1 second for the animation duration

    return () => {
      clearTimeout(hintTimeout);
    };
  }, []);

  return (
    <div {...handlers} className="w-full md:w-auto overflow-hidden">
      <div className="flex justify-center items-center">
        {tips.map((tip, index) => (
          <div
            key={index}
            className={`transition-transform duration-300 ease-in-out ${
              index === currentIndex ? 'block' : 'hidden'
            }`}
            style={{
              transform: hintVisible && index === currentIndex ? 'translateX(25%)' : 'translateX(0)',
              transition: hintVisible && index === currentIndex ? 'transform 0.5s ease-in-out' : 'transform 0.3s ease-in-out',
            }}
          >
            <TipCard
              icon={tip.icon}
              title={tip.title}
              description={tip.description}
              borderColor={tip.borderColor}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwipeableTipCards;
