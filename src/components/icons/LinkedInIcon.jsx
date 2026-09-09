import React from 'react';

export const LinkedInIcon = ({
  size = 22,
  badgeFill = '#FFFFFF',
  cutoutFill = '#0B71D6',
  className = ''
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <rect width="24" height="24" rx="5" fill={badgeFill} />
      <path
        d="M5.5 8.75H8.75V19H5.5V8.75ZM7.125 3.5C8.16 3.5 9 4.34 9 5.375C9 6.41 8.16 7.25 7.125 7.25C6.09 7.25 5.25 6.41 5.25 5.375C5.25 4.34 6.09 3.5 7.125 3.5ZM10.5 8.75H13.6V10.15H13.65C14.08 9.35 15.12 8.5 16.68 8.5C19.92 8.5 20.5 10.63 20.5 13.4V19H17.25V13.9C17.25 12.68 17.22 11.12 15.55 11.12C13.85 11.12 13.6 12.44 13.6 13.8V19H10.35V8.75H10.5Z"
        fill={cutoutFill}
      />
    </svg>
  );
};

export default LinkedInIcon;
