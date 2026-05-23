// Client logos sourced from the `public/client_logos` folder
import React from "react";

function ImageLogo({ src, alt = "logo", size = 48, className = "", ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
      {...props}
    />
  );
}

const logoFiles = [
  "300Asset 1u.png",
  "500Asset 1.png",
  "500Asset 1t.png",
  "500Asset 1tt.png",
  "500Asset 1yy.png",
  "500Asset 2.png",
  "500Asset 28.png",
  "500Asset 2t.png",
  "Asset 10.png",
  "Asset 12.png",
  "Asset 13.png",
  "Asset 14.png",
  "Asset 16.png",
  "Asset 17.png",
  "Asset 18.png",
  "Asset 1@4x.png",
  "Asset 20.png",
  "Asset 22.png",
  "Asset 23.png",
  "Asset 24.png",
  "Asset 26.png",
  "Asset 27.png",
  "Asset 28.png",
  "Asset 29.png",
  "Asset 2@4x.png",
  "Asset 3.png",
  "Asset 36.png",
  "Asset 37.png",
  "Asset 38.png",
  "Asset 39.png",
  "Asset 4.png",
  "Asset 40.png",
  "Asset 41.png",
  "Asset 42.png",
  "Asset 43.png",
  "Asset 44.png",
  "Asset 5.png",
  "Asset 8.png",
  "Asset 9.png",
  "fira logoy.png",
  "PNG.png",
  "sss.png",
  "tiara logo1y.png",
];

export const clientLogos = logoFiles.map((file, idx) => {
  const name = file.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
  const src = `/client_logos/${encodeURIComponent(file)}`;
  return {
    id: idx + 1,
    name,
    icon: (props) => <ImageLogo src={src} alt={name} {...props} />,
  };
});