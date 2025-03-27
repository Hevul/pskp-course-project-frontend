const EditIcon = ({ color = "currentColor", width = "24", height = "24" }) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Iconly/Regular/Outline/Edit">
        <g id="Edit">
          <path
            id="Fill 1"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.7508 21.9398H13.4978C13.0838 21.9398 12.7478 21.6038 12.7478 21.1898C12.7478 20.7758 13.0838 20.4398 13.4978 20.4398H20.7508C21.1648 20.4398 21.5008 20.7758 21.5008 21.1898C21.5008 21.6038 21.1648 21.9398 20.7508 21.9398Z"
            fill={color}
          />
          <g id="Group 5">
            <mask
              id="mask0_33437_4634"
              maskUnits="userSpaceOnUse"
              x="2"
              y="3"
              width="18"
              height="19"
            >
              <path
                id="Clip 4"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.00024 3.00024H19.1808V21.9398H2.00024V3.00024Z"
                fill="white"
              />
            </mask>
            <g mask="url(#mask0_33437_4634)">
              <path
                id="Fill 3"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.1105 5.01689L3.69552 16.7919C3.52452 17.0059 3.46152 17.2819 3.52452 17.5469L4.20552 20.4319L7.24452 20.3939C7.53352 20.3909 7.80052 20.2619 7.97752 20.0419C11.1945 16.0169 17.3275 8.34289 17.5015 8.11789C17.6655 7.85189 17.7295 7.47589 17.6435 7.11389C17.5555 6.74289 17.3245 6.42789 16.9915 6.22689C16.9205 6.17789 15.2355 4.86989 15.1835 4.82889C14.5495 4.32089 13.6245 4.40889 13.1105 5.01689ZM3.61352 21.9399C3.26652 21.9399 2.96452 21.7019 2.88352 21.3629L2.06452 17.8919C1.89552 17.1729 2.06352 16.4309 2.52452 15.8549L11.9445 4.07289C11.9485 4.06889 11.9515 4.06389 11.9555 4.05989C12.9885 2.82489 14.8565 2.64289 16.1165 3.65389C16.1665 3.69289 17.8395 4.99289 17.8395 4.99289C18.4475 5.35489 18.9225 6.00189 19.1025 6.76789C19.2815 7.52589 19.1515 8.30789 18.7345 8.96889C18.7035 9.01789 18.6765 9.05989 9.14852 20.9799C8.68952 21.5519 8.00152 21.8849 7.26252 21.8939L3.62352 21.9399H3.61352Z"
                fill={color}
              />
            </g>
          </g>
          <path
            id="Fill 6"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.2234 11.6849C16.0634 11.6849 15.9034 11.6339 15.7664 11.5299L10.3144 7.34187C9.98642 7.08987 9.92442 6.61987 10.1764 6.28987C10.4294 5.96187 10.8994 5.90087 11.2284 6.15287L16.6814 10.3399C17.0094 10.5919 17.0714 11.0629 16.8184 11.3919C16.6714 11.5839 16.4484 11.6849 16.2234 11.6849Z"
            fill={color}
          />
        </g>
      </g>
    </svg>
  );
};

export default EditIcon;
