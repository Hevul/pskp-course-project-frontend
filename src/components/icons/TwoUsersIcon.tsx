const TwoUsersIcon = ({ color = "currentColor", width = "25" }) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.19351 11.4053C9.96026 11.4053 12.325 11.8245 12.325 13.4993C12.325 15.174 9.97601 15.6053 7.19351 15.6053C4.42601 15.6053 2.06201 15.1898 2.06201 13.5143C2.06201 11.8388 4.41026 11.4053 7.19351 11.4053Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.19331 9.015C5.37681 9.015 3.90381 7.54275 3.90381 5.72625C3.90381 3.90975 5.37681 2.4375 7.19331 2.4375C9.00906 2.4375 10.4821 3.90975 10.4821 5.72625C10.4888 7.536 9.02631 9.00825 7.21656 9.015H7.19331Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.3623 8.16145C13.5631 7.9927 14.4878 6.9622 14.4901 5.71495C14.4901 4.4857 13.5938 3.4657 12.4186 3.27295"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.9463 11.0493C15.1095 11.2226 15.9218 11.6306 15.9218 12.4706C15.9218 13.0488 15.5393 13.4238 14.9213 13.6586"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TwoUsersIcon;
