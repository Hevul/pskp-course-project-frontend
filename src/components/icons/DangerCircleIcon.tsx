const DangerCircleIcon = ({ color = "currentColor", width = "25" }) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.25 3.28467C17.358 3.28467 21.5 7.42567 21.5 12.5347C21.5 17.6427 17.358 21.7847 12.25 21.7847C7.141 21.7847 3 17.6427 3 12.5347C3 7.42567 7.141 3.28467 12.25 3.28467Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.2451 8.73877V13.1578"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M12.245 16.3306H12.255"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DangerCircleIcon;
