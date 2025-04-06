const ChevronUpIcon = ({ color = "currentColor", width = "25" }) => {
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
        d="M5.54289 15.4571C5.15237 15.0666 5.15237 14.4334 5.54289 14.0429L11.0429 8.54289C11.4334 8.15237 12.0666 8.15237 12.4571 8.54289L17.9571 14.0429C18.3476 14.4334 18.3476 15.0666 17.9571 15.4571C17.5666 15.8476 16.9334 15.8476 16.5429 15.4571L11.75 10.6642L6.95711 15.4571C6.56658 15.8476 5.93342 15.8476 5.54289 15.4571Z"
        fill={color}
      />
    </svg>
  );
};

export default ChevronUpIcon;
