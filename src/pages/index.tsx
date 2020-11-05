import React from "react";
import FaceContours from "../video/FaceContours";
import { useMediaStream } from "../video/useMediaStream";

export default function Index() {
  const mediaStream = useMediaStream();

  return (
    <>
      <div>
        <FaceContours stream={mediaStream} />
      </div>
    </>
  );
}
