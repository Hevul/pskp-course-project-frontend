const ChevronDownIcon = ({ color = "currentColor", width = "25" }) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.9571 9.29289C18.3477 9.68342 18.3477 10.3166 17.9571 10.7071L12.4571 16.2071C12.0666 16.5976 11.4334 16.5976 11.0429 16.2071L5.54292 10.7071C5.1524 10.3166 5.1524 9.68342 5.54292 9.29289C5.93345 8.90237 6.56661 8.90237 6.95714 9.29289L11.75 14.0858L16.5429 9.29289C16.9334 8.90237 17.5666 8.90237 17.9571 9.29289Z"
        fill={color}
      />
    </svg>
  );
};

export default ChevronDownIcon;
