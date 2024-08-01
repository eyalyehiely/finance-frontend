import React from 'react';
import useTheme from '../utils/useTheme';

const ThemeText = ({ children, className = '', ...props }) => {
  const theme = useTheme();

  // Determine the text color based on the theme
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';

  return (
    <span className={`${textColor} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default ThemeText;
