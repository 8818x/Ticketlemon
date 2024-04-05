import React, { useState, useEffect } from 'react';

const Slideshow = ({ occasions, interval = 5000, onSlideChange }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleSlideChange = (newIndex) => {
    setCurrentSlideIndex(newIndex);
    if (onSlideChange) {
      onSlideChange(newIndex); // Call the callback if provided
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const nextSlideIndex = (currentSlideIndex + 1) % occasions.length;
      handleSlideChange(nextSlideIndex);
    }, interval);

    return () => clearTimeout(timeoutId); // Cleanup function for unmounting
  }, [currentSlideIndex, occasions.length, interval]);

  return (
    <div className="slideshow-container">
      {occasions.map((occasion, index) => (
        <img
          key={index}
          src={occasion.image} // Assuming image objects have a 'url' property
          alt={`Slide ${index + 1}`} // Set alt text based on a property or fallback
          className={currentSlideIndex === index ? 'active' : ''}
        />
      ))}
    </div>
  );
};

export default Slideshow;
