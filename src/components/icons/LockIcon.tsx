const LockIcon = ({ color = "currentColor", width = "25" }) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Iconly/Regular/Light/Lock">
        <g id="Lock">
          <path
            id="Stroke 1"
            d="M16.4235 9.44792V7.30092C16.4235 4.78792 14.3855 2.74992 11.8725 2.74992C9.35949 2.73892 7.31349 4.76692 7.30249 7.28092V7.30092V9.44792"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Stroke 3"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.6832 21.2497H8.04224C5.94824 21.2497 4.25024 19.5527 4.25024 17.4577V13.1687C4.25024 11.0737 5.94824 9.37671 8.04224 9.37671H15.6832C17.7772 9.37671 19.4752 11.0737 19.4752 13.1687V17.4577C19.4752 19.5527 17.7772 21.2497 15.6832 21.2497Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Stroke 5"
            d="M11.8629 14.2028V16.4238"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};

export default LockIcon;
