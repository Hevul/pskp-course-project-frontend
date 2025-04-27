const SearchIcon = ({ color = "currentColor", width = "25" }) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="1">
        <path
          d="M9.57143 18.1429C14.3053 18.1429 18.1429 14.3053 18.1429 9.57143C18.1429 4.83756 14.3053 1 9.57143 1C4.83756 1 1 4.83756 1 9.57143C1 14.3053 4.83756 18.1429 9.57143 18.1429Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.0001 21.0001L16.7144 16.7144"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default SearchIcon;
