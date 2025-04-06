const MinusIcon = ({ color = "currentColor", width = "25" }) => {
  return (
    <svg
      width={width}
      height="2"
      viewBox="0 0 16 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L15 1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default MinusIcon;
