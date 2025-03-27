const CrossIcon = ({ color = "currentColor", width = "22" }) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.8889 17.6569C15.2469 18.0474 15.8273 18.0474 16.1853 17.6569C16.5433 17.2664 16.5433 16.6332 16.1853 16.2427L12.2962 12.0001L16.1853 7.75742C16.5433 7.3669 16.5433 6.73373 16.1853 6.34321C15.8273 5.95268 15.2469 5.95268 14.8889 6.34321L10.9998 10.5858L7.11075 6.34319C6.75277 5.95266 6.17237 5.95266 5.81438 6.34319C5.4564 6.73371 5.4564 7.36688 5.81438 7.7574L9.70348 12.0001L5.81438 16.2427C5.4564 16.6332 5.4564 17.2664 5.81438 17.6569C6.17236 18.0474 6.75277 18.0474 7.11075 17.6569L10.9998 13.4143L14.8889 17.6569Z"
        fill={color}
      />
    </svg>
  );
};

export default CrossIcon;
