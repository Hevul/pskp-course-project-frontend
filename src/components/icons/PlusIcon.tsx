const PlusIcon = ({ color = "currentColor", width = "15", height = "13" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 0.5V12.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.36621 6.5H13.6341"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlusIcon;
