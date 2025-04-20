const ShowIcon = ({ color = "currentColor", width = "25" }) => {
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
        d="M15.2576 14.3261C15.2576 16.0721 13.8416 17.4871 12.0956 17.4871C10.3496 17.4871 8.93457 16.0721 8.93457 14.3261C8.93457 12.5791 10.3496 11.1641 12.0956 11.1641C13.8416 11.1641 15.2576 12.5791 15.2576 14.3261Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M21.3467 14.3253C19.3857 10.1972 15.9027 7.7207 12.0947 7.7207H12.0987C8.29068 7.7207 4.80768 10.1972 2.84668 14.3253"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
};

export default ShowIcon;
