const ExeFileIcon = ({
  color = "currentColor",
  fontColor = "currentColor",
  width = "25",
}) => {
  return (
    <svg
      width={width}
      height={+width * 1.2}
      viewBox="0 0 201 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.3">
        <path
          opacity="0.3"
          d="M140 49.25C134.53 49.2447 129.286 47.0695 125.418 43.2018C121.55 39.3341 119.375 34.0898 119.37 28.62V0H27.2C20.063 0 13.2184 2.83511 8.17175 7.88171C3.12515 12.9283 0.290039 19.7731 0.290039 26.91V189.13C0.300637 196.26 3.14046 203.094 8.18591 208.132C13.2314 213.17 20.0699 216 27.2 216H137.8C144.937 216 151.782 213.165 156.828 208.118C161.875 203.072 164.71 196.227 164.71 189.09V49.21L140 49.25Z"
          fill={color}
        />
      </g>
      <path
        d="M164.71 49.25H140C134.53 49.2447 129.286 47.0695 125.418 43.2018C121.55 39.3341 119.375 34.0898 119.37 28.62V0L164.71 49.25Z"
        fill={color}
      />
      <path
        d="M184.23 170.61H59.1899C50.3202 170.61 43.13 177.8 43.13 186.67V223.95C43.13 232.82 50.3202 240.01 59.1899 240.01H184.23C193.1 240.01 200.29 232.82 200.29 223.95V186.67C200.29 177.8 193.1 170.61 184.23 170.61Z"
        fill={color}
      />
      <path d="M87.48 213.38V220.65H80V213.38H87.48Z" fill={fontColor} />
      <path
        d="M98.54 196.36V202.66H108.7V208.14H98.54V214.82H110V220.65H91.28V190.58H110V196.36H98.54Z"
        fill={fontColor}
      />
      <path
        d="M132.35 220.65L126.01 211.29L120.57 220.65H112.23L121.84 205.17L111.93 190.58H120.57L126.73 199.64L132.05 190.58H140.35L130.86 205.72L140.98 220.65H132.35Z"
        fill={fontColor}
      />
      <path
        d="M151.06 196.36V202.66H161.23V208.14H151.06V214.82H162.5V220.65H143.79V190.58H162.5V196.36H151.06Z"
        fill={fontColor}
      />
      <path
        d="M82.5 147.71C81.3596 147.71 80.2659 147.257 79.4595 146.45C78.6531 145.644 78.2 144.55 78.2 143.41V136.8C78.1999 136.236 78.3112 135.677 78.5275 135.156C78.7437 134.635 79.0607 134.161 79.4601 133.763C79.8595 133.364 80.3336 133.049 80.8552 132.834C81.3769 132.619 81.9358 132.508 82.5 132.51C83.6378 132.51 84.7289 132.962 85.5334 133.766C86.338 134.571 86.79 135.662 86.79 136.8V143.41C86.79 144.549 86.3383 145.641 85.5341 146.447C84.7298 147.253 83.6387 147.707 82.5 147.71Z"
        fill={color}
      />
      <path
        d="M82.5 94.4199C81.3596 94.4199 80.2659 93.9668 79.4595 93.1604C78.6531 92.354 78.2 91.2603 78.2 90.1199V82.4299C78.2 81.2895 78.6531 80.1957 79.4595 79.3893C80.2659 78.5829 81.3596 78.1299 82.5 78.1299C83.6387 78.1325 84.7298 78.5867 85.5341 79.3928C86.3383 80.1989 86.79 81.2912 86.79 82.4299V90.1199C86.79 91.2586 86.3383 92.3507 85.5341 93.1569C84.7298 93.963 83.6387 94.4173 82.5 94.4199Z"
        fill={color}
      />
      <path
        d="M97.7499 143.63C96.9941 143.631 96.2513 143.433 95.5965 143.055C94.9417 142.678 94.3979 142.135 94.02 141.48L90.8199 135.92C90.2511 134.935 90.097 133.764 90.3914 132.665C90.6858 131.566 91.4047 130.629 92.39 130.06C92.8782 129.777 93.4177 129.593 93.9772 129.518C94.5368 129.444 95.1055 129.481 95.6508 129.627C96.1961 129.772 96.7072 130.025 97.155 130.368C97.6027 130.712 97.9782 131.141 98.26 131.63L101.46 137.18C102.029 138.167 102.184 139.339 101.889 140.44C101.595 141.54 100.876 142.479 99.89 143.05C99.2394 143.427 98.5016 143.627 97.7499 143.63Z"
        fill={color}
      />
      <path
        d="M71.1999 97.63C70.4441 97.6311 69.7013 97.4329 69.0465 97.0554C68.3916 96.678 67.8478 96.1346 67.4699 95.48L63.53 88.6701C62.9615 87.682 62.8085 86.5087 63.1048 85.408C63.4011 84.3072 64.1223 83.3692 65.1099 82.8001C66.0967 82.2308 67.2691 82.0763 68.3697 82.3706C69.4703 82.665 70.4091 83.3841 70.9799 84.37L74.91 91.1899C75.4793 92.1768 75.6337 93.3493 75.3393 94.4498C75.0449 95.5504 74.3258 96.4892 73.3399 97.0601C72.6888 97.4341 71.9508 97.6306 71.1999 97.63Z"
        fill={color}
      />
      <path
        d="M108.9 132.46C108.149 132.461 107.411 132.264 106.76 131.89L101.2 128.68C100.214 128.109 99.4951 127.17 99.2007 126.07C98.9064 124.969 99.0607 123.797 99.63 122.81C100.199 121.823 101.137 121.101 102.238 120.805C103.339 120.509 104.512 120.662 105.5 121.23L111.06 124.44C112.046 125.011 112.765 125.95 113.059 127.05C113.354 128.151 113.199 129.323 112.63 130.31C112.252 130.965 111.708 131.508 111.054 131.885C110.399 132.263 109.656 132.461 108.9 132.46Z"
        fill={color}
      />
      <path
        d="M62.9001 105.91C62.1482 105.908 61.4101 105.708 60.76 105.33L53.94 101.4C52.9541 100.829 52.2351 99.8903 51.9407 98.7897C51.6464 97.6891 51.8007 96.5168 52.37 95.5299C52.6517 95.0408 53.0273 94.612 53.475 94.2682C53.9227 93.9244 54.4338 93.6724 54.9792 93.5265C55.5245 93.3807 56.0932 93.3439 56.6527 93.4183C57.2123 93.4926 57.7517 93.6767 58.24 93.9599L65.0601 97.8899C66.044 98.4627 66.7613 99.4013 67.0555 100.501C67.3496 101.601 67.1967 102.772 66.63 103.76C66.2521 104.415 65.7084 104.958 65.0535 105.335C64.3987 105.713 63.6559 105.911 62.9001 105.91Z"
        fill={color}
      />
      <path
        d="M113 117.22H106.38C105.24 117.22 104.146 116.767 103.339 115.96C102.533 115.154 102.08 114.06 102.08 112.92C102.083 111.781 102.537 110.69 103.343 109.886C104.149 109.081 105.241 108.63 106.38 108.63H113C114.139 108.63 115.231 109.081 116.037 109.886C116.843 110.69 117.297 111.781 117.3 112.92C117.3 114.06 116.847 115.154 116.041 115.96C115.234 116.767 114.14 117.22 113 117.22Z"
        fill={color}
      />
      <path
        d="M59.6801 117.22H52C50.8596 117.22 49.7659 116.767 48.9595 115.96C48.1531 115.154 47.7 114.06 47.7 112.92C47.7026 111.781 48.1569 110.69 48.963 109.886C49.7691 109.082 50.8613 108.63 52 108.63H59.67C60.2343 108.629 60.7932 108.739 61.3148 108.954C61.8365 109.169 62.3105 109.484 62.71 109.883C63.1094 110.281 63.4262 110.755 63.6425 111.276C63.8587 111.797 63.97 112.356 63.97 112.92C63.9713 113.484 63.8614 114.043 63.6464 114.565C63.4314 115.086 63.1155 115.56 62.717 115.96C62.3185 116.359 61.8451 116.676 61.324 116.892C60.8028 117.109 60.2443 117.22 59.6801 117.22Z"
        fill={color}
      />
      <path
        d="M102.88 105.45C102.125 105.451 101.384 105.254 100.729 104.879C100.074 104.503 99.5299 103.962 99.15 103.31C98.5815 102.322 98.4285 101.149 98.7248 100.048C99.0211 98.9474 99.7423 98.0093 100.73 97.4401L106.73 93.9601C107.717 93.3908 108.889 93.2364 109.99 93.5308C111.09 93.8252 112.029 94.5443 112.6 95.5302C113.169 96.517 113.324 97.6894 113.029 98.79C112.735 99.8905 112.016 100.829 111.03 101.4L105.03 104.88C104.376 105.257 103.634 105.453 102.88 105.45Z"
        fill={color}
      />
      <path
        d="M56.09 132.46C55.3355 132.461 54.594 132.263 53.9407 131.886C53.2874 131.508 52.7455 130.965 52.37 130.31C51.8007 129.323 51.6464 128.151 51.9407 127.05C52.2351 125.95 52.9541 125.011 53.94 124.44L60.3001 120.77C61.2875 120.203 62.459 120.05 63.5588 120.345C64.6586 120.639 65.5974 121.356 66.1701 122.34C66.7386 123.328 66.8914 124.501 66.5951 125.602C66.2989 126.703 65.5776 127.641 64.59 128.21L58.24 131.88C57.5884 132.263 56.8457 132.463 56.09 132.46Z"
        fill={color}
      />
      <path
        d="M83 141.11H82.3101C77.3952 140.995 72.6014 139.562 68.4301 136.96C64.3077 134.404 60.9284 130.811 58.63 126.54C56.4817 122.518 55.3553 118.03 55.35 113.47C55.35 113.24 55.35 113.01 55.35 112.78C55.4682 108.081 56.7831 103.49 59.17 99.4401C61.5539 95.396 64.9259 92.024 68.97 89.6402C73.0364 87.2514 77.6452 85.9399 82.36 85.8301H82.99C87.5553 85.8253 92.0502 86.9559 96.0699 89.1201C100.338 91.4106 103.928 94.7835 106.48 98.9002C109.085 103.092 110.515 107.906 110.62 112.84C110.62 113.01 110.62 113.24 110.62 113.47C110.621 118.244 109.384 122.937 107.03 127.09C104.569 131.449 100.967 135.055 96.61 137.52C92.4593 139.872 87.7705 141.108 83 141.11ZM82.89 94.4102H82.62C79.353 94.4811 76.1584 95.3865 73.34 97.0402C70.5531 98.6837 68.2276 101.006 66.58 103.79C64.9487 106.59 64.0606 109.76 64 113C64 113.18 64 113.31 64 113.44C63.9979 116.581 64.7744 119.673 66.26 122.44C67.8424 125.392 70.1738 127.875 73.02 129.64C75.9076 131.432 79.2227 132.416 82.62 132.49H83.0601C86.3512 132.494 89.5867 131.643 92.45 130.02C95.4566 128.318 97.9425 125.829 99.64 122.82C101.261 119.96 102.112 116.728 102.11 113.44V113.06C102.036 109.643 101.048 106.307 99.25 103.4C97.4906 100.562 95.014 98.2368 92.0699 96.6602C89.2559 95.1574 86.1101 94.3838 82.92 94.4102H82.89Z"
        fill={color}
      />
      <path
        d="M94.0601 97.1798C93.3089 97.1828 92.5703 96.986 91.9201 96.6098C91.4309 96.3281 91.0021 95.9527 90.6584 95.5049C90.3146 95.0572 90.0625 94.546 89.9167 94.0007C89.7708 93.4553 89.734 92.8866 89.8084 92.3271C89.8828 91.7675 90.0668 91.2281 90.35 90.7398L94.0201 84.3698C94.3018 83.8806 94.6772 83.4519 95.1249 83.1081C95.5726 82.7643 96.0839 82.5122 96.6292 82.3664C97.1745 82.2205 97.7432 82.1837 98.3028 82.2581C98.8623 82.3325 99.4018 82.5166 99.8901 82.7998C100.379 83.0816 100.808 83.457 101.152 83.9047C101.496 84.3524 101.747 84.8637 101.893 85.409C102.039 85.9543 102.076 86.523 102.002 87.0826C101.927 87.6421 101.743 88.1815 101.46 88.6698L97.7901 95.0298C97.4122 95.6844 96.8684 96.2278 96.2135 96.6053C95.5587 96.9827 94.8159 97.1809 94.0601 97.1798Z"
        fill={color}
      />
      <path
        d="M67.2499 143.63C66.4979 143.629 65.7594 143.429 65.1099 143.05C64.1223 142.481 63.4011 141.543 63.1048 140.442C62.8085 139.341 62.9615 138.168 63.53 137.18L67.01 131.18C67.5808 130.194 68.5196 129.475 69.6202 129.181C70.7208 128.886 71.8931 129.041 72.88 129.61C73.8659 130.181 74.585 131.12 74.8793 132.22C75.1737 133.321 75.0192 134.493 74.4499 135.48L70.9799 141.48C70.602 142.135 70.0582 142.678 69.4034 143.055C68.7485 143.433 68.0058 143.631 67.2499 143.63Z"
        fill={color}
      />
    </svg>
  );
};

export default ExeFileIcon;
