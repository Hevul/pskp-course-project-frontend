const FolderIcon = ({
  color = "currentColor",
  width = "31",
  height = " 31",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.7738 19.3541C27.7738 23.5285 25.1375 25.989 20.665 25.989H10.9375C6.45375 25.989 3.8125 23.5285 3.8125 19.3541V10.2541C3.8125 6.08562 5.455 3.62512 9.92875 3.62512H12.4288C13.3263 3.62629 14.1713 4.01946 14.7088 4.69029L15.85 6.10662C16.39 6.77629 17.235 7.17062 18.1325 7.17179H21.67C26.1538 7.17179 27.8088 9.30212 27.8088 13.5616L27.7738 19.3541Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.3516 17.8735H21.2703"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FolderIcon;
