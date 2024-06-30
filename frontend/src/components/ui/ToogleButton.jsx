import React, { useState } from 'react';
import { Badge } from './badge';

const ToggleButton = ({ category }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <Badge
      onClick={handleClick}
      className={` ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
    >
      {category}
    </Badge>
  );
};

export default ToggleButton;