import * as React from "react"

const TelegramIcon = (props) => (
    <svg
    style={{
      enableBackground: "new 0 0 512 512",
    }}
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <linearGradient
      gradientUnits="userSpaceOnUse"
      id="a"
      x1={256}
      x2={256}
      y1={0}
      y2={510.132}
    >
      <stop
        offset={0}
        style={{
          stopColor: "#41bce7",
        }}
      />
      <stop
        offset={1}
        style={{
          stopColor: "#22a6dc",
        }}
      />
    </linearGradient>
    <circle
      cx={256}
      cy={256}
      r={256}
      style={{
        fill: "url(#a)",
      }}
    />
    <path
      d="m380.6 147.3-45.7 230.5s-6.4 16-24 8.3l-105.5-80.9-38.4-18.5-64.6-21.7s-9.9-3.5-10.9-11.2c-1-7.7 11.2-11.8 11.2-11.8l256.8-100.7c0-.1 21.1-9.4 21.1 6z"
      style={{
        fill: "#fff",
      }}
    />
    <path
      d="M197.2 375.2s-3.1-.3-6.9-12.4c-3.8-12.1-23.3-76.1-23.3-76.1l155.1-98.5s9-5.4 8.6 0c0 0 1.6 1-3.2 5.4-4.8 4.5-121.8 109.7-121.8 109.7"
      style={{
        fill: "#d2e4f0",
      }}
    />
    <path
      d="m245.8 336.2-41.7 38.1s-3.3 2.5-6.8.9l8-70.7"
      style={{
        fill: "#b5cfe4",
      }}
    />
  </svg>
)

export default TelegramIcon
