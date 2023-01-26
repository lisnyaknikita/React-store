import React from "react";
import ContentLoader from "react-content-loader"

export default function MyLoader(props) {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={491}
      viewBox="0 0 280 491"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="144" cy="139" r="130" />
      <rect x="38" y="293" rx="0" ry="0" width="224" height="23" />
      <rect x="31" y="343" rx="0" ry="0" width="235" height="77" />
      <rect x="32" y="446" rx="0" ry="0" width="84" height="35" />
      <rect x="133" y="441" rx="0" ry="0" width="128" height="42" />
    </ContentLoader>
  );
}
