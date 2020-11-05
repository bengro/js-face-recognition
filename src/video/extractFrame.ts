import React from "react";

export const extractFrame = (
  videoRef: React.MutableRefObject<HTMLVideoElement>
): ImageBitmap => {
  if (!videoRef.current) return;

  const canvas = new OffscreenCanvas(500, 500);
  canvas.getContext("2d").drawImage(videoRef.current, 0, 0, 500, 500);

  return canvas.transferToImageBitmap();
};
