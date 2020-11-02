import React from "react";
import FaceContours from "../components/FaceContours";
import { useMediaStream } from "../components/useMediaStream";

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
