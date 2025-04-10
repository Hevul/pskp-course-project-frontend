const FileIcon = ({
  color = "currentColor",
  width = "31",
  strokeWidth = "1.5",
}) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.0362 3.56742H10.4427C7.75604 3.55709 5.55374 5.69867 5.49045 8.38405V22.2217C5.43104 24.951 7.59458 27.2127 10.3239 27.2734C10.3639 27.2734 10.4027 27.2747 10.4427 27.2734H20.7618C23.4666 27.1636 25.5978 24.929 25.5785 22.2217V10.3823L19.0362 3.56742Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.6968 3.55212V7.30958C18.6968 9.14375 20.1796 10.6305 22.0138 10.6356H25.5723"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.4555 19.8381H11.4805"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8138 14.9912H11.479"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FileIcon;
